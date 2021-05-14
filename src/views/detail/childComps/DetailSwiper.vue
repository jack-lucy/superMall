<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>   
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
  name:'DetailSwiper',
  props:{
    topImages:{
      type:Array,
      dafault(){
        return []
      }
    },
  },
  components:{
    Swiper,
    SwiperItem,
  },
  data() {
    return {
    
    }
  },
  created() {
  
  },
  mounted() {
  
  }
}
</script>

<style scoped>
  /* 这里涉及命名问题  去理解*/
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>