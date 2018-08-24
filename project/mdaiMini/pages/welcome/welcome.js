
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  goToIndex: function () {
  
  },
  onLoad: function () {

   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }




  },
  getUserInfo: function (e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  //  wx.getStorage({
  //    key: 'token',
  //    success: function(res) {
  //     //  console.log(res);
  //      if (res.data == '') {
  //        console.log('token ==null')
  //        wx.setStorageSync('loginData', {
  //          iv: e.detail.iv,
  //          encryptedData: e.detail.encryptedData,
  //        })
  //        return;
  //      }else{

  //        wx.request({
  //          url: 'https://api.villagenes.com/alsok/api/v2/token/verify',
  //          method: 'POST',
  //          data: {
  //            'token': res.data
  //          },
  //          success: function (result) {
  //            //非首次授权
  //            if (result.data.code == '1') {
  //              // console.log('token有效', res.data);
  //              app.globalData.token = res.data;
  //              return;
  //              // 有效
  //            } else {
  //              // console.log('token wu效')
  //              wx.setStorageSync('loginData', {
  //                iv: e.detail.iv,
  //                encryptedData: e.detail.encryptedData,
  //              })
  //            }

  //          }
  //        })

  //      }
   


      
  //    },
  //    fail:function (res){
  //     // 首次授权
  //     wx.setStorageSync('loginData', {
  //       iv: e.detail.iv,
  //       encryptedData: e.detail.encryptedData,
  //     })
  //     return;
  //    }
  //  })
      
    setTimeout(function (){
      wx.reLaunch({
        url: '../index/index'
      })
    },1200)
   
    

  }

})