const app = getApp()
const apiClient = require('../../utils/apiClient.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  open: function () {
    let page = this;
    wx.showActionSheet({
      itemList: ['Chengdu', 'Shanghai', 'Beijing'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          let cityList = ['Chengdu', 'Shanghai', 'Beijing']
          let index = res.tapIndex
          page.setData({
            city: cityList[index]
          })
          console.log("city", page.data.city)
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    page.setData({
      city: "Chengdu"
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