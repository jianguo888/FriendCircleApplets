// components/wxcard/index.js
const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      observer:function(newVal,oldVal){
        // console.log(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    openid:'',
    liked:false,
    showbar:false,
    vis:false,
    //喜欢列表
    likeList:[],
    //评论列表
    commentList:[]
  },
  lifetimes:{
    attached(){
      this.setData({
        openid:app.globalData.openid
      })
      //请求并获取喜欢列表
      this.reqLikeList();
      //请求并获取评论列表
      this.reqCommentList();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    deletecomment(e){
      var that = this;
      /**
       * 长按删除
       */
      let docid = e.currentTarget.dataset.idx;
      let openid = e.currentTarget.dataset.openid;
      let myopenid = app.globalData.openid || wx.getStorageSync('openid')
      if(myopenid!=openid){
        return
      }
      /**
       * 相等判断是否删除
       */
      wx.showModal({
        title:'提醒',
        content:'是否删除该评论',
        success:r=>{
          if(r.confirm){
            /**
             * 删除
             */
            wx.cloud.callFunction({
              name:'comment',
              data:{
                action:'delete',
                docid:docid
              },
              success:res=>{
                this.reqCommentList();
              }
            })
          }
        }
      })
    },
    delit(e){
      let docid = e.currentTarget.dataset.idx;
      wx.showModal({
        title:'提醒',
        content:'是否要删除该条朋友圈',
        success:r=>{
          if(r.confirm){
            this.setData({
              vis:true
            })
            wx.cloud.callFunction({
              name:'post',
              data:{
                action:'delete',
                docid:docid
              },
              success:res=>{
                this.triggerEvent('deletepost',docid)
              },
              fail:res=>{

              },
              complete:res=>{
                this.setData({
                  vis:false
                })
              }
            })
          }
        }
      })
    },
    flushComment(postid){
      if(postid==this.properties.item._id){
        this.reqCommentList();
      }
    },
    huifu(e){
      let replyuserInfo = e.currentTarget.dataset.replyitem;
      this.triggerEvent('baraction',{
        postid:this.properties.item._id,
        replyuserInfo
      })
    },
    showImg(e) {
      let imgidx = e.target.dataset.imgidx;
      let imgArr = this.properties.item.postimages
      wx.previewImage({
        current: imgArr[imgidx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      })
    },
    reqCommentList(){
      let postid = this.properties.item._id;
      wx.cloud.callFunction({
        name:'comment',
        data:{
          action:'query',
          data:{
            postid:postid
          }
        },
        success:r=>{
          let commentlist = r.result.data
          this.setData({
            commentList:commentlist
          })
        }
      })
    },
    cancellike(){
      /**
       * 取消喜欢
       */
      wx.cloud.callFunction({
        name:'like',
        data:{
          action:'delete',
          data:{
            postid:this.properties.item._id
          }
        },
        success:r=>{
          console.log(r)
          this.reqLikeList();
        }
      })
    },
    reqLikeList(){
      let postid = this.properties.item._id;
      // console.log(postid)
      wx.cloud.callFunction({
        name:'like',
        data:{
          action:'query',
          data:{
            postid:postid
          }
        },
        success:r=>{
          // console.log(r.result.data)
          let likelist = r.result.data
          let liked = false
          /**
           * 是否已经配置过喜欢
           */
          for(var i=0;i<likelist.length;i++){
            if(likelist[i].openid == this.data.openid){
              liked = true
            }
          }
          this.setData({
            likeList:likelist,
            liked
          })
        }
      })
    },
    openActionBar(){
      this.setData({
        showbar:true
      })
    },
    pinglun(){
      console.log('点击评论')
      this.triggerEvent('baraction',{
        postid:this.properties.item._id,
        replyuserInfo:null
      })
    },
    ilike(){
      let openid = app.globalData.openid || wx.getStorageSync('openid')
      let userInfo = app.globalData.userInfo || wx.getStorageSync('userInfo')
      this.setData({
        vis:true
      })
      wx.cloud.callFunction({
        name:'like',
        data:{
          action:'add',
          data:{
            openid,
            postid:this.properties.item._id,
            userInfo
          }
        },
        success:r=>{
          console.log(r.result)
          this.reqLikeList();
        },
        fail:r=>{
          console.log(r)
        },
        complete:r=>{
          this.setData({
            vis:false
          })
          this.closeActionBar()
        }
      })
    },

    closeActionBar(){
      this.setData({
        showbar:false
      })
    }
  }
})
