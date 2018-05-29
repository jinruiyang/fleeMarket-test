// pages/seeker/listener_apply/listener_apply.js

// const apiClient = require('../../../utils/apiClient.js');
// const upload = require('../../../utils/uploader.js');

// const uploadFile = (filePath) => {
//   return new Promise(((resolve, reject) => {
//     upload({
//       file: filePath,
//       success: resolve,
//       fail: reject
//     });
//   }));
// };

Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditions: ['Select One Below', 'Brand New - Never Used', 'Like New', 'Used', 'Very Used'],
    occupations: [],
    deliveries: ['Select One Below', 'Must Be Picked Up', 'Can Be Mailed at Market Rate', 'Other'],
    step: 0,
    errors: {},
    termData: {},
    terms: [],
    userInput: {
      condition: 0,
      region: '请选择',
      deliveries: 0,
      bio: '',
      ability: '',
      photo: '',
      certificatePhotos: []
    }
  },

  viewTerm(e) {
    wx.navigateTo({
      url: `../../common/view_term/view_term?termKey=${e.currentTarget.dataset.termKey}`,
    });
  },

  loadTerms() {
    apiClient.get({
      path: '/terms',
      success: (res) => {
        console.log(res);
        this.setData({
          terms: res.data.data
        });

        // wemark.parse(res.data.data, this, {
        //   // 新版小程序可自适应宽高
        //   // imageWidth: wx.getSystemInfoSync().windowWidth - 40,
        //   name: 'termData'
        // });
      }
    });
  },

  choosePhotosOfCertificates() {
    wx.navigateTo({
      url: '../certificate_photos/certificate_photos',
    });
  },

  titleChanged(event) {
    this.updateInput('title', event.detail.value);
  },

  priceChanged(event) {
    this.updateInput('price', event.detail.value);
  },

  descriptionChanged(event) {
    this.updateInput('description', event.detail.value);
  },

  tagChanged(event) {
    this.updateInput('tag', event.detail.value);
  },

  validatePresence(key) {
    if (!this.data.userInput[key] || this.data.userInput[key] === '') {
      this.data.errors[key] = '不能为空';
      this.setData({
        errors: this.data.errors
      });
    }
  },

  validateLength(key, min, max) {
    if (!this.data.userInput[key] ||
      this.data.userInput[key].length < min ||
      this.data.userInput[key].length > max) {
      this.data.errors[key] = '长度不符合要求';
      this.setData({
        errors: this.data.errors
      });
    }
  },

  validatePick(key) {
    if (!this.data.userInput[key] || this.data.userInput[key] === '请选择') {
      this.data.errors[key] = '必选';
      this.setData({
        errors: this.data.errors
      });
    }
  },

  validateThenNext() {
    if (this.data.step === 0) {
      this.validatePresence('title');
      this.validatePresence('price');
      this.validatePresence('description');
      this.validatePresence('tag');
      this.validatePick('region');
    } else if (this.data.step === 1) {
      this.validatePresence('bio');
    } else if (this.data.step === 2) {
      this.validatePresence('photo');
    } else if (this.data.step === 4) {
      wx.navigateBack();

      return;
    }

    if (Object.keys(this.data.errors).length === 0) {
      console.log(this.data.userInput);
      this.setData({
        step: this.data.step + 1
      });

      if (this.data.step === 3) {
        this.loadTerms();
      }

      if (this.data.step === 4) {
        apiClient.post({
          path: '/listeners/apply',
          data: {
            payload: JSON.stringify(this.data.userInput)
          },
          success: (res) => {
            console.log(res);
          }
        });
      }
    }
  },

  updateInput(key, value) {
    this.data.userInput[key] = value;
    delete this.data.errors[key];
    this.setData({
      userInput: this.data.userInput,
      errors: this.data.errors
    });
  },

  conditionChanged(event) {
    this.updateInput('condition', event.detail.value);
  },

  regionChanged(event) {
    this.updateInput('region', event.detail.value);
  },

  deliveryChanged(event) {
    this.updateInput('delivery', event.detail.value);
  },

  bioChanged(event) {
    this.updateInput('bio', event.detail.value);
    this.validateLength('bio', 15, 148);
  },

  abilityChanged(event) {
    this.updateInput('ability', event.detail.value);
    this.validateLength('ability', 0, 20);
  },

  chooseImage() {
    wx.chooseImage({
      success: (res) => {
        console.log(res);
        const filePath = res.tempFiles[0].path;
        const fileSize = res.tempFiles[0].size;

        if (fileSize > 2000000) {
          wx.showToast({
            title: '图片尺寸过大',
            image: '/assets/images/error.png'
          });
        } else {
          uploadFile(filePath).then((uploadResp) => {
            // console.log(uploadResp);
            this.updateInput('photo', uploadResp.imageURL);
          });
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // apiClient.get({
    //   path: '/listeners/active-application',
    //   success: (res) => {
    //     console.log(res.data);
    //     if (res.data.data) {
    //       this.setData({
    //         step: 4
    //       });
    //     }
    //   }
    // });

    // this.loadTerms();
  },

  onShow() {
    wx.getStorage({
      key: 'seeker/certificate-photos',
      success: (res) => {
        console.log(res);
        this.data.userInput.certificatePhotos = res.data;

        this.setData({
          userInput: this.data.userInput
        });
      },
    });
  }
});
