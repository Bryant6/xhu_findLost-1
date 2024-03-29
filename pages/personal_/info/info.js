// pages/personal_/info/info.js
const app = getApp();
const url = app.globalData.url;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    picker: ['马克思主义学院', '经济学院', '管理学院', '文学与新闻传播学院', '外国语学院', '美术与设计学院', '音乐与舞蹈学院', '社会发展学院', '计算机与软件工程学院', '理学院', '材料科学与工程学院', '机械工程学院', '能源与动力工程学院', '电气与电子信息学院', '土木建筑与环境学院', '汽车与交通学院', '食品与生物工程学院', '体育学院', '知识产权学院、法学院', '大健康管理学院', '航空航天学院', '西华学院', '凤凰学院', '应用技术学院', '后备军官学院'],
    index1: -1,
    picker1: ['2015级', '2016级', '2017级', '2018级', '2019级'],
    stuName: "", //名字
    stuNum: "", //学号
    stuMajor: "" //专业
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  PickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  PickerChange1: function(e) {
    this.setData({
      index1: e.detail.value
    })
  },
  nameInput: function(e) {
    this.data.stuName = e.detail.value;
  },
  numInput: function(e) {
    this.data.stuNum = e.detail.value;
  },
  majorInput: function(e) {
    this.data.stuMajor = e.detail.value;
  },
  //提交
  submit: function() {
    var that = this;
    //判断是否为空
    if (this.data.stuName == '' || this.data.stuNum == '' || this.data.stuMajor == '' || this.data.index == -1 || this.data.index1 == -1) {
      wx.showToast({
        title: '请填取完整信息',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '保存中',
    })

    //取出openid
    let openid="";
    try {
      openid = wx.getStorageSync("openid");
    }catch(e){
      wx.showToast({
        title: '系统故障1',
        icon: 'none'
      })
    }
    
    //上传信息
    wx.request({
      url: url + 'personal/stuInfo',
      method: "POST",
      data: {
        stuName: that.data.stuName,
        stuNum: that.data.stuNum,
        stuClass: that.data.picker1[that.data.index1],
        stuAcademy: that.data.picker[that.data.index],
        stuMajor: that.data.stuMajor,
        openid:openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data == 'yes') {
          wx.showToast({
            title: '保存成功'
          })
        } else {
          wx.showToast({
            title: '系统故障',
            icon: 'none'
          })
        }
      },
      complete() {
        wx.hideLoading();
      }
    })
  }
})