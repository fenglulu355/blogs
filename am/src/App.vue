<template>
  <div id="app" >
    <navagation v-if="isAlive"></navagation>
    <router-view v-if="isAlive" />
    <footers></footers>
  </div>
</template>

<script>
import navagation from "../src/components/navagation";
import footers from "../src/components/footers";
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
      isAlive: true
    };
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
  components: { footers, navagation }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.van-notice-bar {
  background: #fbf8fb;
  /* color: rgba(102, 102, 102, 1); */
  font-size: 24px;
}
.van-notice-bar {
  background: #fbf8fb !important;
}
</style>
