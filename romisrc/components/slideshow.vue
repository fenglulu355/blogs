<template>
  <div class="slideshow">
    <el-carousel trigger="click" height="590px">
      <el-carousel-item v-for="(item, index) in slide" :key="index">
        <img :src="item" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "slideshow",
  data() {
    return {
      slide: [
        require("../assets/slides1.jpg"),
        require("../assets/slides2.jpg"),
        require("../assets/banner_01.jpg")
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.slideshow {
  width: 100%;
  min-width: 1200px;
  height: 590px;
  position: absolute;
  top: 0;
  z-index: -1;
  .el-carousel {
    position: relative;
    img {
      width: 100%;
      min-height: 590px;
    }
  }
}
</style>