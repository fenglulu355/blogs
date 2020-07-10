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
          <li class="tobank">
            <a :href="httpUrl+`/index/unionpay/dopay?orderId=`+orderid">
              <p>银联支付</p>
              <img src="../assets/shop/yl.png" alt />
            </a>
          </li>
          <li class="towx" @click="towx">
            <p  @click="towx">微信支付</p>
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
    <div class="wxewm" v-show="isshowwx">
      <div class="infos">
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
export default {
  data() {
    return {
      ispay: false,
      ordernum: null,
      money: null,
      orderid: "",
      imgurl: "",
      isshowwx: false,
      inwx: false
    };
  },
  created() {
    this.ordernum = this.$route.query.ordernum;
    this.money = this.$route.query.price;
    this.orderid = this.$route.query.orderid;
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
    tobank() {
      this.ispay = true;
    },

    towx() {
      // this.isshowwx = true;

      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.inwx = true;
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        //return true
        // this.isAndroid();
        this.$axios
          .post("/index/Wxpay/dopay", {
            order_id: this.orderid
          })
          .then(res => {
            // this.imgurl = res.data.data;

            console.log(res);

            alert(res.data.data);
            // windows.location.href = res.data.data;
            this.$router.push({ path: res.data.data });
          });
      } else {
        this.inwx = false;
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        this.$axios
          .post("/index/Wxpay/h5dopay", {
            order_id: this.orderid
          })
          .then(res => {
            // this.imgurl = res.data.data;

            console.log(res);
            alert(res.data.data);
            window.location.href = res.data.data;
          });
        // return false;
      }
      console.log(this.inwx);
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
        a {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
        }
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