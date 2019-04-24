// pages/shoppings/shopping.js
const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllSelect:false,
    totalmoney:0,
    carts : []
  },
  zhifu (e) {
    console.log(e)
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res){
        console.log('支付成功')
      },
      fail(res) {

      }
    })
  },
  //勾选事件处理函数 
  // switchSelect: function (e) {
  //   // 获取item项的id，和数组的下标值 
  //   var Allprice = 0, i = 0;
  //   let id = e.target.dataset.id,

  //   index = parseInt(e.target.dataset.index);
  //   this.data.data[index].isSelect = !this.data.data[index].isSelect;
  //   //价钱统计
  //   if (this.data.data[index].isSelect) {
  //     this.data.totalMoney = this.data.totalMoney + this.data.carts[index].price;
  //   }
  //   else {
  //     this.data.totalMoney = this.data.totalMoney - this.data.carts[index].price;
  //   }
  //   //是否全选判断
  //   for (i = 0; i < this.data.carts.length; i++) {
  //     Allprice = Allprice + this.data.data[i].price;
  //   }
  //   if (Allprice == this.data.totalMoney) {
  //     this.data.isAllSelect = true;
  //   }
  //   else {
  //     this.data.isAllSelect = false;
  //   }
  //   this.setData({
  //     data: this.data.data.list,
  //     totalMoney: this.data.totalMoney,
  //     isAllSelect: this.data.isAllSelect,
  //   })
  // },
  // //全选
  // allSelect: function (e) {
  //   //处理全选逻辑
  //   let i = 0;
  //   if (!this.data.isAllSelect) {
  //     for (i = 0; i < this.data.carts.length; i++) {
  //       this.data.carts[i].isSelect = true;
  //       this.data.totalMoney = this.data.totalMoney + this.data.carts[i].price;
  //     }
  //   }
  //   else {
  //     for (i = 0; i < this.data.carts.length; i++) {
  //       this.data.carts[i].isSelect = false;
  //     }
  //     this.data.totalMoney = 0;
  //   }
  //   this.setData({
  //     carts: this.data.carts,
  //     isAllSelect: !this.data.isAllSelect,
  //     totalMoney: this.data.totalMoney,
  //   })
  // },
  //数量变化处理
  
  bindPlus (e) {
    console.log(e)
  },

  delCart(e){
    let id = e.currentTarget.dataset.id;
    
    fetch("/wxShopbus/deleteById",{id:id}).then(res=>{
      if(res.data.code ==200){
       
         this.cartsInit();
         wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  //购物车初始化
  cartsInit() {
    let params = {wxid : 1};
    fetch("/wxShopbus/getWxShopList",params).then(res=>{
      this.setData({
        carts : res.data.data
      })
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
    this.cartsInit();
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