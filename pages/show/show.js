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

  onShow: function (options) {
    let page = this;
    console.log("current user id again", page.data.current_user_id)
  },

  showImage: function(e) {
    console.log(66666666, e)
    let page = this;
    let id = e.currentTarget.id
    let images = []
    page.data.movies.forEach(function(e) {
      images.push(e.url)
    })
    console.log(777777, images)
    wx.previewImage({ // 当前显示图片的http链接
      current: page.data.movies[id].url,
      urls: images // 需要预览的图片http链接列表 
    })

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
        var movies = []
        res.data.item.detail_images.forEach(function(e){
          movies.push({url:e.url})
        })
        const _items_same_owner = _item.items_from_the_same_owner.filter(function (i) { return i.id !== _item.id; })
        const response = wx.getStorageSync('userInfo');
        if (response) {
          page.setData({
            item: _item,
            movies: movies,
            tags: _item.tag_list,
            items_same_owner: _items_same_owner,
            current_user_id: response.userId
          });          
        } else {
          page.setData({
            item: _item,
            movies: movies,
            tags: _item.tag_list,
            items_same_owner: _items_same_owner
          });
        }
        // console.log("movies", page.data.movies)
        // console.log("item", page.data.item)
        // console.log("items same owner", page.data.items_same_owner)
        wx.hideToast();
      }
    });

    

  },

  showConversation: function (e) {
    console.log("show page conversation parameters", e)
    const item_id = e.currentTarget.dataset.item
    const user_id = e.currentTarget.dataset.interlocutor

    wx.navigateTo({
      url: `/pages/conversation/conversation?item_id=${item_id}&user_id=${user_id}`,
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
    app.globalData.tag = tag
    wx.switchTab({
      url: '/pages/index/index'
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