import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state:{
    // 购物车里面的商品使用vuex存储
    cartList:[]
  },
  mutations,
  actions,
  getters,
})

// 3.挂载vue实例
export default store