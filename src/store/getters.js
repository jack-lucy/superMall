export default{
  // 获取购物车的不同商品的商品数量
  cartLength(state){
    return state.cartList.length
  },
  // 获取购物车的所有商品
  cartList(state){  
    return state.cartList
  }

}