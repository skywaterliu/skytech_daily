// pages/duty/duty_addr/duty_addr.js
var amapFile = require('../../../libs/amap-wx.js');
var markersData = {
  latitude: '',//纬度
  longitude: '',//经度
  key: "b9d57f7952ba2bb570a6ece041946e0d"//申请的高德地图key
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    imagePathList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    if (options.imagePathList){
      that.setData({ imagePathList: options.imagePathList})
    }

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        console.log(res);
        that.loadCity(latitude, longitude);
        that.resetMap(latitude, longitude);
      }
    })
  },

  //获取当前定位
  loadCity: function (latitude, longitude) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: markersData.key });
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
      success: function (data) {
        console.log(data);
        that.setData({
          items: data[0].regeocodeData.pois
        });
      },
      fail: function (info) {
        console.log(info);
      }
    });
  },

  bindAddrChange: function (e) {
    var that = this;
    const val = e.detail.value
    console.log(this.data.items[val[0]].name);
    var positionArr = this.data.items[val[0]].location.split(',');
    that.resetMap(positionArr[1], positionArr[0]);
  },
  bindChooseAddrtap: function (data) {
    wx.redirectTo({
      url: '/pages/duty/duty_detail/duty_detail?imagePathList=' + this.data.imagePathList
      +'&address_name=' + this.data.items[data.target.dataset.index].name
    })
  },
  resetMap: function (latitude, longitude) {
    this.setData({
      latitude: latitude, 
      longitude: longitude, 
      markers: [{
        id: 1,
        latitude: latitude,
        longitude: longitude,
        iconPath: '../../../resource/images/location.png'
      }]})
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