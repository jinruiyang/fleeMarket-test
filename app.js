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
    
  }
})