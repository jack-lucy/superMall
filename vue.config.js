module.exports = {
  configureWebpack:{
    resolve:{
      // 适配路径
      alias:{ 
        "assets":"@/assets",
        "components":"@/components",
        "common":"@/common",
        "network":"@/network",
        "views":"@/views",
        "fonts":"@/fonts",
        "store":"@/store"
      }
    }
  }
}