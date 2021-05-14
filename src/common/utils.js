  // 防抖函数 通过设置一定的延迟，刷新图片。 
export function debounce(func,delay){
  let timer = null
  
  return function(args){
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      func.apply(this,args)
      // func(...args)
    },delay)
  }
}