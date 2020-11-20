/**
 * @module: 自定义顶部标签
 * @author: Sjm
 * @date: 2020-09-18 11:06:24
 */

import React, { useState, ReactNode } from 'react';
import store from '@src/store/index';
import { View, Text, Image, Button, Block } from '@tarojs/components';
import './style.less';

interface ITabList {
  title: string;
  [propName: string]: any
}
interface IProps {
  current: number;
  className?: string;
  onClick?: (e:number) => void;
  tabList: ITabList[];
  rightAction?: ReactNode
}
const TabHeader = ( props: IProps) => {
  const { onClick, current, tabList, rightAction, className } = props

  return <View className={`ywk-tab-header ${rightAction ? 'with-right' : ''} ${ className? className: ''} `}>
    <View className='ywk-tab-header__list'>
      {tabList.map((tab, index) => <View className={`ywk-tab-header__item ${current === index ? 'active' : ''}`} key={tab.title} onClick={() => onClick && onClick(index)}>{tab.title}</View>)}
    </View>
    {rightAction}
  </View>
}

export default TabHeader;

