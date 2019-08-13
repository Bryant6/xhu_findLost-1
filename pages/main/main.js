// pages/main/main.js
const app = getApp();
const url = app.globalData.url;

//封装request为Promise
function createPromise(dataUrl, page, kind) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url + dataUrl,
      data: {
        page: page,
        kind: kind
      },
      success(res) {
        resolve(res);
      }
    })
  })
}

function Toast() {
  wx.showToast({
    title: '亲，我已经到底了',
    icon: 'none',
    duration: 1400
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    dataList: null, //前台渲染数据
    selected: true, //true 为寻找失物   false认领失物
    bigKind: '全部', //大类
    cardCur: 0, //轮番图
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '请等待',
    })
    let that = this;
    Promise.all([
      //获取全部找失物数据
      createPromise("findGoodsSort", 0, '全部'),
      //获取大类找失主数据
      createPromise("findOwnerSort", 0, '全部')
    ]).then(function(res) {
      let [data1, data2] = res;
      that.setData({
        dataList: data1.data
      })
      wx.hideLoading();
      let json_obj = {
        "findOwnerSort": data2.data,
        "findGoodsSort": data1.data,
        "findOwnerSortPage": 0,
        "findGoodsSortPage": 0
      }
      wx.setStorage({
        key: '全部',
        data: json_obj,
      })
      console.log("全部--存入缓存成功")
    })
  },
  //下拉触顶刷新数据
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '刷新中',
    })
    console.log("我已经到顶了");
    var that = this;
    let kind = this.data.bigKind;

    //寻找失物
    if (this.data.selected) {
      wx.request({
        url: url + 'findGoodsSort',
        data: {
          page: 0,
          kind: kind
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            dataList: res.data
          })
          wx.stopPullDownRefresh();
          wx.hideLoading();
          //修改缓存
          try {
            let value = wx.getStorageSync(kind);
            value.findGoodsSort = res.data;
            value.findGoodsSortPage = 0;
            wx.setStorage({
              key: kind,
              data: value
            })
          } catch (e) {
            console.log(e)
          }
        }
      })
    } else {
      //认领失物
      wx.request({
        url: url + 'findOwnerSort',
        data: {
          page: 0,
          kind: kind
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            dataList: res.data
          })
          wx.hideLoading();
          //修改缓存
          try {
            let value = wx.getStorageSync(kind);
            value.findOwnerSort = res.data;
            value.findOwnerSortPage = 0;
            wx.setStorage({
              key: kind,
              data: value
            })
          } catch (e) {
            console.log(e)
          }
        }
      })

    }

  },
  //上拉触底刷新数据
  onReachBottom:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    console.log("到达底部");
    let kind = this.data.bigKind;
    console.log(kind)
    try {
      let value = wx.getStorageSync(kind);
      if (this.data.selected) {
        wx.request({
          url: url + 'findGoodsSort',
          data: {
            page: value.findGoodsSortPage,
            kind: kind
          },
          success: function (res) {
            if (res.data.length == 0) {
              Toast();
              return;
            }
            console.log("更新数据");
            let newData = value.findGoodsSort.concat(res.data);
            console.log(newData);
            that.setData({
              dataList: newData
            })

            wx.hideLoading()

            //更新缓存
            let page = value.findGoodsSortPage + 6;
            value.findGoodsSort = newData;
            value.findGoodsSortPage = page;
            wx.setStorage({
              key: kind,
              data: value
            })
            console.log("更新缓存")
          }
        })
      } else {
        wx.request({
          url: url + 'findOwnerSort',
          data: {
            page: value.findOwnerSortPage,
            kind: kind
          },
          success: function (res) {
            if (res.data.length == 0) {
              Toast();
              return;
            }
            console.log("更新数据");
            let newData = value.findOwnerSort.concat(res.data);
            console.log(newData);
            that.setData({
              dataList: newData
            })

            wx.hideLoading()

            //更新缓存
            let page = value.findOwnerSortPage + 6;
            value.findOwnerSort = newData;
            value.findOwnerSortPage = page;
            wx.setStorage({
              key: kind,
              data: value
            })
            console.log("更新缓存")
          }
        })
      }
    } catch (e) {
      console.log(e);
    }
  },
  //切换寻找失物
  selected_btn1: function() {
    if (!this.data.selected) {
      let kind = this.data.bigKind;
      console.log(kind + "切换到寻找失物");
      //按照大类读取缓存
      try {
        let value = wx.getStorageSync(kind)
        this.setData({
          selected: true,
          dataList: value.findGoodsSort
        })
      } catch (e) {
        console.log("读取缓存失败");
      }
    }
  },
  //切换认领失物
  selected_btn2: function() {
    if (this.data.selected) {
      let kind = this.data.bigKind;
      console.log(kind + "切换到认领失物");
      //按照大类读取缓存
      try {
        let value = wx.getStorageSync(kind)
        this.setData({
          selected: false,
          dataList: value.findOwnerSort
        })
      } catch (e) {
        console.log("读取缓存失败");
      }
    }
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  //选择大类
  bigKind_change: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var bigKind = e.currentTarget.dataset.bigkind;
    console.log("大类：" + bigKind);
    this.setData({
      bigKind: bigKind,
      modalName: null
    })

    //判断是否有此key(大类)，以便缓存
    try {
      const res = wx.getStorageInfoSync()
      let haveKey = false; //是否拥有key(大类)
      for (let i = 0; i < res.keys.length; i++) {
        if (res.keys[i] == bigKind) {
          haveKey = true;
          break;
        }
      }
      //有此大类 读取缓存直接渲染
      if (haveKey) {
        console.log("缓存中有此大类")
        try {
          let list = wx.getStorageSync(bigKind);
          if (that.data.selected) {
            console.log(list.findGoodsSort)
            that.setData({
              dataList: list.findGoodsSort
            })
          } else {
            console.log(list.findOwnerSort)
            that.setData({
              dataList: list.findOwnerSort
            })
          }
          wx.hideLoading();
        } catch (e) {
          console.log(e);
        }

      } else {
        console.log("缓存中没有此大类")
        //没有此大类  请求数据 并且缓存数据
        let json_obj = {
          "findOwnerSort": "",
          "findGoodsSort": "",
          "findOwnerSortPage": 0,
          "findGoodsSortPage": 0
        };

        Promise.all([
          //获取大类找失物数据
          createPromise("findGoodsSort", 0, that.data.bigKind),
          //获取大类找失主数据
          createPromise("findOwnerSort", 0, that.data.bigKind)
        ]).then(function(res) {
          let [data1, data2] = res;
          if (that.data.selected) {
            that.setData({
              dataList: data1.data
            })
          } else {
            that.setData({
              dataList: data2.data
            })
          }
          wx.hideLoading();

          json_obj.findGoodsSort = data1.data;
          json_obj.findOwnerSort = data2.data;
          //存入缓存
          wx.setStorage({
            key: that.data.bigKind,
            data: json_obj,
          })
          console.log("存入缓存成功")
        })

      }
    } catch (e) {
      console.log(e)
    }
  },

  //触底刷新
  scrolltoBottom: function() {
    
  },
  //触顶刷新
  scrolltoTop: function() {
    

  }
})