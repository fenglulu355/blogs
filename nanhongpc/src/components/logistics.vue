<template>
  <div class="logistics">
    <div class="logisticsbox">
      <img @click="close" class="toclose" src="../assets/navgation/log-x.png" alt />
      <p class="title">物流明细</p>
      <div class="timeline">
        <el-timeline>
          <el-timeline-item v-for="(item, index) in logisticsinfo" :key="index" :color="color">
            <div class="infos">
              <div class="day">{{item[0].day}}</div>
              <div class="right" v-for="(items, index) in item" :key="index">
                <p class="time">{{items.time}}</p>
                <p class="des">{{items.des}}</p>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "logistics",
  data() {
    return {
      color: "rgba(36, 130, 200, 1)"
    };
  },
  props: {
    logisticsinfo: {
      type: Array
    }
  },
  methods: {
    close() {
      this.$emit("close", false);
    }
  }
};
</script>
<style lang="less" scoped>
.logistics {
  position: fixed;
  z-index: 111;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  .logisticsbox {
    width: 1000px;
    height: 642px;
    background: rgba(255, 255, 255, 1);
    margin: 130px auto;
    box-sizing: border-box;
    padding: 67px 98px;
    position: relative;
    .toclose {
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .title {
      box-sizing: border-box;
      padding-bottom: 15px;
      font-size: 20px;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid rgba(228, 228, 228, 1);
    }
    .timeline {
      width: 100%;
      height: 80%;
      margin-top: 20px;
      box-sizing: border-box;
      padding: 10px 10px 0px 100px;
      overflow-y: auto;
      .infos {
        position: relative;

        .day {
          font-size: 14px;
          color: rgba(36, 130, 200, 1);
          position: absolute;
          left: -125px;
        }
        .right {
          width: 90%;
          padding-bottom: 10px;
          display: flex;
          color: rgba(51, 51, 51, 1);
          font-size: 14px;
          .time {
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>