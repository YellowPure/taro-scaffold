const gulp = require('gulp');
const OSS = require('ali-oss');
const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types')
const AgentKeepAlive = require('agentkeepalive');
const Async = require('async');
const imagemin = require('gulp-imagemin');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const htmlClean = require('gulp-htmlclean');
const imageMin = require('gulp-imagemin');
const del = require('del');
const config=  require('./gulpfile.config.json');

gulp.task('upload-cdn', async function () {
  let platform = config.path;
  // 将你的默认的任务代码放在这
  let client = new OSS({
    secure: true,
    // region: 'oss-cn-beijing', // endpoint指定时，region会被忽略
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    bucket: config.bucket,
    endpoint: config.endpoint,
    // 手动传入agent，并把最大空闲时间设置为5分钟
    agent: new AgentKeepAlive({
      timeout: 5 * 60 * 1000,
      maxSockets: 30
    }),
    timeout: 5 * 60 * 1000
  });


  async function putOSS(src, dist) {
    try {
      await client.put(platform + dist, src, {
        'Content-Type': `${mime.lookup(src)}; charset=utf-8`,
      });
      // console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  function addFileToOSSSync(src, dist, files) {
    var docs = fs.readdirSync(src);
    docs.forEach(function (doc) {
      var _src = src + '/' + doc,
        _dist = dist + '/' + doc;
      var st = fs.statSync(_src);
      // 判断是否为文件
      if (st.isFile() && doc !== '.DS_Store') {
        files.push({
          src: _src,
          dist: _dist
        });
        // putOSS(_src, _dist);
      }
      // 如果是目录则递归调用自身
      else if (st.isDirectory()) {
        addFileToOSSSync(_src, _dist, files);
        // console.log(_src + '是文件夹')
      }
    })
  }
  const files = [];

  var filePath = path.resolve('./cdn/dist');
  await addFileToOSSSync(filePath, '', files);
  var p = Async.queue(function (task, callback) {
    console.log('task.src, task.dist', task.src, task.dist);
    putOSS(task.src, task.dist).then(() => {
      callback();
    });
  }, 5);
  p.push([...files]);
});

function cleanCDNDist() {
  return del(['cdn/dist/*']);
}

gulp.task('mini',async function() {
  cleanCDNDist();
  gulp.src('cdn/src/*')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('cdn/dist'))
})


function minifyJS() {
  return gulp
    .src('dist/**/*.js')
    .pipe(
      uglify({
        output: {
          comments: false
        }
      })
    )
    .pipe(gulp.dest('./build'));
}

function minifyCSS() {
  return gulp
    .src('dist/**/*.wxss')
    .pipe(cssnano())
    .pipe(gulp.dest('./build'));
}

function minifyHTML() {
  return gulp
    .src('dist/**/*.wxml')
    .pipe(htmlClean())
    .pipe(gulp.dest('./build'));
}

function minifyImg() {
  return gulp
    .src(['dist/**/*.png', 'dist/**/*.jpg'])
    .pipe(imageMin())
    .pipe(gulp.dest('./build/'));
}

function copyOther() {
  return gulp
    .src(['dist/**/*.map', 'dist/**/*.json', 'dist/**/*.wxs'])
    .pipe(gulp.dest('./build'));
}

function cleanBuild() {
  return del(['build/**/*']);
}


function cleanDist() {
  return del(['dist/**/*']);
}

function carry() {
  return gulp.src('build/**/*').pipe(gulp.dest('dist'));
}

gulp.task(
  'build',
  gulp.series(
    cleanBuild,
    gulp.parallel(minifyJS, minifyCSS, minifyHTML, minifyImg, copyOther),
    cleanDist,
    carry
  )
);

gulp.task('default', gulp.series('build'));