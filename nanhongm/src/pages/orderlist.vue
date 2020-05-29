<template>
  <div class="orderlist">
    <div class="ordercont" v-show="!isinteg && !islogistics &&!isevaluate">
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
              <div class="citop">
                <span class="time">{{item.created_time}}</span>
                <span class="ordernum">订单号：{{item.order_num}}</span>
                <span class="red" v-if="item.order_state == 0">待付款</span>
                <span class="red" v-if="item.order_state==1">待发货</span>
                <span class="red" v-if="item.order_state==2">已发货</span>
                <span class="red" v-if="item.order_state==4 && item.isCommtent==0 ">已收货</span>
                <span class="red" v-if="item.order_state==4&&item.isCommtent == 1 ">已评价</span>
              </div>
              <div class="center">
                <div class="orderlists" v-for="(items, index) in item.goods" :key="index">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' +httpUrl+ items.oe_format_img+ ')',
                     backgroundSize:'cover',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition:'center'
                    }"
                  ></div>
                  <div class="infos">
                    <p class="des">{{items.oe_goods_name}}</p>
                    <p class="num">
                      <span>￥{{items.oe_format_price}}</span>
                      <span>×{{items.oe_num}}</span>
                    </p>
                    <img src="../assets/shop/tb.png" alt />
                    <p class="color">
                      <span>规格：{{items.oe_format_name}}</span>
                    </p>
                    <p
                      class="toeva"
                      v-if="item.order_state==4 && item.isCommtent==0"
                      @click="toeva(index,item,items)"
                    >去评价</p>
                  </div>
                </div>
              </div>
              <div class="bot">
                <p class="jf has" v-if="item.order_state==4">已获得{{item.order_price}}积分</p>
                <p class="jf" v-else>确认收货后获得{{item.order_price}}积分</p>
                <p class="numprice">
                  共{{item.goods.length}}件商品 合计：
                  <span>￥{{item.order_price}}</span>
                </p>
                <div class="buttons">
                  <p class="wl" @click="openlog(index,item)" v-if="item.order_state==3">物流明细</p>
                  <p class="returngoods" v-if="item.order_state !=0">退货/退款</p>
                  <p class="torecive" v-if="item.order_state==3" @click="toreceived(index,item)">去收货</p>

                  <p class="topay" @click="topay(index,item)" v-if="item.order_state == 0">去付款</p>
                </div>
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
        </p>
        <p class="nums">
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
        { name: "待付款", num: "" },
        { name: "待发货", num: "" },
        { name: "待收货", num: "" },
        { name: "待评价", num: "" }
      ],
      num: [[], [], [], [], []],
      orderinfo: [],
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
          this.orderinfo = res.data.order_list;
          console.log(this.orderinfo);
          this.orderinfos = this.orderinfo;
          for (let i = 0, length = this.orderinfo.length; i < length; i++) {
            if (this.orderinfo[i].order_state == 0) {
              this.num[0].push(this.orderinfo[i]);
              this.navli[1].num = this.num[0].length;
            } else if (this.orderinfo[i].order_state == 1) {
              this.num[1].push(this.orderinfo[i]);
              this.navli[2].num = this.num[1].length;
            } else if (this.orderinfo[i].order_state == 3) {
              this.num[2].push(this.orderinfo[i]);
              this.navli[3].num = this.num[2].length;
            } else if (
              this.orderinfo[i].order_state == 4 &&
              this.orderinfo[i].isCommtent == 0
            ) {
              this.num[4].push(this.orderinfo[i]);
              this.navli[4].num = this.num[4].length;
            }
          }
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
          return e.order_state == 0;
        });
        this.orderinfos = arrb;
        console.log(this.orderinfos, "arr");
      }
      if (index == 2) {
        let arr = this.orderinfo;
        let arrb = arr.filter(function(e) {
          return e.order_state == 1;
        });
        this.orderinfos = arrb;
        console.log(this.orderinfos, "arr");
      }
      if (index == 3) {
        let arr = this.orderinfo;
        let arrb = arr.filter(function(e) {
          return e.order_state == 3;
        });
        this.orderinfos = arrb;
        console.log(this.orderinfos, "arr");
      }
      if (index == 4) {
        let arr = this.orderinfo;
        let arrb = arr.filter(function(e) {
          return e.order_state == 4 && e.isCommtent == 0;
        });
        this.orderinfos = arrb;
        console.log(this.orderinfos, "arr");
      }
    },
    // 去付款
    topay(index, item) {
      console.log(item);
      this.$router.push({
        path: "/payment",
        query: {
          ordernum: item.order_num,
          orderid: item.order_id,
          price: item.order_price
        }
      });
    },
    // 去评价
    toeva(index, item, items) {
      this.goodsinfo = items;
      this.goodsinfo.eva = [
        { title: "好评", num: 3 },
        { title: "中评", num: 2 },
        { title: "差评", num: 1 }
      ];
      this.goodsinfo.oderid = item.order_id;
      this.isevaluate = true;
      console.log(items);
    },
    // 点击收货
    toreceived(index, item) {
      this.$axios
        .post("/index/user/changeOrderState", {
          orderId: item.order_id,
          userId: item.user_id,
          oldState: item.order_state,
          newState: 4
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast.success("收货成功!");
            setTimeout(() => {
              this.isinteg = true;
              console.log(item);
              this.integ = Math.floor(item.order_price);
            }, 500);
          } else {
            this.$toast.fail("提交失败");
          }
        });
      // 此处连接后台修改状态
    },
    // 查看积分
    tointeg() {
      this.$router.push({ path: "/minecenter", query: { tag: "3" } });
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
          this.reload();
        });
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
  padding: 50px 25px;
  .ordercont {
    width: 100%;
    margin: 0 auto;
    .navlist {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;
      .navli {
        cursor: pointer;
        color: rgba(51, 51, 51, 1);
        font-size: 24px;
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
          width: 95px;
          height: 3px;
          background: rgba(36, 130, 200, 1);
          position: absolute;
          bottom: 0px;
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
          margin-bottom: 25px;
          padding: 25px 25px;
          width: 100%;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
          .continfo {
            // background: olivedrab;
            width: 100%;
            height: 100%;
            position: relative;
            box-sizing: border-box;
            // padding: 0px 0px 40px 0px;
            .citop {
              width: 100%;
              color: #999999;
              font-size: 20px;
              display: flex;
              justify-content: space-between;
              box-sizing: border-box;
              padding-bottom: 20px;
              border-bottom: 1px solid #cccccc;
              .red {
                color: #e4393c;
              }
            }
            .center {
              width: 100%;
              border-bottom: 1px solid #cccccc;
              .orderlists {
                display: flex;
                justify-content: space-between;
                color: #333333;
                font-size: 24px;
                box-sizing: border-box;
                padding: 25px 0;
                border-bottom: 1px dashed rgba(204, 204, 204, 0.5);
                .mainpic {
                  width: 18%;
                  height: 107px;
                }
                .infos {
                  width: 78%;
                  position: relative;
                  .toeva {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background: rgba(36, 130, 200, 1);
                    color: white;
                    width: 100px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 14px;
                    height: 40px;
                  }
                  .des {
                    width: 100%;
                    line-height: 35px;
                  }
                  .num {
                    box-sizing: border-box;
                    padding: 10px 0 30px 0;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                  }
                  .color {
                    box-sizing: border-box;
                    padding-top: 10px;
                  }
                }
                &:last-child {
                  border: none;
                }
              }
            }
            .bot {
              width: 100%;
              text-align: right;
              .jf,
              .numprice {
                color: #999999;
                font-size: 24px;
                box-sizing: border-box;
                padding-top: 15px;
              }
              .has {
                color: #2482c8;
              }
              .buttons {
                width: 100%;
                box-sizing: border-box;
                padding-top: 40px;
                display: flex;
                justify-content: flex-end;
                p {
                  width: 161px;
                  height: 55px;
                  border: 1px solid rgba(210, 210, 210, 1);
                  color: #333333;
                  font-size: 24px;
                  text-align: center;
                  line-height: 55px;
                  margin-left: 18px;
                }
                .topay {
                  border: 1px solid #e4393c;
                  background: #e4393c;
                  color: white;
                }
                .torecive {
                  background: #2482c8;
                  border: 1px solid #2482c8;
                  color: white;
                }
              }
            }
          }
        }
      }
    }
  }
  .integbox {
    width: 100%;
    height: 100%;
    .info {
      background: white;
      text-align: center;
      box-sizing: border-box;
      padding: 58px 0 100px 0;
      .getinteg {
        color: rgba(51, 51, 51, 1);
        font-size: 18px;
        img {
          width: 142px;
        }
      }
      .nums {
        box-sizing: border-box;
        padding-top: 43px;
        font-size: 20px;
        .num {
          font-size: 41px;
        }
      }
      .get {
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding: 22px 0 84px 0;
        font-size: 24px;
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