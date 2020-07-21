<template>
  <div id="app">
    <keep-alive>
      <navgation></navgation>
    </keep-alive>

    <router-view />
    <chfooter></chfooter>
  </div>
</template>

<script>
import navgation from "../src/components/navgation";
import chfooter from "../src/components/chfooter";
import normalized from "./assets/normalized.css";
export default {
  name: "App",
  components: { navgation, chfooter },
  mounted() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      window.location.href = "http://www.cdchanghu.com/mindex.html";
      return;
    }
  }
};
</script>

<style lang='less'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  .navgation {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
  }
  .navflxed {
    position: fixed;
    right: 0;
    bottom: 18%;
    z-index: 1;
    width: 50px;
    height: 200px;
    .nflist {
      width: 100%;
      .nfli {
        width: 100%;
        height: 50px;
        text-align: center;
        margin-top: 2px;
        background: #111111;
        line-height: 50px;
        a {
          cursor: pointer;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .sel {
        background: #82c41c;
      }
    }
  }
  .ewmlist {
    background: #82c41c;
    position: fixed;
    right: 54px;
    bottom: calc(18% + 44px);
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    .ewmli {
      width: calc(100% / 3);
      height: 50px;
      .mainpic {
        width: 100%;
        height: 100%;
      }
    }
  }
  // .chfooer {
  //   position: absolute;
  //   bottom: 0;
  // }
  .lazypic {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
.el-carousel__container {
  width: 100% !important;
  height: 960px !important;
}
.el-carousel__indicators--horizontal {
  bottom: 290px !important;
}
</style>
