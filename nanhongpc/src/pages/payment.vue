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
          <li class="tobank" @click="tobank">
            <img src="../assets/shop/yl.png" alt />
          </li>
          <li class="towx">
            <img src="../assets/shop/wx.png" alt />
          </li>
          <li class="tozfb">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      ispay: false,
      ordernum: null,
      money: null
    };
  },
  created() {
    this.ordernum = this.$route.query.ordernum;
    this.money = this.$route.query.price;
  },
  methods: {
    tobank() {
      this.ispay = true;
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