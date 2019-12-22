var app = getApp()
const db = wx.cloud.database({});
Page({
  data: {
    openid: '',
    output: {}
  },
  onLoad: function () {
    var that = this;
    db.collection('fadanrecord').where({
      _openid: app.globalData.openid
    })
      .get({
        success: res => {
          this.setData({
            output: res.data
          })
        }
      })
  }
})