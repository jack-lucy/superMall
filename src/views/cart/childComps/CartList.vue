<template>
 <div class="cart-list">
   <scroll class="content" ref="scroll">
    <cart-list-item 
      v-for="(item,index) in cartList"
      :key="index" :product="item">
    </cart-list-item>
   </scroll>
 </div>
</template>

<script>
import {mapGetters} from "vuex"
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem"

export default {
  components:{
    CartListItem,
    Scroll,
  },
  name:"CartList",
  data() {
    return {
    
    }
  },
  computed:{
    ...mapGetters(["cartList"])
  },
  activated(){
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .cart-list{ 
    /* 44px  60px  40px 第一次用css函数，运算符之间要有个空格呦，这里坑得我没回过神来*/
    height: calc(100% - 144px);
  }

  .content{
    height: 100%;
    overflow: hidden;
  }
</style>