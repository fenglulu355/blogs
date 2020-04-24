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
                <span class="time">{{item.time}}</span>
                <span class="ordernum">订单号：{{item.ordernum}}</span>
                <span
                  class="red"
                  v-if="!item.evaluate && !item.send && !item.received && !item.payment"
                >待付款</span>
                <span
                  class="red"
                  v-if="!item.evaluate && !item.send && !item.received && item.payment"
                >待发货</span>
                <span
                  class="red"
                  v-if="!item.evaluate && item.send && !item.received && item.payment"
                >已发货</span>
                <span
                  class="red"
                  v-if="!item.evaluate && item.send && item.received && item.payment "
                >已收货</span>
                <span
                  class="red"
                  v-if="item.evaluate && item.send && item.received && item.payment "
                >已评价</span>
              </div>
              <div class="center">
                <div class="orderlists" v-for="(items, index) in item.orderlist" :key="index">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' + items.img+ ')',
                     backgroundSize:'cover',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition:'center'
                    }"
                  ></div>
                  <div class="infos">
                    <p class="des">{{items.des}}</p>
                    <p class="num">
                      <span>￥{{items.apprice}}</span>
                      <span>×{{items.num}}</span>
                    </p>
                    <img src="../assets/shop/tb.png" alt />
                    <p class="color">
                      <span>颜色：{{items.color}}</span>
                      <span>规格{{items.type}}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="bot">
                <p
                  class="jf has"
                  v-if="item.evaluate && item.send && item.received && item.payment"
                >已获得{{item.aprice}}积分</p>
                <p class="jf" v-else>确认收货后获得{{item.aprice}}积分</p>
                <p class="numprice">
                  共{{item.orderlist.length}}件商品 合计：
                  <span>￥{{item.aprice}}</span>
                </p>
                <div class="buttons">
                  <p
                    class="wl"
                    @click="openlog(index,item)"
                    v-if="!item.evaluate && !item.send && !item.received && item.payment"
                  >物流明细</p>
                  <p class="returngoods" v-if="!item.received && item.payment">退货/退款</p>
                  <p
                    class="torecive"
                    v-if="!item.evaluate && item.send && !item.received && item.payment"
                    @click="toreceived(index,item)"
                  >去收货</p>
                  <p
                    class="toeva"
                    v-if="!item.evaluate && item.send && item.received && item.payment "
                    @click="toeva(index,item)"
                  >去评价</p>
                  <p
                    class="topay"
                    v-if="!item.evaluate && !item.send && !item.received && !item.payment"
                  >去付款</p>
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
                " 壁式空调挂体式立享舒适壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
            },
            {
              img: require("../assets/about/1-4.png"),
              des:
                "格力京逸（GREE）正1.5匹 定速 冷暖 分体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂体式立享舒适 智能睡眠 挂壁式空调挂",
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
              num: "1",
              apprice: 1450,
              color: "白色",
              type: "1.5匹",
              eva: [
                { title: "好评", num: 0 },
                { title: "中评", num: 1 },
                { title: "差评", num: 2 }
              ]
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
  },
  methods: {
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
      this.goodsinfo = item;
      this.isevaluate = true;
      console.log(item);
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