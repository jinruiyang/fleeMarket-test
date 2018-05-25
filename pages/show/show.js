// pages/show/show.js
const app = getApp()
const apiClient = require('../../utils/apiClient.js');
console.log(111, apiClient)
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
    // //find the restaurant id you want to load
    // const id = options.id

    // //get that restaurant with the id from globaldata
    // const data = getApp().globalData.restaurants
    // const restaurant = data.find(r => r.id == id)
    // //set this pages's data to that restaurant
    // this.setData(restaurant)

    let page = this;

    // Get api data
    apiClient.get({
      path: `items/${options.id}`,
      success(res) {
        const _item = res.data.item;
        //console.log("res.data", res.data.item)
        // Update local data
        const _items_same_owner = _item.items_from_the_same_owner.filter(function (i) { return i.id !== _item.id; })
        page.setData({
          item: _item,
          tags: _item.tag_list,
          items_same_owner: _items_same_owner
        });
        console.log("items same owner", page.data.items_same_owner);
        wx.hideToast();
      }
    });

    

  },

  tagged: function (e) {
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/tagged/tagged?tag=${id}`,
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