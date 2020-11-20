export default {
  pages: [
    // tabs
    "pages/home/index",
    "pages/mine/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#8c8c8c",
    selectedColor: "#F87C27",
    position: "bottom",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "assets/icon-accountbook.png",
        selectedIconPath: "assets/icon-accountbook-selected.png",
      },
      {
        selectedIconPath: "assets/icon-mine-selected.png",
        text: "我的",
        pagePath: "pages/mine/index",
        iconPath: "assets/icon-mine.png"
      },
    ],
  },
};
