// index.js
// 获取应用实例
var app = getApp()
Page( {

  // 事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },


  teltoUs: function () {
    wx.makePhoneCall({
      phoneNumber: '123456789011' // 仅为示例，并非真实的电话号码
    })
  },
  onShareAppMessage: function () {
    return {
      title: '南京平安普惠贷款',
      desc: '南京平安普惠贷款',
      path: "pages/index/index",
    }
  },

  onLoad: function() {
    var that = this
    // 调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      // 更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  }
})
