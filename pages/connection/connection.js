// pages/connection/connection.js
const app = getApp()
const apiClient = require('../../utils/apiClient.js');
// const AV = require('../../../utils/av-weapp.min.js');
const AV = require('../../utils/av-weapp.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    console.log("options", options)
    let page = this;
    //console.log("this", this);
    // const user_id = wx.getStorageSync('userInfo').userId

    // Get user data from server (to show in form)
    let item_id = app.globalData.item_id
    apiClient.get({
      path: `items/${item_id}/connections/${options.id}`,
      success(res) {
        console.log("res", res)
        var _owner = res.data.connection.owner;
        page.setData({
          owner: _owner,
        });
        console.log("owner", page.data.owner)
      }
    })
    
    
  },

  calling: function(){
    
    wx.makePhoneCall({
      phoneNumber: `${this.data.owner.phoneNumber}`,
      success: function (res) {
        console.log("拨打电话成功！")
      },
      fail: function (res) {
        console.log("拨打电话失败！")
      },
      complete: function (res) { },
    })
    console.log("phoneNumber", phoneNumber)

  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})