App({
  onLaunch() {
    // 小程序启动时执行
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res;
      }
    });
  },
  
  globalData: {
    systemInfo: null
  }
}); 