/**
 * @module:  空状态组件
 * @author Yun tang
 * @date 2020-09-17 10:50:50 
 */

import React from 'react';
import { View, Image, Text, Button } from '@tarojs/components';

import './style.less';

interface IProps {
  clickBtnFn?: () => void;
  mainText?: string;
  subText?: string;
  btnText?: string;
  imgUrl?: string;
  imgWidth?: number | string;
  imgHeight?: number | string;
  wrapHeight?: string;
  className?: string;
}

const NonePage = (props: IProps) => {
  const { className,clickBtnFn, mainText, subText, btnText, imgUrl = 'https://static.clouderwork.com/mini/img-none_data-e9a849081f.png', imgWidth = 228, imgHeight = 152, wrapHeight='100vh' } = props;

  return (
    <View className={`${className} nonePage`} style={{height: wrapHeight}}>
      <Image src={imgUrl} className='nonePage-img' style={{ width: imgWidth, height: imgHeight }} />
      {
        mainText ? <Text className='nonePage-noneMainText'>{mainText}</Text> : null
      }
      <Text className='nonePage-noneSubText'>{subText}</Text>
      {
        btnText ?
          <Button className='primary-btn' onClick={clickBtnFn}>{btnText}</Button>
          : null
      }
    </View>
  )
};

export default NonePage;