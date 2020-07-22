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
          <img @click="back" src="../assets/shop/return.png" alt />
          请选择支付方式
        </p>
        <ul class="paylist">
          <!-- <li class="tobank">
            <a :href="httpUrl+`/index/unionpay/dopay?orderId=`+orderid">
              <p>银联支付</p>
              <img src="../assets/shop/yl.png" alt />
            </a>
          </li>-->
          <li class="towx" @click="showtc">
            <p @click="showtc">微信支付</p>
            <img src="../assets/shop/wx.png" alt />
          </li>
          <li class="tozfb">
            <!-- <a :href="httpUrl+`/index/alipay/doWapPay?orderId=`+orderid+`&userId=`+userid">
              <p>支付宝支付</p>
              <img src="../assets/shop/zfb.png" alt />
            </a>-->
            <p @click="showzfb">支付宝支付</p>
            <img @click="showzfb" src="../assets/shop/zfb.png" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="tck" v-if="istc">
      <p>
        <a @click="getopid">点击跳转至微信支付</a>
      </p>
    </div>
    <div class="tck" v-if="iszfb">
      <p>
        <button @click="gotozfb">点击跳转至支付宝支付...</button>
      </p>
      <!-- <div ref="html"></div> -->
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
import wx from "weixin-js-sdk";
import { mapState } from "vuex";
export default {
  data() {
    return {
      html: "",
      iszfb: false,
      istc: false,
      ispay: false,
      ordernum: null,
      money: null,
      orderid: "",
      imgurl: "",
      isshowwx: false,
      inwx: false,
      wxres: "",
      code: "",
      state: "",
      openids: "",
      zfbres: ""
    };
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.ordernum = this.$route.query.ordernum;
    this.money = this.$route.query.price;
    this.orderid = this.$route.query.orderid;
  },
  computed: {
    ...mapState(["userid"])
  },
  mounted() {
    this.code = sessionStorage.getItem("code");
    console.log(this.code);
    this.isinwx();
  },
  methods: {
    // 判断是否在微信
    isinwx() {
      var ua = window.navigator.userAgent.toLowerCase();
      console.log(ua, "ua");
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.inwx = true;
        if (this.code != "undefined") {
          this.requestopid(this.code);
        }
      } else {
        // h5浏览器
        this.inwx = false;
      }
      console.log(this.inwx);
    },
    // 不在微信浏览器的调用
    nowx() {
      this.$toast.loading({
        message: "正在调起支付请稍候...",
        forbidClick: true
      });
      setTimeout(() => {
        this.$axios
          .post("/index/Wxpay/h5dopay", {
            order_id: this.orderid
          })
          .then(res => {
            // this.imgurl = res.data.data;
            console.log(res);
            this.wxres = res.data.data;
            window.location.href = res.data.data;
          });
      }, 200);
    },
    requestopid(code) {
      this.$axios.post("/index/zpay/payOne", { code: code }).then(res => {
        console.log(res, "a");
        if (res.data.msg == "获取成功") {
          this.openids = res.data.data;
          let orderid = sessionStorage.getItem("orderid");
          this.sendopenid(orderid, this.openids);
        } else if (res.data.msg == "code无效") {
          console.log("无效");
          this.$toast.loading({
            message: "重新加载中请稍等...",
            forbidClick: true
          });
          setTimeout(() => {
            window.location.href =
              "https://www.scnhjd.com/index/zpay/getWxCode";
          }, 200);
        }
      });

      // 微信内置浏览器
    },
    sendopenid(orderid, openid) {
      console.log("sendopenid", orderid);
      this.$axios
        .post("index/zpay/dopay", {
          openid: openid,
          order_id: orderid
        })
        .then(res => {
          console.log(res, "res");

          if (res.data.msg == "成功") {
            console.log(
              JSON.stringify(typeof WeixinJSBridge),
              "typeof WeixinJSBridge"
            );
            if (typeof WeixinJSBridge === "undefined") {
              if (document.addEventListener) {
                document.addEventListener(
                  "WeixinJSBridgeReady",
                  this.onBridgeReady,
                  false
                );
              } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
                document.attachEvent(
                  "onWeixinJSBridgeReady",
                  this.onBridgeReady
                );
              }
            } else {
              this.onBridgeReady(res.data.data);
            }

            // wx.config({
            //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //   appId: res.data.data.appId, // 必填，公众号的唯一标识
            //   timestamp: res.data.data.timeStamp, // 必填，生成签名的时间戳
            //   nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            //   signature: res.data.data.paySign, // 必填，签名
            //   jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
            // });
            // wx.ready(function() {
            //   console.log("ready");
            //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            //   wx.chooseWXPay({
            //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //     appId: res.data.data.appId, // 必填，公众号的唯一标识
            //     timestamp: res.data.data.timeStamp, // 必填，生成签名的时间戳
            //     nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            //     package: res.data.data.package, // 必填，签名
            //     signType: res.data.data.signType, // 必填，签名
            //     paySign: res.data.data.paySign, // 必填，签名
            //     success: function(res) {
            //       // 支付成功后的回调函数
            //       console.log(res);
            //     },
            //     fail: function(res) {
            //       console.log("支付失败");
            //     },
            //     complete: function(res) {
            //       console.log(res, "complete");
            //     }
            //   });
            // });
          }
        });
    },
    getopid() {
      if (this.inwx == false) {
        this.nowx();
      } else {
        this.code = sessionStorage.getItem("code");
        // this.code = this.getUrlCode().ordernum;
        if (this.code == "undefined") {
          window.location.href = "https://www.scnhjd.com/index/zpay/getWxCode";
        } else {
          //  window.location.href='http://www.scnhjd.com/index/zpay/payOne'
          this.requestopid(this.code);
        }
        console.log(this.code);
      }
    },

    onBridgeReady(params) {
      var that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: params.appId, //公众号名称，由商户传入
          timeStamp: params.timeStamp, //支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: params.nonceStr, //支付签名随机串，不长于 32 位
          package: params.package, //统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: "MD5", //签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: params.paySign //支付签名
        },
        function(res) {
          if (res.err_msg === "get_brand_wcpay_request:ok") {
            alert("支付成功！");
            that.$router.push({ path: "/myOrder" });
          } else if (res.err_msg === "get_brand_wcpay_request:fail") {
            alert("支付失败！");
          }
        }
      );
    },
    showtc() {
      this.istc = true;
      this.iszfb = false;
      console.log(this.orderid);
    },
    getUrlCode() {
      var url = location.search;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    showzfb() {
      this.istc = false;
      // this.iszfb = true;
      this.tozfb();
    },
    tozfb() {
      // this.$toast.loading({
      //   message: "正在调起支付请稍候...",
      //   forbidClick: true
      // });
      setTimeout(() => {
        this.$axios
          .post("/index/alipay/doWapPay", {
            orderId: this.orderid,
            userId: this.userid
          })
          .then(res => {
            // this.imgurl = res.data.data;
            console.log(res);
            const div = document.createElement("div");
            div.innerHTML = res.data;
            document.body.appendChild(div);
            document.forms.alipaysubmit.submit();
            // this.$refs.html.innerHTML = res.data;
            // document.forms[0].submit();
            // this.$nextTick(() => {
            //   document.forms[0].submit(); //渲染支付宝支付页面
            // });
          });
      }, 200);
    },
    gotozfb() {
      const form = this.zfbres.form;
      const div = document.createElement("div");
      div.innerHTML = form; //此处form就是后台返回接收到的数据
      document.body.appendChild(div);
      document.forms[0].submit();
    },
    UrlCode(url) {
      // 截取url中的code方法  这里的判断只是针对于我自己的项目 你要用只是借鉴  不懂就去百度
      // var url = location.search;  //获取url
      var urls = url;
      let a = urls.indexOf("="),
        b = urls.indexOf("&"),
        c = urls.indexOf("state=");
      this.code = urls.slice(a + 1, b);
      // this.code = this.$router.query.code
      this.state = urls.slice(c + 6, c + 7);
      console.log(this.code, this.state);
      this.$axios.get("index/zpay/payOne", { code: this.code }).then(res => {
        console.log(res, "a");
      });
    },
    back() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "支付未完成确认离开吗"
        })
        .then(() => {
          this.$router.push({ path: "/orderlist" });
        })
        .catch(() => {});
      //
    },
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
      console.log(this.orderid);
      var ua = window.navigator.userAgent.toLowerCase();
      console.log(ua);
      // 微信内置浏览器
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.inwx = true;
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        console.log(this.orderid);
        // var ua = navigator.userAgent,
        //   app = navigator.appVersion;
        // var isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1;
        // var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        // let url = encodeURIComponent(
        //   "http://www.scnhjd.com/mindex.html#/payment?ordernum=5940230856212&orderid=94&price=1.06"
        // );
        // console.log(url);

        // if (isIOS) {

        // } else {
        //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce4edfb791aa82f1&redirect_uri=http://www.scnhjd.com/mindex.html#/payment?ordernum=5940230856212&orderid=94&price=1.06&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
        // }
        // window.location.href =
        //   `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce4edfb791aa82f1&redirect_uri=` +
        //   url +
        //   `+&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;

        // this.$axios
        //   .post("/index/Zpay/dopay", {
        //     order_id: this.orderid
        //   })
        //   .then(res => {
        //     // this.imgurl = res.data.data;
        //     this.wxres = res.data.data;
        //     console.log(res);

        //     // windows.location.href = res.data.data;
        //     // this.$router.push({ path: res.data.data });
        //   });
      } else {
        // h5浏览器
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
            this.wxres = res.data.data;
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
  .tck {
    width: 100%;
    height: 250px;
    background: rgba(0, 0, 0, 0.9);
    box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 250px;
    z-index: 222;
    a {
      color: white;
      font-size: 35px;
    }
    button {
      background: rgba(0, 0, 0, 0);
      color: white;
      font-size: 35px;
    }
  }
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