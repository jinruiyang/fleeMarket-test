const app = getApp
const apiClient = {
  request(options, method) {
    const BASE_URL = 'https://flea-market.wogengapp.cn/api/v1/';
    // const BASE_URL = 'http://localhost:3000/api/v1/';
    console.log(444444,method)
    
    console.log(55555,salmon)
    const headers = {
      'Content-Type': 'application/json'
    };

    var salmon = wx.getStorageSync('userInfo')
    if (salmon) {
      headers['X-fleaMarket-Token'] = salmon.authorizationToken
    }

    wx.request({
      url: BASE_URL + options.path,
      header: headers,
      data: options.data,
      method: method,
      success: options.success,
      fail: ((res) => {
        console.log(res)
      })
    })
  },
  post(options) {
    this.request(options, 'POST')
  },
  get(options) {
    this.request(options, 'GET')  
  },
  put(options){
    this.request(options, 'PUT')
  },
  delete(options) {
    this.request(options, 'DELETE')
  }
}
module.exports = apiClient;