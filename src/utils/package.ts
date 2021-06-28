/**
 * @module:  Taro二次封装
 * @author Liang Huang
 * @date 2020-09-22 16:46:31
 */
import Taro from '@tarojs/taro';

let timeId;
export const showToast = (option: Taro.showToast.Option | undefined) => {
  // 阻止重复触发
  if (timeId) return;
  console.log('trigger show');
  Taro.showToast(option);
  const p = new Promise(resolve => {
    timeId = setTimeout(() => {
      Taro.hideToast();
      clearTimeout(timeId);
      timeId = undefined;
      resolve();
    }, 2000);
  });
  return p;
};
