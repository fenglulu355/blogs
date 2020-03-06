<template>
  <div id="app">
    <navgation></navgation>
    <router-view />
    <nhfooter></nhfooter>
  </div>
</template>

<script>
import navgation from "./components/navagation.vue";
import nhfooter from "./components/nhfooter.vue";
import normalized from "./assets/normalized.css";
export default {
  name: "App",
  components: { navgation, nhfooter }
};
</script>

<style lang="less" >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  width: 100%;
  min-width: 1200px;
  box-sizing: border-box;
  padding-top: 123px;
  .navgation {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 111;
  }
}
</style>>


