<template>
  <div class="home pages">
    <!-- <router-link to="/search">search</router-link>| -->
    <slideshow></slideshow>
    <div class="content">
      <ul class="navlist">
        <li class="navli" v-for="(item, index) in nav" :key="index">
          <router-link to="/search">{{item}}</router-link>
        </li>
      </ul>
      <div class="case">
        <div class="case-item">
          <img src="../assets/case1.jpg" alt />
        </div>
        <div class="case-item">
          <img src="../assets/case2.jpg" alt />
        </div>
        <div class="case-item">
          <img src="../assets/case3.jpg" alt />
        </div>
        <div class="case-item">
          <img src="../assets/case4.jpg" alt />
        </div>
      </div>
      <quality></quality>
    </div>
    <div class="videobox">
      <div class="box item">
        <img :src="compute[0]" alt />
      </div>
      <div class="btn item" @click="bf">
        <img :src="compute[1]" alt />
      </div>
      <div class="logo item">
        <img :src="compute[2]" alt />
      </div>
      <div class="slogan">
        <p class="text">芮米每一天都在配您一起进步，一起走向未来</p>
        <p>Every day,glutirous rise is progressing with you and moving towads the future together</p>
        <button class="btn">立即了解</button>
      </div>
    </div>
    <div class="mask" v-show="video">
      <p @click="close">关闭</p>
      <video src="../assets/setting/MV.mp4" controls></video>
    </div>
    <homeclass></homeclass>
    <down></down>
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap">
      <img src="../assets/mine/返回顶部(1).png" title="个人中心" />
    </el-backtop>-->
  </div>
</template>

<script>
import slideshow from "@/components/slideshow.vue";
import homeclass from "@/components/home-class.vue";
import down from "@/components/home-dow.vue";
import quality from "@/components/home-quality.vue";
export default {
  name: "home",
  data() {
    return {
      video: false,
      nav: ["JAVA", "WEB", "UI/UE", "HTML5", "IOS", "ANDROID"],
      compute: [
        require("../assets/compute.png"),
        require("../assets/bottom.png"),
        require("../assets/LOGO.png")
      ]
    };
  },
  components: { slideshow, homeclass, down, quality },
  methods: {
    close() {
      this.video = false;
    },
    bf() {
      this.video = true;
    }
  }
};
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  transform: translate(-50%);

  p {
    cursor: pointer;
    float: right;
    background: red;
    width: 60px;
    text-align: center;
    color: white;
  }
}
.home {
  width: 100%;
  position: relative;
  .content {
    width: 1200px;
    margin: 0 auto;
    .navlist {
      width: 300px;
      display: grid;
      grid-template-rows: repeat(6, 1fr);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
      .navli {
        width: 100%;
        background: rgba(255, 255, 255, 0.9);
        text-align: center;
        a {
          padding: 30px 0;
          display: block;
          width: 80%;
          margin: 0 auto;
          text-align: left;
          font-size: 28px;
          color: #735dbd;
          border-bottom: 1px solid #d2d2d2;
          font-family: 微软雅黑;
        }
        &:hover {
          background: rgba(56, 4, 162, 0.6);
          a {
            color: white;
          }
        }
      }
    }

    .case {
      width: 100%;
      height: 277px;
      padding-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .case-item {
        width: 264px;
        height: 100px;
      }
    }
  }
  .videobox {
    margin-top: 200px;
    width: 100%;
    min-width: 1200px;
    height: 440px;
    background: #ececec;
    text-align: center;
    position: relative;
    .item {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .btn {
      cursor: pointer;
    }
    .box {
      top: -153px;
      z-index: 0;
    }
    .logo {
      top: -90px;
    }
    .slogan {
      position: absolute;
      bottom: 28px;
      width: 100%;
      min-width: 1200px;
      p {
        color: #898989;
        margin-bottom: 20px;
      }
      .text {
        color: #000000;
        font-size: 28px;
        &::after {
          content: "";
          display: block;
          margin: 10px auto;
          width: 18px;
          height: 3px;
          background: #626262;
        }
      }
      .btn {
        width: 80px;
        height: 25px;
        color: #f7f7f7;
        background: #545454;
        border: 1px solid #545454;
        border-radius: 12px;
      }
    }
  }
}
</style>
