Page({
  data:{
    jubao:'',
    nickname:[]
  },
  words: function (e) {
    this.setData({
     jubao: e.detail.value
    })
  },
  yijian: function (e) {
    const db = wx.cloud.database();
    db.collection("weigui").add({
      data: {
       nickname:this.data.jubao
      },
      success: function () {
        wx.showToast({
          title: '天降正义已就绪',
        })
      }
    })
  },
  onLoad: function (options) {
    // 创建一个变量来保存页面page示例中的this, 方便后续使用
    var that = this;
    const db = wx.cloud.database();
    db.collection('weigui')
      .get({
        success: res => {
          this.setData({
            nickname: res.data
           })
          }
      })
  }
})