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

<style  >
#app {
  font-family: Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  width: 100%;
  min-width: 1200px;
  box-sizing: border-box;
  padding-top: 123px;
}
.navgation {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 111;
}
.el-carousel__button {
  background: rgba(204, 204, 204, 1);
}
.swiper-button-white {
  border-radius: 10px;
}
.swiper-button-white:focus {
  outline: -webkit-focus-ring-color auto 0px !important;
}
.swiper-button-disabled {
  opacity: 1 !important;
}

.el-carousel__indicator.is-active button {
  background: rgba(36, 130, 200, 1);
}
.el-checkbox-button {
  cursor: pointer;
  box-sizing: border-box;
  padding: 5px 15px;
}
.el-checkbox-button__inner {
  border: none;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  background: rgba(36, 130, 200, 1);
  color: white;
}

</style>


