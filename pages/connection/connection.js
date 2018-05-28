// pages/connection/connection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    console.log("id", options.user_id)
    let page = this;
    //console.log("this", this);
    // const user_id = wx.getStorageSync('userInfo').userId

    // Get user data from server (to show in form)
    apiClient.get({
      path: `89/connections/1`,
      success(res) {
        console.log(333333, res.data)
        var _profile = res.data.profile;
        // var storage = wx.getStorageSync(key)
        // save profile at this.data.profile
        page.setData({
          profile: _profile,
          my_items: _profile.my_items
        });
        //console.log("my_items", page.data.my_items);
        app.globalData.profile = _profile;
        console.log("my items", page.data.my_items);
        //console.log(123, page.data)

      }
    })

    
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})