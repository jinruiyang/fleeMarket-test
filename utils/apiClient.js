const apiClient = {
  request(options, method) {
    const BASE_URL = 'https://flea-market.wogengapp.cn/api/v1/';

    wx.request({
      url: BASE_URL + options.path,
      header: {
        'X-fleaMarket-Token': wx.getStorageSync('userInfo').authorizationToken
      },
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
    this.request(options,'PUT')
  }
}
module.exports = apiClient;