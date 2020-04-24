<template>
  <div id="app" v-if="isAlive">
    <navagation></navagation>
    <router-view />
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
  mounted() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      window.location.href = "http://als.public.5151fw.com/mindex.html";
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
  components: { navagation, footers }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
