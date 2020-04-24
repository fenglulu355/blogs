<template>
  <div class="order">
    <!-- 地址 -->
    <div class="receve selbox">
      <p class="title">
        <span>收货地址</span>
        <span class="ds" @click="tochangedress">+ 管理收货地址</span>
      </p>
      <!-- 选中的地址 -->
      <p class="curdress">
        <el-radio v-model="curridio" label="1">
          <div class="dsinfobox">
            <div class="dsinfo">
              <span class="name">{{dressinfo[0].name}}</span>
              <span class="tel">{{dressinfo[0].tel}}</span>
              <span class="dress">{{dressinfo[0].dress}}</span>
            </div>
          </div>
        </el-radio>
      </p>
      <!-- 地址列表 -->
      <div class="dslist">
        <el-radio-group v-model="radio">
          <el-radio :label="index" v-for="(item, index) in dressinfo" :key="index">
            <div class="dsinfobox">
              <div class="dsinfo">
                <p class="name">{{item.name}}</p>
                <p class="tel">{{item.tel}}</p>
                <p class="dress">{{item.dress}}</p>
                <p class="edit">编辑</p>
                <p class="delds">删除</p>
              </div>
            </div>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 订单 -->
    <div class="orderbox selbox">
      <p class="title">提交订单</p>
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
            <p class="pic">
              <img src="../assets/shop/tb.png" alt />
            </p>
            <p class="color">颜色：{{item.color}}</p>
            <p class="type">规格：{{item.type}}</p>
          </div>
          <p class="price">￥{{item.price}}</p>
          <p class="num">×{{item.num}}</p>
          <p class="aprice">￥{{item.aprice}}</p>
        </li>
      </ul>
      <!-- 优惠券 -->
      <div class="coupon">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <span class="titles">优惠券</span>
            </template>
            <el-radio-group v-model="radio">
              <el-radio :label="index" v-for="(item, index) in coupon" :key="index">
                <div class="couponbox">
                  <p>
                    <span>{{item.des}}</span>
                    <span class="time">有效期至{{item.time}}</span>
                  </p>
                </div>
              </el-radio>
            </el-radio-group>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 积分 -->
      <div class="integral">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <span class="titles">积分抵扣</span>
            </template>
            <el-radio v-model="rintegral" label="1">
              <div class="intinfo">
                <span class="text">账户共</span>
                <span class="aint">{{integral}}</span>
                <span class="text">积分</span>
                <span class="text sel">本次使用</span>
                <input v-model.number="numData" step="1" />
                <span class="text">抵扣</span>
                <span class="num">￥{{numData}}</span>
              </div>
            </el-radio>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 结算单 -->
      <div class="ptotal clearFix">
        <div class="listbox fr">
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
          <p class="totalprice clearFix">
            <span class="text">应付总额</span>
            <span class="totalprice fr">￥1568.00</span>
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
      curridio: "1",
      dressridio: "1",
      radio: null,
      rintegral: 0,
      numData: 0,
      dressinfo: [
        {
          name: "张三",
          tel: "12345678901",
          dress:
            "四川省成都市四川省成都市四川省成都市四川省成都市四川省成都市四川省成都市四川省成都市四川省成都市"
        },
        { name: "张三", tel: "135245444", dress: "四川省成都市" }
      ],
      goodsinfo: [
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
    tochangedress(){
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
  padding: 50px 0 250px 0;
  background: rgba(245, 245, 245, 1);
  .selbox {
    width: 1200px;
    margin: 0 auto;
    background: white;
    box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
    box-sizing: border-box;
    padding: 30px 30px 77px 30px;
    margin-top: 15px;
    .title {
      color: rgba(51, 51, 51, 1);
      font-size: 18px;
    }
  }
  .receve {
    .title {

      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      box-sizing: border-box;
      padding-bottom: 24px;
      .ds{
        cursor: pointer;
      }
    }
    .dsinfo {
      font-size: 18px;
    }
    .curdress {
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      box-sizing: border-box;
      padding: 24px 0;
      .dsinfobox {
        width: 100%;
        display: inline-block;
        .dsinfo {
          width: 100%;
          display: grid;
          grid-template-columns: 15% 10% 75%;
          text-align: center;
          line-height: 30px;
          .dress {
            width: 100%;
            white-space: pre-wrap;
            box-sizing: border-box;
            padding: 0 20px;
          }
        }
      }
    }
    .dslist {
      width: 100%;
      box-sizing: border-box;
      padding: 34px 0 0 50px;
      .el-radio {
        width: 100%;
        box-sizing: border-box;
        padding: 20px 0;
      }
      .dsinfobox {
        width: 100%;
        display: inline-block;
        .dsinfo {
          width: 100%;
          display: grid;
          grid-template-columns: 10% 10% 64% 8% 8%;
          text-align: center;
          line-height: 30px;

          .dress {
            // background: orchid;
            width: 100%;
            white-space: pre-wrap;
            box-sizing: border-box;
            padding: 0 20px;
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
        display: grid;
        grid-template-columns: 15% 45% 15% 15% 10%;
        color: rgba(51, 51, 51, 1);
        font-size: 18px;
        border-bottom: 1px solid rgba(204, 204, 204, 1);
        box-sizing: border-box;
        padding: 44px 0;
        .mainpic {
          width: 90px;
          height: 90px;
          border-radius: 10px;
          border: 1px solid rgba(204, 204, 204, 1);
        }
        .otct {
          .pic {
            box-sizing: border-box;
            padding: 42px 0 21px 0;
          }
        }
        .aprice {
          text-align: right;
        }
      }
    }
    .coupon {
      width: 100%;
      .titles {
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
      }
      .el-radio {
        width: 100%;
        box-sizing: border-box;
        padding: 25px 0 25px 50px;
      }
      .couponbox {
        width: 100%;
        display: inline-block;
        p {
          font-size: 18px;
          width: 100%;
          display: grid;
          grid-template-columns: 80% 20%;
          .time {
            text-align: center;
          }
        }
      }
    }
    .integral {
      .titles {
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
      }
      .el-radio {
        width: 100%;
        box-sizing: border-box;
        padding: 25px 0 25px 50px;
      }
      .intinfo {
        display: inline-block;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        .sel {
          padding-left: 20px;
        }
        input {
          width: 50px;
          height: 28px;
          border: 1px solid rgba(210, 210, 210, 1);
          font-size: 18px;
        }
      }
    }
    .ptotal {
      width: 100%;
      .listbox {
        width: 410px;
        .list {
          box-sizing: border-box;
          padding: 33px 0;
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          p {
            line-height: 35px;
            display: flex;
            justify-content: space-between;
          }
        }
        .totalprice {
          box-sizing: border-box;
          padding: 10px 0 16px 0;
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          .text {
            position: relative;
            top: 45px;
          }
          .totalprice {
            font-size: 48px;
            color: rgba(235, 0, 40, 1);
          }
        }
        .submit {
          cursor: pointer;
          width: 410px;
          height: 49px;
          background: rgba(235, 0, 40, 1);
          text-align: center;
          line-height: 49px;
          color: white;
        }
      }
    }
  }
}
</style>