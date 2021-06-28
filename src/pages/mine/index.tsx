import React from 'react';
import { observer } from 'mobx-react';
import { View } from '@tarojs/components';
import NavBar from '@src/components/NavBar';
import Page from '@src/components/Page';
import PageWithAuth from '@src/components/PageWithAuth';
import './style.less';

const Mine = observer(() => {
  return (
    <Page>
      <NavBar extClass="mine-bar" title="我的" color="#fff" background="#F76D1D" />
      <PageWithAuth>
        <View className="mine">mine</View>
      </PageWithAuth>
    </Page>
  );
});

export default Mine;
