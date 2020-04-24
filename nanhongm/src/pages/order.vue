<template>
  <div class="order">
    <!-- 头部 -->
    <p class="toptitle">
      <img src="../assets/shop/return.png" alt />提交订单
    </p>
    <!-- 地址 -->
    <div class="receve selbox">
      <p class="title">
        <span>收货地址</span>
      </p>
      <!-- 地址展示 -->
      <div class="curdress">
        <div class="left">
          <img src="../assets/shop/dress.png" alt />
        </div>
        <div class="center">
          <p>
            <span class="name">{{dressinfo[0].name}}</span>
            <span class="tel">{{dressinfo[0].tel}}</span>
          </p>
          <p class="dress">{{dressinfo[0].dress}}</p>
        </div>
        <div class="right">
          <img @click="tochangedress" src="../assets/shop/right.png" alt />
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
            :style="{backgroundImage: 'url(' + item.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div class="otct">
            <p class="name">{{item.name}}</p>
            <p class="aprice">￥{{item.aprice}}</p>
            <p class="pic">
              <img src="../assets/shop/tb.png" alt />
            </p>
            <p class="color">
              <span class="color">颜色：{{item.color}}</span>
              <span class="type">规格：{{item.type}}</span>
            </p>
          </div>
          <p class="num">×{{item.num}}</p>
        </li>
      </ul>
      <!-- 优惠券 -->
      <div class="coupon">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="优惠券" name="1">
            <div class="couponbox" v-for="(item, index) in coupon" :key="index">
              <span>{{item.des}}</span>
              <span class="time">有效期至{{item.time}}</span>
            </div>
          </van-collapse-item>
          <van-collapse-item title="积分抵扣" name="2">
            <div class="intinfo">
              <span class="text">账户共</span>
              <span class="aint">{{integral}}</span>
              <span class="text">积分</span>
              <span class="text sel">本次使用</span>
              <input v-model="numData"   step="1" />
              <span class="text">抵扣</span>
              <span class="num">￥{{numData}}</span>
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
              <span>￥1588.00</span>
            </p>
            <p class="cutcoupon">
              <span>优惠券</span>
              <span>-￥20.00</span>
            </p>
            <p class="cutintegral">
              <span>积分抵扣</span>
              <span>-￥0.00</span>
            </p>
            <p class="freight">
              <span>运费</span>
              <span>-￥0.00</span>
            </p>
          </div>
          <p class="totalprice">
            <span class="text">应付总额</span>
            <span class="totalprice">￥1568.00</span>
          </p>
          <p class="submit" @click="topay">提交订单</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      activeNames: ["1", "2"],
      curridio: "1",
      dressridio: "1",
      radio: null,
      rintegral: 0,
      numData: 0,
      dressinfo: [
        {
          name: "张三",
          tel: "12345678901",
          dress: "四川省成都市高新区新希望大厦使劲地基督教色达阿萨德"
        },
        { name: "张三", tel: "135245444", dress: "四川省成都市" }
      ],
      goodsinfo: [
        {
          img: require("../assets/product/goods1.png"),
          name:
            "机静滚筒洗衣机格力净格力净静滚筒洗衣机格力净格力净静滚筒洗衣机格力净格力净静滚筒洗衣机格力净",
          price: 1,
          num: 2,
          aprice: 1588,
          color: "白色",
          type: "1.5匹"
        },
        {
          img: require("../assets/product/goods1.png"),
          name: "格力净静滚筒洗衣机格力净",
          price: 1,
          num: 2,
          aprice: 1588,
          color: "白色",
          type: "1.5匹"
        },
        {
          img: require("../assets/product/goods1.png"),
          name: "格力净静滚筒洗衣机格力净",
          price: 1,
          num: 2,
          aprice: 1588,
          color: "白色",
          type: "1.5匹"
        }
      ],
      coupon: [
        { des: "满100减20（满减优惠）", time: "2019-10-31" },
        { des: "满100减20（满减优惠）", time: "2019-10-31" },
        { des: "满100减20（满减优惠）", time: "2019-10-31" },
        { des: "满100减20（满减优惠）", time: "2019-10-31" }
      ],
      integral: 49
    };
  },
  methods: {
    topay() {
      // console.log(e);
      this.$router.push({ path: "/payment", quety: {} });
    },
    tochangedress() {
      this.$router.push({ path: "/minecenter", query: { tag: "1" } });
    }
  }
};
</script>

<style lang="less" scoped>
.order {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 25px;
  background: rgba(245, 245, 245, 1);
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
      .couponbox {
        font-size: 24px;
        line-height: 50px;
        width: 100%;
        font-size: 18px;
        width: 100%;
        display: flex;
        justify-content: space-between;
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