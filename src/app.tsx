import React, { Component } from 'react'
import { Provider } from 'mobx-react'
// import counterStore from './store/counter'


// taro-ui
import 'taro-ui/dist/style/index.scss'
import "taro-ui/dist/style/components/divider.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/modal.scss";
import "taro-ui/dist/style/components/segmented-control.scss";

import store from './store/index';
import './app.less';

// const store = {
//   counterStore
// }

class App extends Component {
  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider {...store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
