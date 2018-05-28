// pages/city-and-tag/city-and-tag.js
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
    console.log("city and tags", options);
    page.setData({
      city: options.city,
      tag: options.tag
    });
    apiClient.get({
      path: `items?city=${options.city}&tag=${options.tag}`,
      success(res) {
        const _items = res.data.items;
        //console.log("res.data", res.data.item)
        // Update local data
        page.setData({
          items: _items
        });
        console.log("items", page.data.items);
        wx.hideToast();
      }
    })  
  },

  showItem: function (e) {
    console.log("eeeee", e)
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
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