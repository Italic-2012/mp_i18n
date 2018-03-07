//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util');
const langData = require('./langData');

//读取默认语言
const lg = wx.getStorageSync('language');

Page({
  // 使用 Object.assign 补充翻译的 data
  data: Object.assign({}, langData.data, {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    lang: lg || 'zh_CN'
  }),

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 根据后台返回信息动态传参的内容的变化
  InChinese() {
    //此处简写
    this.setData({
      lg: 'zh_CN'
    })
  },

  InEnglish() {
    //此处简写
    this.setData({
      lg: 'en'
    })
  },

  onLoad: function () {
    // 代理小程序的 setData，在更新数据后，翻译传参类型的字符串
    util.resetSetData.call(this, langData)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
