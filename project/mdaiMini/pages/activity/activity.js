var app = getApp();

Page({
  data: {
    activityList: [
    ]
  },
  onLoad: function () {

    var that = this;

    wx.request({
      url: app.globalData.prehref + '/activity/list',
      method: 'GET',
      success: function (res) {

        that.setData({
          activityList: res.data
        })
      

      },
      fail: function (res) {
        console.log(res)
      }
    })

  },
  onShareAppMessage: function () {
  }
})

