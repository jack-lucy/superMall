<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="centre">购物街</div></nav-bar>  
    <!-- 我们其实设置了两个tab-control,通过v-show来达到视觉欺骗效果 -->
    <!-- 第一个tabControl -->
    <tab-control class="tab-control" 
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick" 
                v-show="isTabFixed"
                ref="topTabControl"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" @pullingUp="loadMore" :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <!-- 第二个tabControl -->
      <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick" 
      ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll> 

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>

  </div>
</template> 

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommendView from "./childComps/HomeRecommendView"
import FeatureView from "./childComps/FeatureView"

const NavBar = ()=> import("components/common/navbar/NavBar") 
import TabControl from "components/content/tabControl/TabControl"
const GoodsList = ()=> import("components/content/goods/GoodsList")
import Scroll from "components/common/scroll/Scroll"

import {getHomeMultidata,getHomeGoods} from "network/home"
import {debounce} from "common/utils"
import {backTopMixin} from "common/mixin"

export default {
   components:{
    HomeSwiper,
    HomeRecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins:[backTopMixin],
  name:'Home',
  data() {
    return {
      banners:[],
      recommends:[],
      // 商品信息，对象形式存放
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      // 规定目前商品的类型
      currentType:"pop",
      // 规定第二个tabControl和顶部的距离  
      taboffsetTop:0,
      // 规定控制第一个tab-control是否显示，默认不显示
      isTabFixed:false,
      // 规定记录离开后面页面时的浏览位置
      saveY:0,
      itemImgListener:null,
    }
  },
  computed:{
    // 返回30件商品的信息
    showGoods(){          
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")
  },
  methods:{
    /**
     * 事件监听相关方法
     */ 

    // 选择商品的分类
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2:
          this.currentType = "sell"
          break
      }

      //使两个TabControl的currentIndex保持一致    
      this.$refs.topTabControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
      
    },

    // scroll相关方法
    contentScroll(position){

      // 我们使用better-scroll代替原生的滚动，Home里面better-scroll的有效范围为减去导航和底部
      // position以better-scroll左上角为基准
      // console.log(position);
      
      //判断TackTop是否显示
      this.showBackTop(position);
          
      // 判断第一个tabControl是否显示，吸顶
      this.isTabFixed = (-position.y)>this.taboffsetTop
    },

    //获取商品的类型，上拉加载更多
    loadMore(){
      // console.log('加载更多');
      this.getHomeGoods(this.currentType);
    },

    // 计算第二个tabControl距离顶部的距离
    swiperImageLoad(){
      this.taboffsetTop = this.$refs.tabControl.$el.offsetTop;
      // console.log('轮播图加载完毕');      
      // console.log('二个tabControl的taboffsetTop:',this.taboffsetTop);
    },

    /**
     * 网络请求相关的方法
     */

    // 请求轮播图、推荐模块数据
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        // console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },

    // 加载更多商品，某类型商品page+1,list再增添30条数据
    getHomeGoods(type){
      // console.log("所有类型的商品信息",this.goods[type]);
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1

        //调用scroll的上拉加载更多finishPullUp()
        this.$refs.scroll.finishPullUp()
    })
    }
  },

  mounted() {
     // 3.监听GoodsListItem中图片加载完成。为了优化性能，此处使用了防抖函数。
    const newRefresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on("itemImageLoad",()=>{
      newRefresh();
    })

    this.taboffsetTop = this.$refs.tabControl.$el.offsetTop;
    // 由于图片加载问题(主要是轮播图影响)，这个值往往是不准确的  59
    // console.log("图片未加载完offsetTop:",this.taboffsetTop);
  },

  destroyed(){
    console.log('home 毁灭了');
  },

  // 返回Home时，使Home保留原来的位置
  activated(){
    // console.log('home处于活跃状态');
    // console.log("目前home所处位置:",this.saveY);
    // 这一句代码是关键，否则会存在bug，页面无法保留原有位置。这句代码的详情见better-scroll官网
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,0);
  },

  // 离开Home时，记录Home的position
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log('home处于非活跃状态');
    // console.log("目前home所处位置:",this.saveY);
  },
}
</script>

<style scoped>
  #home{      
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background: pink;
  }
  
  /**
    一开始我们对tab-control使用sticky。
    但后面考虑到使用better-scroll滚动后，原生滚动会失效，所以我们弃用了这种方案 
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  } */

  /** 
    使用better-scroll，必须要给其一个确切的高度 
  */
  /* 第一种方案  导航栏和底部都是用相对定位，scroll部分使用绝对定位 */
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 60px;
    left: 0;
    right: 0;
  }
  /* 第二种方案 函数计算  减去顶部44px和底部60px */
   /* .content{
    height: calc(100% - 104px);
    overflow: hidden;
    margin-top: 44px;
  }  */

  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>