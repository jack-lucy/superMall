<template>
 <div class="bottom-bar">
   <!-- 全选 -->
   <div class="check-content">
     <check-button :is-checked="isSelectAll" 
                   class="check-button"
                   @click.native="checkClick"></check-button>
     <span>全选</span>
   </div>

  <!-- 合计 -->
   <div class="totalPrice">
     合计：{{totalPrice}}
   </div>

   <div class="calculate" @click="calcClick">
     去剁手:({{checkLength}})
   </div>

 </div>
</template>

<script>
const CheckButton = ()=> import("components/content/checkButton/CheckButton")
import {mapGetters} from "vuex"

export default {
  components:{
    CheckButton,
  },
  name:"",
  data() {
    return {
    
    }
  },
  computed:{
    ...mapGetters(["cartList"]),

    // 计算总价  先筛选商品是否打钩，然后在给打钩的商品算总价
    totalPrice(){
      return "￥"+ this.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.price * item.count
      },0).toFixed(2)
    },

    // 计算打钩商品总数
    checkLength(){
      return this.cartList.filter(item=>item.checked).length
    },

    // 判断是否全选
    isSelectAll(){
      if(this.cartList.length === 0) return false

      //1.使用filter 这句代码性能不高
      // return !(this.cartList.filter(item=>item.checked).length)
      
      // 2.使用find
      return !this.cartList.find(item=> !item.checked)

      // 3.使用普通遍历
      // for (let item of this.cartList){
      //   if(!item.checked){
      //     return false
      //   }
      // }
      // return true
    },
  },
  methods:{

    // 点击全选或都不选
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item =>item.checked =false)
      }else{
        this.cartList.forEach(item=> item.checked = true)
      }
    },

    // 付款点击事件
    calcClick(){
      //非全选状态下，提示用户
      if(this.cartList.length !== 0 && !this.isSelectAll){
        this.$toast.show("大爷，全部都买走吧！",2000);
      }

     //购物车没有商品，提示用户     
      if(this.cartList.length === 0){
        this.$toast.show("大爷，快来消费呀！",2000);
      }
    },
  }
}
</script>

<style scoped>
.bottom-bar{
  position: relative;
  display: flex;
  height: 40px;
  background: wheat;
  line-height: 40px;
  /* bottom: 55px; */
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.totalPrice{
  flex: 1;
  align-items: center;
  margin-left: 20px;
}
.calculate{
  width: 90px;
  background: red;
  color: white;
  text-align: center;
}
</style>