const config = require('core/config');
App({
  globalData: {
    openid: '',
    userInfo:null
  },
  //先序执行的函数
  onLaunch: function () {
    /**
     * 初始化userInfo
     */
    let userInfo = wx.getStorageSync('userInfo') || null
    if (userInfo != null) {
      this.globalData.userInfo = userInfo
    }
    let openid = wx.getStorageSync('openid') || null
    if(openid!=null){
      this.globalData.openid = openid
    }
    /**
     * 初始化云环境
     */
    wx.cloud.init({
      env: config.CloudID,
      traceUser: true
    })
    /**
     * @获取用户openid
     */
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'getOpenData'
      },
      success: r => {
        // console.log(r)
        let openid = r.result.openid
        wx.setStorageSync('openid', openid)
        this.globalData.openid = openid
      },
      fail: r => {
        console.log(r)
      }
    })
    
  }


})