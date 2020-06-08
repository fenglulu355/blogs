<template>
  <div class="payment">
    <div class="paybox">
      <div class="paytop clearFix">
        <p class="ordernum fl">订单提交成功，请尽快付款！订单号：{{ordernum}}</p>
        <p class="money fr">
          应付金额
          <span>{{money}}</span>元
        </p>
      </div>
      <div class="curbox">
        <p class="text">请选择支付方式</p>
        <ul class="paylist">
          <li class="tobank">
            <a :href="httpUrl+`/index/unionpay/dopay?orderId=`+orderid">
              <img src="../assets/shop/yl.png" alt />
            </a>
          </li>
          <li class="towx" @click="towx">
            <img src="../assets/shop/wx.png" alt />
          </li>
          <li class="tozfb" @click="tozfb">
            <img src="../assets/shop/zfb.png" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="payoff" v-show="ispay">
      <div class="payoffbox">
        <div class="pic">
          <img src="../assets/shop/ok.png" alt />
        </div>
        <p class="text">
          您的订单
          <span>{{ordernum}}</span> 已经支付成功
        </p>
        <div class="button clearFix">
          <p class="toorderlist fr" @click="toshop">继续购买</p>
          <p class="tointeg fl" @click="toorder">查看订单</p>
        </div>
      </div>
    </div>
    <div class="wxewm" v-show="isshowwx">
      <div class="infos" v-loading.fullscreen.lock="fullscreenLoading">
        <img class="closeimg" @click="closewx" src="../assets/navgation/log-x.png" alt />
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' +imgurl+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <p>微信支付二维码</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      fullscreenLoading: false,
      ispay: false,
      ordernum: null,
      money: null,
      orderid: "",
      imgurl: "",
      isshowwx: false
    };
  },
  created() {
    this.ordernum = this.$route.query.ordernum;
    this.money = this.$route.query.price;
    this.orderid = this.$route.query.orderid;
  },
  computed: {
    ...mapState(["userid"])
  },
  methods: {
    closewx() {
      this.$confirm("支付还未完成，您确定要取消吗", "提示", {
        cancelButtonText: "继续支付",
        confirmButtonText: "取消支付",

        type: "warning"
      })
        .then(() => {
          this.$message.error("取消支付");
          this.isshowwx = false;
        })
        .catch(() => {
          return;
        });
    },
    towx() {
      this.isshowwx = true;
      this.fullscreenLoading = true;
      this.$axios
        .post("/index/Wxpay/createJsBizPackage", {
          orderId: this.orderid,
          userId: this.userid
        })
        .then(res => {
          this.imgurl = res.data.data;
          this.fullscreenLoading = false;
          console.log(res);
        });
    },
    tozfb() {
      this.isshowwx = true;
      this.fullscreenLoading = true;
      this.$axios
        .post("/index/alipay/doPay", {
          orderId: this.orderid,
          userId: this.userid
        })
        .then(res => {
          // this.imgurl = res.data.data;
          this.fullscreenLoading = false;
          console.log(res);
        });
    },
    // 更新状态
    changestate(orderId, userid, oldState, newState) {
      this.$axios
        .post("/index/user/changeOrderState", {
          orderId: orderId,
          userId: userid,
          oldState: oldState,
          newState: newState
        })
        .then(res => {
          console.log(res);
        });
    },
    tobank() {
      this.fullscreenLoading = true;
      // this.ispay = true;
      this.$axios
        .get("/index/unionpay/dopay", { orderId: this.orderid })
        .then(res => {
          this.fullscreenLoading = false;
          console.log(res);
          alert(res);
        });
    },
    toshop() {
      this.ispay = false;
      this.$router.push({ path: "/shoppingmall" });
    },
    toorder() {
      this.ispay = false;
      this.$router.push({ path: "/orderlist" });
    }
  }
};
</script>
<style lang="less" scoped>
.payment {
  width: 100%;
  background: rgba(245, 245, 245, 1);
  box-sizing: border-box;
  padding: 47px 0 220px 0;
  .paybox {
    width: 1200px;
    margin: 0 auto;
    color: rgba(51, 51, 51, 1);
    font-size: 18px;
    span {
      color: rgba(235, 0, 40, 1);
      font-size: 24px;
      font-weight: bold;
    }
  }
  .curbox {
    box-sizing: border-box;
    padding: 39px 63px 0px 63px;
    margin-top: 20px;
    width: 1200px;
    height: 312px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
    .text {
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      box-sizing: border-box;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
    }
    .paylist {
      box-sizing: border-box;
      padding-top: 63px;
      li {
        cursor: pointer;
        display: inline-block;
        margin-right: 30px;
      }
    }
  }
  .wxewm {
    position: fixed;
    z-index: 111;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .infos {
      box-sizing: border-box;
      background: white;
      width: 500px;
      height: 350px;
      margin: 234px auto;
      padding-top: 40px;
      position: relative;
      .closeimg {
        position: absolute;
        right: 30px;
        top: 30px;
      }
      .mainpic {
        width: 200px;
        height: 200px;
        margin: 20px auto;
      }
      p {
        text-align: center;
      }
    }
  }
  .payoff {
    position: fixed;
    z-index: 111;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .payoffbox {
      background: white;
      width: 600px;
      height: 350px;
      margin: 234px auto;
      text-align: center;
      box-sizing: border-box;
      padding: 58px 140px 0 140px;
      .text {
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding: 22px 0 84px 0;
        span {
          color: rgba(228, 57, 60, 1);
        }
      }
      .button {
        p {
          cursor: pointer;
          width: 121px;
          height: 35px;
          text-align: center;
          font-size: 14px;
          line-height: 35px;
          color: white;
        }
        .toorderlist {
          background: rgba(0, 178, 78, 1);
        }
        .tointeg {
          background: RGBA(228, 57, 60, 1);
        }
      }
    }
  }
}
</style>