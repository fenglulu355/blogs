<template>
  <div id="app">
    <!-- 头部 -->
    <top v-show="showTOP" loginUser />
    <!-- 内容 -->
    <router-view />
    <!-- 尾部 -->
    <bottom v-show="showBOTTOM" />
  </div>
</template>
<script>
import { mapState } from "vuex";

import top from "@/components/top";
import bottom from "@/components/bottom";
import normalized from "@/assets/normalized.css";

export default {
  components: { top, bottom },
  data() {
    return {
      login: false
    };
  },
  computed: {
    ...mapState(["showTOP", "showBOTTOM", "lognUser"])
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.pages {
  width: 1200px;
  margin: 0 auto;
}
.page {
  text-align: center;
  margin: 40px 0 80px 0;
}
</style>
