# 开箱即用 taro 框架

## 版本

```javascript
  tarojs@3.0.9
  taro-ui@3.0.0-alpha.3
  react@16.13.1
  mobx@4.15.6
```

## 多环境部署

```javascript
build-test:weapp
build-stage:weapp
build-prod:weapp
```

分别对应测试，预发布和线上；可在`utils/constant`中配置各环境接口 host

## CDN 上传

```javascript
yarn upload-cdn
```

使用阿里云的 cdn 和 gulp 把`cdn/src`中图片上传到阿里云指定目录中

详情可查看[/cdn/README.md](/cdn/README.md)

## 自定义处理命令

在开发过程中，经常碰到需要真机调试的情况，此时直接预览会`超过2mb打包限制`

本模版提供`yarn compress`自定义命令，使用`gulp build`在预览之前打包，提供了开发中真机调试功能。

> Tips: 此功能不稳定，经测试，需先build后 ==> 命令行编译 ==> 预览
## 开发功能增强

* `kill.sh` 微信开发者工具偶尔会在后台hold server，`sh kill.sh` 杀掉端口

## 数据管理

* mobx4
* useImmer

## 组件库

* taro-ui
* 自定义组件

  * 自定义头部导航
  * 滚动列表
  * 页面带登录弹窗
  * 页面带登录状态判断
  * 空数据组件
  * 精确到分钟datepicker
  * menu图标组件
  * 登录弹窗
  * 伪tab header
