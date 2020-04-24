<template>
  <div class="logistics">
    <div class="logisticsbox">
      <img @click="close" class="toclose" src="../assets/navgation/log-x.png" alt />
      <p class="title">
        <img src="../assets/shop/return.png" alt /> 物流明细
      </p>
      <div class="timeline">
        <van-steps direction="vertical" :active="0" >
          <van-step v-for="(item, index) in logisticsinfo"  :key="index">
            <div class="infos">
              <div class="day">{{item[0].day}}</div>
              <div class="right" v-for="(items, index) in item" :key="index">
                <p class="time">{{items.time}}</p>
                <p class="des">{{items.des}}</p>
              </div>
            </div>
          </van-step>
        </van-steps>
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
  width: 100%;
  height: 100%;
  .logisticsbox {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    margin: 50px auto;
    box-sizing: border-box;
    padding: 26px 30px;
    position: relative;
    .toclose {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .title {
      width: 100%;
      box-sizing: border-box;
      padding-bottom: 30px;
      font-size: 30px;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid rgba(228, 228, 228, 1);
      img {
        width: 15px;
        margin-right: 10px;
        position: relative;
        bottom: 1px;
      }
    }
    .timeline {
      width: 100%;
      position: relative;
      box-sizing: border-box;
      padding-left: 20%;
      .infos {
        width: 100%;
        // background: brown;
        .day {
          font-size: 20px;
          color: rgba(36, 130, 200, 1);
          position: absolute;
          left: -40%;
        }
        .right {
          width: 100%;
          padding-bottom: 10px;
          display: flex;
          color: rgba(51, 51, 51, 1);
          font-size: 20px;
          .time {
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>