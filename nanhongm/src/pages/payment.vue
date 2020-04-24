<template>
  <div class="payment">
    <div class="paybox" v-show="!ispay">
      <div class="paytop">
        <p class="ordernum">订单提交成功，请尽快付款！订单号：{{ordernum}}</p>
        <p class="money">
          应付金额
          <span>{{money}}</span>元
        </p>
      </div>
      <div class="curbox">
        <p class="text">
          <img src="../assets/shop/return.png" alt />
          请选择支付方式
        </p>
        <ul class="paylist">
          <li class="tobank" @click="tobank">
            <p>银联支付</p>
            <img src="../assets/shop/yl.png" alt />
          </li>
          <li class="towx">
            <p>微信支付</p>
            <img src="../assets/shop/wx.png" alt />
          </li>
          <li class="tozfb">
            <p>支付宝支付</p>
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
        <p class="suc">支付成功</p>
        <p class="text">
          订单编号：
          <span>{{ordernum}}</span>
        </p>
        <div class="button">
          <p class="toorderlist" @click="toshop">继续购买</p>
          <p class="tointeg" @click="toorder">查看订单</p>
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
      ordernum: 26548498498,
      money: 2087.0
    };
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
  padding: 50px 25px;
  .paybox {
    width: 100%;
    color: rgba(51, 51, 51, 1);
    font-size: 24px;
    line-height: 40px;
    span {
      color: rgba(235, 0, 40, 1);
      font-size: 24px;
      font-weight: bold;
    }
  }
  .curbox {
    box-sizing: border-box;
    padding: 39px 25px;
    margin-top: 20px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
    .text {
      img {
        width: 15px;
        margin-right: 25px;
        position: relative;
        bottom: 1px;
      }
      font-size: 30px;
      color: rgba(51, 51, 51, 1);
      box-sizing: border-box;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
    }
    .paylist {
      box-sizing: border-box;
      padding-top: 63px;
      li {
        width: 100%;
        margin-bottom: 76px;
        display: flex;
        justify-content: space-between;
        p {
          align-self: center;
          color: #999999;
          font-size: 24px;
          box-sizing: border-box;
          padding-left: 5%;
        }
        img {
          width: 375px;
        }
      }
    }
  }
  .payoff {
    width: 100%;
    .payoffbox {
      background: white;
      text-align: center;
      box-sizing: border-box;
      padding: 58px 0 100px 0;
      .pic {
        img {
          width: 142px;
        }
      }
      .suc {
        box-sizing: border-box;
        padding-top: 43px;
        font-size: 36px;
        color: rgba(51, 51, 51, 1);
      }
      .text {
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding: 22px 0 84px 0;
        font-size: 24px;
        span {
          color: rgba(228, 57, 60, 1);
        }
      }
      .button {
        width: 100%;
        display: flex;
        justify-content: space-around;
        p {
          width: 45%;
          height: 70px;
          text-align: center;
          font-size: 24px;
          line-height: 70px;
        }
        .toorderlist {
          border: 1px solid rgba(153, 153, 153, 1);
          color: #333333;
        }
        .tointeg {
          color: white;
          background: RGBA(228, 57, 60, 1);
        }
      }
    }
  }
}
</style>