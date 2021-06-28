import Taro from '@tarojs/taro';
/**
 *
 * 判断数组是否相等
 * @param arr1 arr2
 */
export function isArrayEqual(arr1: any[], arr2: any[]) {
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0, l = arr1.length; i < l; i++) {
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      if (!arr1[i].equals(arr2[i])) return false;
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

interface IResult extends Taro.getSystemInfoSync.Result {
  [propName: string]: any;
}

/**
 * 判断参数是否是Function类型
 * @param fn
 */
export const isFunction = val => typeof val === 'function';

export function getSystemInfo() {
  // @ts-ignore
  if (Taro.globalSystemInfo && !Taro.globalSystemInfo.ios) {
    // @ts-ignore
    return Taro.globalSystemInfo;
  } else {
    // h5环境下忽略navbar
    if (!isFunction(Taro.getSystemInfoSync)) {
      return null;
    }
    const systemInfo = (Taro.getSystemInfoSync() as IResult) || {
      model: '',
      system: ''
    };
    const ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
    let rect;
    try {
      rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
      if (rect === null) {
        throw new Error('getMenuButtonBoundingClientRect error');
      }
      // 取值为0的情况  有可能width不为0 top为0的情况
      if (!rect.width || !rect.top || !rect.left || !rect.height) {
        throw new Error('getMenuButtonBoundingClientRect error');
      }
    } catch (error) {
      let gap: string | number = ''; // 胶囊按钮上下间距 使导航内容居中
      let width = 96; // 胶囊的宽度
      if (systemInfo.platform === 'android') {
        gap = 8;
        width = 96;
      } else if (systemInfo.platform === 'devtools') {
        if (ios) {
          gap = 5.5; // 开发工具中ios手机
        } else {
          gap = 7.5; // 开发工具中android和其他手机
        }
      } else {
        gap = 4;
        width = 88;
      }
      if (!systemInfo.statusBarHeight) {
        // 开启wifi的情况下修复statusBarHeight值获取不到
        systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      }
      rect = {
        // 获取不到胶囊信息就自定义重置一个
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width
      };
      console.log('error', error);
      console.log('rect', rect);
    }

    let navBarHeight;
    if (!systemInfo.statusBarHeight) {
      // 开启wifi和打电话下
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      navBarHeight = (function () {
        const gap = rect.top - systemInfo.statusBarHeight;
        return 2 * gap + Number(rect.height);
      })();

      systemInfo.statusBarHeight = 0;
      systemInfo.navBarExtendHeight = 0; // 下方扩展4像素高度 防止下方边距太小
    } else {
      navBarHeight = (function () {
        const gap = rect.top - systemInfo.statusBarHeight;
        return systemInfo.statusBarHeight + 2 * gap + Number(rect.height);
      })();
      if (ios) {
        systemInfo.navBarExtendHeight = 4; // 下方扩展4像素高度 防止下方边距太小
      } else {
        systemInfo.navBarExtendHeight = 0;
      }
    }

    systemInfo.navBarHeight = navBarHeight; // 导航栏高度不包括statusBarHeight
    systemInfo.capsulePosition = rect; // 右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
    systemInfo.ios = ios; // 是否ios
    // @ts-ignore
    Taro.globalSystemInfo = systemInfo; // 将信息保存到全局变量中,后边再用就不用重新异步获取了
    // console.log('systemInfo', systemInfo);
    return systemInfo;
  }
}
/**
 * 删除对象中空元素的key
 */
export const deleteUndefinedValue = (obj: Object) => {
  const _obj = { ...obj };
  for (const key of Object.keys({ _obj })) {
    if (_obj[key] === undefined || _obj[key] === null) {
      delete _obj[key];
    }
  }
  return _obj;
};
