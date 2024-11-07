Page({
  data: {
    url: 'https://www.baidu.com'
  },

  onLoad() {
    // 获取位置信息
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: (res) => {
    //     const { latitude, longitude } = res;
    //     // 可以将位置信息通过 URL 参数传递给网页
    //     this.setData({
    //       url: `http://10.94.55.185:3000/`
    //     });
    //   },
    //   fail: (err) => {
    //     console.error('获取位置失败:', err);
    //     wx.showToast({
    //       title: '获取位置失败',
    //       icon: 'none'
    //     });
    //   }
    // });
  },

  onWebviewLoad() {
    console.log('网页加载成功');
  },

  onWebviewError(e) {
    console.error('网页加载失败:', e.detail);
    wx.showToast({
      title: '加载失败,请检查网络',
      icon: 'none'
    });
  }
}); 