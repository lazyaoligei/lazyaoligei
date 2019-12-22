var app = getApp()
Page({
  data: {
    sexList: ['男', '女'],
    sexIndex: 0,//当前选择的性别0=男  1=女
    realName: '',
    weixin: '',
    tecent: '',
    mobile: '',
    password:'',
    introduction: '',
    data: {},
  },
  bindSexChange: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  realname: function (e) {
    this.setData({
      realname: e.detail.value
    })
  },
  weixin: function (e) {
    this.setData({
      weixin: e.detail.value
    })
  },
  tencent: function (e) {
    this.setData({
      tencent: e.detail.value
    })
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  introduction: function (e) {
    this.setData({
      introduction: e.detail.value
    })
  },
  tap: function (e) {
    const db = wx.cloud.database();
    db.collection("users-information").add({
      data: {
          realname: this.data.realname,
          sex: this.data.sexIndex,
          weixin: this.data.weixin,
          tecent: this.data.tecent,
          mobile: this.data.mobile,
          password:this.data.password,
          introduction: this.data.introduction
      },
      success: function () {
        wx.showToast({
          title: '注册成功啦',

        })
      }
    })
    wx.navigateTo({
      url: '../welcomepage/welcome'
    })
  },
})