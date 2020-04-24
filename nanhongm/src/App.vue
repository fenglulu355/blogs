<template>
  <div id="app" v-if="isAlive">
    <navgation></navgation>
    <router-view />
    <nhfooter></nhfooter>
  </div>
</template>

<script>
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
    ...mapState(["isbanshow"])
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
  components: { navgation, nhfooter }
};
</script>

<style  >
#app {
  font-family: Microsoft YaHei;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  position: relative;
  width: 100%;
}
/* sj */
.van-cell__title {
  color: #666566 !important;
  font-size: 24px !important;
}
.van-steps {
  overflow: visible !important;
  background-color: #fff !important;
}
/* pc */
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
.el-carousel__indicator.is-active button {
  border-radius: 7px !important;
  background: rgba(36, 130, 200, 1) !important;
}
.el-checkbox-button__inner {
  border: none !important;
  transition: all 0s !important;
}
/* .distpicker-address-wrapper select :focus {
  outline: none;
  border: none;
} */
/* upimg */
.el-upload--picture-card,
.el-upload-list--picture-card .el-upload-list__item {
  width: 63px !important;
  height: 63px !important;
}
.uploadimg [class^="el-icon-"] {
  position: relative !important;
  top: -35px !important;
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: auto !important;
  height: 61px !important;
}
.el-upload-list--picture-card
  .el-upload-list__item-actions
  .el-upload-list__item-delete {
  position: relative !important;
  left: -7px !important;
}
.shoppingmall .el-input {
  width: 75% !important;
}
</style>


