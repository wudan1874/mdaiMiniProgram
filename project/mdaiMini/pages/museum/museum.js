//museum.js
const util = require('../../utils/util.js')

Page({
  data: {
    megaList:[],
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://m.daiplanet.com/rest-api/MegaBlog/',
      method: 'GET',
      success: function (res) {
        // console.log(res.data)

        that.setData({
          megaList: res.data
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