import React, { ReactNode, Component } from 'react';
import _isFunction from 'lodash/isFunction';
import Taro, {  } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { getSystemInfo } from '@src/utils/utils'
import './style.scss';



let globalSystemInfo = getSystemInfo();
class NavBar extends Component<{
  /**
   * 在 back 为 true 时，点击 back 按钮触发此事件，detail 包含 delta
   */
  onBack?: () => void,
  /**
   * 返回的页面数，如果 delta 大于现有页面数，则返回到首页
   */
  delta?: number,
  onHome?: () => void,
  onSearch?: () => void,
  /**
   * 是否显示返回按钮，默认点击按钮会执行 navigateBack，如果为 false，则名为 renderLeft 的 slot 有效
   */
  back?: boolean,
  /**
   * 是否显示 home 按钮，执行方法自定义
   */
  home?: boolean,
  /**
   * 导航字体颜色
   */
  color?: string,
  /**
   * 导航标题，如果不提供，则名为 renderCenter 的 slot 有效
   */
  title?: string,
  /**
   * 导航背景色
   */
  background?: string,
  /**
   * 导航下拉背景色,默认取 background 的颜色,不理解见 https://github.com/lingxiaoyi/Taro-navigation-bar/issues/15
   */
  backgroundColorTop?: string,
  /**
   * 主题图标和字体颜色,当背景色为深色时,可以设置'white'
   */
  iconTheme?: string,
  /**
   * 搜索框文字
   */
  searchText?: string,
  /**
   * 是否显示搜索框，默认点击按钮会执行 onSearch，如果为 false，则名为 renderCenter 的 slot 有效
   */
  searchBar?: boolean,
  /**
   * 添加在组件内部结构的 class，可用于修改组件内部的样式
   */
  extClass?: string,
  /**
   * 标题 slot，在标题位置显示，当 searchBar 为 false title 为空的时候有效
   */
  renderCenter?: ReactNode,
  /**
   * 左侧 slot，在 back 按钮位置显示，当 back 为 false 的时候有效
   */
  renderLeft?: ReactNode,
  /**
   * 在导航的右侧显示
   */
  renderRight?: ReactNode,
}, any> {

  static defaultProps = {
    extClass: '',
    background: 'rgba(255,255,255,1)', //导航栏背景
    color: '#000000',
    title: '',
    searchText: '点我搜索',
    searchBar: false,
    back: false,
    home: false,
    iconTheme: 'black',
    delta: 1
  };



  constructor(props) {
    super(props);
    this.state = {
      configStyle: this.setStyle(globalSystemInfo)
    };
  }

  state: any = {};

  static options = {
    multipleSlots: true,
    addGlobalClass: true
  };
  componentDidShow() {
    if (globalSystemInfo.ios) {
      globalSystemInfo = getSystemInfo();
      this.setState({
        configStyle: this.setStyle(globalSystemInfo)
      });
    }
  }
  handleBackClick() {
    if (_isFunction(this.props.onBack)) {
      this.props.onBack();
    } else {
      const pages = Taro.getCurrentPages();
      if (pages.length >= 2) {
        Taro.navigateBack({
          delta: this.props.delta
        });
      }
    }
  }
  handleGoHomeClick() {
    if (_isFunction(this.props.onHome)) {
      this.props.onHome();
    }
  }
  handleSearchClick() {
    if (_isFunction(this.props.onSearch)) {
      this.props.onSearch();
    }
  }


  setStyle(systemInfo) {
    const { statusBarHeight, navBarHeight, capsulePosition, navBarExtendHeight, ios, windowWidth } = systemInfo;
    const { back, home, title, color } = this.props;
    let rightDistance = windowWidth - capsulePosition.right; //胶囊按钮右侧到屏幕右侧的边距
    let leftWidth = windowWidth - capsulePosition.left; //胶囊按钮左侧到屏幕右侧的边距

    let navigationbarinnerStyle = [
      `color:${color}`,
      //`background:${background}`,
      `height:${navBarHeight + navBarExtendHeight}px`,
      `padding-top:${statusBarHeight}px`,
      `padding-right:${leftWidth}px`,
      `padding-bottom:${navBarExtendHeight}px`
    ].join(';');
    let navBarLeft: string = '';
    if ((back && !home) || (!back && home)) {
      navBarLeft = [
        `width:${capsulePosition.width}px`,
        `height:${capsulePosition.height}px`,
        `margin-left:0px`,
        `margin-right:${rightDistance}px`
      ].join(';');
    } else if ((back && home) || title) {
      navBarLeft = [
        `width:${capsulePosition.width}px`,
        `height:${capsulePosition.height}px`,
        `margin-left:${rightDistance}px`
      ].join(';');
    } else {
      navBarLeft = [`width:auto`, `margin-left:0px`].join(';');
    }
    return {
      navigationbarinnerStyle,
      navBarLeft,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      rightDistance
    };
  }

  render() {
    const {
      navigationbarinnerStyle,
      navBarLeft,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      rightDistance
    } = this.state.configStyle;
    const {
      title,
      background,
      backgroundColorTop,
      back,
      home,
      searchBar,
      searchText,
      iconTheme,
      extClass
    } = this.props;
    let nav_bar__center: ReactNode = null;
    if (title) {
      nav_bar__center = <text>{title}</text>;
    } else if (searchBar) {
      nav_bar__center = (
        <View
          className='lxy-nav-bar-search'
          style={`height:${capsulePosition.height}px;`}
          onClick={this.handleSearchClick.bind(this)}
        >
          <View className='lxy-nav-bar-search__icon' />
          <View className='lxy-nav-bar-search__input'>{searchText}</View>
        </View>
      );
    } else {
      /* eslint-disable */
      nav_bar__center = this.props.renderCenter;
      /* eslint-enable */
    }
    return (
      <View
        className={`lxy-nav-bar ${ios ? 'ios' : 'android'} ${extClass}`}
        style={`background: ${backgroundColorTop ? backgroundColorTop : background};height:${navBarHeight +
          navBarExtendHeight}px;`}
      >
        <View
          className={`lxy-nav-bar__placeholder ${ios ? 'ios' : 'android'}`}
          style={`padding-top: ${navBarHeight + navBarExtendHeight}px;`}
        />
        <View
          className={`lxy-nav-bar__inner ${ios ? 'ios' : 'android'}`}
          style={`background:${background};${navigationbarinnerStyle};`}
        >
          <View className='lxy-nav-bar__left' style={navBarLeft}>
            {back && !home && (
              <View
                onClick={this.handleBackClick.bind(this)}
                className={`lxy-nav-bar__button lxy-nav-bar__btn_goback ${iconTheme}`}
              />
            )}
            {!back && home && (
              <View
                onClick={this.handleGoHomeClick.bind(this)}
                className={`lxy-nav-bar__button lxy-nav-bar__btn_gohome ${iconTheme}`}
              />
            )}
            {back && home && (
              <View className={`lxy-nav-bar__buttons ${ios ? 'ios' : 'android'}`}>
                <View
                  onClick={this.handleBackClick.bind(this)}
                  className={`lxy-nav-bar__button lxy-nav-bar__btn_goback ${iconTheme}`}
                />
                <View
                  onClick={this.handleGoHomeClick.bind(this)}
                  className={`lxy-nav-bar__button lxy-nav-bar__btn_gohome ${iconTheme}}`}
                />
              </View>
            )}
            {!back && !home && this.props.renderLeft}
          </View>
          <View className='lxy-nav-bar__center' style={`padding-left: ${rightDistance}px`}>
            {nav_bar__center}
          </View>
          <View className='lxy-nav-bar__right' style={`margin-right: ${rightDistance}px`}>
            {this.props.renderRight}
          </View>
        </View>
      </View>
    );
  }
}

export default NavBar;