('');
export const MOCK_HOST = 'http://localhost:9527';
export type hostKey = 'passport' | 'ent' | 'org';
export interface IHost {
  passport: string;
  ent: string;
  org: string;
}
export enum PROD_HOST {
  passport = 'https://passport.clouderwork.com',
  ent = 'https://e.clouderwork.com',
  org = 'https://org.clouderwork.com'
}
export enum TEST_HOST {
  passport = 'https://passport.yunwoke.com',
  ent = 'https://ent.yunwoke.com',
  org = 'https://org2.yunwoke.com'
}

export enum STAGE_HOST {
  passport = 'https://beta-passport.yunwoke.com',
  ent = 'https://beta-ent.yunwoke.com',
  org = 'https://beta-org.yunwoke.com'
}

// export type FetchStatus = 'init' | 'pending' | 'error' | 'done' | 'success'
export const TOKEN = 'cwsso_token';
export const USER_INFO = 'cwsso_userinfo';
export const USER_COMPANYS = 'cwsso_companys';
export enum FETCH_STATUS {
  Init = 'init',
  Pending = 'pending',
  Error = 'error',
  Done = 'done',
  Success = 'success'
}

export const CDN_PATH = 'https://static.clouderwork.com/mini/';

export const GOODS_DEFAULT_AVATAR = `${CDN_PATH}icon-goods-default-398fda946e.png`;

export const AMOUNT_REG = /^(([1-9]{1}(\d){0,8})|(0{1}))(\.\d{0,2})?$/;
export const AMOUNT_REG_LENGTH = /^(([1-9]{1}(\d){0,8})|(0{1}))(\.\d+)?$/;
export const AMOUNT_REG_DECIMAL = /^(\d+)(\.\d{0,2})?$/;
