<template>
  <div id="app">
    <navagation v-if="isAlive"></navagation>
    <router-view v-if="isAlive"  />
    <footernav v-if="isAlive"></footernav>
    <footers></footers>
  </div>
</template>

<script>
import navagation from "../src/components/navagation";
import footers from "../src/components/footers";
import footernav from "../src/components/footernav";
import normalized from "./assets/normalized.css";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isAlive: true,
      webinfos: [],
      tels: "",
      names: ""
    };
  },
 
  mounted() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      window.location.href = "http://www.alcgarden.com/mindex.html";
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
  components: { navagation, footers, footernav }
};
</script>

<style lang='less'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.footerlist {
  background: rgba(50, 149, 43, 1);
  width: 1200px;
  margin: 0 auto;
  position: relative;
  .navlist {
    width: 1200px;
    height: 80px;
    background: rgba(241, 250, 238, 1);
    position: absolute;
    top: -40px;
    display: flex;
    justify-content: space-around;
    z-index: 1;
    .navli {
      a {
        display: inline-block;
        width: 67px;
        text-align: center;
        height: 80px;
        line-height: 80px;
        color: rgba(50, 149, 43, 1);
      }
      .sel {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 67px;
          height: 4px;
          background: rgba(50, 149, 43, 1);
        }
      }
    }
  }
}
</style>
