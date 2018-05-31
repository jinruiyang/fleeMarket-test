//app.js
// Lean cloud ---
const AV = require('./utils/av-weapp.min.js');
const config = require('./key.js');

AV.init({
  appId: config.appId,
  appKey: config.appSecret,
});
// Lean cloud ---
App({
  // onLaunch: function () {
  //   const host = 'https://flea-market.wogengapp.cn/api/v1/' 
  //   console.log('processing to login') 
  //   wx.login({
  //     success: res => {
  //       console.log(res)
  //       // insert next code here
  //       wx.request({
  //         url: host + 'login', 
  //         method: 'post', 
  //         data: {
  //           code: res.code
  //         },
  //         // insert next code here
  //         success: res => {
  //           console.log(res)
  //           this.globalData.userId = res.data.userId
  //         }
  //       })
  //     }
  //   })
  // },
  globalData: {
    
  },
  login() {
    const host = 'https://flea-market.wogengapp.cn/api/v1/';
    wx.login({
      success: res => {
        //console.log("res", res)
        //insert next code here
        console.log("code", res.code);
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
              console.log("userInfo", res.data);
              wx.setStorageSync('userInfo', res.data);
              wx.reLaunch({
                url: '/pages/index/index'
              });
            }

            // this.globalData.userId = res.data.userId
          },

        })
      }
    })
  }
})