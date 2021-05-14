<template>
 <div class="toast" v-show="isShow">
   <div>{{ message }}</div>
 </div>
</template>

<script>
export default {
  components:{
  
  },
  name:"Toast",
  data() {
    return {
      message:"",
      isShow:false,
    }
  },
  props:{
  },
  methods:{
    show(message,duration=2000){
      // console.log('执行show函数');
      this.isShow = true;
      this.message = message;      

      // 设定定时器，duration过后恢复数据
      setTimeout (()=>{
        this.isShow = false;
        this.message = "";
      },duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  /* 笔记 */
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  color: white;
  background: rgba(0,0,0,.75);
  z-index:234;
}
</style>