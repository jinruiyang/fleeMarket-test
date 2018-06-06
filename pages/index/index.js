var WxSearch = require('../../wxSearch/wxSearch.js')
var order = ['kitchen', 'books', 'bedroom', 'furniture', 'textiles', 'electronics', 'sport-goods']
const app = getApp();
const apiClient = require('../../utils/apiClient.js');
console.log(111, apiClient)
Page({
  data: {
    counts: 1
  },
  
  onLoad: function (options) {
    console.log("on load options", options)
    let page = this;
    var that = this;
    page.setData({
      counts: 1
    })
    console.log("counts first time", page.data.counts)
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
      path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}&page=${page.data.counts}`,
      success(res) {
        console.log(333333, res.data)
        var _items = res.data.items
        var _lastPage = res.data.last_page.last_page
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({ 
          items: _items,
          lastPage: _lastPage
         });

        console.log(123, page)

      }
    })

  },

  onReachBottom: function() {
    let page = this;
    page.data.counts += 1
    apiClient.get({
      path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}&page=${page.data.counts}`,
      success(res) {
        let moreItems = res.data.items
        let items = page.data.items
        let _lastPage = res.data.last_page.last_page
        let _items = items.concat(moreItems)
        page.setData({
          items: _items,
          lastPage: _lastPage
        })
        console.log("last page?", page.data.lastPage)
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
    page.setData({
      counts: 1
    });
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
      path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}&page=${page.data.counts}`,
      success(res) {
        console.log("tagged items", res.data.items)
        var _items = res.data.items;
        var _lastPage = res.data.last_page.last_page;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({
          items: _items,
          lastPage: _lastPage
           });

        //console.log(123, page)

      }
    })
  },

  byCity: function () {
    let page = this;
    page.setData({
      counts: 1
    });
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
            path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}&page=${page.data.counts}`,
            success(res) {
              console.log("city items", res.data.items)
              var _items = res.data.items;
              var _lastPage = res.data.last_page.last_page
              page.setData({
                items: _items,
                lastPage: _lastPage
                });
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
     page.setData({
       method: 1,
       counts: 1
       })
     console.log(`items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}`);
     apiClient.get({
       path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}&page=${page.data.counts}`,
       success(res) {
         console.log("city items", res.data.items)
         var _items = res.data.items;
         var _lastPage = res.data.last_page.last_page
         // // var storage = wx.getStorageSync(key)
         // // save profile at this.data.profile
         page.setData({items: _items,
         lastPage: _lastPage
        });

         //console.log(123, page)

       }
     })
  },
   changeSort2: function (e) {
     console.log("test sort", this.data);
     let page = this
     page.setData({
       method: 2,
       counts: 1
       })
     console.log(page.data.method);
     apiClient.get({
       path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}&page=${page.data.counts}`,
       success(res) {
         console.log("city items", res.data.items)
         var _items = res.data.items;
         var _lastPage = res.data.last_page.last_page
         // // var storage = wx.getStorageSync(key)
         // // save profile at this.data.profile
         page.setData({
           items: _items,
           lastPage: _lastPage
           });

         //console.log(123, page)

       }
     })
   },
   changeSort3: function (e) {
     console.log("test sort", this.data);
     let page = this
     page.setData({
       method: 3,
       counts: 1
       })
     console.log(page.data.method);
     apiClient.get({
       path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&method=${page.data.method || ""}&page=${page.data.counts}`,
       success(res) {
         console.log("city items", res.data.items)
         var _items = res.data.items;
         var _lastPage = res.data.last_page.last_page
         // // var storage = wx.getStorageSync(key)
         // // save profile at this.data.profile
         page.setData({
           items: _items,
           lastPage: _lastPage
           });

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
      counts : 1,
      keyword: that.data.wxSearchData.value
    })
    let way = `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&page=${page.data.counts}`
    WxSearch.wxSearchAddHisKey(that);
    console.log("wx fn", that.data.wxSearchData.value);
    apiClient.get({
      path: way,
      success(res) {
        var _items = res.data.items;
        var _lastPage = res.data.last_page.last_page;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({
          items: _items,
          lastPage: _lastPage
          });

        console.log("keyword items", page.data.items)

      }
    })
  },
  wxSearchInput: function (e) {
    var that = this
    let page = this;
    page.setData({
      keyword: e.detail.value,
      counts: 1
    })
    let way = `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}&page=${page.data.counts}`
    console.log("search input e", e)
    WxSearch.wxSearchInput(e, that);
    apiClient.get({
      path: way,
      success(res) {
        console.log(339933, e.detail.value)
        var _items = res.data.items;
        var _lastPage = res.data.last_page.last_page;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({
          items: _items,
          lastPage: _lastPage
          });

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
