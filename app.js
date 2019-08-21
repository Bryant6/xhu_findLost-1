App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    //是否有openid的缓存
    var isOpenidHave = false;
    //清除数据缓存并查看是否有openid
    wx.getStorageInfo({
      success: function(res) {
        for (let i = 0; i < res.keys.length; i++) {
          if (res.keys[i] != 'openid') {
            wx.removeStorage({
              key: res.keys[i]
            })
          } else {
            isOpenidHave = true;
          }
        }
        console.log("清楚数据缓存");

        if (!isOpenidHave) {
          console.log("云获取openid")
          // 获取用户唯一凭证
          let openid = null;
          let appid = "wxdcc38317dcf7db7a";
          let secret = "f9a555e9688e1b524103b26e41f1ae3f";
          let code = "";

          wx.login({
            success(res) {
              code = res.code;
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                method: 'get',
                data: {
                  appid: appid,
                  secret: secret,
                  js_code: code,
                  grant_type: "authorization_code"
                },
                success(res) {
                  openid = res.data.openid;
                  console.log(openid)
                  wx.setStorage({
                    key: 'openid',
                    data: openid,
                  })
                },
                fail(res) {
                  console.log("获取唯一凭证失败")
                  console.log(res)
                }
              })
            }
          })
        }
      },
    })
  },
  globalData: {
    userInfo: null,
    url: 'http://www.xhufindlost.com:8080/xhu_findlost/'
    // url:'http://106.52.183.243:8080/xhu_findlost/'
    // url: 'http://mumucoder.free.idcfengye.com/'
    // url: 'http://localhost:8080/',
    // url: 'http://xiaobai.free.idcfengye.com/'
  },
})