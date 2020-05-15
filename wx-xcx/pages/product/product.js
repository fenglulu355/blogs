// pages/product/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proli: [{
      img: '/image/pro01.png',
      name: 'ST-E80',
      price: '3590',
      id: 0
    }, {
      img: '/image/pro02.png',
      name: 'ST-E80',
      price: '3590',
      id: 1
    }, {
      img: '/image/pro03.png',
      name: 'ST-E80',
      price: '3590',
      id: 2
    }, {
      img: '/image/pro04.png',
      name: 'ST-E80',
      price: '3590',
      id: 3
    }, {
      img: '/image/pro05.png',
      name: 'ST-E80',
      price: '3590',
      id: 4
    }, {
      img: '/image/pro06.png',
      name: 'ST-E80',
      price: '3590',
      id: 5
    }]
  },
  todetail(e) {
    console.log(e);
    let id = e.currentTarget.dataset.id
    console.log(id);
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
      success: function (res) {
        // success
        console.log("'../detail/detail?id='  "+id);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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