import {request} from "./request"

export function getDetail(iid){
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
} 

// 商品信息
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.newPrice = itemInfo.price
    this.desc = itemInfo.desc
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc 
    this.columns = columns 
    this.services = services
    this.relPrice = itemInfo.lowNowPrice
    
    // console.log(itemInfo);
    
  }
}

// 店铺信息
export class Shop{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    // console.log(shopInfo);
    
  }
}

export class GoodsParam{
  constructor(info,rule){
    this.image = info.images? info.images[0]:"";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export function getRecommend(){
  return request ({
    url:"/recommend"
  })
}