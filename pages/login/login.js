// pages/login/login.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  //todo:
  login: function(e) {
    console.info(e);
    var user = e.detail.value;
    if (!this.verify(user)) {
      return;
    } else {
      wx.request({
        url: 'www.skytech.com/users/' + user.username + '/' + user.password,
        method: "GET",
        success: function(res) {
          wx.setStorageSync("empInfo", res);
          wx.redirectTo({
            url: '/pages/home/home'
          })
        },
        fail: function(res){
          console.info("failed");
          wx.setStorageSync("empInfo", {
            pkid: 'fafafafa',
            username: 'liuts',
            password: 'aaa@111',
            employee_id: 'empid-0aaaaa',
            employee_name:'刘天水',
            employee_no: '1995',
          });
          wx.redirectTo({
            url: '/pages/home/home'
          })
        }
      })
    }
  },
  verify: function(user) {
    if (util.isEmpty(user.username)) {
      wx.showModal({
        content: '请输入用户名',
        showCancel: false,
        success: function(res) {
        }
      });
      return false;
    }
    if (util.isEmpty(user.password)) {
      wx.showModal({
        content: '请输入密码',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
          }
        }
      });
      return false;
    }
    return true;
  }

})