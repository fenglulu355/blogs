<template>
  <div class="homebanner">
    <!-- 头部轮播 -->
    <div class="bannerbox">
      <el-carousel height="650px">
        <el-carousel-item v-for="(item, index) in slide" :key="index" arrow="none">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + item+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 消息 -->
    <div class="viocebox clearFix" v-if="isbanshow">
      <div class="viopic">
        <img src="../assets/home/vioce.png" alt />
        <span>最新动态:</span>
      </div>

      <div class="vio fr">
        <el-carousel height="50px" direction="vertical" indicator-position="none">
          <el-carousel-item v-for="(item, index) in vioce" :key="index">
            <p>{{item}}</p>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "homebanner",
  data() {
    return {
      slide: [
        require("../assets/home/homebanner.png"),
        require("../assets/home/homebanner.png"),
        require("../assets/home/homebanner.png"),
        require("../assets/home/homebanner.png")
      ],
      vioce: [
        "消息通知1消息通知1消息通知1消息通知1消息通知1消息通知1消息通知1消息通知1",
        "消息通知2消息通知2消息通知2消息通知2消息通知2消息通知2"
      ]
    };
  },
  computed:{
    ...mapState(['isbanshow'])
  }
};
</script>

<style lang="less" scoped>
.homebanner {
  // background: palevioletred;
  width: 100%;
  min-width: 1200px;
  .bannerbox {
    width: 100%;
    .mainpic {
      width: 100%;
      height: 650px;
    }
  }
  .viocebox {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: rgba(91, 91, 91, 1);
    .viopic {
      width: 10%;
      text-align: right;
      position: relative;
      left: -8px;
      img {
        box-sizing: border-box;
        padding-right: 5px;
      }
    }
    .vio {
      // background: pink;
      width: 80%;
    }
  }
}
</style>