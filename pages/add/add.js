// pages/add/add.js
const apiClient = require('../../utils/apiClient.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //** Uploda Cover Image **//
  uploadImages: function () {
    let that = this
    
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({ imagePaths : tempFilePaths})
      }
    })
  },
  //** Uploda Cover Image **//

  //** Add Item funciton **//
  addItem: function (e) {
    console.log(3423423,this.data)
    
    // ** get values from form **//
    let title = e.detail.value.title;
    let condition = e.detail.value.condition;
    let price = e.detail.value.price;
    let city = e.detail.value.city;
    let description = e.detail.value.description;
    // ** get values from form **//

    // let id = this.data.id;

    let item = {
      title: title,
      condition: condition,
      price: price,
      city: city,
      description: description,
      cover_image: this.data.imagePaths[0],
      detail_images: this.data.imagePaths - this.data.imagePaths[0]
    };

    // app.globalData.newbook = book

    //* add api data *//
    apiClient.post({
      path: '/items',
      success() {
        // set data on index page and show
        let page = this;
        page.setData(
          item
        );
        data: item,
        wx.reLaunch({
          url: '/pages/show/show', // id??
        })
      }
    });
    //* add api data *//

  },
  //** Add Item funciton **//


  //** Navabar Function **//

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

  //** Navabar Function **//
})