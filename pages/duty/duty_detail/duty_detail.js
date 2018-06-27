// pages/duty/duty_detail/duty_detail.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */

  data: {
    now_data: '',
    selectedAddress: '',
    imagePathList: [],
    programValue: '',
    remarkValue: '',
    overtimeWorkType: '',
    itemList: ['司内', '司外'],
    projectList: [],
    overtimeWorkEnrollment: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info("invoke duty_detail onload");
    var that = this;
    that.getSystemTime();
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; //上一页面
    var overtimeWorkEnrollment = prevPage.data.overtimeWorkEnrollment;
    var empInfo = wx.getStorageSync('empInfo');
    overtimeWorkEnrollment.employee_id = empInfo.employee_id;
    overtimeWorkEnrollment.employee_name = empInfo.employee_name;
    this.data.overtimeWorkEnrollment = overtimeWorkEnrollment;
    console.info("duty_detail onload 中的 overtimeWorkEnrollment init");
  },

  getSystemTime: function() {
    var that = this;
    var time = util.formatTime(new Date());
    that.setData({
      now_data: time
    });
  },

  goAddress: function() {
    wx.navigateTo({
      url: '/pages/duty/duty_addr/duty_addr?imagePathList=' + JSON.stringify(this.data.imagePathList)
    })
  },

  goPhotos: function() {
    wx.navigateTo({
      url: '/pages/duty/duty_photos/duty_photos?selectedAddress=' + this.data.selectedAddress
    })
  },

  previewImage: function(e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imagePathList
    })
  },
  changeRemark: function(e) {
    this.setData({
      remarkValue: e.detail.value
    });
  },
  //司内司外选择
  chooseOvertimeWorkType: function(e) {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.itemList,
      success: function(res) {
        if (!res.cancel) {
          console.log(res);
          var overtimeWorkEnrollment = that.data.overtimeWorkEnrollment;
          overtimeWorkEnrollment.in_office = res.tapIndex == 0 ? true : false;
          that.setData({
            overtimeWorkType: that.data.itemList[res.tapIndex],
            overtimeWorkEnrollment: overtimeWorkEnrollment
          });
        }
      }
    });
  },
  //获取所有项目
  getOvertimeProject: function() {
    var that = this;
    wx.request({
      url: 'base/employee',
      method: 'GET',
      success: function(res) {
        var projectList = res.data;
        that.data.orgProjectList = projectList;
        that.dealProjectList(res.data);
      },
      fail: function(res) {
        res = wx.getStorageSync('projectList');
        that.data.orgProjectList = res.data;
        that.dealProjectList(res.data);
      }
    })
  },
  dealProjectList: function(projectList) {
    var list = [];
    for (var index in projectList) {
      list.push(projectList[index].name);
    }
    this.setData({
      projectList: list,
      projectIndex: 0
    })
  },
  //选择加班项目
  bindProjectChange: function(e) {
    console.info(e);
    var overtimeWorkEnrollment = this.data.overtimeWorkEnrollment;
    var projectId = this.data.orgProjectList[e.detail.value].pkid;
    overtimeWorkEnrollment.project_id = projectId;
    this.setData({
      overtimeWorkEnrollment: overtimeWorkEnrollment
    })
  },

  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e);
    var overtimeWorkEnrollment = this.data.overtimeWorkEnrollment;
    overtimeWorkEnrollment.description = e.detail.value.remarkValue;
    overtimeWorkEnrollment.check_in_spot = this.data.selectedAddress;

    console.info("final overtimeWorkEnrollment", overtimeWorkEnrollment);
    var url = "/employees/" + wx.getStorageSync("empInfo").employee_id + "/overtime-work-check-in";
    wx.request({
      url: url,
      method: "POST",
      data: {
        overtimeWorkEnrollment: overtimeWorkEnrollment
      },
      success: function(res) {
        wx.navigateBack({
          url: '/pages/duty/duty'
        })
      },
      fail: function(res) {
        wx.navigateBack({
          url: '/pages/duty/duty'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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
    this.getOvertimeProject();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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