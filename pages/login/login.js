//index.js
//获取应用实例
const app = getApp()
Page({
  getUserInfo: function (e) {
    console.log(e)
    // app.globalData.userInfo = e.detail.userInfo 
    wx.setStorageSync('userInfo', e.detail.userInfo);
    // this.setData({
    //   userInfo: e.detail.userInfo
    // })

    const host = 'https://flea-market.wogengapp.cn/api/v1/'
    console.log('processing to login')
    wx.login({
      success: res => {
        console.log(res)
        //insert next code here
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code,
            userInfo: wx.getStorageSync('userInfo')
          },
          // insert next code here
          success: res => {
            console.log(res)
            // this.globalData.userId = res.data.userId
            wx.setStorageSync('userInfo', res.data);
            wx.reLaunch({
              url: '/pages/profile/profile'
            })
          },

        })
      }
    })
  }
})