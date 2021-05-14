<template>
  <div>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <!-- 监听轮播图图片 -->
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
  components:{
    Swiper,
    SwiperItem,
  },
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isLoad:false
    }
  },
  methods:{
    // 实现图片加载
    imageLoad(){
      /** 只请求一次，优化性能    
          我们等轮播图加载完毕，然后才获取第二个tabControl的位置，这样获取的位置才是准确的
       */
      if(!this.isLoad){
        this.$emit("swiperImageLoad")
        this.isLoad = true
      }
    },
  },
}
</script>

<style scoped>

</style>