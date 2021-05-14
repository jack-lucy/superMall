<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="centre">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
const NavBar = ()=> import("components/common/navbar/NavBar")
const Scroll = ()=> import("components/common/scroll/Scroll")
const CartList = ()=> import("./childComps/CartList")
const CartBottomBar = ()=> import("./childComps/CartBottomBar")
// 引入getters
import {mapGetters} from "vuex" 
export default {
  components:{
    NavBar,
    CartList,
    CartBottomBar,
    Scroll,
  },
  name:'Cart',
  data() {
    return {  
    }
  },
  computed:{

    // 语法一：数组写法 getters语法使用
    ...mapGetters(["cartLength"])

    // 语法二：对象写法
    // ...mapGetters({
    //   length:"cartLength",
    //   list:"cartList"
    //   })
  },
}
</script>

<style scoped>

  .cart{
    height: 100vh;
  }
  .nav-bar{
    background: chocolate;
    color: white;
    font-weight: 700;
  }
</style>