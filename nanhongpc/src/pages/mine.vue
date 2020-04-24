<template>
  <div class="mine">
    <div class="minebox">
      <p class="title">个人中心</p>
      <div class="info">
        <div class="head">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + require('../assets/about/1-4.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </div>
        <div class="names">
          <p class="name">
            四川南宏机电
            <img src="../assets/mine/mine.png" alt />
          </p>
          <p class="integ">
            我的积分：
            <span>2080</span>
          </p>
        </div>
        <div class="tocoupon">
          <img src="../assets/mine/banner.png" alt />
        </div>
      </div>
      <ul class="minelist">
        <li
          class="mineli"
          v-for="(item, index) in mineli"
          :key="index"
          :class="curmineli ==index?'selmine':''"
          @click="tonav(index,item)"
        >
          <img :src="item.icon" alt />
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- <minecenter v-show="minecenter" :selmcli='curmineli'></minecenter> -->
  </div>
</template>

<script>
// import minecenter from "../components/mine-center";
export default {
  name: "mine",
  data() {
    return {
      curmineli: null,
      mineli: [
        { icon: require("../assets/mine/info.png"), name: "个人信息", tag: 0 },
        { icon: require("../assets/mine/order.png"), name: "我的订单", tag: 0 },
        { icon: require("../assets/mine/dress.png"), name: "我的地址", tag: 1 },
        { icon: require("../assets/mine/yh.png"), name: "我的优惠", tag: 2 },
        { icon: require("../assets/mine/jf.png"), name: "我的积分", tag: 3 },
        { icon: require("../assets/mine/mm.png"), name: "修改密码", tag: 4 }
      ]
    };
  },
  methods: {
    tonav(e, item) {
      this.curmineli = e;
      if (e == 1) {
         setTimeout(() => {
          this.$router.push({ path: "/orderlist", query: { tag: item.tag } });
        }, 500);
      } else {
        setTimeout(() => {
          this.$router.push({ path: "/minecenter", query: { tag: item.tag } });
        }, 500);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mine {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 0 80px 0;
  background: rgba(245, 245, 245, 1);
  .minebox {
    margin: 0 auto;
    width: 1200px;
    height: 900px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
    box-sizing: border-box;
    padding: 27px 65px 70px 65px;
    .title {
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      box-sizing: border-box;
      padding-bottom: 25px;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
    }
    .info {
      box-sizing: border-box;
      padding: 29px 0;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      display: flex;
      justify-content: space-between;
      .head {
        background: pink;
        width: 114px;
        height: 114px;
        .mainpic {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .names {
        width: 60%;
        .name {
          font-size: 22px;
          box-sizing: border-box;
          padding: 20px 0;
          img {
            position: relative;
            bottom: 3px;
            left: 8px;
          }
        }
        .integ {
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          span {
            color: rgba(34, 129, 199, 1);
          }
        }
      }
    }
    .minelist {
      box-sizing: border-box;
      padding-top: 33px;
      .mineli {
        cursor: pointer;
        width: 100%;
        height: 79px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        line-height: 79px;
        margin-bottom: 14px;
        box-sizing: border-box;
        padding-left: 26px;
        span {
          margin-left: 15px;
        }
      }
      .selmine {
        box-shadow: 0px 0px 10px 0px rgba(224, 224, 224, 0.82);
        color: rgba(34, 129, 199, 1);
      }
    }
  }
}
</style>