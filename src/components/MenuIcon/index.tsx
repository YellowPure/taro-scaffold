/**
 * @module:
 * @author Liang Huang
 * @date 2020-10-17 16:03:13
 */
import React from 'react';
import { observer } from 'mobx-react';
import { View, Image } from '@tarojs/components';
import store from '@src/store';
import { TOKEN } from '@src/utils/constant';
import Taro from '@tarojs/taro';
import { showToast } from '@src/utils/package';
import './style.less';

const MenuIcon = observer(
  ({ text, link, icon, disabled }: { text: string; link: string; icon: string; disabled?: boolean }) => {
    function checkLogin() {
      let token = Taro.getStorageSync(TOKEN);
      if (token) {
        token = JSON.parse(token);
        return true;
      } else {
        const { loginDialogUI } = store;
        loginDialogUI.visible = true;
        return false;
      }
    }
    function clickMenuItem(_link) {
      if (disabled)
        return showToast({
          title: '暂未上线'
        });
      if (checkLogin()) {
        Taro.navigateTo({ url: _link });
      }
    }

    return (
      <View key={text} className="menu__item" onClick={() => clickMenuItem(link)}>
        <Image className="menu__item__icon" src={icon} />
        <View className="menu__item__text">{text}</View>
      </View>
    );
  }
);
export default MenuIcon;
