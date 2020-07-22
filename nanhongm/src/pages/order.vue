<template>
  <div class="order">
    <!-- 头部 -->
    <p class="toptitle">
      <img @click="back" src="../assets/shop/return.png" alt />提交订单
    </p>
    <!-- 地址 -->
    <div class="receve selbox">
      <p class="title">
        <span>收货地址</span>
      </p>
      <!-- 地址展示 -->
      <div class="curdress">
        <p class="none" v-if="dressinfo.length==0" @click="toadddress">地址为空，点击此处去添加</p>
        <div
          class="dressinfos"
          v-for="(item, index) in dressinfo"
          :key="index"
          @click.stop="changecurdress(item,index)"
        >
          <div class="left">
            <img v-show="isdressindex==index" src="../assets/shop/dress.png" alt />
          </div>
          <div class="center">
            <p>
              <span class="name">{{item.address_name}}</span>
              <span class="tel">{{item.address_phone}}</span>
            </p>
            <p
              class="dress"
            >{{item.address_province}}{{item.address_city}}{{item.address_area}}{{item.address_info}}</p>
          </div>
          <div class="right">
            <img @click.stop="tochangedress(item,index)" src="../assets/shop/right.png" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- 订单 -->
    <div class="orderbox selbox">
      <p class="title">订单详情</p>
      <!-- 订单 -->
      <ul class="goodslist">
        <li class="goodsli" v-for="(item, index) in goodsinfo" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +httpUrl+ item.goods_image+  ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div class="otct">
            <p class="name">{{item.goods_name}}</p>
            <p class="aprice">￥{{item.goods_price}}</p>
            <p class="pic">
              <img src="../assets/shop/tb.png" alt />
            </p>
            <p class="color">
              <span class="color">规格：{{item.format_ids}}</span>
            </p>
          </div>
          <p class="num">×{{item.cart_num}}</p>
        </li>
      </ul>
      <!-- 优惠券 -->
      <div class="coupon">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="优惠券" name="1">
            <div
              class="couponbox"
              v-for="(item, index) in coupon"
              :key="index"
              :class="iscurcoupon==index?'cur':''"
              @click="curyhq(item,index)"
            >
              <div class="style"></div>
              <p>
                <span>{{item.desc}}</span>
                <span class="time">有效期至{{item.end_time}}</span>
              </p>
            </div>
          </van-collapse-item>
          <van-collapse-item title="积分抵扣" name="2">
            <div class="intinfo">
              <span class="text">账户共</span>
              <span class="aint">{{integral}}</span>
              <span class="text">积分</span>
              <span class="text sel">本次使用</span>
              <input v-model.number="orderlist.numData" @input="watchipt" step="1" />
              <span class="text">抵扣</span>
              <span class="num">￥{{orderlist.numData}}</span>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>

      <!-- 结算单 -->
      <div class="ptotal">
        <div class="listbox">
          <div class="list">
            <p class="goodsprice">
              <span>商品总金额</span>
              <span>{{allprice | showPrice}}</span>
            </p>
            <p class="cutcoupon">
              <span>优惠券</span>
              <span>-{{couponnum | showPrice }}</span>
            </p>
            <p class="cutintegral">
              <span>积分抵扣</span>
              <span>-{{orderlist.numData | showPrice}}</span>
            </p>
            <p class="freight">
              <span>运费</span>
              <span>-￥0.00</span>
            </p>
          </div>
          <p class="totalprice">
            <span class="text">应付总额</span>
            <span class="totalprice">{{totalPrice | showPrice}}</span>
          </p>
          <p class="submit" @click="topay">提交订单</p>
        </div>
      </div>
    </div>
    <div class="editdressbox" v-if="isedit" :style="{'height':height+`px`}">
      <editdress :edititem="curdress" @close="close"></editdress>
    </div>
  </div>
</template>

<script>
import editdress from "../components/editdress";

import { mapState } from "vuex";
export default {
  inject: ["reload"],
  name: "order",
  data() {
    return {
      height: 0,
      orderlist: {
        numData: 0
      },
      activeNames: ["1", "2"],
      // curridio: "1",
      // dressridio: "1",
      // radio: null,

      numData: 0,
      dressinfo: [],
      isedit: false,
      curdress: [],
      curdressid: "",
      isdressindex: 0,
      goodsinfo: [],
      coupon: [],
      couponid: null,
      iscurcoupon: null,
      couponnum: 0, //优惠券价格
      integral: 0
    };
  },
  computed: {
    ...mapState(["userid"]),
    allprice() {
      return this.goodsinfo.reduce(
        (previousValue, item) =>
          previousValue + this.accMul(item.cart_num, Number(item.goods_price)),
        0
      );
    },
    totalPrice() {
      return this.allprice - this.orderlist.numData - this.couponnum;
    }
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.height = document.documentElement.clientHeight;
    console.log(this.height);

    this.requstcar(this.userid);
    this.requstyhq();
    this.requstmine();
    this.requstaddress(this.userid);
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    toadddress() {
      this.$router.push({ path: "/minecenter", query: { tag: 1 } });
    },
    requstmine() {
      this.$axios
        .post("/index/user/userInfo", { userId: this.userid })
        .then(res => {
          this.integral = res.data.data.points;
          console.log(res);
        });
    },
    requstcar(userid) {
      this.$axios
        .post("/index/shop/getCartData", { userId: userid, cartId: "" })
        .then(res => {
          this.goodsinfo = res.data.cart_data;
        });
    },
    requstaddress(userId) {
      this.$axios.post("/index/user/address", { userId: userId }).then(res => {
        this.dressinfo = res.data.data;
        this.curdress = this.dressinfo[0];
        this.curdressid = this.dressinfo[0].address_id;
      });
    },
    changecurdress(item, index) {
      this.isdressindex = index;
      console.log(item);
      this.curdress = item;
      this.curdressid = item.address_id;
    },
    // 优惠券
    requstyhq() {
      this.$axios
        .post("/index/coupon/userCoupon", { userId: this.userid })
        .then(res => {
          console.log(res);
          this.coupon = res.data.data;

          if (res.data.data.length == 0) {
            console.log("没有优惠券");
          }
        });
    },
    curyhq(item, index) {
      let cond = Number(item.cond);
      console.log(cond);
      if (cond > this.allprice || cond == this.allprice) {
        this.$toast.fail("对不起！满" + cond + "才能使用");
      } else {
        this.iscurcoupon = index;
        this.couponid = item.id;
        this.couponnum = Number(item.price);
      }
    },
    // jf
    watchipt(e) {
      if (this.orderlist.numData > this.integral) {
        console.log(1);
        this.$dialog
          .confirm({
            title: "提示",
            message: "账户共有" + this.integral + "积分, 是否全部使用?"
          })
          .then(() => {
            this.orderlist.numData = this.integral;
          })
          .catch(() => {
            this.orderlist.numData = 0;
          });
      }
    },
    topay() {
      let totalPrice = this.totalPrice.toFixed(2);
      this.$dialog
        .confirm({
          title: "提示",
          message: "总价" + totalPrice + "元，确认提交"
        })
        .then(() => {
          this.$axios
            .post("/index/shop/subOrders", {
              userId: this.userid,
              total: totalPrice,
              data: this.goodsinfo,
              adid: this.curdressid,
              coupon_id: this.couponid,
              points: this.orderlist.numData
            })
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                this.$toast.success("提交成功!");
                sessionStorage.setItem("orderid", res.data.data.order_id);
                console.log(res.data.data.order_num);
                setTimeout(() => {
                  this.$router.push({
                    path: "/payment",
                    query: {
                      ordernum: res.data.data.order_num,
                      orderid: res.data.data.order_id,
                      price: this.totalPrice
                    }
                  });
                }, 500);
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {
          this.$toast.fail("已取消提交");
        });

      //
    },
    close(e, info) {
      this.isedit = e;
      // 修改地址
      this.$axios
        .post("/index/user/editaddress", {
          aid: this.curdressid,
          userId: this.userid,
          address_name: info.name,
          address_phone: info.tel,
          address_province: info.province,
          address_city: info.city,
          address_area: info.county,
          address_info: info.addressDetail
        })
        .then(res => {
          console.log(res);
          this.reload();
        });
      console.log(info, "wwww");
    },
    tochangedress(item, index) {
      this.isdressindex = index;
      this.curdressid = item.address_id;
      setTimeout(() => {
        this.isedit = true;
        this.curdress = item;
      }, 200);
      // this.$router.push({ path: "/minecenter", query: { tag: "1" } });
    },

    accMul: function(arg1, arg2) {
      arg2 = arg2.toFixed(2);
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}

      return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / 100;
    }
  },
  filters: {
    showPrice(price) {
      return "￥" + price.toFixed(2);
    }
  },
  components: { editdress }
};
</script>

<style lang="less" scoped>
.order {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 25px;
  background: rgba(245, 245, 245, 1);
  .editdressbox {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 111;
    background: rgba(8, 8, 8, 0.5);
    box-sizing: border-box;
    padding: 200px 90px 0 90px;
  }
  .toptitle {
    width: 100%;
    height: 85px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
    font-size: 30px;
    color: #333333;
    line-height: 86px;

    img {
      height: 26px;
      margin: 0 25px;
      position: relative;
      bottom: 1px;
    }
  }
  .selbox {
    width: 100%;
    background: white;
    box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
    box-sizing: border-box;
    padding: 30px 25px;
    margin-top: 15px;
    .title {
      color: rgba(51, 51, 51, 1);
      font-size: 30px;
    }
  }
  .receve {
    .title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      box-sizing: border-box;
      padding-bottom: 24px;
      .ds {
        cursor: pointer;
      }
    }
    .dsinfo {
      font-size: 18px;
    }
    .curdress {
      width: 100%;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      .none {
        padding: 40px 0;
        color: #333333;
      }
      .dressinfos {
        box-sizing: border-box;
        padding: 30px 0;
        display: flex;
        justify-content: space-between;
        .left {
          width: 15%;
          align-self: center;
          img {
            width: 64px;
            height: 64px;
          }
        }
        .center {
          align-self: center;
          width: 75%;
          .name {
            color: #333333;
            font-size: 30px;
          }
          .tel {
            font-size: 24px;
            color: #8e8e8e;
            box-sizing: border-box;
            padding-left: 30px;
          }
          .dress {
            box-sizing: border-box;
            padding-top: 20px;
            font-size: 24px;
            color: #333333;
            line-height: 35px;
          }
        }
        .right {
          align-self: center;
          width: 10%;
          text-align: center;
          img {
            width: 13px;
          }
        }
      }
    }
  }
  .orderbox {
    .title {
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      box-sizing: border-box;
      padding-bottom: 24px;
    }
    .goodslist {
      width: 100%;
      .goodsli {
        display: flex;
        justify-content: space-between;
        color: rgba(51, 51, 51, 1);
        font-size: 24px;
        border-bottom: 1px solid #cccccc;
        box-sizing: border-box;
        padding: 34px 0;
        .mainpic {
          width: 18%;
          height: 107px;
          border-radius: 10px;
          border: 1px solid rgba(204, 204, 204, 0.8);
        }
        .otct {
          align-self: center;
          width: 70%;
          p {
            width: 100%;
            text-align: left;
          }
          .name {
            line-height: 30px;
          }
          .aprice {
            padding-top: 10px;
          }
          .pic {
            box-sizing: border-box;
            padding: 42px 0 21px 0;
          }
        }
        .num {
          align-self: center;
          width: 5%;
          text-align: right;
        }
      }
    }
    .coupon {
      width: 100%;
      .style {
        align-self: center;
        width: 12px;
        height: 12px;
        background: #ffffff;
        border-radius: 50%;
      }
      .cur {
        .style {
          background: #2482c8;
        }
        color: #2482c8;
      }
      .couponbox {
        font-size: 24px;
        line-height: 50px;
        width: 100%;
        font-size: 18px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        p {
          width: 100%;
          padding-left: 20px;
          display: flex;
          justify-content: space-between;
        }
      }
      .intinfo {
        font-size: 24px;
        color: #999999;
        .sel {
          padding-left: 10px;
        }
        input {
          width: 120px;
          height: 28px;
          border: 1px solid rgba(210, 210, 210, 1);
          font-size: 18px;
          box-sizing: border-box;
          padding: 0 10px;
        }
      }
    }

    .ptotal {
      width: 100%;
      .listbox {
        width: 100%;
        .list {
          box-sizing: border-box;
          padding: 33px 0;
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          p {
            padding: 12px 0;
            display: flex;
            justify-content: space-between;
            font-size: 24px;
          }
        }
        .totalprice {
          box-sizing: border-box;
          padding: 10px 0 16px 0;
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
          display: flex;
          justify-content: space-between;
          .text {
            align-self: flex-end;
            position: relative;
            bottom: 25px;
          }
          .totalprice {
            font-size: 60px;
            color: rgba(235, 0, 40, 1);
          }
        }
        .submit {
          cursor: pointer;
          width: 100%;
          height: 70px;
          font-size: 24px;
          background: rgba(235, 0, 40, 1);
          text-align: center;
          line-height: 70px;
          color: white;
        }
      }
    }
  }
}
</style>