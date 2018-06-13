// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList:[],
    burstList:[],


    inputValue: '',//点击结果项之后替换到文本框的值
    adapterSource: ["吴琰", "孙结晶", "陈建", "梁媛", "拉拉", "wechat", "android", "Android", "ios", "iOS", "java", "javascript", "微信小程序", "微信公众号", "微信开发者",
      "微信开发者工具"],//本地匹配源
    bindSource: []//绑定到页面的数据，根据用户输入动态变化
  },



  //事件处理函数
  /*点击减号*/
  bindMinus: function (e) {
    var num = this.data.workList[e.currentTarget.id].num;
    if (num > 0) {
      this.data.workList[e.currentTarget.id].num=num-0.5;
    }
    this.setData({
      workList: this.data.workList
    })
  },
  /*点击加号*/
  bindPlus: function (e) {
    var num=this.data.workList[e.currentTarget.id].num;
    this.data.workList[e.currentTarget.id].num = num+0.5;
  
    this.setData({
      workList: this.data.workList,
    })
  },
  changeCompletionDegree:function(e){
    this.data.workList[e.currentTarget.id].completion_degree=e.detail.value;
    this.setData({
      workList: this.data.workList,
    })
  },
  

  /*** 确认form ***/
  formSubmit:function(e){
    wx.showToast({
      title: '提交成功',
      icon: 'succes',
      duration: 3000,
      mask: true
    })
    console.log(e);
    setTimeout(function(){
      wx.navigateTo({
        url: '/pages/home/home',
      })
    },3000)
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      that.setData({
        workList:[{
          task:'计划任务1',
          completion_degree:'21',
          num:0
        },{
            task: '计划任务2',
            completion_degree: '2',
            num: 0
        },{
            task: '计划任务3',
            completion_degree: '1',
            num: 0
        },{
            task: '计划任务4',
            completion_degree: '3',
            num: 0
        }]
      })
  },

  //增加突发事件
  addburst:function(){
    var that = this;
    var burstWorkList = this.data.burstList;
    burstWorkList.push({

      task: '',
      completion_degree: '',
      num: 0

    });
    that.setData({
      burstList: burstWorkList
    })
  },
  //删除突发事件
  deleteBurst:function(e){
    var that=this;
    this.data.burstList.splice(e.currentTarget.id,1);
    console.log(this.data.burstList,"新增的突发事件");
    that.setData({
      burstList:this.data.burstList
    })
  },
  //突发事件－
  burstMinus:function(e){
    var num = this.data.burstList[e.currentTarget.id].num;
    if (num > 0) {
      this.data.burstList[e.currentTarget.id].num = num - 0.5;
    }
    this.setData({
      burstList: this.data.burstList
    })
  },

  //突发事件+
  burstPlus:function(e){
    var num = this.data.burstList[e.currentTarget.id].num;
    this.data.burstList[e.currentTarget.id].num = num + 0.5;

    this.setData({
      burstList: this.data.burstList,
    })
  },

  //突发事件调整完成进度
  burstChangeCompletionDegree:function(e){
    this.data.burstList[e.currentTarget.id].completion_degree = e.detail.value;
    this.setData({
      burstList: this.data.burstList,
    })
  },

  //改变突发事件的task
  changeBurstTask:function(e){
    this.data.burstList[e.currentTarget.id].task = e.detail.value;
    this.setData({
      burstList: this.data.burstList,
    })
  },

  //当键盘输入时，触发input事件
  bindinput: function (e) {
    var tempValue = e.detail.value;
    if(tempValue.indexOf(";")!=-1){
      tempValue=tempValue.substring(tempValue.lastIndexOf(';')+1,tempValue.length).trim();
    }
    var prefix = tempValue//用户实时输入值
    var newSource = []//匹配的结果
    if (prefix != "") {
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          newSource.push(e)
        }
      })
    }
    if (newSource.length != 0) {
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
    }
  },
  itemtap: function (e) {
    this.setData({
      inputValue: this.data.inputValue+e.target.id+";",
      bindSource: []
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