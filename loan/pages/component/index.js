Page({
    data: {

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

    widgetsToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open;
            } else {
                list[i].open = false;
            }
        }
        this.setData({
            list: list
        });
    }
});
