// pages/edit-profile/edit-profile.js
// const app = getApp()
const apiClient = require('../../utils/apiClient.js');
console.log(222, apiClient)
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  bindSubmit: function (e) {
    // //collect data from form
    // let form_userInfo = e.detail.value
    // let id = this.data.id

    // //get that user with the id from globaldata
    // let users = getApp().globalData.users
    // let index = restaurants.findIndex(r => r.id == id)

    // // change restaurant with data collected from form
    // getApp().globalData.restaurants[index] = form_restaurant

    // // redirect to the index
    // wx.reLaunch({
    //   url: '/pages/profile/profile'
    // })
    let email = e.detail.value.email;
    let phoneNumber = e.detail.value.phoneNumber;
    // let id = this.data.id;
    // console.log(0, id)
    
    let userContact = {
      email: email,
      phoneNumber: phoneNumber
    }

    console.log(1, userContact)
    var userInfo = wx.getStorageSync('userInfo')
    // console.log(2, userInfo)
    var profile = Object.assign(userInfo, userContact)
    console.log(3, userInfo)

    // Update api data
    // let page = this;

    apiClient.put({
      path: '/profile',
      success(res) {
        res.data = profile;
        wx.setStorageSync('userInfo', res.data);
        wx.reLaunch({
          url: '/pages/profile/profile'
        });    
      }
    });
  },

    // wx.request({
    //   url: `https://flea-market.wogengapp.cn/api/v1/${id}/profile/`,
    //   method: 'PUT',
    //   data: profile,
    //   success() {
    //     // set data on index page and show
    //     wx.reLaunch({
    //       url: '/pages/profile/profile'
    //     });
    //   }
    // });

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //find the user id you want to load
    // const id = options.id

    // //get that user with the id from globaldata
    // const data = getApp().globalData.restaurants
    // const user = data.find(r => r.id == id)
    // //set this pages's data to that user
    // this.setData(userInfo)
    let page = this;


    // Get user data from server (to show in form)
    apiClient.get({
      path: '/profile',
      success(res) {
        var userInfo = res.data;

        page.setData(
          userInfo
        );
        console.log(222, userInfo)

      }
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