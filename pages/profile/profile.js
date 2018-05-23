// pages/profile/profile.js
const apiClient = require('../../utils/apiClient.js');
console.log(111, apiClient)
// const apiClient = {
//   get(options) {
//     BASE_URL = 'https://flea-market.wogengapp.cn/api/v1/';

//     wx.request({
//       url: BASE_URL + options.path,
//       header: {
//         'X-fleaMarket-Token': wx.getStorageSync('userInfo').authorizationToken
//       },
//       method: 'GET',
//       success: options.success
//     })
//   }
// }



// const app = getApp()
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
    // const user_id = wx.getStorageSync('userInfo').userId

    // Get user data from server (to show in form)
    apiClient.get({
      path: '/profile',
      success(res) {
        var userInfo = res.data;
        page.setData(
          userInfo
        );
        console.log(123, userInfo)

      }
    })
    // wx.request({
    //   header:{
    //     'X-fleaMarket-Token': wx.getStorageSync('userInfo').authorizationToken
    //   },
    //   url: `https://flea-market.wogengapp.cn/api/v1/profile/`,
    //   method: 'GET',
    //   success(res) {
    //     var userInfo = res.data;

    //     // Update local data
    //     page.setData(
    //       userInfo
    //     );
        // console.log(111, userInfo)

    //     wx.hideToast();
    //   }
    // });

  },

  editProfile: function(){
   
    wx.reLaunch({
      url: '/pages/edit-profile/edit-profile',
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