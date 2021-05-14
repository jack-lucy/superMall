import { createApp } from 'vue'
import Vue from "vue"
import App from './App.vue'
import router from "./router"
import store from "./store"

import toast from "components/common/toast"
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"


//使用事件总线
Vue.prototype.$bus = new Vue()

Vue.use(toast)

// 使用懒加载的插件
Vue.use(VueLazyLoad,{
  Loading:require("./assets/img/cart/tick.svg")
})

//解决移动端300ms延迟
FastClick.attach(document.body)

// createApp(App).mount('#app').use(store) 
// createApp(App).use(router).mount('#app')

// 这是老版本的映射方法
new Vue({
  el:"#app",
  router,
  store,
  render:h=>h(App)
})





