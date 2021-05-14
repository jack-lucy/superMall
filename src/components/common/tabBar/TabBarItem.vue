<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 把插槽封装起来这样就不用担心属性会被替换掉 -->
    <div v-if="!isActive" class="icon">
      <slot name="item-icon"></slot>
    </div>
    <div  v-else class="icon">
      <slot name="item-icon-active"></slot>
    </div>
    <!-- :class="{active:isActive}"  这是写死的方法 -->
    <div :style="activeStyle" class="text">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      // isActive:true,
    }
  },
  computed:{
    isActive(){
      // 那个路由活跃，$route就代表那个路由
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
  props:{
    path:String,
    activeColor:{
      type:String,
      default:"red"
    }
  },
  
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  },
  created() {
  
  },
  mounted() {
  
  }
}
</script>

<style scoped>
  .tab-bar-item{
    /* 均等分 */
    flex:1;
    text-align: center;
    /* line-height: 49px; */
    font-size: 14px;
  }
  .tab-bar-item .icon{
    height: 30px;
  }
  .tab-bar-item .text{
    height: 25px;
    line-height: 25px;
  }

  .active{
    /* color: red; */
  }

</style>