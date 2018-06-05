Page({
    data: {
        percent: 0
    },
    onLoad: function (options) {
        var that = this;
        var num = 0;
        var timer = setInterval(function () {
            num = num + 5;
            that.setData({
                percent: num
            })
            if (num >= 100) {
                num = 0;
                clearInterval(timer);
                wx.navigateTo({
                    url: '/pages/login/login'
                })
            }
        }, 100);

    }
})