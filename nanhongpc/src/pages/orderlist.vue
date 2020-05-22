<template>
  <div class="orderlist">
    <div class="ordercont">
      <ul class="navlist">
        <li
          class="navli"
          v-for="(item, index) in navli"
          :key="index"
          :class="ordernav==index?'sel':''"
          @click="changeOrderNav(index)"
        >
          <span class="name">{{item.name}}</span>
          <span class="num">{{item.num}}</span>
          <span class="blue"></span>
        </li>
      </ul>
      <!-- 所有订单 -->
      <div class="orders">
        <ul class="orderslist">
          <li class="ordersli" v-for="(item, index) in orderinfos" :key="index">
            <div class="continfo">
              <p class="citop">
                <span class="time">{{item.time}}</span>
                <span class="ordernum">订单号：{{item.ordernum}}</span>
              </p>
              <div class="cicenter">
                <div class="cicleft">
                  <div class="orderlists" v-for="(items, index) in item.orderlist" :key="index">
                    <div
                      class="mainpic"
                      :style="{backgroundImage: 'url(' + items.img+ ')',
                     backgroundSize:'cover',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition:'center'
                    }"
                    ></div>
                    <p class="des">{{items.des}}</p>
                    <p class="num">×{{items.num}}</p>
                  </div>
                </div>
                <div class="ciccenter">
                  <span class="name">{{item.name}}</span>
                  <img src="../assets/shop/mine.png" alt />
                </div>
                <div class="cicprice">
                  <p class="aprice">总额 ￥{{item.aprice}}</p>
                  <p class="return" v-show="!item.received && item.payment">退款/退货</p>
                  <p class="integral" v-show="item.received">已获得{{item.aprice}}积分</p>
                </div>

                <div class="cicright">
                  <!-- 待付款 -->
                  <div
                    class="alreadypayment"
                    v-show="!item.evaluate && !item.send && !item.received && !item.payment"
                  >
                    <p class="payment">已下单</p>
                    <p class="toeva" @click="topay(index,item)">去付款</p>
                  </div>
                  <!-- 待收货 -->
                  <div
                    class="alreadysend"
                    v-show="!item.evaluate && item.send && !item.received && item.payment"
                  >
                    <p class="send">已发货</p>
                    <p class="toreceived" @click="toreceived(index,item)">去收货</p>
                  </div>
                  <!-- 待评价 -->
                  <div
                    class="alreadyreceived"
                    v-show="!item.evaluate && item.send && item.received && item.payment "
                  >
                    <p class="received">已收货</p>
                    <p class="toeva" @click="toeva(index,item)">去评价</p>
                  </div>
                  <!-- 待发货 -->
                  <div
                    class="alreadypayment"
                    v-show="!item.evaluate && !item.send && !item.received && item.payment"
                  >
                    <p class="payment">已付款</p>
                    <p class="waitsend">待发货</p>
                  </div>
                  <!-- 已评价 -->
                  <div
                    class="alreadyreceived"
                    v-show="item.evaluate && item.send && item.received && item.payment "
                  >
                    <p class="received">已收货</p>
                    <p class="hassend">已评价</p>
                  </div>
                </div>
              </div>
              <div class="cibot" @click="openlog(index,item)">
                <span>查看物流明细</span>
                <img src="../assets/shop/tr.png" alt />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 点击收货获取积分 -->
    <div class="integbox" v-show="isinteg">
      <div class="info">
        <p class="getinteg">
          <img src="../assets/shop/ok.png" alt />
          <span class="num">+{{integ}}</span>
          <span class="text">积分</span>
        </p>
        <p class="get">您已确认收货成功，恭喜获得{{integ}}积分</p>
        <div class="button clearFix">
          <p class="toorderlist fr" @click="isinteg = !isinteg">返回订单</p>
          <p class="tointeg fl" @click="tointeg">查看积分</p>
        </div>
      </div>
    </div>
    <!-- 评价 -->
    <evaluate :goodsinfos="goodsinfo" @close="close" v-if="isevaluate"></evaluate>
    <!-- 物流 -->
    <logistics :logisticsinfo="logisticsinfo" @close="closelog" v-if="islogistics"></logistics>
  </div>
</template>

<script>
import evaluate from "../components/evaluate";
import logistics from "../components/logistics";
import { mapState } from "vuex";
export default {
  name: "orderlist",
  data() {
    return {
      islogistics: false,
      closea: "true",
      isevaluate: false,
      integ: 0, //积分
      isinteg: false,
      ordernav: 0,
      goodsinfo: {},
      navli: [
        { name: "所有订单", num: "" },
        { name: "待付款", num: "2" },
        { name: "待发货", num: "3" },
        { name: "待收货", num: "" },
        { name: "待评价", num: "1" }
      ],
      orderinfo: [
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "张三",
          aprice: "2499.00",
          payment: false,
          send: false,
          received: false,
          evaluate: false
        },
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "李四",
          aprice: "2499.00",
          payment: true,
          send: false,
          received: false,
          evaluate: false
        },
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "张三",
          aprice: "2499.00",
          payment: true,
          send: true,
          received: false,
          evaluate: false
        },
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "王五",
          aprice: "2499.00",
          payment: true,
          send: true,
          received: true,
          evaluate: false
        },
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "张三",
          aprice: "2499.00",
          payment: true,
          send: true,
          received: true,
          evaluate: true
        },
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "张三",
          aprice: "2499.00",
          payment: false,
          send: false,
          received: false,
          evaluate: false
        },
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "李四",
          aprice: "2499.00",
          payment: true,
          send: false,
          received: false,
          evaluate: false
        },
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "张三",
          aprice: "2499.00",
          payment: true,
          send: true,
          received: false,
          evaluate: false
        },
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "王五",
          aprice: "2499.00",
          payment: true,
          send: true,
          received: true,
          evaluate: false
        },
        {
          time: "2019-10-25 11:32:45",
          ordernum: "1254164184",
          orderlist: [
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1"
            }
          ],
          name: "张三",
          aprice: "2499.00",
          payment: true,
          send: true,
          received: true,
          evaluate: true
        }
      ],
      orderinfos: [],
      logisticsinfo: [
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "正在派送中"
          },
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],

        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],

        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],

        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des:
              "你的订单已被收件员揽收，【成都市武侯区新希件员揽收，【成都市武侯区新希件员揽收，【成都市武侯区新希件员揽收，【成都市武侯区新希件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ],
        [
          {
            day: "2019-10-24",
            time: "20:50",
            des: "你的订单已被收件员揽收，【成都市武侯区新希望营业部】库存中"
          }
        ]
      ]
    };
  },
  components: { evaluate, logistics },
  created() {
    this.orderinfos = this.orderinfo;
    this.requst();
  },
  computed: {
    ...mapState(["userid"])
  },
  methods: {
    requst() {
      this.$axios
        .post("/index/user/orders", { userId: this.userid })
        .then(res => {
          console.log(res);
        });
    },
    changeOrderNav(index) {
      this.ordernav = index;
      console.log(index);
      if (index == 0) {
        this.orderinfos = this.orderinfo;
      }
      if (index == 1) {
        let arr = this.orderinfo;
        let arrb = arr.filter(function(e) {
          return e.payment == false;
        });
        this.orderinfos = arrb;
        console.log(this.orderinfos, "arr");
      }
      if (index == 2) {
        let arr = this.orderinfo;
        let arrb = arr.filter(function(e) {
          return e.send == false && e.payment == true;
        });
        this.orderinfos = arrb;
        console.log(this.orderinfos, "arr");
      }
      if (index == 3) {
        let arr = this.orderinfo;
        let arrb = arr.filter(function(e) {
          return e.received == false && e.payment == true && e.send == true;
        });
        this.orderinfos = arrb;
        console.log(this.orderinfos, "arr");
      }
      if (index == 4) {
        let arr = this.orderinfo;
        let arrb = arr.filter(function(e) {
          return (
            e.evaluate == false &&
            e.payment == true &&
            e.send == true &&
            e.received == true
          );
        });
        this.orderinfos = arrb;
        console.log(this.orderinfos, "arr");
      }
    },
    // 去付款
    topay(index, item) {
      console.log(item);
    },
    // 去评价
    toeva(index, item) {
      this.goodsinfo = this.orderinfo[index];
      this.isevaluate = true;
      console.log(this.isevaluate);
    },
    // 点击收货
    toreceived(index, item) {
      this.isinteg = true;
      console.log(item);
      this.integ = Math.floor(item.aprice);
      // 此处连接后台修改状态
    },
    // 查看积分
    tointeg() {
      this.$router.push({ path: "/minecenter", query: { tag: "3" } });
    },
    close(e) {
      this.isevaluate = e;
    },
    openlog(index, item) {
      this.islogistics = true;
      console.log(item);
    },
    closelog(e) {
      this.islogistics = e;
    }
  }
};
</script>
<style lang="less" scoped>
.orderlist {
  background: rgba(245, 245, 245, 1);
  width: 100%;
  box-sizing: border-box;
  padding: 77px 0 82px 0;
  .ordercont {
    width: 1200px;
    margin: 0 auto;
    .navlist {
      width: 100%;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      box-sizing: border-box;
      margin-bottom: 25px;
      .navli {
        cursor: pointer;
        display: inline-block;
        margin-right: 70px;
        color: rgba(51, 51, 51, 1);
        font-size: 18px;
        box-sizing: border-box;
        padding-bottom: 25px;
        .num {
          color: rgba(36, 130, 200, 1);
        }
      }
      .sel {
        color: rgba(36, 130, 200, 1);
        position: relative;
        .blue {
          display: inline-block;
          width: 70px;
          height: 5px;
          background: rgba(36, 130, 200, 1);
          position: absolute;
          bottom: -3px;
          left: 0;
        }
      }
    }
    .orders {
      width: 100%;
      .orderslist {
        width: 100%;
        .ordersli {
          box-sizing: border-box;
          margin-bottom: 15px;
          padding: 19px 39px 17px 17px;
          width: 100%;
          // height: 191px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
          .continfo {
            // background: olivedrab;
            width: 100%;
            height: 100%;
            position: relative;
            box-sizing: border-box;
            padding: 0px 0px 40px 0px;
            .citop {
              color: rgba(153, 153, 153, 1);
              font-size: 12px;
              span {
                padding-right: 30px;
              }
            }
            .cicenter {
              //   background: pink;
              box-sizing: border-box;
              padding-top: 27px;
              display: flex;
              justify-content: flex-start;
              .cicleft {
                // background: red;
                width: 710px;
                position: relative;
                &::after {
                  content: "";
                  width: 1px;
                  height: 105px;
                  background: rgba(228, 228, 228, 0.63);
                  position: absolute;
                  right: 0;
                  top: -12px;
                }
                .orderlists {
                  width: 100%;
                  display: flex;
                  justify-content: flex-start;
                  padding-bottom: 10px;
                  .mainpic {
                    width: 77px;
                    height: 77px;
                    border: 1px solid rgba(239, 239, 239, 1);
                  }
                  .des {
                    box-sizing: border-box;
                    padding: 0 110px 0 18px;
                    width: 350px;
                    height: 40px;
                    color: rgba(51, 51, 51, 1);
                    font-size: 15px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                  }
                  .num {
                    color: rgba(153, 153, 153, 1);
                    font-size: 15px;
                  }
                }
              }
              .ciccenter {
                // background: lawngreen;
                // height: 77px;
                width: 140px;
                text-align: center;
                position: relative;
                color: rgba(51, 51, 51, 1);
                font-size: 15px;
                .name {
                  position: relative;
                  top: 3px;
                  left: -5px;
                }
                &::after {
                  content: "";
                  width: 1px;
                  height: 105px;
                  background: rgba(228, 228, 228, 0.63);
                  position: absolute;
                  right: 0;
                  top: -12px;
                }
              }
              .cicprice {
                // background: lightblue;
                width: 170px;
                text-align: center;
                position: relative;
                font-size: 15px;
                &::after {
                  content: "";
                  width: 1px;
                  height: 105px;
                  background: rgba(228, 228, 228, 0.63);
                  position: absolute;
                  right: 0;
                  top: -12px;
                }
                .aprice {
                  color: rgba(153, 153, 153, 1);
                }
                .return {
                  cursor: pointer;
                  margin: 0 auto;
                  width: 114px;
                  height: 35px;
                  text-align: center;
                  line-height: 35px;
                  margin-top: 22px;
                  background: RGBA(38, 128, 202, 1);
                  color: white;
                }
                .integral {
                  margin-top: 34px;
                  color: rgba(36, 130, 200, 1);
                }
              }
              .cicright {
                // background: lightcoral;
                width: 120px;
                .send,
                .received,
                .payment {
                  color: rgba(153, 153, 153, 1);
                  font-size: 15px;
                  text-align: center;
                  position: relative;
                  left: 10px;
                }
                .toreceived,
                .toeva {
                  cursor: pointer;
                  margin: 23px 15px;
                  width: 114px;
                  height: 35px;
                  background: RGBA(225, 58, 62, 1);
                  text-align: center;
                  line-height: 35px;
                  color: white;
                }
                .waitsend {
                  color: rgba(228, 57, 60, 1);
                  font-size: 15px;
                  text-align: center;
                  position: relative;
                  left: 10px;
                  top: 30px;
                }
                .hassend {
                  color: RGBA(36, 129, 202, 1);
                  font-size: 15px;
                  text-align: center;
                  position: relative;
                  left: 10px;
                  top: 30px;
                }
              }
            }
            .cibot {
              cursor: pointer;
              font-size: 14px;
              color: rgba(51, 51, 51, 1);
              position: absolute;
              bottom: -0px;
              left: 0;
              img {
                position: relative;
                bottom: 1px;
                left: 2px;
              }
            }
          }
        }
      }
    }
  }
  .integbox {
    position: fixed;
    z-index: 111;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .info {
      width: 600px;
      height: 350px;
      background: white;
      margin: 234px auto;
      text-align: center;
      box-sizing: border-box;
      padding: 58px 140px 0 140px;
      .getinteg {
        color: rgba(51, 51, 51, 1);
        font-size: 18px;
        span {
          position: relative;
          top: 12px;
          left: 5px;
        }
        .num {
          font-size: 41px;
        }
      }
      .get {
        color: rgba(51, 51, 51, 1);
        font-size: 16px;
        box-sizing: border-box;
        padding: 33px 0 84px 0;
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