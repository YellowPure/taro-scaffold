import Taro from '@tarojs/taro';
import { updateQueryStringParameter } from '@src/utils/url';
import { TEST_HOST, PROD_HOST, IHost, MOCK_HOST, hostKey, TOKEN, STAGE_HOST } from './constant';

const getHosts = () => {
  // console.log('process.env.NODE_ENV1', process.env.NODE_ENV);
  let host: any = TEST_HOST;
  if (process.env.API_ENV === 'production') {
    host = PROD_HOST;
  } else if (process.env.API_ENV === 'test') {
    host = TEST_HOST;
  } else if (process.env.API_ENV === 'stage') {
    host = STAGE_HOST;
  }
  return host;
};

const getHost = (host?: hostKey, isMock?: boolean): IHost => {
  const hosts = getHosts();
  let _host;
  if (isMock) {
    _host = MOCK_HOST;
  } else if (host) {
    _host = hosts[host];
  } else {
    _host = hosts.ent;
  }
  return _host;
};

/**
 *
 * @param options 请求参数
 * @param host 是否自定义host前缀（默认ent.yunwoke.com）
 * @param isMock 是否使用mock接口
 */
export const request = (options: Taro.request.Option<any>, host?: hostKey, isMock?: boolean) => {
  let url = '';
  let _host = getHost(host, isMock);
  let cookie = '';
  try {
    cookie = JSON.parse(Taro.getStorageSync(TOKEN));
  } catch (error) {}

  if (process.env.TARO_ENV === 'weapp') {
    url = `${_host}${options.url}`;
  } else {
    url = options.url;
  }
  // 添加时间戳
  url = updateQueryStringParameter(url, 'ts', new Date().getTime());

  options.header = options.header || {};
  if (cookie) {
    options.header['cookie'] = `cwsso_token=${cookie}`;
  }
  const _options = { ...options, url };
  return Taro.request(_options).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      return data;
    } else {
      console.error(`网络请求错误，状态码${statusCode}`);
      return data;
    }
  });
};
