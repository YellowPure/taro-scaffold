/**
 * @module:  附带登录、绑定店铺和创建团队检测
 * @author Liang Huang
 * @date 2020-09-22 18:39:39
 */
import store from '@src/store';
import { FETCH_STATUS } from '@src/utils/constant';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import React, { Fragment, ReactNode } from 'react';
import { AtActivityIndicator } from 'taro-ui';
import NonePage from '../NonePage';
import './style.less';

const PageWithAuth = observer((props: { children?: ReactNode; [propName: string]: any }) => {
  const { children } = props;
  const { user, loginDialogUI } = store;
  const isLogin = !!user.userinfo;
  let option;

  if (user.fetching === FETCH_STATUS.Pending) {
    return (
      <View className="with-auth-page">
        <AtActivityIndicator color="#F76D1D" content="加载中..." mode="center" />
      </View>
    );
  }

  if (isLogin) {
    return <Fragment>{children}</Fragment>;
  }
  if (!isLogin) {
    option = {
      clickBtnFn: () => {
        loginDialogUI.visible = true;
      },
      mainText: '还没有注册/登录哦',
      subText: '请注册登录后再使用相关功能',
      btnText: '登录/注册',
      imgUrl: 'https://static.clouderwork.com/mini/img-not_login-c606d13286.png',
      imgWidth: 220,
      imgHeight: 140
    };
  }
  return <NonePage className="with-auth-page" {...option} />;
});

export default PageWithAuth;
