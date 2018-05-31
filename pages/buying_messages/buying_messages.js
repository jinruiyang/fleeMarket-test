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
      path: 'conversations',
      success(res) {
        console.log("conversations", res.data.conversations)
        let _buying_conversations = res.data.buying_conversations
        let _selling_conversations = res.data.selling_conversations
        const response = wx.getStorageSync('userInfo');
        page.setData({
          buying_conversations: _buying_conversations,
          selling_conversations: _selling_conversations,
          current_user_id: response.userId
        })
      }
    })

  },

  showConversation: function (e) {
    console.log("eeeee", e)
    const item_id = e.currentTarget.dataset.item
    const user_id = e.currentTarget.dataset.interlocutor

    wx.navigateTo({
      url: `/pages/conversation/conversation?item_id=${item_id}&user_id=${user_id}`,
    })
  },

  showItem: function (e) {
    console.log("eeeee", e)
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/show/show?id=${id}`
    })
  },

  sellingMessages: function (e) {
    wx.navigateBack({
      delta: 1
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
    console.log("onshowwwwwwwwwwwwwww please update my data ")
    let page = this;
    apiClient.get({
      path: 'conversations',
      success(res) {
        console.log("conversations", res.data.conversations)
        let _buying_conversations = res.data.buying_conversations
        let _selling_conversations = res.data.selling_conversations
        const response = wx.getStorageSync('userInfo');
        page.setData({
          buying_conversations: _buying_conversations,
          selling_conversations: _selling_conversations,
          current_user_id: response.userId
        })
      }
    })
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