<template>
  <div>
    <nav-bar>
      <div slot="left" class="back">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="centre" class="title">
        <div v-for="(item,index) in titles" 
            class="title-item"
            :class="{active: index === currentIndex}"
            @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
const NavBar = ()=> import("components/common/navbar/NavBar")

export default {
  name:'DetailNavBar',
  data() {
    return {
      titles:["商品","参数","评论","推荐"],
      currentIndex:0,
    }
  },
  components:{
    NavBar,
  },
  methods:{
    titleClick(index){
      this.currentIndex = index;

      this.$emit("titleClick",index)
    },
    backClick(){
      this.$router.back()
    }
  },
}
</script>

<style scoped>
  .title{
    display: flex;
  }

  .title-item{
    flex: 1;
  }
  .active{
    color: red;
  }
  .back img{
    margin-top:10px
  }
</style>