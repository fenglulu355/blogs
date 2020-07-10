<template>
  <div class="videos">
    <p class="titles">
      <span>ABOUT KENNO</span>
    </p>
    <ul class="videolist">
      <li class="videoli" v-for="(item, index) in videoli" :key="index">
        <p v-show="playing!=index" class="text">视频</p>
        <img v-show="playing!=index" @click="showvideo(item,index)" src="../assets/播放.png" alt />
        <video v-if="playing==index" ref="video" controls src=""></video>
        <p class="close" v-if="playing==index" @click="playing=null">X</p>
      </li>
    </ul>
    <kfooter></kfooter>
  </div>
</template>
<script>
import kfooter from "../components/kfooter";

export default {
  name: "videos",
  data() {
    return {
      playing: null,
      videoli: [
        { icon: require("../assets/banner.png") },
        { icon: require("../assets/banner.png") },
        { icon: require("../assets/banner.png") }
      ]
    };
  },
  methods: {
    showvideo(item, index) {
      this.playing = index;
    }
  },
  components: { kfooter }
};
</script>
<style lang="less" scoped>
.videos {
  background: black;
  .titles {
    text-align: center;
    color: white;
    box-sizing: border-box;
    padding: 50px 0 10px 0;
    font-size: 28px;
    span {
      box-sizing: border-box;
      padding: 50px 0 10px 0;
      border-bottom: 1px solid #f5d02c;
    }
  }
}
.videolist {
  width: 90%;
  margin: 50px auto;
  .videoli {
    width: 100%;
    height: 500px;
    background: #2b2b2b;
    margin-bottom: 20px;
    position: relative;
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .text {
      color: #f5d02c;
      text-align: center;
      font-size: 30px;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
    }
    img {
      width: 50px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
    .close {
      color: #f5d02c;
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
}
</style>