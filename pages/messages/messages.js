// pages/messages/messages.js
const app = getApp();
const apiClient = require('../../utils/apiClient.js');
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
    let page = this;
    apiClient.get({
      path: 'interlocutors',
      success(res) {
        console.log("interlocutors", res.data.interlocutors)
        let _interlocutors = res.data.interlocutors
        page.setData({
          interlocutors: _interlocutors
        })
      }
    })
  
  },

  showConversation: function (e) {
    console.log("eeeee", e)
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/conversation/conversation?id=${id}`,
    })
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