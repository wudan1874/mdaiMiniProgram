
var app = getApp();
// const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    imgurls: [
        'https://m.daiplanet.com/media/images/593439916534628247.original.jpg',
        'https://m.daiplanet.com/media/images/Ci_Sheng_Xiu_Xing_.original.jpg',
        'https://m.daiplanet.com/media/images/Wu_Xian_Ke_Neng__6hoDuJT.original.jpg',
        'https://m.daiplanet.com/media/images/Yi_Chong_Wei_Man__BiO2T5T.original.jpg',
        'https://m.daiplanet.com/media/images/Lun_Hui_Bian_Qian_.original.jpg'
   ],
    userInfo: {},
    entryMenu:[],
    
  },
  onLoad: function () {

    // wx.getStorage({
    //   key: 'token',
    //   success: function (res) {
      
    //     wx.request({
    //       url: 'https://api.villagenes.com/alsok/api/v2/token/verify',
    //       method: 'POST',
    //       data: {
    //         'token': res.data
    //       },
    //       success: function (result) {
           
    //         if (result.data.code == '1') {
              
    //           app.globalData.token = res.data;
    //           return;
    //           // 有效
    //         } else {
    //           // 登录
    //           wx.login({
    //             success: res => {
    //               // console.log(res)
    //               // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //               wx.getStorage({
    //                 key: 'loginData', success: function (response) {
    //                   wx.request({
    //                     //获取token
    //                     url: app.globalData.prehref + '/token/user',
    //                     data: {
    //                       'code': res.code,
    //                       'from': 'lite',
    //                       'data': response.data
    //                     },
    //                     method: 'POST',
    //                     success: function (result) {
                          
    //                       app.globalData.token = result.data.token;
    //                       // console.log(app.globalData.token)

    //                       wx.setStorageSync(
    //                         'token', result.data.token
    //                       )
    //                     }
    //                   })

    //                 }
    //               })

    //             }
    //           })
    //         }

    //       }
    //     })



    //   },
    //   fail: function (res) {
    //     // console.log(res)
    //     wx.login({
    //       success: res => {
    //         // console.log(res)
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //         wx.getStorage({
    //           key: 'loginData', success: function (response) {

    //             wx.request({
    //               //获取token
    //               url: app.globalData.prehref + '/token/user',
    //               data: {
    //                 'code': res.code,
    //                 'from': 'lite',
    //                 'data': response.data
    //               },
    //               method: 'POST',
    //               success: function (result) {
                   
    //                 app.globalData.token = result.data.token;
    //                 // console.log(app.globalData.token)

    //                 wx.setStorageSync(
    //                   'token', result.data.token
    //                 )
    //               }
    //             })

    //           }
    //         })

    //       }
    //     })
    //   }
    // })

   
 
    var that=this;
     wx.request({
       url: 'https://m.daiplanet.com/rest-api/MegaBlog/',
       method:'GET',
       success:function(res){
          
          that.setData({
            entryMenu: res.data
          })
       },
       fail: function () {
         console.log('接口调用失败')
       }
     })
  },
  onShareAppMessage: function () {

  }

})
