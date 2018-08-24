//logs.js
var app = getApp();
const util = require('../../utils/util.js')
Page({
  data: {
    userInfo:null,
    hotComment:[],
    selectImgs:[],
    imgId:[],
    commenttext:'',
    currentId:'',
    active:'../../static/icon/wx_app_liked.png',
    unactive:'../../static/icon/wx_app_like.png'
  },
  commentText:function(e){
    this.setData({
      commenttext: e.detail.value
    })
    
  },
  currentId:function(e){
    console.log(e.detail.currentId)
    this.setData({
      currentId: e.detail.currentId
    })
  },
  setAniation: function () {
    //定义动画
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })

    this.animationUp = animationUp
  },
  onLoad: function () {
    console.log(this.data.hotComment)
   
    var that=this;
    wx.getUserInfo({
      success: res => {
     
        that.setData({
          userInfo: res.userInfo,
        })
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
        
      }
    });

    // 获取热门评论
    wx.request({
      url: app.globalData.prehref+'/comment/list?page=1',
      method:'POST',
      data:{
        token:getApp().globalData.token
      },
      success:function(result){
        console.log(result.data)
         
          that.setData({
            hotComment:result.data
          })
      }
    })


    
  },
  chooseImage:function(e){
    var that = this, selectImgs;
    selectImgs = this.data.selectImgs;
   
    wx.chooseImage({
      count:1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        selectImgs = selectImgs.concat(tempFilePaths);

        
        wx.uploadFile({
          url: app.globalData.prehref +'/comment/upload_img',
          filePath: selectImgs[0],
          name: 'image',//这里根据自己的实际情况改
          formData: {
            'token': getApp().globalData.token
          },
          success: (resp) => {
            // success++;//图片上传成功，图片上传成功的变量+1 
            that.setData({
              currentId: resp.data
            })
           
           var length=that.data.imgId.length;
          
           that.data.imgId[length]=resp.data;
        
           that.setData({
             imgId: that.data.imgId
            })
          // console.log(id.concat(that.data.imgId))

          },
          fail: (res) => {
            // fail++;//图片上传失败，图片上传失败的变量+1
            console.log('fail:' + i + "fail:" + fail);
          },
          complete: () => {
          
          }
        });
        that.setData({
          selectImgs: selectImgs
        })  
      
      }
    })
    
  },
  uploadComment:function(){

    var imgId=this.data.imgId,ids=imgId.join(','),that=this;
    wx.request({
      url: app.globalData.prehref +'/comment/lite_add',
      data:{
        'token': getApp().globalData.token,
        'type': 'lite',
        'content': this.data.commenttext,
        'imgid': ids
      },
      method:'POST',
      success:function(res){
        that.setData({
          selectImgs:[],
          commenttext:'',
          id:''
        })
        wx.showToast({
            title: '评论成功',
            duration: 1000
          });  

       
        
      }
      
    })

  },
  previewImage(e) {
    var current = e.target.dataset.current;
    var urls = this.data.selectImgs;
    wx.previewImage({
      current: current,
      urls: urls,
      success: function () {
       
      },
      fail: function () {

      }
    })

  },
  commentpre(e) {
    var current = e.target.dataset.current, index = e.target.dataset.index,imgArr=[];
    for (var i = 0; i < index.length;i++){
      var length=index.length;
      imgArr[i]=index[i].url;
      
    }
    wx.previewImage({
      current: current,
      urls: imgArr,
      success: function (res) {
     
      },
      fail: function () {

      }
    })

  },
  delect:function (e){

    var selectImgs = this.data.selectImgs;
    var index = e.currentTarget.dataset.index;
    selectImgs.splice(index, 1);
    this.setData({
      selectImgs: selectImgs
    });

    var id = event.currentTarget.id;
    
    wx.request({
      url: app.globalData.prehref +'/comment//delImg/'+id,
      method: 'GET',
      success: function (res) {

        wx.showToast({
          title: '已删除',
          duration: 1000
        });

      }

    })
  },
  thumb: function (e) {

    let comid = e.currentTarget.dataset.id;
    var type;
    let tmp = this.data.hotComment.map(function (arr, index) {

      if (comid == arr.id) {
        if (arr.if_zan == '1') {//已经赞过

          arr.if_zan = '2';
          type = 'del',
            arr.zan--;
        } else {

          arr.if_zan = '1';
          arr.zan++;
          type = 'add';

        }
      }
      return arr;
    })

    wx.request({
      url: app.globalData.prehref + '/comment/zan',
      method: "POST",
      data: {
        'token': getApp().globalData.token,
        'id': comid,
        'type': type
      },
      success: function (res) {
        
      }
    })
    this.setData({ hotComment: tmp });
  },
  onShareAppMessage: function () {
  
  }
})
