//index.js
//获取应用实例
const app = getApp()
Page({
  getUserInfo: function (e) {
    //console.log("e", e)
    // app.globalData.userInfo = e.detail.userInfo 
    wx.setStorageSync('userInfo', e.detail.userInfo);
    // this.setData({
    //   userInfo: e.detail.userInfo
    // })

    const host = 'https://flea-market.wogengapp.cn/api/v1/';
    // const host = 'http://localhost:3000/api/v1/';
    console.log('processing to login');
    wx.login({
      success: res => {
        //console.log("res", res)
        //insert next code here
        // console.log({
        //   code: res.code,
        //   userInfo: e.detail.userInfo
        // });
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code,
            userInfo: e.detail.userInfo
            // console.log()
          },
          // insert next code here
          success: res => {
            //console.log("res", res)

            if (res.statusCode !== 500) {
              wx.setStorageSync('userInfo', res.data);
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }
            
            // this.globalData.userId = res.data.userId
          },

        })
      }
    })
  }
})