import BackTop from "components/content/backTop/BackTop"

//混入:组件之间复用代码
// export const itemListenerMixin = {
//   mounted(){

//   }
// }

// BackTop
export const backTopMixin = {
  components:{
    BackTop,
  },
  data(){
    return{
      // 判断backTop是否显示
      isShowBackTop:false
    }
  },
  methods:{

    // BackTop返回顶层
    backTop(){
      this.$refs.scroll.scrollTo(0,0,500);
    },

    // 判断BackTop是否显示
    showBackTop(position){
      this.isShowBackTop = (-position.y)>1000;
    }
  }
}