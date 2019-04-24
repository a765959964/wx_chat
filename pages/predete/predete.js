// pages/predete/predete.js
//获取应用实例
const app = getApp()

Page({
  data: {
    people:['1人','2-6人','6-10人','10人以上'],
    shop:['伊河路店','陇海路店']
  },
  bindshop (e) {
    console.log(e)
    this.setData({})
  },
  bindsub (e) {
    console.log(e)
  }
})