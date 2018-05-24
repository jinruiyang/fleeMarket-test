// pages/profile/profile.js
const app = getApp();
const apiClient = require('../../utils/apiClient.js');
console.log(111, apiClient)

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
    console.log(666666, "onLoad Profile.js")
    let page = this;
    //console.log("this", this);
    // const user_id = wx.getStorageSync('userInfo').userId

    // Get user data from server (to show in form)
    apiClient.get({
      path: 'profile',
      success(res) {
        console.log(333333,res.data)
        var _profile = res.data.profile;
        // var storage = wx.getStorageSync(key)
        // save profile at this.data.profile
        page.setData({ profile: _profile });
        app.globalData.profile = _profile;
        console.log("globaldata.profile", app.globalData.profile);
        //console.log(123, page.data)

      }
    }),

      apiClient.get({
        path: 'my_items',
        success(res) {
          //console.log(44444686, res.data.items)
          var _my_items = res.data.items;
          // // var storage = wx.getStorageSync(key)
          // // save profile at this.data.profile
          page.setData({ my_items: _my_items });

          //console.log(444, page.data)

        }
      }) 

  },

  editProfile: function(){
   
    wx.reLaunch({
      url: '/pages/edit-profile/edit-profile',
    })

  },
  //* Navabar Function*//

  goHome: function (e) {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  goAdd: function (e) {
    wx.reLaunch({
      url: '/pages/add/add'
    })
  },
  goProfile: function (e) {
    wx.reLaunch({
      url: '/pages/profile/profile'
    })
  }

  //* Navabar Function*//

      
})