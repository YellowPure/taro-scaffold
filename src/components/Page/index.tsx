/**
 * @module:  页面组件
 * @description 包裹custom navbar 防止navbar出现滚动条
 * @author Liang Huang
 * @date 2020-09-15 17:04:16
 */
import store from '@src/store';
import React, { CSSProperties, ReactNode, useState } from 'react'
import { View } from '@tarojs/components';
import { observer } from 'mobx-react'
import { useDidHide, useDidShow } from '@tarojs/taro'

import { getSystemInfo } from '@src/utils/utils'
import LoginDialog from '../LoginDialog';

interface IProps {
  style?: CSSProperties,
  className?: string,
  children?: ReactNode
}

let {
  navBarHeight,
  navBarExtendHeight,
} = getSystemInfo();

const Page = observer((props: IProps) => {
  const { style, className, children } = props;
  const { loginDialogUI } = store;

  return <View
    className={className}
    style={{ height: '100vh', overflow: 'hidden', paddingTop: `${navBarHeight + navBarExtendHeight}px`, ...style }}
  >{children}
   {loginDialogUI.visible && <LoginDialog />}
  </View>
})

export default Page;