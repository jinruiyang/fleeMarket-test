const app = getApp();
const apiClient = require('../../utils/apiClient.js');
console.log(111, apiClient)
Page({
  onLoad: function (optiones) {
    console.log(666666, "onLoad Profile.js")
    let page = this;
    //console.log("this", this);
    // const user_id = wx.getStorageSync('userInfo').userId

    // Get user data from server (to show in form)
    apiClient.get({
      path: 'items',
      success(res) {
        console.log(333333, res.data.items)
        var _items = res.data.items;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({ items: _items });

        console.log(123, page.data)

      }
    })

  },

  showItem: function (e) {
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    
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