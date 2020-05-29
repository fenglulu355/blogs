<template>
  <div class="shoppingcar">
    <div class="carbox" v-show="goodsinfo[0]">
      <p class="title">
        <img src="../assets/shop/return.png" alt />
        <span>购物车</span>
      </p>
      <ul class="goodslist">
        <li class="goodsli" v-for="(item, index) in goodsinfo" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url('  +httpUrl+ item.goods_image+')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <!-- 商品名 -->
          <div class="centerbox">
            <p class="name">
              {{item.goods_name}}
              <span>{{item.format_ids}}</span>
            </p>
            <!-- 单个总价 -->
            <p class="allprice">{{item.goods_price* item.cart_num | showPrice}}</p>
          </div>
          <div class="rightbox">
            <p class="del" @click="del(index,item)">
              <img src="../assets/shop/close.png" alt />
            </p>
            <div class="accountbox">
              <button @click="decrement(item,index)" :disabled="item.cart_num<= 1">-</button>
              {{ item.cart_num }}
              <button
                @click="increment(item,index)"
                :disabled="item.cart_num >= item.goods_number"
              >+</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="account">
        <p class="pri">
          总价
          <span>{{ totalPrice | showPrice }}</span>(运费：0.00)
        </p>
        <div class="bottom">
          <p class="toshop btn" @click="toshop">继续购物</p>
          <p class="toaccount btn" @click="toorder">去结算</p>
        </div>
      </div>
    </div>
    <div class="carbox" v-show="!goodsinfo[0]">
      <div class="nogoods">
        <div class="carpic">
          <img src="../assets/shop/car.png" alt />
        </div>
        <p class="text">购物车现在什么也没有哦~</p>
        <p class="toshop" @click="toshop">去购物</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  name: "shoppingcar",
  data() {
    return {
      dgzj: [],
      aprice: "",
      num: [],
      goodsinfo: []
    };
  },
  created() {
    this.requst();
  },
  computed: {
    totalPrice() {
      return this.goodsinfo.reduce(
        (previousValue, item) =>
          previousValue + item.cart_num * item.goods_price,
        0
      );
    }
  },
  methods: {
    requst() {
      let userid = JSON.parse(sessionStorage.getItem("vuex")).userid;
      this.$axios
        .post("/index/shop/getCartData", { userId: userid, cartId: "" })
        .then(res => {
          this.goodsinfo = res.data.cart_data;
          console.log(res);
        });
    },

    //   数量-
    decrement(item, index) {
      this.goodsinfo[index].cart_num--;
      let num = this.goodsinfo[index].cart_num;
      console.log(num);
      this.requstaddcar(item.user_id, item.goods_id, -1, item.format_ids);
    },
    // 数量+
    increment(item, index) {
      this.goodsinfo[index].cart_num++;
      let num = this.goodsinfo[index].cart_num;
      if (num >= item.goods_number) {
        this.$toast.fail("库存不足！");
      }
      console.log(num);
      this.requstaddcar(item.user_id, item.goods_id, 1, item.format_ids);
    },
    // 删除
    del(index, item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "您确定要删除这件宝贝吗"
        })
        .then(() => {
          this.cardel(item.cart_id);
        })
        .catch(() => {
          this.$toast.fail("已取消删除");
        });
    },
    cardel(cartId) {
      this.$axios
        .post("/index/shop/delShoppingCart", { cartId: cartId })
        .then(res => {
          this.reload();
          this.$toast.success("删除成功");

          console.log(res, "aa");
        });
    },
    // 返回商城
    toshop() {
      this.$router.push({ path: "/shoppingmall" });
    },
    // 去结算
    toorder() {
      this.$router.push({ path: "/order" });
    },
    // 增删操作之后重新请求数据
    requstaddcar(userid, gid, num, fids) {
      this.$axios
        .post("/index/shop/addShoppingCart", {
          userId: userid,
          gid: gid,
          num: num,
          fids: fids
        })
        .then(res => {
          console.log(res);
          if (res.data.data.code == 1) {
            this.$toast("操作成功");
          } else {
            this.$toast.fail("操作失败");
          }
        });
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
  }
};
</script>

<style lang="less" scoped>
.shoppingcar {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 25px 25px 25px;
  background: rgba(245, 245, 245, 1);
  .carbox {
    width: 100%;
    background: white;
    box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
    box-sizing: border-box;
    padding: 30px 25px;
    .title {
      color: rgba(51, 51, 51, 1);
      font-size: 30px;
      box-sizing: border-box;
      padding-bottom: 25px;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      img {
        height: 26px;
        position: relative;
        bottom: 1px;
      }
      span {
        padding-left: 20px;
      }
    }
    .goodslist {
      width: 100%;
      .goodsli {
        width: 100%;
        box-sizing: border-box;
        padding: 35px 0px;
        border-bottom: 1px solid rgba(204, 204, 204, 1);
        display: flex;
        justify-content: space-between;
        color: rgba(51, 51, 51, 1);
        .mainpic {
          width: 20%;
          height: 107px;
          border-radius: 10px;
        }
        .centerbox {
          align-self: center;
          // background: brown;
          width: 50%;
          .name {
            // background: beige;
            width: 100%;

            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
          .allprice {
            box-sizing: border-box;
            padding-top: 15px;
            width: 100px;
          }
        }
        .rightbox {
          width: 28%;
          .del {
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            padding-bottom: 20px;
            img {
              width: 30px;
            }
          }
          .accountbox {
            margin: 0 auto;
            text-align: center;
            line-height: 40px;
            border-top: 2px solid rgba(210, 210, 210, 1);
            border-bottom: 2px solid rgba(210, 210, 210, 1);
            width: 80%;
            height: 40px;
            font-size: 24px;
            display: grid;
            grid-template-columns: 25% 50% 25%;
            button {
              color: rgba(210, 210, 210, 1);
              background: white;
              border-left: 2px solid rgba(210, 210, 210, 1);
              border-right: 2px solid rgba(210, 210, 210, 1);
            }
          }
        }
      }
    }
    .account {
      box-sizing: border-box;
      padding-top: 57px;
      .pri {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        span {
          color: rgba(235, 0, 40, 1);
          font-size: 60px;
          // font-family: Arial;
          margin-right: 10px;
        }
      }
      .bottom {
        box-sizing: border-box;
        padding-top: 70px;
        display: flex;
        justify-content: space-between;
        .btn {
          cursor: pointer;
          width: 48%;
          font-size: 24px;
          line-height: 70px;
          text-align: center;
        }
        .toshop {
          border: 1px solid rgba(153, 153, 153, 1);
        }
        .toaccount {
          background: rgba(235, 0, 40, 1);
          color: white;
        }
      }
    }
    .nogoods {
      width: 100%;
      height: 100%;
      text-align: center;
      .carpic {
        box-sizing: border-box;
        padding: 85px 0 54px 0;
        img {
          width: 136px;
        }
      }
      .text {
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding: 0px 0 33px 0;
        font-size: 36px;
      }
      .toshop {
        cursor: pointer;
        margin: 20px auto;
        width: 40%;
        height: 70px;
        background: rgba(235, 0, 40, 1);
        color: white;
        font-size: 24px;
        line-height: 70px;
      }
    }
  }
}
</style>