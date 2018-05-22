// pages/profile/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    let page = this;


    // Get user data from server (to show in form)
    wx.request({
      url: `https://flea-market.wogengapp.cn/api/v1/${e.id}/profile/`,
      method: 'GET',
      success(res) {
        var userInfo = res.data;

        // Update local data
        page.setData(
          userInfo
        );

        wx.hideToast();
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