<template>
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <van-image
            class="mainpic"
          fit="cover"
          :src="httpUrl +item.image_url"
        ></van-image>
        <!-- <div
          class="mainpic"
          :style="{backgroundImage: 'url('+httpUrl +item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>-->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: "banner",
  data() {
    return {
      banner: []
    };
  },
  created() {
    this.$axios.post("index/api/getBanner").then(res => {
      this.banner = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.my-swipe {
  height: 800px;

  .mainpic {
    width: 100%;
    height: 100%;
  }
}
</style>