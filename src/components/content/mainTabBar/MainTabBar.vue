<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="purple">
        <!-- 这是vue3.0版本的方法
        <template v-slot:item-icon>
          <img src="@/assets/img/home.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>首页</div>       
        </template>   -->

        <!-- ~assets/img/home/home.svg和@assets/img/home/home.svg -->
        <!-- 这是版本2.0的方法 -->
        <img slot="item-icon" src="~assets/img/home/home.svg" alt="">   
        <img slot="item-icon-active" src="~assets/img/home/home_active.svg" alt="">     
        <div slot="item-text">首页</div>                          
      </tab-bar-item>

      <tab-bar-item path="/category" activeColor="purple">
        <img slot="item-icon" src="~assets/img/category/category.svg" alt="">   
        <img slot="item-icon-active" src="~assets/img/category/category_active.svg" alt="">   
        <div slot="item-text">分类</div>   
      </tab-bar-item>

      <tab-bar-item path="/cart" activeColor="purple">
        <img slot="item-icon" src="~assets/img/cart/shopcart.svg" alt="">    
        <img slot="item-icon-active" src="~assets/img/cart/shopcart_active.svg" alt="">  
        <div slot="item-text">购物车</div>  
      </tab-bar-item>

      <tab-bar-item  path="/profile" activeColor="purple">
        <img slot="item-icon" src="~assets/img/profile/profile.svg" alt=""> 
        <img slot="item-icon-active" src="~assets/img/profile/profile_active.svg" alt="">     
        <div slot="item-text">我的</div>  
      </tab-bar-item>

    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabBar/TabBar";
import TabBarItem from "components/common/tabBar/TabBarItem";

export default {
  name:'MainTabBar',
  data() {
    return {
    
    }
  },
  created() {
  
  },
  components:{
    TabBar,
    TabBarItem,
  },
  mounted() {
  
  }
}
</script>

<style scoped>

  
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top:3px;
  } 
</style>