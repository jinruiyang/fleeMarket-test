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
    
    let email = e.detail.value.email;
    let phoneNumber = e.detail.value.phoneNumber;
  
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

    apiClient.put({
      path: 'profile',
      data: {
        userContact: userContact
      },
      success(res) {
        // res.data = profile;
        console.log(111111111,res.data.profile)
        wx.setStorageSync('userInfo', res.data.profile);
        wx.reLaunch({
          url: '/pages/profile/profile'
        });    
      }
    });
  },

  onLoad: function (options) {
    let page = this;


    // Get user data from server (to show in form)
    apiClient.get({
      path: '/profile',
      success(res) {
        var userInfo = res.data.profile;
        console.log(5435435, res.data)
      
        page.setData({
      profile: userInfo
});
        console.log(5453534, page.data)

      }
    })

  }
})