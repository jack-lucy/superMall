<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * better-scroll加载机制:在刷新页面时，better-scroll会首先计算一次页面高度，但这个页面高度不包含
图片的加载，因此我们在一些图片加载完成后往往再一次计算页面高度 */
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
    // 规定获取position的方式
    probeType:{
      type:Number,
      default:0
    },
    //规定是否上拉加载更多数据
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
     scroll:null
    }
  },
  methods:{
    /**better-scroll跳转位置  */
    scrollTo(x,y,time){
      // 严谨写法：防止如果图片加载过快，而scroll又没有创建完成
      this.scroll && this.scroll.scrollTo(x,y,time)
      // console.log('执行scrollTo(),scrollY=',y);
      
    },
    /**加载图片完成后，重新计算position的位置 
     * 加载图片的时候，只要有一张图片加载出来就执行一次refresh()
    */
    refresh(){
      this.scroll && this.scroll.refresh();
      // console.log('执行refresh()');    
    },
    /**上拉加载 */
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    /**记录home的position */ 
    getScrollY(){
      return this.scroll ? this.scroll.y : 0;       
    }
  },
  mounted() {
    // better-scroll的使用方法，详情见官网
    let wrapper = this.$refs.wrapper;    
    this.scroll = new BScroll(wrapper,{
      click:true,
      observeDOM:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    // 1.监听滚动的位置
    this.scroll.on("scroll",(position)=>{     
      this.$emit("scroll",position)
    })
    
    // 2.监听scroll是否滚动到底部
    if(this.pullUpLoad){
      this.scroll.on("pullingUp",()=>{
        this.$emit("pullingUp")
      })
    }
    // console.log("scroll信息:",this.scroll);
  }
}
</script>

<style scoped>

</style>