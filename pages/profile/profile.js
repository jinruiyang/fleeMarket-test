// pages/profile/profile.js
const app = getApp();
const apiClient = require('../../utils/apiClient.js');
const AV = require('../../utils/av-weapp.min.js');

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
    console.log(666666, "onLoad Profile.js")
    let page = this;
    //console.log("this", this);
    // const user_id = wx.getStorageSync('userInfo').userId

    // Get user data from server (to show in form)
    apiClient.get({
      path: 'profile',
      success(res) {
        console.log(333333,res.data)
        var _profile = res.data.profile;
        // var storage = wx.getStorageSync(key)
        // save profile at this.data.profile
        page.setData({ profile: _profile,
        my_items: _profile.my_items
         });
         //console.log("my_items", page.data.my_items);
        app.globalData.profile = _profile;
        console.log("my items", page.data.my_items);
        //console.log(123, page.data)

      }
    })

  },

  showItem: function (e) {
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
  },

  deleteItem: function (e) {
    const id = e.currentTarget.dataset.id
    apiClient.delete({
      path: `items/${id}`,
      success(res) {
        wx.reLaunch({
          url: '/pages/profile/profile',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        });
      }
    });
  },

  editProfile: function(){
    wx.navigateTo({
      url: `/pages/edit-profile/edit-profile`,
    })

  },

  uploadImages: function () {
    let that = this

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log("res", res)
        let tempFilePath = res.tempFilePaths[0];
        that.setData({ imagePath: tempFilePath })
        console.log("tempFilePath", tempFilePath)
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {
            console.log("file.url", file.url())
            that.setData({
              imagePath: file.url()
            });
            console.log("imagePath", that.data.imagePath)
            //  console.log("liveurl", that.data.imagePath)
          },

          ).catch(console.error);
        //console.log("liveurl", that.data.imagePath )
        // let imagePath = file.url()
        // that.setData({ imagePath: file.url() })
      }
    });
    let userContact = { qr_code: that.data.imagePath };
    apiClient.put({
      path: 'profile',
      data: {
        userContact: userContact
      },
      success(res) {
        // res.data = profile;
        console.log("response information", res.data)
        wx.reLaunch({
          url: '/pages/profile/profile'
        });
      }
    })
  },

  goToEditPage: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/edit/edit?id=${id}`
    })
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
  }

  //* Navabar Function*//

      
})