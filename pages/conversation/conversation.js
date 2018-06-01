// pages/conversation/conversation.js
const app = getApp();
const apiClient = require('../../utils/apiClient.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    let item_id = options.item_id;
    let user_id = options.user_id;
    apiClient.get({
      path: `conversations/${item_id}/${user_id}`,
      success(res) {
        console.log("conversation", res.data.messages)
        var _messages = res.data.messages;
        var _interlocutor = res.data.interlocutor
        var _item = res.data.item
        const response = wx.getStorageSync('userInfo');
        page.setData({ 
          messages: _messages,
          interlocutor: _interlocutor,
          item: _item,
          current_user_id: response.userId
           });
        console.log("messages", page.data.messages)
      }
    })
  },

  bindSubmit: function (e) {
    console.log("message to send", e.detail.value.content);
    let page = this;
    console.log("page data", page.data);
    // ** get values from form **//
    if (e.detail.value.content)
    {
    let content = e.detail.value.content;
    let user_id = page.data.interlocutor.id;
    let item_id = page.data.item.id
    let _message = {
      user_id: user_id,
      item_id: item_id,
      content: content
    };
    console.log("message", _message)
    apiClient.post({
      path: '/messages',
      data: {
        message: _message
      },
      success(res) {
        console.log("page messages!!!!!", page.data)
        console.log("res message", res.data.message)
        let _messages = page.data.messages
        _messages.push(res.data.message)
        page.setData({
          messages: _messages,
          messageContent: ''
        })
      }
    });
    }
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
