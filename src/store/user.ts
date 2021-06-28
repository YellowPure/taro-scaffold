import { observable, action } from 'mobx';
import { request } from '@src/utils/http';
import { FETCH_STATUS, TOKEN, USER_INFO, USER_COMPANYS } from '@src/utils/constant';
import { IUserCompany, IEcommerceList } from '@src/entity/user';
import Taro from '@tarojs/taro';

async function getStorageByKey(key: string): Promise<any> {
  const res = await Taro.getStorageSync(key);
  if (!res) return;
  try {
    return JSON.parse(res);
  } catch (error) {
    throw new Error(error);
  }
}
class User {
  @observable userinfo;
  @observable fetching = FETCH_STATUS.Init;
  @observable companys: IUserCompany[] = [];
  @observable ecommerceList: IEcommerceList[] = [];
  @observable token = Taro.getStorageSync(TOKEN);
  @observable companysFetching = FETCH_STATUS.Init;
  @observable userinfoFetching = FETCH_STATUS.Init;
  constructor() {
    this.getUserinfo();
  }

  @action.bound
  async getUserinfo() {
    this.userinfo = await getStorageByKey(USER_INFO);
    await request({
      url: '/api/users/profile'
    }).then(res => {
      this.userinfoFetching = FETCH_STATUS.Done;
      if (res.error_code === 0) {
        this.userinfo = observable.object({ ...res.result });
      } else if (res.error_code === 80001) {
        // 未登录或token过期时清除当前本地token
        this.token = undefined;
        Taro.setStorageSync(TOKEN, '');
      }
    });
  }
  // 获取验证码
  @action.bound
  async getVerifyCode(phone: string) {
    this.fetching = FETCH_STATUS.Pending;
    const res = await request(
      {
        url: '/api/v2/verifycode',
        method: 'POST',
        data: {
          phone,
          vtype: 'quick_login'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      },
      'passport'
    );
    this.fetching = FETCH_STATUS.Done;
    return res;
  }

  @action.bound
  async login(vcode: string, phone: string) {
    this.fetching = FETCH_STATUS.Pending;
    const res = await request(
      {
        url: '/api/v2/user/signin/quick',
        method: 'POST',
        data: { vcode, phone },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      },
      'passport'
    );
    this.fetching = FETCH_STATUS.Done;
    return res;
  }

  @action.bound
  async logout() {
    return await request({
      url: '/api/users/signout/sso',
      method: 'POST'
    });
  }

  @action.bound
  async getCompanys() {
    const localCache = await getStorageByKey(USER_COMPANYS);
    if (localCache) {
      this.companys = localCache;
    }

    const res = await request({
      url: '/api/users/companys'
    });
    this.companysFetching = FETCH_STATUS.Done;
    if (+res.error_code === 0 && Array.isArray(res.result)) {
      this.companys = observable.array(res.result);
      Taro.setStorageSync(USER_COMPANYS, JSON.stringify(res.result));
      // console.log('this.companys', this.companys)
    }
  }
}

export default User;
