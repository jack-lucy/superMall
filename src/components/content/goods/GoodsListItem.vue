<template>
  <div class="goods-item" @click="itemClick">
    <!-- vue中的监听:@load = 方法 -->
    <!-- 图片懒加载  -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return []
      }
    }
  },
  data() {
    return {
    
    }
  },
  methods:{
    // 图片加载完成，发出itemImageLoad事件给Home
    imageLoad(){
      this.$bus.$emit("itemImageLoad");
    },

    // 进入到商品详情页
    itemClick(){
      this.$router.push("/detail/"+this.goodsItem.iid);
    }
  },
    computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  created() {

  },
  mounted() {
  
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px; /*元素底部的空白 */
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px; /* 图片圆角样式*/
}

.goods-info {
  /* 显示在paddint-bottom的区域，用固定位置 */
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;                                                                        
}

.goods-info p {
  /* 显示title的时候，在一行之内显示，不换行，超出部分显示... */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: pink;
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  /* 用伪元素显示一个图标 */
  content: '\e9ea';
  font-family: "icomoon";
  font-size: 13px;
  position: absolute;
  left: -15px;
  top: 1px;
  width: 14px;
  height: 14px;
  /* 用0 0/14px 14px确保能显示出来 */
  /* background: url('~assets/img/common/collect.svg') 0 0/14px 14px; */
}
</style>