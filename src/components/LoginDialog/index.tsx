/**
 * @module:  登录弹窗
 * @author Liang Huang
 * @date 2020-09-10 14:01:42
 */
import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { AtFloatLayout, AtIcon } from 'taro-ui';
import { View, Text, Button, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useInterval, useLocalStorage } from '@src/utils/hooks';
import store from '@src/store/index';
import utils from '@src/utils';
import { FETCH_STATUS, TOKEN, USER_INFO } from '@src/utils/constant';
import { showToast } from '@src/utils/package';
import './index.less';

const NormalDialog = observer(({ setDialogType, setLoginType }) => {
  return (
    <View className="login-dialog-normal">
      <View className="login-dialog-tbox">
        <Text className="login-dialog-txt">为更有效帮您管理数据，建议进行登录</Text>
      </View>
      <View>
        <Button
          className="login-dialog-button"
          onClick={() => {
            setDialogType(2);
            setLoginType(1);
          }}
        >
          手机号登录
        </Button>
      </View>
    </View>
  );
});

const PhoneDialog = observer(({ loginType, setDialogType }) => {
  const phoneRef = useRef<HTMLInputElement>();
  const { loginDialogUI, user } = store;
  // 输入符合手机号

  const nextStep = () => {
    if (!phoneRef.current) return;
    if (!phoneRef.current.value) {
      return showToast({
        title: '请输入手机号',
        icon: 'none'
      });
    }
    if (!utils.rule.isPhoneNum(phoneRef.current.value)) {
      return showToast({
        title: '输入手机号错误，请检查重新输入',
        icon: 'none'
      });
    }

    loginDialogUI.phoneValue = phoneRef.current.value;

    user.getVerifyCode(loginDialogUI.phoneValue).then(res => {
      if (+res.error_code === 0) {
        setDialogType(3);
      } else {
        showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    });
    // if(phoneRef.current && checkIsPhone()) {
    //   setDialogType(3)
    // }
  };

  return (
    <View>
      <View className="login-dialog-tbox">
        {loginType === 1 ? (
          <Text className="login-dialog-txt">未注册用户验证完毕后即可完成注册</Text>
        ) : (
          <Text className="login-dialog-txt">请输入手机号进行登录</Text>
        )}
      </View>
      <View>
        <Input
          ref={phoneRef}
          type="number"
          placeholderStyle="color:rgba(0,0,0,.25)"
          className="login-dialog-input black-85 font-size-16 login-input-phone"
          placeholder="请输入手机号"
          cursorSpacing={80}
        />
        <Button loading={user.fetching === FETCH_STATUS.Pending} className="login-dialog-button" onClick={nextStep}>
          获取验证码
        </Button>
      </View>
    </View>
  );
});

const VerifyDialog = observer(() => {
  const [countdown, setCountdown] = useState(60);
  const [setToken] = useLocalStorage(TOKEN, null);
  const [setUseInfo] = useLocalStorage(USER_INFO, null);
  const { user, loginDialogUI } = store;
  // const { setIsOpened } = props;
  const codeRef = useRef<HTMLInputElement>();

  useInterval(
    () => {
      setCountdown(countdown - 1);
    },
    countdown >= 0 ? 1000 : null
  );

  const resetCode = () => {
    if (countdown >= 0) return;
    user.getVerifyCode(loginDialogUI.phoneValue).then(res => {
      if (+res.error_code === 0) {
        setCountdown(60);
      } else {
        showToast({
          title: res.msg
        });
      }
    });
  };

  async function login() {
    if (!codeRef.current) return;
    if (!codeRef.current.value) {
      return showToast({ title: '请输入验证码', icon: 'none' });
    }
    const res = await user.login(codeRef.current.value, loginDialogUI.phoneValue);
    if (+res.error_code === 0) {
      const { loginDialogUI: loginDialogUIStore, user: userStore } = store;
      setToken(res.token);
      loginDialogUIStore.visible = false;
      Taro.showTabBar();
      // 这里token 转化为header头上的cookie
      // 登录成功后跳转到首页
      userStore.userinfoFetching = FETCH_STATUS.Pending;
      await user.getUserinfo();
      setUseInfo(user.userinfo);
      Taro.switchTab({
        url: '/pages/accountbook/index'
      });
      user.companysFetching = FETCH_STATUS.Pending;
    } else {
      showToast({ title: res.msg || '网络错误', icon: 'none' });
    }
  }

  return (
    <View>
      <View className="login-dialog-tbox">
        <Text className="login-dialog-txt">
          短信验证码已发送到：
          {`${loginDialogUI.phoneValue.slice(0, 3)}****${loginDialogUI.phoneValue.slice(7, 11)}`}
        </Text>
      </View>
      <View>
        <View className="login-dialog-input-box">
          <Input
            ref={codeRef}
            type="number"
            className="login-dialog-input"
            placeholder="请输入验证码"
            placeholderStyle="color:rgba(0,0,0,.25)"
            cursorSpacing={80}
          />
          <Text className="login-dialog-resend font-size-16" onClick={resetCode}>
            重发 {countdown > 0 ? `(${countdown})` : ''}
          </Text>
        </View>
        <Button loading={user.fetching === FETCH_STATUS.Pending} onClick={login} className="login-dialog-button">
          确定
        </Button>
      </View>
    </View>
  );
});

const LoginDialog = observer(() => {
  // 展示类型 1 默认 2 登录 3 验证手机号
  const [dialogType, setDialogType] = useState(1);
  // 1 手机号 2 云沃客账号
  const [loginType, setLoginType] = useState(-1);
  const { loginDialogUI } = store;
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (dialogType === 1) {
      setTitle('账号登录');
    } else if (dialogType === 2 && loginType === 2) {
      setTitle('登录');
    } else {
      setTitle('登录/注册');
    }
  }, [dialogType, loginType]);

  useEffect(() => {
    Taro.hideTabBar();
  }, []);

  return (
    <AtFloatLayout
      onClose={() => {
        Taro.showTabBar();
        loginDialogUI.visible = false;
      }}
      isOpened={loginDialogUI.visible}
      className="login-dialog"
    >
      <View className="at-row login-dialog-bar">
        {dialogType > 1 ? (
          <AtIcon
            className="login-dialog-back"
            value="chevron-left"
            size="22"
            onClick={() => {
              setDialogType(dialogType - 1);
            }}
          />
        ) : null}
        <View className="at-col login-title">{title}</View>
        <AtIcon
          className="login-close"
          value="close"
          size="22"
          onClick={() => {
            loginDialogUI.visible = false;
            Taro.showTabBar();
          }}
        />
      </View>
      <View className="login-dialog-content">
        {dialogType === 1 ? (
          <NormalDialog setDialogType={setDialogType} setLoginType={setLoginType} />
        ) : dialogType === 2 ? (
          <PhoneDialog loginType={loginType} setDialogType={setDialogType} />
        ) : (
          <VerifyDialog />
        )}
      </View>
    </AtFloatLayout>
  );
});

export default LoginDialog;
