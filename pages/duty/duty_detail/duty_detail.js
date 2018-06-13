// pages/duty/duty_detail/duty_detail.js
var util = require('../../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now_data: '',
    selectedAddress:'',
    imagePathList:[],
    programValue:'',
    remarkValue:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (options.address_name){
      that.setData({ selectedAddress: options.address_name })
    }
    if (options.imagePathList){
      that.setData({ imagePathList: JSON.parse(options.imagePathList)});
      console.log(options.imagePathList,"dsadasd");
    }
    that.getSystemTime();
  },

  getSystemTime: function () {
    var that=this;
    var time = util.formatTime(new Date()); 
    that.setData({ now_data: time });
  },

  goAddress:function(){
    wx.redirectTo({
      url: '/pages/duty/duty_addr/duty_addr?imagePathList=' + JSON.stringify(this.data.imagePathList)    
    })
  },

  goPhotos:function(){
    wx.redirectTo({
      url: '/pages/duty/duty_photos/duty_photos?selectedAddress=' + this.data.selectedAddress
    })
  },

  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imagePathList
    })
  },

  //获取加班项目
  changeProgramValue:function(e){
    this.setData({
      programValue:e.detail.value
    });
    console.log(e,"加班的项目");
  },
  changeRemark:function(e){
    this.setData({
      remarkValue: e.detail.value
    });
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e);
    wx.redirectTo({
      url: '/pages/duty/duty?duty_data=' + JSON.stringify(this.data)
    })
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})