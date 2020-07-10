<template>
  <div class="mine">
    <div class="minebox">
      <p class="title">个人中心</p>
      <div class="info">
        <div class="head">
          <div
            class="mainpic"
            v-if="userinfo.user_image"
            :style="{backgroundImage: 'url(' +httpUrl+userinfo.user_image+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div
            v-else
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
            <span v-if="userinfo.user_nickname">{{userinfo.user_nickname}}</span>
            <span v-else>{{userinfo.user_name}}</span>
            <img src="../assets/mine/mine.png" alt />
          </p>
          <p class="integ">
            我的积分：
            <span>{{userinfo.points}}</span>
          </p>
        </div>
        <div class="tocoupon" @click="tocoupon">
          <img src="../assets/mine/banner.png" alt />
          <p>去领券》</p>
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
          <img :src="item.iconb" v-if="curmineli ==index" alt />
          <img :src="item.icon" v-else alt />

          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- <minecenter v-show="minecenter" :selmcli='curmineli'></minecenter> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import minecenter from "../components/mine-center";
export default {
  name: "mine",
  data() {
    return {
      curmineli: null,
      mineli: [
        {
          icon: require("../assets/mine/infoh.png"),
          iconb: require("../assets/mine/infob.png"),
          name: "个人信息",
          tag: 0
        },
        {
          icon: require("../assets/mine/orderh.png"),
          iconb: require("../assets/mine/orderb.png"),
          name: "我的订单",
          tag: 0
        },
        {
          icon: require("../assets/mine/dressg.png"),
          iconb: require("../assets/mine/dressb.png"),
          name: "我的地址",
          tag: 1
        },
        {
          icon: require("../assets/mine/yhh.png"),
          iconb: require("../assets/mine/yhb.png"),
          name: "我的优惠",
          tag: 2
        },
        {
          icon: require("../assets/mine/jfh.png"),
          iconb: require("../assets/mine/jfb.png"),
          name: "我的积分",
          tag: 3
        },
        {
          icon: require("../assets/mine/mmh.png"),
          iconb: require("../assets/mine/mmb.png"),
          name: "修改密码",
          tag: 4
        }
      ],
      userinfo: []
    };
  },
  computed: {
    ...mapState(["userid"])
  },
  created() {
    this.requst();
  },
  methods: {
    ...mapMutations(["setpoints"]),
    tocoupon() {
      this.$router.push({ path: "/minecenter", query: { tag: 3 } });
    },
    requst() {
      this.$axios
        .post("/index/user/userInfo", { userId: this.userid })
        .then(res => {
          console.log(res);
          this.userinfo = res.data.data;
          this.setpoints(res.data.data.points);
        });
    },
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
      .tocoupon {
        // background: blueviolet;
        position: relative;
        p {
          cursor: pointer;
          font-size: 24px;
          color: white;
          font-weight: bold;
          position: absolute;
          top: 40px;
          right: 5px;
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