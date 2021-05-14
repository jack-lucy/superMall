<template>
 <div class="check-button" :class="{check:isChecked}">
   <img src="~assets/img/cart/shopcart.svg" alt="">
   <!-- <input type="checkbutton"> -->
 </div>
</template>

<script>
export default {
  name:"CheckButton",
  data() {
    return {
    
    }
  },
  props:{
    // 规定是否打钩
    isChecked:{
      type:Boolean,
      default:false
    }
  },
  components:{
  
  },
}
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border:2px solid #aaa;
}
.check-button img{
  width: 15px;
  height: 15px;
}
.check{
  border-color: red;
  background: red;
}
</style>