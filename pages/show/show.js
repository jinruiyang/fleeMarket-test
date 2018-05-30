// pages/show/show.js
const app = getApp()
const apiClient = require('../../utils/apiClient.js');
// const AV = require('../../../utils/av-weapp.min.js');
const AV = require('../../utils/av-weapp.min.js');

console.log(111, apiClient)
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onShareAppMessage() {

  },

  onLoad: function (options) {
    console.log("id", options.id)
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
        console.log("item", page.data.item);
        wx.hideToast();
      }
    });

    

  },

  showConversation: function (e) {
    console.log("other user's id", e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/conversation/conversation?id=${id}`,
    })
  },

  showConnection: function (e) {

    let page = this

    console.log("e", e)

    const item_id = e.currentTarget.dataset.id
    app.globalData.item_id = item_id
    console.log("item_id", e.currentTarget.dataset.id)

    apiClient.post({
      path:`items/${item_id}/connections`,
      success(res) {
        console.log("res", res)
        page.setData ({
          owner_id: res.data.connection.owner.id,
          connection_id: res.data.connection.id
        });
        console.log("owner-id", page.data.owner_id)
        console.log("connection-id", page.data.connection_id)
        const id = page.data.connection_id
        console.log("id", id)

        wx.navigateTo({
          url: `/pages/connection/connection?id=${id}`,
        })
      }
    });
    
  },

  showItem: function (e) {
    console.log("eeeee", e)
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/show/show?id=${id}`
    })
  },

  tagged: function (e) {
    const tag = e.currentTarget.dataset.tag
    console.log("tag", tag)
    console.log(`/pages/index/index?tag=${tag}`);
    wx.navigateTo({
      url: `/pages/tagged/tagged?tag=${tag}`
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `This ${this.data.item.title} is for sale. Click on the picture to take a look!`,
      path: `/pages/show/show?id=${this.data.item.id}`,
      imageURL: this.data.item.cover_image
    }
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