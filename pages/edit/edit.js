const app = getApp()
const apiClient = require('../../utils/apiClient.js')
// const AV = require('../../../utils/av-weapp-min.js');
const AV = require('../../utils/av-weapp.min.js')


Page({

  /**
   * 页面的初始数据
   */

  data: {
    cities: [],
    objectArray: [
      {
        city: "Select One Below",
        id: 0,
        array: ["Select One Below"]
      },
      {
        city: "Beijing",
        id: 1,
        array: ["Select One Below", "Dongcheng", "Xicheng", "Chaoyang", "Fengtai", "Shijingshan", "Haidian", "Shunyi", "Tongzhou", "Daxing", "Fangshan", "Mentougou", "Changping", "Pinggu", "Miyun", "Huairou", "Yanqing"]
      },
      {
        city: "Chengdu",
        id: 2,
        array: ["Select One Below", "Wuhou", "Jinjiang", "Qingyang", "Jinniu", "Chenghua", "Longquanyi", "Wenjiang", "Xindu", "Qingbaijiang", "Shuangliu", "Pidu", "Pujiang", "Dayi", "Jintang", "Xinjin"]
      },
      {
        city: "Shanghai",
        id: 3,
        array: ["Select One Below", "Huangpu", "Xuhui", "Changning", "Jingan", "Putuo", "Hongkou", "Yangpu", "Pudong", "Minhang", "Baoshan", "Jiading", "Jinshan", "Songjiang", "Qingpu", "Fengxian", "Chongming"]
      }
    ],
    object: [],
    cityindex: 0,
    index1: 0,
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
      { name: 'Bikes', value: 'Bikes' },
      { name: 'Textiles', value: 'Textiles' },
      { name: 'Pets', value: 'Pets' },
      { name: 'Plants', value: 'Plants' },
      { name: 'Clothes', value: 'Clothes' },
      { name: 'Cosmetics', value: 'Cosmetics' }
    ],
    userInput: {
      condition: 0,
      // region: 'Select One Below',
      delivery: 0,
      tag_list: [],
      city: 0,
      region: 0,
      title: 0,
      price: 0,
      description: 0
    },
    errors: {},
    files: [],
    new_imagePaths: [],
    imagesCount: 0,
    canUpload: true,
    i: 0,
    tempFilePaths: [],
    tag_list: []
  },

  onLoad: function (options) {
    
    var objectArray = this.data.objectArray
    var cities = []
    for (var i = 0; i < objectArray.length; i++) {
      cities.push(objectArray[i].city, )
    }
    this.setData({ cities: cities, object: objectArray[this.data.cityindex].array });

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
        console.log(123234234234234,page.data.item)
        console.log(123231231231,page.data.items)
        let matchCheckBox = []
        let myCheck = false;
        let checkboxData = "";
        let itemData = "";
        for ( var x in page.data.items) {
          
          myCheck = false
          for ( var y in page.data.item.tag_list) {
            
            checkboxData = page.data.items[x].name.toLowerCase()
            itemData = page.data.item.tag_list[y].toLowerCase()
            // console.log(1111, checkboxData, itemData)
            if (checkboxData == itemData) {
              myCheck = true
            }
          }
        
          matchCheckBox.push(myCheck)
          console.log(444, matchCheckBox)
        }
        console.log(555555,matchCheckBox)


        page.setData({ matchCheckBox})

        const condition_index = page.data.conditions.indexOf(page.data.item.condition)
        const city_index = page.data.cities.indexOf(page.data.item.city)
        page.setData({cityindex:city_index})
        const region_index = page.data.objectArray[city_index].array.indexOf(page.data.item.region)
        page.setData({regionindex:region_index})
        
        if(page.data.item.must_pick_up == true){
          const delivery_index = 1
          page.setData({ delivery_index })
          // console.log("delivery_index", page.data.delivery_index)
        } else {
          const delivery_index = 2
          page.setData({ delivery_index })
        }
        
        // page.setData({ delvery_index_num })
        // const delvery_index = delvery_index_num
        // const delivery_index = page.data.deliverys.indexOf(page.data.item.delivery)
        // console.log(444444,page.data.conditions)
        // console.log(434243,page.data.item.condition)
        // console.log(54424,condition_index)
        page.setData({
          condition_index,
          city_index,
          region_index

        });
    
        console.log("condition_index", page.data.condition_index)
        console.log("city_index", page.data.city_index)
        console.log("region_index", page.data.region_index)
        console.log("delivery_index", page.data.delivery_index)
        console.log("page.data", page.data)

        var page_images = []
        res.data.item.detail_images.forEach(function (e) {
          page_images.push(e.url)
        })
        page.setData({
          page_images
        })

        console.log("page_images", page.data.page_images)
    
        // console.log("userInput", page.data.userInput)
      }
    })

    //unload conditon//
    // this.conditionChanged('')

  },




  //** Upload Images **//
  uploadImages: function () {
    let that = this
    let page = this
    var new_imagePaths = []
    var imagesCount = page.data.page_images.length
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

        console.log("res", res.tempFilePaths)

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
              console.log(2324, page.data.new_imagePaths)
              let new_imgePaths = page.data.new_imagePaths.push(file.url())
              page.setData({ new_imgePaths })
              // console.log(52352, new_imagePaths)
              imagesCount = that.data.imagesCount + page.data.new_imagePaths.length
            }
            )
            // var imagePaths = that.data.imagePaths.concat(imagePaths)
            // var imagesCount = that.data.imagePaths.length
            that.setData({
              page_images: that.data.page_images.concat(that.data.new_imagePaths),
              imagesCount,
              canUpload: true
            });
            console.log("new_imagePaths", that.data.new_imagePaths)
            console.log("imagesCount", that.data.imagesCount)
            console.log("page_images_new", that.data.page_images)
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
  //** Upload Images **//

  /**删除图片 */

  // deleteImage: function (e) {
  //   // let that = this
  //   console.log("eeee", e)
  //   var that = this;
  //   var files = that.data.files;
  //   var imagePaths = that.data.imagePaths;
  //   var index = e.currentTarget.dataset.index;
  //   console.log(444, files)
  //   console.log(555, imagePaths)
  //   wx.showModal({
  //     title: 'Reminder',
  //     content: 'Do you want delete this image？',
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('点击确定了');
  //         // console.log("files0", files)
  //         // console.log("imagePaths0", imagePaths)
  //         files.splice(index, 1);
  //         imagePaths.splice(index, 1);
  //         that.setData({ files, imagePaths })
  //         console.log("files1", files)
  //         console.log("imagePaths1", imagePaths)



  //       } else if (res.cancel) {
  //         console.log('点击取消了');
  //         return false;
  //       }
  //       // var num = that.data.i - 1
  //       that.setData({
  //         tempFilePaths: files,
  //         imagePaths: imagePaths,
  //         // i: num,
  //       });
  //     }
  //   })
  // },
   /**删除图片 */


  // * updateitem //
  updateItem: function () {
    console.log("userInput", this.data.userInput)
    let page = this
    let that = this

    // this.validatePresence('title');
    // this.validatePresence('price');
    // this.validatePresence('description');
    // this.validatePick('city');
    // this.validatePick('region');
    // this.validatePick('delivery');
    // this.validatePick('condition');
    // console.log(77452, this.data.files)
    // if (this.data.files == []) {
    //   wx.showModal({
    //     content: `Please add at least one image`,
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       }
    //     }
    //   });
    // }

    // ** get values from form **//
    let title = this.data.userInput.title == 0 ?page.data.item.title : this.data.userInput.title;
    let condition = this.data.userInput.condition == 0 ? page.data.item.condition : this.data.conditions[this.data.userInput.condition];
    let price = this.data.userInput.price == 0 ? page.data.item.price : this.data.userInput.price;
    let city = this.data.userInput.city == 0 ? page.data.item.city : this.data.objectArray[this.data.userInput.city].city;
    let region = this.data.userInput.city == 0 ? page.data.item. region : this.data.objectArray[this.data.userInput.city].array[this.data.userInput.region];
    let description = this.data.userInput.description == 0 ? page.data.item.description : this.data.userInput.description;
    let must_pick_up = this.data.userInput.delivery == 0 ? page.data.item.must_pick_up : (this.data.userInput.delivery == 1 ? true : false);
    let tag_list = this.data.userInput.tag_list.length == 0 ? page.data.item.tag_list : this.data.userInput.tag_list
    
    // // if(this.data.userInput.tag_list == []){
    // //   let tag_list = this.data.tag_list.concat(page.data.item.tag_list)
    // //   page.setData
    // // }else {
    // //   let tag_list = this.data.userInput.tag_list
    // // }
    // console.log("tagssss", tag_list)
    // ** get values from form **//

    app.globalData.must_pick_up = must_pick_up
    console.log("pick_bolean", must_pick_up)

    let _item = {
      title: title,
      condition: condition,
      price: price,
      city: city,
      region: region,
      description: description,
      must_pick_up: must_pick_up,
      tag_list: tag_list,
      cover_image: that.data.page_images[0]
    };
    console.log('updated_userInput', page.data.userInput)
    console.log("updated_item", _item)
    // app.globalData._item = _item
    // console.log("_item", _item)

    apiClient.put({
      path: `items/${page.data.item.id}`,
      data: {
        item: _item
      },
      success(res) {
        // res.data = profile;
        console.log("response item information", res.data.item)
        wx.setStorageSync('item', res.data.item);
        var id = res.data.item.id;
        that.setData({ item_id: id });
        console.log("item_id", that.data.item_id)
        // wx.navigateTo({
        //   url: `/pages/show/show?id=${id}` // id??
        // })
        wx.reLaunch({
          url: `/pages/show/show?id=${id}`
        });
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
    this.setData({ condition_index: event.detail.value })
  },

  // regionChanged(event) {
  //   this.updateInput('region', event.detail.value);
  // },

  deliveryChanged(event) {
    console.log(55555,event.detail.value)
    this.updateInput('delivery', event.detail.value);
    this.setData({delivery_index:event.detail.value})
  },

  // onLoad: function () {
  //   var objectArray = this.data.objectArray
  //   var cities = []
  //   for (var i = 0; i < objectArray.length; i++) {
  //     cities.push(objectArray[i].city, )
  //   }
  //   this.setData({ cities: cities, object: objectArray[this.data.cityindex].array })
  // },
  cityChanged: function (e) {
    console.log(666666666,e.detail.value)
    // update picker index of city
    this.updateInput('city', e.detail.value);
    this.setData({ cityindex: e.detail.value, index1: 0 })
    
    // reset value of region .. to avoid bug
    this.setData({ regionindex: 0 })

    var objectArray = this.data.objectArray
    this.setData({ object: objectArray[this.data.cityindex].array })
  },
  regionChanged: function (e) {
    console.log(22222222,e.detail.value)

    // update picker index of region
    this.updateInput('region', e.detail.value);
    this.setData({regionindex: e.detail.value})
    this.setData({
      index1: e.detail.value
    })
  },


  validatePresence(key) {
    if (!this.data.userInput[key] || this.data.userInput[key] === '') {
      wx.showModal({
        content: `Please check the ${key}`,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      // this.data.errors[key] = 'Cannot Be Empty';
      // this.setData({
      //   errors: this.data.errors
      // });
    }
  },


  validatePick(key) {
    // console.log(54646545655,key)
    // console.log(4444444444,this.data)
    // console.log(5234324, this.data.userInput)
    if (!this.data.userInput[key] || this.data.userInput[key] === 0) {
      console.log("yeah working")
      wx.showModal({
        content: `Please check the ${key}`,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      // if( key == 'city') {
      //   var a = this.data.cities
      //   a[0] = "Cannot Be Empty"
      //   this.setData({ cities : a})
      // }
      // this.data.errors[key] = 'Must Select One';
      // this.setData({
      //   errors: this.data.errors
      // });
    }
  },

  // validateImage(image) {
  //   console.log("imageeeee", image)
  //   if (!this.data.imagePaths) {
  //     wx.showModal({
  //       content: `Please add at least one image`,
  //       showCancel: false,
  //       success: function (res) {
  //         if (res.confirm) {
  //           console.log('用户点击确定')
  //         }
  //       }
  //     })

  //   }

  // },

  updateInput(key, value) {
    this.data.userInput[key] = value;
    delete this.data.errors[key];
    this.setData({
      userInput: this.data.userInput,
      errors: this.data.errors
    });
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  /**删除图片 */

  deleteImage: function (e) {
    // let that = this
    console.log("eeee", e)
    var that = this;
    var files = that.data.files;
    var imagePaths = that.data.imagePaths;
    var index = e.currentTarget.dataset.index;
    console.log(444, files)
    console.log(555, imagePaths)
    wx.showModal({
      title: 'Reminder',
      content: 'Do you want delete this image？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          // console.log("files0", files)
          // console.log("imagePaths0", imagePaths)
          files.splice(index, 1);
          imagePaths.splice(index, 1);
          that.setData({ files, imagePaths })
          console.log("files1", files)
          console.log("imagePaths1", imagePaths)



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
// // pages/edit/edit.js
// const app = getApp()
// const apiClient = require('../../utils/apiClient.js');
// const AV = require('../../utils/av-weapp.min.js');
// Page({
//   onLoad: function (options) {
//     let page = this;
//     console.log("options", options)
//     apiClient.get({
//       path: `items/${options.id}`,
//       success(res) {
//         var _item = res.data.item;
//         console.log("res.data", res.data)

//         page.setData({
//           item: _item
//         });
//         console.log("page.data", page.data)

//       }
//     })
//   },

//   /**
//    * 页面的初始数据
//    */
//   data: {
  
//   },

//   uploadImages: function () {
//     let that = this

//     wx.chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {
//         console.log("res", res)
//         let tempFilePath = res.tempFilePaths[0];
//         that.setData({ imagePath: tempFilePath })
//         console.log("tempFilePath", tempFilePath)
//         new AV.File('file-name', {
//           blob: {
//             uri: tempFilePath,
//           },
//         }).save().then(
//           file => {
//             console.log("file.url", file.url())
//             that.setData({
//               imagePath: file.url()
//             });
//             console.log("imagePath", that.data.imagePath)
//             //  console.log("liveurl", that.data.imagePath)
//           }
//           ).catch(console.error);
//         //console.log("liveurl", that.data.imagePath )
//         // let imagePath = file.url()
//         // that.setData({ imagePath: file.url() })
//         wx.showToast({
//           title: 'UPLOADED',
//           icon: 'success',
//           duration: 1000
//         })
//       }
//     });
//   },

  // bindSubmit: function (e) {
  //   console.log("e", e)
  //   let page = this;

  //   let title = e.detail.value.title;
  //   let condition = e.detail.value.condition;
  //   let city = e.detail.value.city;
  //   let price = e.detail.value.price;
  //   let description = e.detail.value.description;


  //   let item = {
  //     title: title,
  //     condition: condition,
  //     city: city,
  //     price: price,
  //     description: description,
  //     cover_image: page.data.imagePath
  //   }

  //   console.log("item", item)
  //   // var userInfo = wx.getStorageSync('userInfo')
  //   // console.log(2, userInfo)
  //   // var profile = Object.assign(userInfo, userContact)
  //   // console.log(3, userInfo)

  //   // Update api data

  //   apiClient.put({
  //     path: `items/${page.data.item.id}`,
  //     data: {
  //       item: item
  //     },
  //     success(res) {
  //       // res.data = profile;
  //       console.log("response item information", res.data.item)
  //       wx.setStorageSync('item', res.data.item);
  //       wx.reLaunch({
  //         url: '/pages/profile/profile'
  //       });
  //     }
  //   });
  // },

//   //* Navabar Function*//

//   goHome: function (e) {
//     wx.reLaunch({
//       url: '/pages/index/index'
//     })
//   },
//   goAdd: function (e) {
//     wx.reLaunch({
//       url: '/pages/add/add'
//     })
//   },
//   goProfile: function (e) {
//     wx.reLaunch({
//       url: '/pages/profile/profile'
//     })
//   }

//   //* Navabar Function*//
// })