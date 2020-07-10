<template>
  <div id="app" :class="isbanshow==true?'paddinga':'paddingb'">
    <div v-if="ispri">
      <navgation v-if="isAlive"></navgation>
      <banner v-if="islb"></banner>
      <router-view v-if="isAlive" />
      <nhfooter v-if="isAlive"></nhfooter>
    </div>
    <div v-else>
      <navgation v-if="isAlive"></navgation>
      <router-view v-if="isAlive" />
      <nhfooter v-if="isAlive"></nhfooter>
    </div>
  </div>
</template>

<script>
import banner from "./components/homebanner";
import navgation from "./components/navagation.vue";
import nhfooter from "./components/nhfooter.vue";
import normalized from "./assets/normalized.css";
import { mapState } from "vuex";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isAlive: true
    };
  },
  computed: {
    ...mapState(["isbanshow", "islb", "ispri"])
  },
  mounted() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      window.location.href = "http://nhjd.public.5151fw.com/mindex.html";
      return;
    }
  },
  methods: {
    reload() {
      let self = this;
      self.isAlive = false;
      self.$nextTick(function() {
        self.isAlive = true;
      });
    }
  },
  components: { navgation, nhfooter, banner }
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
}
.paddinga {
  box-sizing: border-box;
  padding: 123px 0 0 0;
}
.paddingb {
  box-sizing: border-box;
  padding: 93px 0 0 0;
}
.navgation {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 111;
}
.el-carousel__button {
  background: rgba(204, 204, 204, 1) !important;
}
.swiper-button-white {
  border-radius: 10px !important;
}
.swiper-button-white:focus {
  outline: -webkit-focus-ring-color auto 0px !important;
}
.swiper-button-disabled {
  opacity: 1 !important;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  border-radius: 7px !important;
  background: rgba(36, 130, 200, 1) !important;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner .curs {
  padding: 0 0 !important;
}
.el-carousel__indicator.is-active button {
  border-radius: 7px !important;
  background: rgba(36, 130, 200, 1) !important;
}
.el-checkbox-button__inner {
  border: none !important;
  transition: all 0s !important;
}

.uploadimg [class^="el-icon-"] {
  position: relative !important;
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100% !important;
  height: 100% !important;
}
.el-upload-list--picture-card
  .el-upload-list__item-actions
  .el-upload-list__item-delete {
  position: relative !important;
  left: -7px !important;
}
.shoppingmall .el-input {
  width: 100% !important;
}
.distpicker-address-wrapper select:focus{
outline: none;
}
.distpicker-address-wrapper option:focus{
outline: none;
}

</style>


