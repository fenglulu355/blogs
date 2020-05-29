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
              <p class="name">{{curdress.address_name}}</p>
              <p class="tel">{{curdress.address_phone}}</p>
              <p class="dress">
                {{curdress.address_province}}
                {{curdress.address_city}}
                {{curdress.address_area}}
                {{curdress.address_info}}
              </p>
            </div>
          </div>
        </el-radio>
      </p>
      <!-- 地址列表 -->
      <div class="dslist">
        <el-radio-group v-model="dressradio">
          <el-radio
            :label="index"
            v-for="(item, index) in dressinfo"
            :key="index"
            @change="changecurdress(item)"
          >
            <div class="dsinfobox">
              <div class="dsinfo">
                <p class="name">{{item.address_name}}</p>
                <p class="tel">{{item.address_phone}}</p>
                <p
                  class="dress"
                >{{item.address_province}}{{item.address_city}}{{item.address_area}}{{item.address_info}}</p>
                <p class="edit" @click="edit(item)">编辑</p>
                <p class="delds" @click="deldress">删除</p>
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
            :style="{backgroundImage: 'url(' +httpUrl+ item.goods_image+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div class="otct">
            <p class="name">{{item.goods_name}}</p>
            <p class="pic">
              <img src="../assets/shop/tb.png" alt />
            </p>
            <!-- <p class="color">颜色：{{item.color}}</p> -->
            <p class="type">规格：{{item.format_ids}}</p>
          </div>
          <p class="price">￥{{item.goods_price}}</p>
          <p class="num">×{{item.cart_num}}</p>
          <p class="aprice">{{item.goods_price* item.cart_num | showPrice}}</p>
        </li>
      </ul>
      <!-- 优惠券 -->
      <div class="coupon">
        <el-collapse v-model="iscoupon">
          <el-collapse-item name="1">
            <template slot="title">
              <span class="titles">优惠券</span>
            </template>
            <div class="couponlist">
              <div
                class="couponli"
                v-for="(item, index) in coupon"
                :class="iscurcoupon==index?'cur':''"
                :key="index"
                @click="curyhq(item,index)"
              >
                <div class="couponbox">
                  <div class="style"></div>
                  <p>
                    <span>{{item.desc}}</span>
                    <span class="time">有效期至{{item.end_time}}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 积分 -->
      <div class="integral">
        <el-collapse accordion v-model="isintegral">
          <el-collapse-item name="1">
            <template slot="title">
              <span class="titles">积分抵扣</span>
            </template>
            <el-radio v-model="rintegral" label="0">
              <div class="intinfo">
                <span class="text">账户共</span>
                <span class="aint">{{integral}}</span>
                <span class="text">积分</span>
                <span class="text sel">本次使用</span>
                <input
                  v-model.number="orderlist.numData"
                  @input="watchipt"
                  step="1"
                  placeholder="0"
                />
                <span class="text">抵扣</span>
                <span class="num">￥{{orderlist.numData}}</span>
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
              <span>{{allprice | showPrice}}</span>
            </p>
            <p class="cutcoupon">
              <span>优惠券</span>
              <span>-{{couponnum | showPrice }}</span>
            </p>
            <p class="cutintegral">
              <span>积分抵扣</span>
              <span>-￥{{orderlist.numData}}.00</span>
            </p>
            <p class="freight">
              <span>运费</span>
              <span>-￥0.00</span>
            </p>
          </div>
          <p class="totalprice clearFix">
            <span class="text">应付总额</span>
            <span class="totalprice fr">{{totalPrice | showPrice}}</span>
          </p>
          <p class="submit" @click="topay">提交订单</p>
        </div>
      </div>
    </div>
    <editdress :edititem="curdress" @close="close" v-if="isedit"></editdress>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import editdress from "../components/editdress";
import { mapState } from "vuex";
export default {
  name: "order",
  inject: ["reload"],
  data() {
    return {
      orderlist: {
        aprice: 1588, //商品总额
        numData: 0
      },
      couponnum: 0, //优惠券价格
      integral: 0,
      edititem: "",
      isedit: false,
      curridio: "1",
      dressradio: 0,
      radio: 0,
      rintegral: "0",
      dressinfo: [],
      goodsinfo: [],
      curdress: [],
      curdressid: "",
      coupon: [],
      couponid: null,
      iscurcoupon: null,
      iscoupon: ["0"],
      isintegral: ["0"]
    };
  },
  computed: {
    ...mapState(["orderlists", "userid"]),
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
    this.requstaddress(this.userid);
    this.requstcar(this.userid);
    this.requstyhq();
    this.requstmine();
  },
  methods: {
    requstcar(userid) {
      this.$axios
        .post("/index/shop/getCartData", { userId: userid, cartId: "" })
        .then(res => {
          this.goodsinfo = res.data.cart_data;
          console.log(res);
        });
    },
    requstmine() {
      this.$axios
        .post("/index/user/userInfo", { userId: this.userid })
        .then(res => {
          this.integral = res.data.data.points;
          console.log(res);
        });
    },
    requstaddress(userId) {
      this.$axios.post("/index/user/address", { userId: userId }).then(res => {
        this.dressinfo = res.data.data;
        this.curdress = this.dressinfo[0];
        this.curdressid = this.dressinfo[0].address_id;
      });
    },
    changecurdress(item) {
      console.log(item);
      this.curdress = item;
      this.curdressid = item.address_id;
    },
    watchipt(e) {
      if (this.orderlist.numData > this.integral) {
        console.log(1);
        this.$confirm(
          "账户共有" + this.integral + "积分, 是否全部使用?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.orderlist.numData = this.integral;
          })
          .catch(() => {
            this.orderlist.numData = 0;
          });
      }
    },
    selectcoupon(e) {
      console.log(e, "radio");
      // console.log(1);
    },
    topay() {
      let totalPrice = this.totalPrice.toFixed(2);

      this.$confirm("总价" + totalPrice + "元，确认提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
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
                this.$message({
                  type: "success",
                  message: "提交成功!"
                });
                console.log(res.data.data);

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
                this.$message({
                  type: "info",
                  message: res.data.msg
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });

      //
    },
    tochangedress() {
      this.$router.push({ path: "/minecenter", query: { tag: "1" } });
    }, // city
    onSelected(data) {
      this.address.province = data.province.value;
      this.address.city = data.city.value;
      this.address.county = data.area.value;
      console.log(data);
    },
    // 修改地址
    edit(item) {
      console.log(item);
      console.log(this.address);
      setTimeout(() => {
        this.isedit = true;
        this.edititem = item;
      }, 200);
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
          address_info: info.dress
        })
        .then(res => {
          // console.log(res);
          this.reload();
        });
      console.log(info, "wwww");
    },
    deldress() {
      console.log(this.curdressid);
      this.$axios
        .post("/index/user/delAddress", { aid: this.curdressid })
        .then(res => {
          if (res.data.data.code == 1) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message.error("删除失败");
          }
          this.reload();
          console.log(res);
        });
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
        this.$message.error(
          "对不起，此订单不符合使用条件！满" + cond + "才能使用"
        );
      } else {
        this.iscurcoupon = index;
        this.couponid = item.id;
        this.couponnum = Number(item.price);
      }
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
  }, // 保留两位小数
  filters: {
    showPrice(price) {
      return "￥" + price.toFixed(2);
    }
  },
  components: { VDistpicker, editdress }
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
      padding: 24px 0;
      .dsinfobox {
        width: 1100px;
        display: inline-block;
        .dsinfo {
          width: 1000px;
          display: grid;
          grid-template-columns: 10% 20% 70%;
          text-align: center;
          line-height: 30px;
          .dress {
            width: 100%;
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
        width: 1000px;
        display: inline-block;
        .dsinfo {
          width: 100%;
          display: grid;
          grid-template-columns: 15% 15% 54% 8% 8%;
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
      .couponlist {
        width: 100%;
        padding-top: 15px;
        .couponli {
          cursor: pointer;
          box-sizing: border-box;
          padding: 0 0 15px 20px;
          .style {
            align-self: center;
            width: 12px;
            height: 12px;
            background: #ffffff;
            border-radius: 50%;
          }
          .couponbox {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            p {
              // background: blueviolet;
              align-self: center;
              font-size: 16px;
              width: 100%;
              display: grid;
              grid-template-columns: 70% 30%;
              box-sizing: border-box;
              padding-left: 30px;
              .time {
                text-align: center;
              }
            }
          }
        }
        .cur {
          .style {
            background: #2482c8;
          }
          .couponbox {
            color: #2482c8;
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