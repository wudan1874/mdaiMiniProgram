
const util = require('../../utils/util.js')

Page({
  data: {
    galleryImg: [],
    urls: [

    ],

  },
  onLoad: function (options) {
   
    var that = this, slug = options.slug;
    wx.showLoading({
      title: '数据加载中...',
    });
    wx.request({
      url: 'https://m.daiplanet.com/api/v2/pages/?type=blog.BlogPage&slug='+ slug + '&fields=blog_gallery_images',
      method: 'GET',
      success: function (res) {
        wx.hideLoading();

        const galleryImg = res.data.items[0].blog_gallery_images;
        that.setData({
          galleryImg: galleryImg
        })
        var galleryUrls = that.data.galleryImg;
        var imgurls = [];
        for (var i = 0; i < galleryUrls.length; i++) {
          var imgurl = 'https://m.daiplanet.com' + galleryUrls[i].image_show.url;
          imgurls.push(imgurl)
        }
        that.setData({
          urls: imgurls
        })

      },
      fail: function () {
        console.log('接口调用失败')
      }
    })
  },
  previewImage(e) {
    var current = e.target.dataset.current;
    var urls = this.data.urls;
    wx.previewImage({
      current: current,
      urls: urls,
      success: function () {
        
      },
      fail: function () {

      }
    })

  },
  onShareAppMessage: function () {

  }


})
