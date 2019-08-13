const app = getApp();
const url = app.globalData.url;
// pages/personal_/suggest/suggest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest: '', //建议
    contact: '', //联系方式
    imgList: [''], //图片链接
    img_select: false, //是否选择了图片
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
        console.log("我已经到底了")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  textareaAInput: function(e) {
    this.data.suggest = e.detail.value;
  },
  contactInput: function(e) {
    this.data.contact = e.detail.value;
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          img_select: true,
          imgList: res.tempFilePaths
        })
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '亲',
      content: '确定要删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.setData({
            img_select: false
          })
          this.data.imgList = [''];
        }
      }
    })
  },
  //上传
  submit:function(){

    var _this=this;
    //如果选择了图片
    if (img_select) {
      //上传图片和基本信息
      wx.uploadFile({
        url: url + 'personal/feedback',
        filePath: _this.data.imgList[0],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          suggest:_this.data.suggest,//建议
          contact:_this.data.contact//联系方式
        },
        success(res) {
          let data = res.data
          if (data == "yes") {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail() {
          wx.showToast({
            title: '上传失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      //没有选择图片
      wx.request({
        url: url + 'personal/feedbackNoImg',
        data: {
          suggest: _this.data.suggest,//建议
          contact: _this.data.contact//联系方式
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          let data = res.data
          if (data == "yes") {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail() {
          wx.showToast({
            title: '上传失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }


  }
})