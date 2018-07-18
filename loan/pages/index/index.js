// index.js
// 获取应用实例
var app = getApp()
Page( {
  data: {
    // 向模板传入数据
    // 轮播
    index_index_scroll_tmpl: {
      images: [
       '/image/2.jpg',
       '/image/1.jpg',
       '/image/3.jpg',
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1200
    },



    // nav


    // item
    index_index_items_tmpl: {
      items: [
        { image: '/image/a1.jpg'},
        { image: '/image/a2.jpg'},
        { image: '/image/a3.jpg'}
      ]
    }
  },

  // 事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  swiperchange: function(e) {
    // FIXME: 当前页码
    // console.log(e.detail.current)

  },

  onLoad: function() {
    console.log( 'onLoad' )
    var that = this
    // 调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      // 更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  },

  onShareAppMessage: function () {
    return {
      title: '南京平安普惠贷款',
      desc: '南京平安普惠贷款',
      path: "pages/index/index",
    }
  },


  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '12345678901',
    })
  },


  go: function(event) {
    wx.navigateTo({
      url: '../list/index?type=' + event.currentTarget.dataset.type
    })
  }
})
