var WxSearch = require('../../wxSearch/wxSearch.js')
var order = ['kitchen', 'books', 'bedroom', 'furniture', 'textiles', 'electronics', 'sport-goods']
const app = getApp();
const apiClient = require('../../utils/apiClient.js');
console.log(111, apiClient)
Page({
  onLoad: function (options) {
    console.log("on load options", options)
    let page = this;
    var that = this;
    if (options.tag != null) {
      page.setData({
        tag: options.tag
      })
    };
    if (app.globalData.tag != null) {
      page.setData({
        tag: app.globalData.tag
      })
    };
    if (app.globalData.keyword != null) {
      page.setData({
        keyword: app.globalData.keyword
      })
    };
    console.log("index tag", page.data.tag)
    console.log("keyword", page.data.keyword);
    //console.log("this", this);
    // const user_id = wx.getStorageSync('userInfo').userId
    WxSearch.init(that, 43, ["kitchen", "books", "bedroom"]);
    // WxSearch.initMindKeys();
    // Get user data from server (to show in form)
    apiClient.get({
      path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`,
      success(res) {
        console.log(333333, res.data.items)
        var _items = res.data.items;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({ items: _items });

        console.log(123, page)

      }
    })

  },

  showItem: function (e) {
    console.log("eeeee",e)
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
  },

  tagged: function (e) {
    const tag = e.currentTarget.dataset.tag;
    let page = this;
    if(page.data.tag == tag){
      page.setData({
        tag: null
      });
    }else{
      page.setData({
        tag: tag
      });
    }

    apiClient.get({
      path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`,
      success(res) {
        console.log("tagged items", res.data.items)
        var _items = res.data.items;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({ items: _items });

        //console.log(123, page)

      }
    })
  },

  // byCity: function (e) {
  //   console.log("city", e)
  //   const city = e.currentTarget.dataset.city;
  //   let page = this;

  //   if (page.data.city == city) {
  //     page.setData({
  //       city: null
  //     });
  //   } else {
  //     page.setData({
  //       city: city
  //     });
  //   }

    // apiClient.get({
    //   path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`,
    //   success(res) {
    //     console.log("city items", res.data.items)
    // var _items = res.data.items;
    // // // var storage = wx.getStorageSync(key)
    // // // save profile at this.data.profile
    // page.setData({ items: _items });

  // //console.log(123, page)

  //     }
  //   })
  // },

  byCity: function () {
    let page = this;
    wx.showActionSheet({
      itemList: ['Chengdu', 'Shanghai', 'Beijing'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          let cityList = ['Chengdu', 'Shanghai', 'Beijing']
          let index = res.tapIndex
          page.setData({
            city: cityList[index]
          })
          console.log("city", page.data.city)
          apiClient.get({
            path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`,
            success(res) {
              console.log("city items", res.data.items)
              var _items = res.data.items;
              page.setData({ items: _items });
            }
          })
        }
      }
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    toView: 'page',
    scrollTop: 100,
    method: 3,
    sortWay : [
      {name: 'price from low to heigh', way: 1, id: 1},
      {name: 'price from heigh to low', way: 2, id: 2},
      {name: 'date from new to old', way: 3, id: 3},
      {name: 'date from old to new', way: 4, id: 4}
    ]
  },

  // category scroll

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

   // category scroll

  
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
  },
   changeSort1: function (e) {
     console.log("test sort", this.data);
     let page = this
     page.setData({method: 1})
     console.log(`items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`);
     apiClient.get({
       path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`,
       success(res) {
         console.log("city items", res.data.items)
         var _items = res.data.items;
         // // var storage = wx.getStorageSync(key)
         // // save profile at this.data.profile
         page.setData({ items: _items });

         //console.log(123, page)

       }
     })
  },
   changeSort2: function (e) {
     console.log("test sort", this.data);
     let page = this
     page.setData({ method: 2 })
     console.log(page.data.method);
     apiClient.get({
       path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`,
       success(res) {
         console.log("city items", res.data.items)
         var _items = res.data.items;
         // // var storage = wx.getStorageSync(key)
         // // save profile at this.data.profile
         page.setData({ items: _items });

         //console.log(123, page)

       }
     })
   },
   changeSort3: function (e) {
     console.log("test sort", this.data);
     let page = this
     page.setData({ method: 3 })
     console.log(page.data.method);
     apiClient.get({
       path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`,
       success(res) {
         console.log("city items", res.data.items)
         var _items = res.data.items;
         // // var storage = wx.getStorageSync(key)
         // // save profile at this.data.profile
         page.setData({ items: _items });

         //console.log(123, page)

       }
     })
   },
   changeSort4: function (e) {
     console.log("test sort", this.data);
     let page = this
     page.setData({ method: 4 })
     console.log(page.data.method);
     apiClient.get({
       path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`,
       success(res) {
         console.log("city items", res.data.items)
         var _items = res.data.items;
         // // var storage = wx.getStorageSync(key)
         // // save profile at this.data.profile
         page.setData({ items: _items });

         //console.log(123, page)

       }
     })
   },
  wxSearchFn: function (e) {
    var that = this;
    let page = this;
    page.setData({
      keyword: that.data.wxSearchData.value
    })
    let way = `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}`
    WxSearch.wxSearchAddHisKey(that);
    console.log("wx fn", that.data.wxSearchData.value);
    apiClient.get({
      path: way,
      success(res) {
        var _items = res.data.items;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({ items: _items });

        console.log("keyword items", page.data.items)

      }
    })
  },
  wxSearchInput: function (e) {
    var that = this
    let page = this;
    page.setData({
      keyword: e.detail.value
    })
    let way = `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}`
    console.log("search input e", e)
    WxSearch.wxSearchInput(e, that);
    apiClient.get({
      path: way,
      success(res) {
        console.log(339933, e.detail.value)
        var _items = res.data.items;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({ items: _items });

        console.log(123, page.data)

      }
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `I found a fantastic place to buy or sell secondhand stuffs! :)`,
      path: `/pages/index/index`
    }
  },

  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },

  onShow: function () {
    console.log("on show ... index")
    console.log(33333333333,this)
    let page = this;
    this.onLoad({city: page.data.city, tag: page.data.tag, keyword: page.data.keyword})

    
  }
  //* Navabar Function*//
})
