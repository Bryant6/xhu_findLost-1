// pages/publish/publish.js
const app = getApp();
const url = app.globalData.url;

function success_upload() {
  wx.showToast({
    title: '上传成功',
    icon: 'success',
    duration: 2000,
    success() {
      setTimeout(
        function() {
          wx.navigateBack({
            delta: 1
          })
        },
        2000
      )
    }
  })
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [
      ['卡类', '电子', "生活用品"],
      ['校园卡', '身份证', '游泳卡', '银行卡']
    ],
    multiIndex: [0, 0],
    imgList: [''], //图片链接
    img_select: false, //是否选择了图片
    contact_select: [true, false, false],
    contact_way: 'qq号',
    goods_contact: "", //联系方式
    goods_postscrit: "", //附言
    publish_category: "", //发布种类？失物寻找：失物归还
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    if (options.id == '1') {
      this.setData({
        publish_category: '失物寻找'
      })
    } else {
      this.setData({
        publish_category: '失物归还'
      })
    }
  },
  postscrptInput: function(e) {
    this.data.goods_postscrit = e.detail.value;
  },
  contactInput: function(e) {
    this.data.goods_contact = e.detail.value;
  },
  MultiChange(e) {
    console.log(e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    console.log("value:" + e.detail.value)
    console.log("colomn:" + e.detail.column)
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['校园卡', '身份证', '游泳卡', '银行卡'];
            break;
          case 1:
            data.multiArray[1] = ['手机', '耳机', 'U盘','手表'];
            break;
          case 2:
            data.multiArray[1] = ['伞', '水杯', '书包','帽子']
        }
        data.multiIndex[1] = 0;
    }
    this.setData(data);
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
      title: '小可爱',
      content: '确定要删除这段图片吗？',
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
  contact_way_change: function(e) {
    let id = e.currentTarget.dataset.id;
    if (id == "qq") {
      this.setData({
        contact_select: [true, false, false],
        contact_way: 'qq号'
      })
    } else if (id == "weixin") {
      this.setData({
        contact_select: [false, true, false],
        contact_way: '微信号'
      })
    } else {
      this.setData({
        contact_select: [false, false, true],
        contact_way: '手机号'
      })
    }
  },
  //发布
  submit: function() {
    var _this = this;
    //判断是否填好信息
    if (this.data.goods_postscrit == "" || this.data.goods_contact == "") {
      wx.showToast({
        title: '请填完信息',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.img_select && this.data.publish_category == '失物归还') {
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    //如果选择了图片
    if (_this.data.img_select) {
      //上传图片和基本信息
      wx.uploadFile({
        url: url + 'publish/findGoodsSubmit',
        filePath: _this.data.imgList[0],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          goodsBigkind: _this.data.multiArray[0][_this.data.multiIndex[0]], //大类
          goodsSmallkind: _this.data.multiArray[1][_this.data.multiIndex[1]], //小类
          goodsPostscrit: _this.data.goods_postscrit, //附言
          goodsContact: _this.data.goods_contact, //联系方式
          goodsContact_way: _this.data.contact_way, //联系方式 qq weixin phone
          publishCategory: _this.data.publish_category //失物寻找？失物归还
        },
        success(res) {
          let data = res.data
          if (data == "yes") {
            success_upload();
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
        url: url + 'publish/findGoodsSubmitNoImg',
        data: {
          goodsBigkind: _this.data.multiArray[0][_this.data.multiIndex[0]], //大类
          goodsSmallkind: _this.data.multiArray[1][_this.data.multiIndex[1]], //小类
          goodsPostscrit: _this.data.goods_postscrit, //附言
          goodsContact: _this.data.goods_contact, //联系方式
          goodsContact_way: _this.data.contact_way, //联系方式 qq weixin phone
          publishCategory: _this.data.publish_category //失物寻找？失物归还
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          let data = res.data
          if (data == "yes") {
            success_upload();
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