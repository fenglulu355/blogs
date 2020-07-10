<template>
  <div class="home">
    <banner></banner>
    <div class="bot">
      <h1>勇敢做自己</h1>
      <p>BRAVE DO YOUSELF</p>
    </div>
    <kfooter></kfooter>
  </div>
</template>
<script>
import kfooter from "../components/kfooter";
import banner from "../components/banner";
export default {
  name: "home",
  data() {
    return {
      banner: [
        require("../assets/banner.png"),
        require("../assets/banner.png"),
        require("../assets/banner.png")
      ]
    };
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  components: {
    kfooter,
    banner
  }
};
</script>
<style lang="less"  scoped>
.my-swipe {
  height: 800px;
  .mainpic {
    width: 100%;
    height: 100%;
  }
}
.bot {
  border-top: 2px solid #f5d02c;
  width: 100%;
  height: 150px;
  background: black;
  color: #f5d02c;
  text-align: center;
  h1 {
    font-size: 30px;
    box-sizing: border-box;
    padding: 30px 0px 10px 0;
  }
}
</style>