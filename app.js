//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('overTimeWorkInfo', {
      data:{
        period: '2018-06-28',
        validOvertimeWorkTime: true,
        employee: {
          pkid: 'fa2324f',
          name: '刘天水',
          employee_no: '324sefsdf',
          department_id: '32rwerwe',
          job_title: '开发'
        },
        overtimeWorkEnrollment: {
          pkid: 'eew432',
          employee_id: 'sadfo3234_empId',
          employee_name: '刘天水',
          period: '2018-06-28',
          in_office: false,
          begin_time: '2018-06-28 11:11:22',
          end_time: null,
          project_id: null,
          description: null,
          enrollment_time: null,
          valid_times: 0,
          check_in_spot: '秋叶原',
          check_out_spot: null
        }
        // overtimeWorkEnrollment:null
      }
      
    })
    wx.setStorageSync('projectList', {
      data:[
        {
          pkid:'project_pkid_1',
          code:'p1',
          name:'project1',
          department_id:'fdaf',
          project_version_list:[]
        },
        {
          pkid: 'project_pkid_2',
          code: 'p2',
          name: 'project2',
          department_id: 'fdaf',
          project_version_list: []
        },
        {
          pkid: 'project_pkid_3',
          code: 'p3',
          name: 'project3',
          department_id: 'fdaf',
          project_version_list: []
        },
      ]
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.info("code:", res.code)
        wx.removeStorageSync('empInfo');
        // wx.request({
        //   url: 'www.skytech.com/users/authenticate-info/' + res.code,
        //   method: "GET",
        //   success: function(res) {
        //     this.globalData.authInfo = res.data;
        //   }
        // })
        if (false) {
          wx.setStorageSync("empInfo", {
            pkid: 'fafafafa',
            username: 'liuts',
            password: 'aaa@111',
            employee_id: 'empid-0aaaaa',
            employee_name:'刘天水',
            employee_no: '1995',
          });
          wx.redirectTo({
            url: '/pages/home/home',
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.info("setting", res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.info("getUserInfo", res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


  },
  globalData: {
    userInfo: null,
    authInfo: null
  }
})