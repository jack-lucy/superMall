<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabBar/MainTabBar"

export default {
  name: 'App',
  components: {
    MainTabBar
  }, 
}

// http://123.207.32.32
</script>

<style scoped>
  @import "~assets/css/base.css";

</style>