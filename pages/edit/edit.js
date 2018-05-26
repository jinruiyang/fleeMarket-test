// pages/edit/edit.js
const app = getApp()
const apiClient = require('../../utils/apiClient.js');
const AV = require('../../utils/av-weapp.min.js');
Page({
  onLoad: function (options) {
    let page = this;
    console.log("options", options)
    apiClient.get({
      path: `items/${options.id}`,
      success(res) {
        var _item = res.data.item;
        console.log("res.data", res.data)

        page.setData({
          item: _item
        });
        console.log("page.data", page.data)

      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  uploadImages: function () {
    let that = this

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log("res", res)
        let tempFilePath = res.tempFilePaths[0];
        that.setData({ imagePath: tempFilePath })
        console.log("tempFilePath", tempFilePath)
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {
            console.log("file.url", file.url())
            that.setData({
              imagePath: file.url()
            });
            console.log("imagePath", that.data.imagePath)
            //  console.log("liveurl", that.data.imagePath)
          }
          ).catch(console.error);
        //console.log("liveurl", that.data.imagePath )
        // let imagePath = file.url()
        // that.setData({ imagePath: file.url() })
      }
    });
  },

  bindSubmit: function (e) {
    console.log("e", e)
    let page = this;

    let title = e.detail.value.title;
    let condition = e.detail.value.condition;
    let city = e.detail.value.city;
    let price = e.detail.value.price;
    let description = e.detail.value.description;


    let item = {
      title: title,
      condition: condition,
      city: city,
      price: price,
      description: description,
      cover_image: page.data.imagePath
    }

    console.log("item", item)
    // var userInfo = wx.getStorageSync('userInfo')
    // console.log(2, userInfo)
    // var profile = Object.assign(userInfo, userContact)
    // console.log(3, userInfo)

    // Update api data

    apiClient.put({
      path: `items/${page.data.item.id}`,
      data: {
        item: item
      },
      success(res) {
        // res.data = profile;
        console.log("response item information", res.data.item)
        wx.setStorageSync('item', res.data.item);
        wx.reLaunch({
          url: '/pages/profile/profile'
        });
      }
    });
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