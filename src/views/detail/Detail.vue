<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick = "titleClick" ref="nav"></detail-nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop ="shop"></detail-shop-info>
      <detail-Image-info :detail-info="DetailInfo" @imageLoad="imageLoad"></detail-Image-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show=isShowBackTop></back-top>
  </div>
</template>

<script>
const DetailNavBar = ()=> import("./childComps/DetailNavBar")
const DetailSwiper = ()=> import("./childComps/DetailSwiper")
const DetailBaseInfo = ()=> import("./childComps/DetailBaseInfo")
const DetailShopInfo = ()=> import("./childComps/DetailShopInfo")
const DetailImageInfo = ()=> import("./childComps/DetailImageInfo")
const DetailParamInfo = ()=> import("./childComps/DetailParamInfo")
const DetailCommentInfo = ()=> import("./childComps/DetailCommentInfo")
const DetailBottomBar = ()=> import("./childComps/DetailBottomBar")


const GoodsList = ()=> import("components/content/goods/GoodsList")
const Scroll = ()=> import("components/common/scroll/Scroll")

import {getDetail , Goods , Shop ,GoodsParam ,getRecommend} from "network/detail"
import {debounce} from "common/utils"
import {backTopMixin} from "common/mixin"

import {mapActions} from "vuex"

export default {
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins:[backTopMixin],
  name:'Detail',
  data() {
    return {
      // 商品的id
      iid:null,
      // 某种商品的轮播图数据
      topImages:[],
      goods:{},
      shop:{},
      DetailImage:[],
      DetailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      // 商品、参数、评论、推荐位置
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
    }
  },
  methods:{
    ...mapActions(["addCart"]),
    imageLoad(){
      this.$refs.scroll.refresh();
      // console.log('detailImageLoad方法已经执行');  

      // 如果在这里获取其他位置，会获取多次，频繁调用
      this.getThemeTopY()
    },
    titleClick(index){
      // console.log("当前detail-nav-bar:",index);
      // console.log('位置:',-this.themeTopYs[index]);
      
      this.$refs.scroll.scrollTo(0,this.themeTopYs[index],1000);
    },
    // 根据position，显示对应的选项
    contentScroll(position){

      this.showBackTop(position);

      let length = this.themeTopYs.length;
      // console.log("themeTopYs的长度:",length);
      
      const positionY = -position.y;
      // console.log(position);     

      for (let i = 0; i<length; i++ ){

        // 这种方式会有索引越界问题
        // if(positionY >this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
        // }
        // this.currentIndex !== i &&

        // 另外一种优化方法:数组再添加一个很大的数，即可不用再担心所以越界问题。可以提高一点点性能问题！
        if ( ((i<length -1 && positionY >= -this.
        themeTopYs[i] && positionY < -this.themeTopYs[i+1]) || (i === length-1 &&
        positionY >= -this.themeTopYs[i]))){
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },

    // 将商品添加至vuex里面的购物车
    addToCart(){
      // 1.获取购物车商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.DetailInfo.desc;
      product.price = this.goods.relPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车
      // console.log('已添加至购物车');
      // console.log('DetailInfo信息',this.DetailInfo);
      // console.log('商品信息',product);
      
      // 方式一  添加购物车、弹窗
      // this.$store.dispatch("addCart",product).then(res=>{
      //   this.$toast.show(res,2000)  
      // })

      // 方式二
      this.addCart(product).then(res=>{ 
        this.$toast.show(res,2000)        
      })
    }
  },
  created() {
    
    //1.获取iid
    this.iid = this.$route.params.iid;
    // console.log(this.iid);
    
    //2.请求详情数据
    getDetail(this.iid).then(res=>{
      // console.log(res);
      // 获取轮播图图片
      const data =res.data.result
      // console.log("商品所有的信息:",data);
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //店铺信息
      this.shop = new Shop(data.shopInfo)
      //保存商品的详情数据
      this.DetailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //取出评论信息
      // console.log(data.rate.cRate);

      
    // 1.this.$refs.params.$el压根就没有渲染

    // this.themeTopYs = []
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);        


    //  笔记  商品、参数、评论、推荐具体位置信息   2.这里数值有问题  offsetTop一般不对的时候，都是图片问题
    // 根据最新的数据，对应的DOM已经被渲染出来。但是图片还未被加载出来
      // this.$nextTick(()=>{
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)

      //   console.log(this.themeTopYs);        
      // })
      
      if (data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0];
      }

    })

    //3.请求推荐数据
    getRecommend().then(res=>{
      // console.log("推荐数据：",res);
      this.recommends = res.data.data.list
      // console.log(this.recommends);
      
    })
  
    //4.获取笔记  商品、参数、评论、推荐具体位置信息(防抖函数)   这样子只需要请求一次数据
    this.getThemeTopY =debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
    })

  },
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  height: 44px;
  background: #fff;
}


/**
  方法二 这里和Home设计滚动一样，两种方案 */
   /* .content{
    height: calc(100%-104px);
    top: 44px;
    overflow: hidden;
  }  */

  /* 方法一:绝对定位 */
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>