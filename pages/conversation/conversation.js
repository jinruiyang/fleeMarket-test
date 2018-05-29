// pages/conversation/conversation.js
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
    let user_id = options.id;
    apiClient.get({
      path: `conversation/${user_id}`,
      success(res) {
        console.log("conversation", res.data.messages)
        var _messages = res.data.messages;
        var _interlocutor = res.data.interlocutor
        page.setData({ 
          messages: _messages,
          interlocutor: _interlocutor
           });
      }
    })
  },

  bindSubmit: function (e) {
    console.log("message.send", e.detail.value.content);
    let page = this;
    console.log("interlocutor", page.data.interlocutor);
    // ** get values from form **//
    let content = e.detail.value.content;
    let user_id = page.data.interlocutor.id;
    console.log("interlocuter_id", user_id)
    let _message = {
      user_id: user_id,
      content: content
    };
    apiClient.post({
      path: '/messages',
      data: {
        message: _message
      },
      success(res) {
        console.log("res", res.data)
        let _messages = page.data.messages;
        _messages.push(res.data)
        page.setData({
          messages: _messages
        })
      }
    });
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