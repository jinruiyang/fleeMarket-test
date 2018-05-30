const app = getApp()
const apiClient = require('../../utils/apiClient.js')
// const AV = require('../../../utils/av-weapp-min.js');
const AV = require('../../utils/av-weapp.min.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditions: ['Select One Below', 'Brand New - Never Used', 'Like New', 'Used', 'Very Used'],
    occupations: [],
    deliverys: ['Select One Below', 'Must Be Picked Up', 'Can Be Mailed at Market Rate', 'Other'],
    step: 0,
    errors: {},
    items: [
      { name: 'Kitchen', value: 'Kitchen' },
      { name: 'Electronics', value: 'Electronics' },
      { name: 'Furniture', value: 'Furniture' },
      { name: 'Art', value: 'Art' },
      { name: 'Books', value: 'Books' },
      { name: 'Clothing', value: 'Clothing' },
      { name: 'Transport', value: 'Transport' },
      { name: 'Textiles', value: 'Textiles' },
      { name: 'Sporting Goods', value: 'Sporting Goods' },
      { name: 'Beauty', value: 'Beauty' },
      { name: 'Home Goods', value: 'Home Goods' }, 
      { name: 'Pet-Related', value: 'Pet-Related' }
      
    ],
    userInput: {
      condition: 0,
      region: 'Select One Below',
      delivery: 0,
      tag_list: []
    },
    files: [],
    imagePaths: [],
    imagesCount: 0,
    canUpload: true,
    i: 0,
    tempFilePaths: []
  },
  


  //** Upload Images **//
  uploadImages: function () {
    let that = this
    var imagePaths = []
    var imagesCount = 0
    var maxImage = 9 - that.data.imagesCount
    
   
    console.log("files", that.data.files)
    console.log(maxImage)

    wx.chooseImage({
      count: maxImage,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],

      success: function (res) {
        that.setData({
          canUpload: false
        })
        wx.showLoading({
          title: 'uploading',
          mask: true
        })

        console.log("res", res.tempFilePaths )
       
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        // app.globalData.files = files
        console.log("files1", that.data.files)
        
        res.tempFilePaths.map(tempFilePath => () => new AV.File('filename', {
          blob: {
            uri: tempFilePath,
          },
        }).save()).reduce(
          (m, p) => m.then(v => AV.Promise.all([...v, p()])),
          AV.Promise.resolve([])
          ).then(files => {
            files.map(file => {
              console.log("file.url", file.url())
              imagePaths.push(file.url())
              imagesCount = imagePaths.length
            }
            )
            // var imagePaths = that.data.imagePaths.concat(imagePaths)
            // var imagesCount = that.data.imagePaths.length
            that.setData({
              imagePaths: that.data.imagePaths.concat(imagePaths),
              imagesCount: that.data.imagesCount + imagesCount,
              canUpload: true
            });
            console.log("imagePaths", that.data.imagePaths)
            console.log("imagesCount", that.data.imagesCount)
            wx.hideLoading()

          }
  
          ).catch(console.error);
        // wx.showToast({
        //   title: 'uploading',
        //   icon: 'loading',
        //   duration: 3000
        // })
      }
    });
    // console.log("images count", that.data.imagePaths.imagesCount)
    
  },
  //** Uploda Cover Image **//


  //* add item //
  addItem: function(){
    console.log("userInput", this.data.userInput )

    this.validatePresence('title');
    this.validatePresence('price');
    this.validatePresence('description');
    this.validatePresence('tag_list');
    this.validatePick('region');
    this.validatePick('delivery');
    this.validatePick('condition');

    let page = this
    let that = this

    // ** get values from form **//
    let title = this.data.userInput.title;
    let condition = this.data.userInput.condition;
    let price = this.data.userInput.price;
    let city = this.data.userInput.region[1];
    let description = this.data.userInput.description;
    let must_pick_up = this.data.userInput.delivery == 1 ? true : false;
    let tag_list = this.data.userInput.tag_list
    // ** get values from form **//
    
    app.globalData.must_pick_up = must_pick_up
    console.log("pick_bolean", must_pick_up)

    let _item = {
      title: title,
      condition: this.data.conditions[condition],
      price: price,
      city: city,
      description: description,
      must_pick_up: must_pick_up,
      tag_list: tag_list,
      cover_image: page.data.imagePaths[0]
    };
    
    app.globalData._item = _item
    console.log("_item", _item)


    
    apiClient.post({
      // console.log("userinput", this.data.userInput),
      path: '/items',
      data: {
        item: _item
      },
      success: (res) => {
        console.log("res", res.data);
        var id = res.data.item.id;
        that.setData({ item_id: id });
        console.log("item_id", that.data.item_id)
        that.data.imagePaths.forEach(function (e) {
    
          console.log("e", e)
          let _image = {
            item_id: page.data.item_id,
            url: e
          };
          apiClient.post({
            path: `/detail_images`,
            data: {
              image: _image
            },
            success: (res) => {
              console.log("res", res.data);
            }
          })
        });
        wx.navigateTo({
          url: `/pages/show/show?id=${id}` // id??
        })
      }
    });

  },


  titleChanged(event) {
    this.updateInput('title', event.detail.value);
  },

  priceChanged(event) {
    this.updateInput('price', event.detail.value);
  },

  descriptionChanged(event) {
    this.updateInput('description', event.detail.value);
  },

  tag_listChanged(event) {
    this.updateInput('tag_list', event.detail.value);
  },

  conditionChanged(event) {
    this.updateInput('condition', event.detail.value);
  },

  regionChanged(event) {
    this.updateInput('region', event.detail.value);
  },

  deliveryChanged(event) {
    this.updateInput('delivery', event.detail.value);
  },

  validatePresence(key) {
    if (!this.data.userInput[key] || this.data.userInput[key] === '') {
      this.data.errors[key] = 'Cannot Be Empty';
      this.setData({
        errors: this.data.errors
      });
    }
  },


  validatePick(key) {
    if (!this.data.userInput[key] || this.data.userInput[key] === 'Select One Below') {
      this.data.errors[key] = 'Must Select One';
      this.setData({
        errors: this.data.errors
      });
    }
  },

  updateInput(key, value) {
    this.data.userInput[key] = value;
    delete this.data.errors[key];
    this.setData({
      userInput: this.data.userInput,
      errors: this.data.errors
    });
  },

  previewImage: function (e) {
    var that = this;
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var files = that.data.files;
    //预览图片
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: files // 需要预览的图片http链接列表
    })
  },

  /**删除图片 */

  // delete: function (e) {
  //   var index = e.currentTarget.dataset.index;
  //   var files = that.data.files;
  //   images.splice(index, 1);
  //   that.setData({
  //     files: files
  //   });
  // }
  deleteImage: function (e) {
    var that = this;
    var files = that.data.files;
    var imagePaths = that.data.imgaePaths;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: 'Reminder',
      content: 'Do you want delete this image？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
    files.splice(index, 1);
    imagePaths.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
    // var num = that.data.i - 1
    that.setData({
      tempFilePaths: files,
      imagePaths: imagePaths,
      // i: num,
    });
      }
    })
  }
    
});
