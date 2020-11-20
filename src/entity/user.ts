export interface IUserCompany {
  entityName: string;
  uuid: string;
  logo: string;
  is_superadmin: boolean; // 当前用户是否为该企业的超管:true-是, false-否
  verifyStatus: number; // 0未认证，1已认证
  checkStatus: number; // 0-未提交审核资料, 1-已提交待审核,2-审核成功,3-审核失败
  funcTemplate: number; // 行业功能模版。0未初始化；1，电商行业；2，IT_互联网行业；3，其他行业；
}

export interface IEcommerceList {
  code: string;
  logo: string;
  name: string;
  ecommerce: string;
}

export interface IOperator {
  avatar: string;
  cellphone: string;
  createdAt: string;
  name: string;
  role: string;
  role_id: number;
  update_at: string;
  uuid: string;
}