<template>
  <div class="homebanner">
    <!-- 头部轮播 -->
    <div class="bannerbox">
      <el-carousel height="650px">
        <el-carousel-item v-for="(item, index) in slide" :key="index">
          <img :src="item" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 消息 -->
    <div class="viocebox clearFix">
      <div class="viopic">
        <img src="../assets/home/vioce.png" alt />
        <span>最新动态:</span>
      </div>

      <div class="vio fr">
        <el-carousel height="50px" direction="vertical">
          <el-carousel-item v-for="(item, index) in vioce" :key="index">
            <p>{{item}}</p>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
};
</script>

<style lang="less" scoped>
.homebanner {
  width: 100%;
//   padding-bottom: 92px;
  .viocebox {
    // background: pink;
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
      box-sizing: border-box;
      padding-right: 15px;
      img {
        box-sizing: border-box;
        padding-right: 5px;
      }
    }
    .vio {
      width: 90%;
    }
  }
}
</style>