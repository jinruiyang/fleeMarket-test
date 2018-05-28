var WxSearch = require('../../wxSearch/wxSearch.js')
const app = getApp();
const apiClient = require('../../utils/apiClient.js');
console.log(111, apiClient)
Page({
  onLoad: function (optiones) {
    console.log(666666, "onLoad Profile.js")
    let page = this;
    var that = this;
    //console.log("this", this);
    // const user_id = wx.getStorageSync('userInfo').userId
    WxSearch.init(that, 43,["kitchn","books","bedroom"]);
    // WxSearch.initMindKeys();
    // Get user data from server (to show in form)
    apiClient.get({
      path: 'items',
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

    wx.navigateTo({
      url: `/pages/tagged/tagged?tag=${tag}`,
    })
  },

  byCity: function (e) {
    console.log("city", e)
    const city = e.currentTarget.dataset.city

    wx.navigateTo({
      url: `/pages/by-city/by-city?city=${city}`,
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
    let way = 'search/' + that.data.wxSearchData.value
    if(way == 'search/')
    {
      way = 'items';
    }
    WxSearch.wxSearchAddHisKey(that);
    console.log("wx fn", that.data.wxSearchData.value);
    apiClient.get({
      path: way,
      success(res) {
        var _items = res.data.items;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({ items: _items });

        console.log(123, page)

      }
    })
  },
  wxSearchInput: function (e) {
    var that = this
    let page = this;
    let way = 'search/' + e.detail.value
    console.log(9102459, !e.detail.value)
    if (!e.detail.value) {
      way = 'items';
    }
    WxSearch.wxSearchInput(e, that);
    apiClient.get({
      path: way,
      success(res) {
        console.log(339933, e.detail.value)
        var _items = res.data.items;
        // // var storage = wx.getStorageSync(key)
        // // save profile at this.data.profile
        page.setData({ items: _items });

        console.log(123, page)

      }
    })
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