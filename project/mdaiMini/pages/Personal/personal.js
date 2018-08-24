
const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    cache: [
      { iconurl: '../../static/icon/wx_app_clear.png', title: '缓存清理', tap: 'clearCache' }
    ],
    device: [
      { iconurl: '../../static/icon/wx_app_cellphone.png', title: '系统信息', tap: 'showSystemInfo' },
      { iconurl: '../../static/icon/wx_app_network.png', title: '网络状态', tap: 'showNetWork' },
    
    ],
    compassVal: 0,
    compassHidden: true,
    shakeInfo: {
      gravityModalHidden: true,
      num: 0,
      enabled: false
    },
    shakeData: {
      x: 0,
      y: 0,
      z: 0
    },
  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  //显示模态窗口
  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },

  // 缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },

  //显示系统信息
  showSystemInfo: function () {
    wx.navigateTo({
      url: 'device/device'
    });
  },

  //网络状态
  showNetWork: function () {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType
        that.showModal('网络状态', '您当前的网络：' + networkType);
      }
    })
  },
  //显示罗盘
  showCompass: function () {
    var that = this;
    this.setData({
      compassHidden: false
    })
    wx.onCompassChange(function (res) {
      console.log(res)
      if (!that.data.compassHidden) {
        that.setData({ compassVal: res.direction.toFixed(2) });
      }
    });
  },

  

})
