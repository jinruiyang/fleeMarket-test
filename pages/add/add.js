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
        // region: 'Select One Below',
        delivery: 0,
        tag_list: [],
        city: 0,
        region: 0
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
   //** Upload Images **//


  //* add item //
  addItem: function () {
    console.log("userInput", this.data.userInput)

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
    let city = `${this.data.objectArray[this.data.userInput.city].city}, ${this.data.objectArray[this.data.userInput.city].array[this.data.userInput.region]}`;
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

  // regionChanged(event) {
  //   this.updateInput('region', event.detail.value);
  // },

  deliveryChanged(event) {
    this.updateInput('delivery', event.detail.value);
  },

  onLoad: function () {
    var objectArray = this.data.objectArray
    var cities = []
    for (var i = 0; i < objectArray.length; i++) {
      cities.push(objectArray[i].city, )
    }
    this.setData({ cities: cities, object: objectArray[this.data.cityindex].array })
  },
  cityChanged: function (e) {
    this.updateInput('city', e.detail.value);
    this.setData({ cityindex: e.detail.value, index1: 0 })
    var objectArray = this.data.objectArray
    this.setData({ object: objectArray[this.data.cityindex].array })
  },
  regionChanged: function (e) {
    this.updateInput('region', e.detail.value);
    this.setData({
      index1: e.detail.value
    })
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
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
});

// // pages/add/add.js
// const app = getApp()
// const apiClient = require('../../utils/apiClient.js');
// // const AV = require('../../../utils/av-weapp-min.js');
// const AV = require('../../utils/av-weapp.min.js');
// // console.log( "require AV", AV)

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     imagePaths:[],
//     conditions: ['Select One Below', 'Brand New - Never Used', 'Like New', 'Used', 'Very Used'],
//     occupations: [],
//     deliveries: ['Select One Below', 'Must Be Picked Up', 'Can Be Mailed at Market Rate', 'Other'],
//     step: 0,
//     errors: {},
//     termData: {},
//     terms: [],
//     userInput: {
//       condition: 0,
//       region: 'Select One Below',
//       deliveries: 0,
//       bio: '',
//       ability: '',
//       photo: '',
//       certificatePhotos: []
//     }
  
//   },

//   //** Uploda Cover Image **//
//   uploadImages: function () {
//     let that = this
//     var imagePaths = []
   
//     wx.chooseImage({
//       count: 9,
//       sizeType: ['original','compressed'],
//       sourceType: ['album', 'camera'],
      
//       success: function(res) {
//         // console.log("res", res)
//         // let tempFilePaths = res.tempFilePaths;
//         // that.setData({ imagePaths: tempFilePaths })
//         // console.log("tempFilePaths", tempFilePaths)  
//         // for(var i = 0; i < 9; i++) {
//         //   new AV.File(`file-name${i}`, {
//         //     blob: {
//         //       uri: tempFilePaths[i]
//         //     }
//         //   }
//         // }).save().then(
//         //   file => {
//         //    console.log("file.url", file.url())
//         //    that.setData({ 
//         //     imagePaths: file.url()
//         //     });
//         //     console.log("imagePaths", this.data.imagePaths)
//         //   //  console.log("liveurl", that.data.imagePath)
//         //   }
//         // ).catch(console.error);
//         //console.log("liveurl", that.data.imagePath )
//         // let imagePath = file.url()
//         // that.setData({ imagePath: file.url() })
//         res.tempFilePaths.map(tempFilePath => () => new AV.File('filename', {
//           blob: {
//             uri: tempFilePath,
//           },
//         }).save()).reduce(
//           (m, p) => m.then(v => AV.Promise.all([...v, p()])),
//           AV.Promise.resolve([])
//           ).then(files => {
//                 files.map(file => {
//                 console.log("file.url", file.url())
//                 imagePaths.push(file.url())
//             }
//           )

//               that.setData({
//                 imagePaths: imagePaths
//               }); 
//             console.log("imagePaths", that.data.imagePaths)
//           }
//           ).catch(console.error);
//         wx.showToast({
//           title: 'UPLOADED',
//           icon: 'success',
//           duration: 1000
//         })
//       }
//     });
//    },
//   //** Uploda Cover Image **//

//   //** Add Item funciton **//
//   bindSubmit: function (e) {
//     console.log(3423423,this.data)
//     let page = this
    
//     // ** get values from form **//
//     let title = e.detail.value.title;
//     let condition = e.detail.value.condition;
//     let price = e.detail.value.price;
//     let city = e.detail.value.city;
//     let description = e.detail.value.description;
//     let must_pick_up = e.detail.value.must_pick_up;
//     let tag_list = e.detail.value.tags
//     // ** get values from form **//
//     console.log("form_tags", e.detail.value.tags)
//     console.log("tag_list", page.data.tag_list)

//     // let id = this.data.id;

//     let _item = {
//       title: title,
//       condition: condition,
//       price: price,
//       city: city,
//       description: description,
//       must_pick_up: must_pick_up,
//       tag_list: tag_list,
//       cover_image: page.data.imagePaths[0]
//       // detail_images: [this.data.imagePaths[1]]
//       };
//       // console.log("cover", this.data.)

//     app.globalData._item = _item
//     console.log(2323, _item)

//     //* add item api data *//
//     apiClient.post({
//       path: '/items',
//       data: {
//         item: _item
//       },
//       //console.log("item", data.item)
//       success(res) {
//         // set data on index page and show
//         console.log("res", res)
//         // let page = this;
//         // page.setData(
//         //   _item
//         // ); 
//         var id = res.data.item.id;
//         page.setData({ id: id });
//         console.log("id", id)
//         wx.reLaunch({
//           url: `/pages/show/show?id=${id}` // id??
//         })
//       }
//     });
//     //* add item api data *//


//   },
//   //** Add Item funciton **//


//   //** Navabar Function **//

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

//   //** Navabar Function **//
// })