// pages/post/post.js
const app = getApp();
const cwx = require('cloudfile');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vis:false
  },
  postlistener(e){
    var that = this;
    //发布页面监听 Promise 文件上传
    /**
     * https://www.cnblogs.com/masterchd/p/14694358.html
     */
    this.setData({
      vis:true
    })
    let postdata = e.detail;
    console.log(postdata)
    let images = postdata.images;
    var promisetasks = []
    for(var i=0;i<images.length;i++){
      promisetasks.push(cwx.CloudUploadImage(images[i]))
    }
    let postimages = []
    Promise.all(promisetasks).then(resarr=>{
      console.log(resarr)
      resarr.forEach(function(ele,index){
        postimages.push(ele.fileID)
      })
      console.log(postimages)
      //具体处理写在如下
      let userInfo = app.globalData.userInfo || wx.getStorageSync('userInfo')
      wx.cloud.callFunction({
        name:'post',
        data:{
          action:'add',
          data:{
            content:postdata.content,
            location:postdata.location,
            postimages:postimages,
            userInfo
          }
        },
        success:r=>{
          console.log(r)
          this.setData({
            succMsg:'上传成功'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, 1500);
        },
        fail:r=>{
          console.log(r)
          this.setData({
            errMsg:r.errMsg
          })
        },
        complete:r=>{
          that.setData({
            vis:false
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})