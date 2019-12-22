var app = getApp()
const db = wx.cloud.database({});
Page({
  data: {
    openid: '',
    output: {}
  },
  onLoad:function(){
    console.log(app.globalData.openid)
    var that = this;
    db.collection('lists').where({
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