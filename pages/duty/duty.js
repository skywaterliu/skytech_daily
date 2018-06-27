// pages/duty/duty.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overtimeWorkEnrollment: {},
    validOvertimeWorkTime: '', //介绍签到页面显示的内容
    end_now_data: '', //加班结束时间,
    duty_status: '',
    period:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info('empInfo', wx.getStorageSync('empInfo'));
    var that = this;
    that.getSystemTime();
  },

  getSystemTime: function() {
    var that = this;
    var date = new Date();
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    that.setData({
      now_data: (Y + '.' + M + '.' + D)
    });
  },

  goDutyDetail: function() {
    wx.navigateTo({
      url: '/pages/duty/duty_detail/duty_detail'
    })
  },

  //结束签到
  endDuty: function() {
    var that = this;
    this.setData({
      page_status: true,
      end_now_data: util.formatTime(new Date())
    });
    var url = "/employees/"+wx.getStorageSync("empInfo").employee_id + "/overtime-work-check-out";
    wx.request({
      url: url,
      method:"POST",
      data:{
        overtimeWorkEnrollment: wx.getStorageSync("overTimeWorkInfo").data.overtimeWorkEnrollment
      },
      success:function(res){
        that.getDutyStatus();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.info("onShow invoke");
    this.getDutyStatus();
  },

  getDutyStatus: function() {
    var that = this;
    var empInfo = wx.getStorageSync('empInfo');
    var url = '/current-overtime-work-info/' + empInfo.employee_id;
    wx.request({
      url: url,
      method: 'GET',
      success: function(res) {
        res = wx.getStorageSync('overTimeWorkInfo');
        var overtimeWorkEnrollment = res.data.overtimeWorkEnrollment;
        var validOvertimeWorkTime = res.data.validOvertimeWorkTime;
        that.setData({
          validOvertimeWorkTime: validOvertimeWorkTime,
          overtimeWorkEnrollment: overtimeWorkEnrollment,
          period: res.data.period
        });
        that.setDutyStatus(res.data);
      },
      fail:function(res){
        res = wx.getStorageSync('overTimeWorkInfo');
        var overtimeWorkEnrollment = res.data.overtimeWorkEnrollment || {};
        var validOvertimeWorkTime = res.data.validOvertimeWorkTime;
        that.setData({
          validOvertimeWorkTime: validOvertimeWorkTime,
          overtimeWorkEnrollment: overtimeWorkEnrollment,
          period: res.data.period
        });
        that.setDutyStatus(res.data);
      }
    })
  },

  setDutyStatus: function(overtimeWorkInfo) {
    var overtimeWorkEnrollment = overtimeWorkInfo.overtimeWorkEnrollment || {};
    var beginTime = overtimeWorkEnrollment.begin_time;
    var endTime = overtimeWorkEnrollment.end_time;
    //可签到状态下，开始签到时间与结束签到时间都为空则页面为开始签到状态
    if (overtimeWorkInfo.validOvertimeWorkTime &&
      util.isEmpty(overtimeWorkEnrollment.begin_time) &&
      util.isEmpty(overtimeWorkEnrollment.end_time)
    ) {
      this.setData({
        duty_status: 'begin'
      });
    }
    //可签到状态下，开始签到时间不为空且结束签到时间为空则页面为结束签到状态
    else if (overtimeWorkInfo.validOvertimeWorkTime &&
      !util.isEmpty(overtimeWorkEnrollment.begin_time) &&
      util.isEmpty(overtimeWorkEnrollment.end_time)) {
      this.setData({
        duty_status: 'end'
      });
    }
    //可签到状态下，开始签到时间与结束签到时间都不为空则页面为完成状态
    else if (overtimeWorkInfo.validOvertimeWorkTime &&
      !util.isEmpty(overtimeWorkEnrollment.begin_time) &&
      !util.isEmpty(overtimeWorkEnrollment.end_time)) {
      this.setData({
        duty_status: 'finished'
      });
    }
    //其他状态为不可签到的时间段
    else{
      duty_status:'invalid'
    }
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // wx.navigateTo({
    //   url: '/pages/home/home',
    // })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})