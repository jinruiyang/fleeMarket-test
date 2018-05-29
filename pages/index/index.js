var WxSearch = require('../../wxSearch/wxSearch.js')
const app = getApp();
const apiClient = require('../../utils/apiClient.js');
console.log(111, apiClient)
Page({
  onLoad: function (optiones) {
    let page = this;
    var that = this;
    console.log("keyword", page.data.keyword);
    //console.log("this", this);
    // const user_id = wx.getStorageSync('userInfo').userId
    WxSearch.init(that, 43,["kitchn","books","bedroom"]);
    // WxSearch.initMindKeys();
    // Get user data from server (to show in form)
    apiClient.get({
      path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}`,
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
      path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}`,
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

  byCity: function (e) {
    console.log("city", e)
    const city = e.currentTarget.dataset.city;
    let page = this;

    if (page.data.city == city) {
      page.setData({
        city: null
      });
    } else {
      page.setData({
        city: city
      });
    }

    apiClient.get({
      path: `items?keyword=${page.data.keyword || ""}&tag=${page.data.tag || ""}&city=${page.data.city || ""}`,
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
  /**
   * 页面的初始数据
   */
  data: {
    
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
  }
  //* Navabar Function*//
})