// pages/duty/duty.js
var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
      duty_data:{},
      duty_status:'begin_duty',
      page_status:'',//介绍签到页面显示的内容
      end_now_data:''//加班结束时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.duty_data){
      console.log(JSON.parse(options.duty_data),"------");
      this.setData({ 
        duty_data: JSON.parse(options.duty_data),
        duty_status:'end_duty'
        })
    }

    var that=this;
    that.getSystemTime();
  },

  getSystemTime:function(){
    var that = this;
    var date = new Date();
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 

    that.setData({now_data:(Y+'.'+M+'.'+D)});
  },

  goDutyDetail:function(){
    wx.navigateTo({
      url: '/pages/duty/duty_detail/duty_detail'
    })
  },

  //结束签到
  endDuty:function(){
    this.setData({
      page_status:true,
      end_now_data:util.formatTime(new Date())
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
    wx.navigateTo({
      url: '/pages/home/home',
    })
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