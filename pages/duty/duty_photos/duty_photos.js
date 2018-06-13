// // pages/duty/duty_photos/duty_photos.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     src: '',
//     imageList: [],
//     countIndex: 3,//最多上传图片的数量
//     count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     selectedAddress:''
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var that=this;
//     if (options.selectedAddress){
//       that.setData({ selectedAddress: options.selectedAddress})
//     }
//   },

//   //拍照
//   chooseImage: function () {
//     var that = this;
//     wx.chooseImage({
//       count: this.data.count[this.data.countIndex],
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {
//         console.log(res)
//         that.setData({
//           imageList: res.tempFilePaths
//         })
//         // wx.saveFile({
//         //   tempFilePath: res.tempFilePaths[0],
//         //   success: function (res) {
//         //     var savedFilePath = res.savedFilePath;
//         //     console.log(savedFilePath,"aaaa");
//         //   }
//         // })
//       }
//     })
//   },
//   previewImage: function (e) {
//     var current = e.target.dataset.src
//     wx.previewImage({
//       current: current,
//       urls: this.data.imageList
//     })
//   },

//   confirmPhotos:function(){
//     wx.redirectTo({
//       url: '/pages/duty/duty_detail/duty_detail?imagePathList=' + JSON.stringify(this.data.imageList)
//       + '&address_name=' + this.data.selectedAddress
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   }









// })










import weCropper from '../../../resource/js/weCropper.js'

const __watermark_image__ = '../../../resource/images/xtgj.png'
const __watermark_font__ = '低碳认证'
const device = wx.getSystemInfoSync()

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width: device.windowWidth,
      height: device.windowWidth,
      scale: 2.5,
      zoom: 8
    }
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
    this.wecropper.getCropperImage((src) => {
      if (src) {
        console.log(src)
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    const { cropperOpt } = this.data

    wx.getImageInfo({
      src: __watermark_image__,
      success(res) {
        const { path } = res

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
            ctx.setFontSize(14)
            ctx.setFillStyle('#ffffff')
            ctx.fillText(__watermark_font__, 265, 350)
          })
      }
    })
  }
})
