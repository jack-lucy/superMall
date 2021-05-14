<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
      class="tab-control-item"
      :class="{active:index === currentIndex}" @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  data() {
    return {
      //目前商品类型的索引
      currentIndex:0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    },
  },
  methods:{
    // 触发商品分类事件
    tabClick(index){
      this.currentIndex = index;
      this.$emit("tabClick",index)
    },
  },
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .active{
    color: pink;
  }
  .active span{
    border-bottom:3px solid pink ;
  }

</style>