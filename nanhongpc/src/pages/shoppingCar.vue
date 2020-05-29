<template>
  <div class="shoppingcar">
    <div class="carbox" v-show="goodsinfo[0]">
      <p class="title">购物车</p>
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
          <!-- 商品名 -->
          <div class="names">
            <p class="name">{{item.goods_name}}</p>
            <p class="format">{{item.format_ids}}</p>
          </div>

          <!-- 单价 -->
          <p class="price">￥{{item.goods_price}}</p>
          <div class="accountbox">
            <button @click="decrement(item,index)" :disabled="item.cart_num <= 1">-</button>
            {{ item.cart_num }}
            <button
              @click="increment(item,index)"
              :disabled="item.cart_num >= item.goods_number"
            >+</button>
          </div>
          <!-- 单个总价 -->
          <p class="allprice">{{item.goods_price* item.cart_num | showPrice}}</p>
          <p class="del" @click="del(index,item)">删除</p>
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
import { mapActions, mapMutations, mapState } from "vuex";
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
    ...mapMutations(["setorderlist"]),
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
        this.$message.error("库存不足！");
      }
      console.log(num);
      this.requstaddcar(item.user_id, item.goods_id, 1, item.format_ids);
    },

    // 删除
    del(index, item) {
      this.$confirm("您确定要删除这件宝贝吗", "提示", {
        confirmButtonText: "忍痛删除",
        cancelButtonText: "再想一会儿",
        type: "warning"
      })
        .then(() => {
          this.cardel(item.cart_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 加入购物车
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
            this.$message({
              message: "操作成功",
              type: "success"
            });
          } else {
            this.$message.error("操作失败");
          }
        });
    },
    cardel(cartId) {
      this.$axios
        .post("/index/shop/delShoppingCart", { cartId: cartId })
        .then(res => {
          this.reload();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          console.log(res, "aa");
        });
    },
    // 返回商城
    toshop() {
      this.$router.push({ path: "/shoppingmall" });
    },
    // 去结算
    toorder() {
      // this.setorderlist(this.goodsinfo);
      this.$router.push({ path: "/order" });
    }
  },
  // 保留两位小数
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
  padding: 50px 0 250px 0;
  background: rgba(245, 245, 245, 1);
  .carbox {
    width: 1200px;
    margin: 0 auto;
    background: white;
    box-shadow: 0px 0px 18px 0px rgba(228, 228, 228, 0.63);
    box-sizing: border-box;
    padding: 30px 30px 77px 30px;
    .title {
      color: rgba(51, 51, 51, 1);
      font-size: 18px;
      box-sizing: border-box;
      padding-bottom: 25px;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
    }
    .goodslist {
      .goodsli {
        width: 100%;
        box-sizing: border-box;
        padding: 35px 20px;
        border-bottom: 1px solid rgba(204, 204, 204, 1);
        display: flex;
        justify-content: space-between;
        color: rgba(51, 51, 51, 1);
        .mainpic {
          width: 90px;
          height: 90px;
          border-radius: 10px;
        }
        .names {
          // background: beige;
          width: 400px;
          align-self: center;
          .format {
            box-sizing: border-box;
            padding-top: 20px;
            font-size: 12px;
            color: #cccccc;
          }
        }
        .price {
          width: 100px;
          align-self: center;
        }
        .allprice {
          align-self: center;
          width: 100px;
        }
        .del {
          cursor: pointer;
          align-self: center;
          &:active {
            color: red;
          }
        }

        .accountbox {
          align-self: center;
          text-align: center;
          line-height: 30px;
          border-top: 1px solid rgba(210, 210, 210, 1);
          border-bottom: 1px solid rgba(210, 210, 210, 1);
          width: 112px;
          height: 30px;
          display: grid;
          grid-template-columns: 25% 50% 25%;
          button {
            cursor: pointer;
            color: rgba(210, 210, 210, 1);
            background: white;
            border-left: 1px solid rgba(210, 210, 210, 1);
            border-right: 1px solid rgba(210, 210, 210, 1);
          }
        }
      }
    }
    .account {
      box-sizing: border-box;
      padding-top: 57px;
      display: flex;
      justify-content: space-between;
      .pri {
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        span {
          color: rgba(235, 0, 40, 1);
          font-size: 48px;
          font-family: Arial;
          margin-right: 10px;
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        .btn {
          cursor: pointer;
          width: 203px;
          height: 55px;
          font-size: 18px;
          line-height: 55px;
          text-align: center;
          margin-left: 15px;
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
      }
      .text {
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding: 0px 0 33px 0;
      }
      .toshop {
        cursor: pointer;
        margin: 20px auto;
        width: 200px;
        height: 44px;
        background: rgba(235, 0, 40, 1);
        color: white;
        line-height: 44px;
      }
    }
  }
}
</style>