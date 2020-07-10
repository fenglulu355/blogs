// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['/image/top01.png',
				'/image/top02.png',
				'/image/top03.png'
					],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
	showlist:[{img:'/image/home01.png',height:190},
		{img:'/image/home02.png',height:190},
		{img:'/image/home03.png',height:140},
		{img:'/image/home04.png',height:140},	
		{img:'/image/home05.png',height:145}
	]
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