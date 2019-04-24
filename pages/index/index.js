//pages/index/index.js
const fetch = require('../../utils/fetch.js')
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// var url = 'http://10.10.2.45:8080/myserver/restapi/getByKitList/?kitchenId=1&foodtypeId=1&field=1&currPage=1&pageSize=10'
var url = 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList'
Page({
  data: {
    /* 被点击索引 */
    currentIndexNav: 0,
    swiperList: [],
    tabs: ["综合", "评分", "销量", "价格"],
    // sliderOffset: 0,
    // sliderLeft: 0,
    array: [],
    index: 0,
    shops: [],
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    hasMore: true,
    typeId: '',
    px: 0,
    isfixed: false,
    scrollTop: 0,
    cartNum : 0
  },
  /* 菜品分类 */
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      pageIndex: 0,
      shops: [],
      hasMore: false,
    })

    this.init();
  },

  init() {
    const px = this.data.px;
    const foodtypeId = this.data.index;
    let { pageIndex, pageSize, shops } = this.data
    const params = { kitchenId: 1, currPage: ++pageIndex, pageSize: pageSize, foodtypeId: foodtypeId, field: px, order: 'desc' };
    return fetch(`/restapi/getByKitList`, params).then(res => {

      const totalCount = parseInt(res.data.data.total);  //总条数
      const hasMore = pageIndex * this.data.pageSize < totalCount;
      if (pageIndex <= res.data.data.pages) {
        shops = this.data.shops.concat(res.data.data.list);
      }
      this.setData({ shops, totalCount, pageIndex, hasMore });
    })
  },
  /* 添加进购物车 */
  addshop(e) {
    
    let that = this;
     console.log('添加进购物车')  
     let foodid =  e.currentTarget.dataset.foodid;
     let cartNum = that.data.cartNum+=1; 
     const params = {wxid:'1',foodid:foodid,userid:1,count:1,kitchenId:1,type:1};

     fetch('/wxShopbus/insert',params,'POST',{ 'content-type': 'application/x-www-form-urlencoded' }).then(res=>{
        if(res.data.code ==200){
          wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            duration: 1000
          })
        }
     })


    //  let index = e.target.dataset.index;
    //  let param = this.data.items[index];
    // let subOrders = []; // 购物单列表存储数据
    // param.active ? param.active = false : param.active = true;
    // // 改变添加按钮的状态
    // this.data.items.splice(index, 1, param);
    // that.setData({
    //   items: this.data.items
    // });
    // 将已经确定的菜单添加到购物单列表
    // this.data.items.forEach(item => {
    //   if (item.active) {
    //     subOrders.push(item);
    //   }
    // });
    // // 判断底部提交菜单显示隐藏
    // if (subOrders.length == 0) {
    //   that.setData({
    //     bottomFlag: false
    //   });
    // } else {
    //   that.setData({
    //     bottomFlag: true
    //   });
    // }
    // let money = 0;
    // let num = subOrders.length;
    // subOrders.forEach(item => {
    //   money += item.price; // 总价格求和
    // });
    // let orderCount = {
    //   num,
    //   money
    // }
    // // 设置显示对应的总数和全部价钱
    // this.setData({
    //   orderCount
    // });
    // // 将选中的商品存储在本地
    // wx.setStorage({
    //   key: "orders",
    //   data: subOrders
    // });
  },
  /* 点击tabs索引 */
  tabClick: function (e) {
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      currentIndexNav: e.currentTarget.dataset.index,
      px: e.currentTarget.dataset.index,
      isfixed:false
    });
    this.setData({ pageIndex: 0, shops: [] })
    this.init(e.currentTarget.dataset.index);
  },
  /* 获取comdata数据 */
  // getComdata () {
  //   const _this = this; 
  //   wx.request({
  //     url,
  //     methods: 'GET',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success(res) {
  //       console.log(res.statusCode,res.data.code, res.data.data.list)
  //       if(res.data.code === 200) {
  //         _this.setData({
  //           comdata:res.data.data.list
  //         })
  //       }
  //     },
  //     fail() {
  //       console.log('获取数据失败')
  //     }
  //   })
  // },
  /* 获取轮播图数据 */
  getSwiperList() {
    const that = this;
    wx.request({
      url,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data.data.swiperList[0].imgSrc)
        if (res.data.code === 0) {
          that.setData({
            swiperList: res.data.data.swiperList
          })
        }
      },
      fail: function (res) {
        console.log('获取轮播图失败')
      },
    })
  },
  searchHandle() {
    // console.log(this.data.searchText)
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.init(this.data.typeName);
  },
  /* 滚动 tabs 置顶 */
  onPageScroll(e) {
    var that = this;
    //处理回弹，设置默认最大最小值
    if (e.scrollTop <= 0) {
      e.scrollTop = 0;
    } else if (e.scrollTop > wx.getSystemInfoSync().windowHeight) {
      e.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动
    if (e.scrollTop > this.data.scrollTop || e.scrollTop == wx.getSystemInfoSync().windowHeight) {
      //向下滚动
      if (e.scrollTop >= 0) {
        if (e.scrollTop >= 315) {

          that.setData({
            isfixed: true
          })
        }
      }
    } else {
      //向上滚动
      if (e.scrollTop < 315 && e.scrollTop>0) {
        that.setData({
          isfixed: false
        })
      }
    }
    //给scrollTop重新赋值
    setTimeout(function () {
      that.setData({
        scrollTop: e.scrollTop
      })
    }, 0)
  },
  /*  */
  onLoad: function (options) {
    /* 获取comdata数据 */
    // this.getComdata();
    /* 获取轮播图数据 */
    this.getSwiperList();
    /* 获取菜品分类数据 */
    fetch(`/api/getByKitId/1`).then(res => {
      var array = [];
      array.push('全部');
      for (let i = 0; i < res.data.length; i++) {
        array.push(res.data[i].name);
      }

      this.setData({ array: array });
    })

    var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
    //       sliderOffset: res.windowWidth / that.data.tabs.length * that.data.currentIndexNav
    //     });
    //   }
    // });
    this.init(this.data.px);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.init().then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.init()
  },
})
