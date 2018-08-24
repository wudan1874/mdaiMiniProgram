//megaPage.js
const util = require('../../utils/util.js')

Page({
  data: {
    megaContent:[]
  },
  onLoad: function (options) {
    var id=options.id,that=this;
    wx.request({
      url: 'https://m.daiplanet.com/rest-api/MegaBlog/'+id,
      method:"GET",
      success:function (res){
       
        that.setData({
          megaContent: res.data
        })
      }
    })
  },
  onShareAppMessage: function () {

  }

})