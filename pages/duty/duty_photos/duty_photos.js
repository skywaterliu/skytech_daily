import weCropper from '../../../resource/js/weCropper.js'
var util = require('../../../utils/util.js');
const __watermark_image__ = '../../../resource/images/xtgj.png'
const __watermark_font__ = util.formatTime(new Date());
const device = wx.getSystemInfoSync()


Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width: device.windowWidth,
      height: device.windowWidth,
      scale: 2.5,
      zoom: 8,
    },
    showPhotos: 'camera',
    selectedAddress: '',
    imageList: [],
    phoneInfo: {}
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    console.info(this.data.src);
    this.wecropper.getCropperImage((src) => {
      if (src) {
        console.log(src, "src")
        let pages = getCurrentPages(); //当前页面
        let prevPage = pages[pages.length - 2]; //上一页面
        prevPage.setData({ //直接给上移页面赋值
          imagePathList: this.data.imageList.concat(src)
        });
        wx.navigateBack({
          url: '/pages/duty/duty_detail/duty_detail'
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  uploadTap() {
    const self = this;
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success(res) {
    //     const src = res.tempFilePaths[0]
    //     //  获取裁剪图片资源后，给data添加src属性及其值

    //     self.wecropper.pushOrign(src)
    //   }
    // })
    wx.createCameraContext().takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
          showPhotos: 'photo'
        })

        self.wecropper.pushOrign(res.tempImagePath);
      }
    })
  },
  reUploadTap: function() {
    this.setData({
      showPhotos:'camera',
      src:null
    });
  },

  onLoad(option) {
    var that = this;
    wx.getSystemInfo({
      success: function(e) {
        console.log(e, "手机信息");
        that.setData({
          phoneInfo: e
        })
      }
    })

    const {
      cropperOpt
    } = this.data

    wx.getImageInfo({
      src: __watermark_image__,
      success(res) {
        const {
          path
        } = res

        new weCropper(cropperOpt)
          .on('ready', (ctx) => {
            console.log(`wecropper is ready for work!`)
          })
          .on('beforeImageLoad', (ctx) => {
            console.log(`before picture loaded, i can do something`)
            console.log(`current canvas context:`, ctx)
            wx.showToast({
              title: '上传中',
              icon: 'loading',
              duration: 20000
            })
          })
          .on('imageLoad', (ctx) => {
            console.log(`picture loaded`)
            console.log(`current canvas context:`, ctx)
            wx.hideToast()
          })
          .on('beforeDraw', (ctx) => {
            console.log(`before canvas draw,i can do something`)
            console.log(`current canvas context:`, ctx)
            //  那就尝试在图片上加个水印吧
            // ctx.drawImage(path, 50, 50, 50, 30)
            ctx.setFontSize(12)
            ctx.setFillStyle('#ffffff')
            ctx.fillText(__watermark_font__, that.data.phoneInfo.windowWidth - 130, 300)
          })
      }
    })
  }
})