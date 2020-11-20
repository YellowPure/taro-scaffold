import React, { Component } from "react";
import { View} from "@tarojs/components";
import { observer } from 'mobx-react'
import Page from "@src/components/Page";
import "./style.less";


@observer
class Home extends Component {
  state = {
  }
  componentDidMount() {
  }

  componentDidShow() {
  }

  render() {
    return (
      <Page style={{paddingTop: 0, backgroundColor: '#f5f5f5'}}>
        <View className='home' >
          home
        </View>
      </Page>
    );
  }

};

export default Home;
