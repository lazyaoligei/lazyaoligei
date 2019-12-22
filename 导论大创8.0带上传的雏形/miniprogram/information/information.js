var app = getApp()
const db = wx.cloud.database({});
Page({
  data: {
    openid3: '',
    information:''
  },
  onLoad: function () {
    console.log(app.globalData.openid3)
    var that = this;
    db.collection('users-information').where({
      _openid: app.globalData.openid3
    })
      .get({
        success: res => {
          console.log(res)
          this.setData({
            information: res
          })
        }
      })
  }
})