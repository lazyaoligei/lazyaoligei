var app = getApp()
const db = wx.cloud.database({});
Page({
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    output:{},
    nicknamevalue: ' ',
    requirevalue: ' ',
    paymentvalue: ' ',
    openid1:' ',
    notice:' ',
    notice2:' '
  },
  nickname: function (e) {
    this.setData({
      nicknamevalue: e.detail.value
    })
  },
  require: function (e) {
    this.setData({
      requirevalue: e.detail.value
    })
  },
  payment: function (e) {
    this.setData({
      paymentvalue: e.detail.value
    })
  },
  words:function(e){
    this.setData({
      notice:e.detail.value
    })
  },
  tap: function (e) {
    const db = wx.cloud.database();
    db.collection("lists").add({
      data: {
        output: {
          nickname: this.data.nicknamevalue,
          require: this.data.requirevalue,
          payment: this.data.paymentvalue,
        }
      },
      success: function () {
        wx.showToast({
          title: '订单已上路',
        })
      }
    })
  db.collection("fadanrecord").add({
      data: {
        output: {
          nickname: this.data.nicknamevalue,
          require: this.data.requirevalue,
          payment: this.data.paymentvalue,
        }
      },
      success: function () {
        wx.showToast({
          title: '订单已上路',
        })
      }
    })
  },
  ear: function (e) {
    const db = wx.cloud.database();
    db.collection("notice").add({
      data: {
        notice:this.data.notice
      },
      success: function () {
        wx.showToast({
          title: '小编听到你的声音啦',
        })
      }
    })
  },
  onLoad: function (options) {
    // 创建一个变量来保存页面page示例中的this, 方便后续使用
    var that = this;
    wx.cloud.callFunction({
      name: 'getOpenidya',
      data: '',
      success: res => {
        this.setData({
          openid: res.result.openid
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    db.collection('lists')
      .get({
        success: res => {
          this.setData({
            output: res.data
          })
        }
      })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    db.collection("notice").where({
      _openid:'oMCpL5Kg_wDAv9X8TQbQf7umKCbw'
    })
     .get({
      success: res => {
        this.setData({
          notice2: res.data[0].notice
        })
      }
    })
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  myinfor:function(){
    wx.navigateTo({
      url: '../jubao/jubao',
    })
  },
  myhelp: function () {
    wx.navigateTo({
      url: '../myhelp/myhelp',
    })
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  tttaaappp: function (res) {
    var id = res.currentTarget.dataset.id;
    var curId=' ';
   db.collection('lists') .get({
      success(res){
        var that = this;
        getApp().globalData.openid3 = res.data[id]._openid
              db.collection('jiedanrecord').add({
                data: {
                  outputnew: {
                    nickname: res.data[id].output.nickname,
                    require: res.data[id].output.require,
                    payment: res.data[id].output.payment,
                  }
                },
                success: res => {
                  wx.navigateTo({
                    url: '../information/information',
                  })
                  console.log(res.data[id]._openid);
                }
              })
            }
          })  
    db.collection('lists')
      .get({
        success: res => {
          console.log(res.data[id]._id)
          db.collection('lists').doc(res.data[id]._id)
            .remove({
              success: res => {
              }
            })
          }
        })
         wx.showToast({
          title: '接单成功啦',
        })
      },
  getOpenid: function () {
    var that = this;
    getApp().globalData.openid = this.data.openid
    wx.navigateTo({
      url: '../record/record',
    })
  },
  myhelp:function(){
wx.navigateTo({
  url: '../myhelp/myhelp',
})
  }
})