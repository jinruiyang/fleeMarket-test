const apiClient = {
  request(options, method) {
    const BASE_URL = 'https://flea-market.wogengapp.cn/api/v1/';
    console.log(444444,method)
    var salmon = wx.getStorageSync('userInfo')
    console.log(55555,salmon)
    wx.request({
      url: BASE_URL + options.path,
      header: {
        'Content-Type': 'application/json',
        'X-fleaMarket-Token': salmon.authorizationToken
      },
      data: options.data,
      method: method,
      success: options.success
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
  }
}
module.exports = apiClient;