// pages/add/add.js
const app = getApp()
const apiClient = require('../../utils/apiClient.js');
// const AV = require('../../../utils/av-weapp-min.js');
const AV = require('../../utils/av-weapp.min.js');
// console.log( "require AV", AV)

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
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
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
        wx.showToast({
          title: 'UPLOAD SUCCESS',
          icon: 'success',
          duration: 1000
        })
      }
    });
   },
  //** Uploda Cover Image **//

  //** Add Item funciton **//
  bindSubmit: function (e) {
    console.log(3423423,this.data)
    let page = this
    
    // ** get values from form **//
    let title = e.detail.value.title;
    let condition = e.detail.value.condition;
    let price = e.detail.value.price;
    let city = e.detail.value.city;
    let description = e.detail.value.description;
    let must_pick_up = e.detail.value.must_pick_up;
    let tag_list = e.detail.value.tags
    // ** get values from form **//
    console.log("form_tags", e.detail.value.tags)
    console.log("tag_list", page.data.tag_list)

    // let id = this.data.id;

    let _item = {
      title: title,
      condition: condition,
      price: price,
      city: city,
      description: description,
      must_pick_up: must_pick_up,
      tag_list: tag_list,
      cover_image: page.data.imagePath
      // detail_images: [this.data.imagePaths[1]]
      };

    app.globalData._item = _item
    console.log(2323, _item)

    //* add api data *//
    apiClient.post({
      path: '/items',
      data: {
        item: _item
      },
      //console.log("item", data.item)
      success(res) {
        // set data on index page and show
        console.log("res", res)
        // let page = this;
        // page.setData(
        //   _item
        // ); 
        var id = res.data.item.id;
        page.setData({ id: id });
        console.log("id", id)
        wx.reLaunch({
          url: `/pages/profile/profile` // id??
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