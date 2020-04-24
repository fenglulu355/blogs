<template>
  <div class="shoppingcar">
    <div class="carbox" v-show="goodsinfo[0]">
      <p class="title">购物车</p>
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
          <!-- 商品名 -->
          <p class="name">{{item.name}}</p>
          <!-- 单价 -->
          <p class="price">￥{{item.price}}</p>
          <div class="accountbox">
            <button @click="decrement(index)" :disabled="item.count <= 1">-</button>
            {{ item.count }}
            <button @click="increment(index)">+</button>
          </div>
          <!-- 单个总价 -->
          <p class="allprice">{{item.price* item.count | showPrice}}</p>
          <p class="del" @click="del(index)">删除</p>
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
  name: "shoppingcar",
  data() {
    return {
      dgzj: [],
      aprice: "",
      num: [],
      goodsinfo: [
        {
          img: require("../assets/product/goods1.png"),
          name:
            "格力净静滚筒洗衣机格力净静滚筒洗衣机格力净静滚筒洗衣机格力净静滚筒洗衣机",
          price: 1500.0,
          count: 1
        },
        {
          img: require("../assets/product/goods1.png"),
          name: "格力净静滚筒洗衣机格力净",
          price: 1.2,
          count: 1
        },
        {
          img: require("../assets/product/goods1.png"),
          name: "格力净静滚筒洗衣机格力净",
          price: 1,
          count: 1
        },
        {
          img: require("../assets/product/goods1.png"),
          name: "格力净静滚筒洗衣机格力净",
          price: 1,
          count: 1
        },
        {
          img: require("../assets/product/goods1.png"),
          name: "格力净静滚筒洗衣机格力净",
          price: 1,
          count: 1
        },
        {
          img: require("../assets/product/goods1.png"),
          name: "格力净静滚筒洗衣机格力净",
          price: 1,
          count: 1
        }
      ]
    };
  },
  created() {},
  computed: {
    totalPrice() {
      return this.goodsinfo.reduce(
        (previousValue, item) => previousValue + item.count * item.price,
        0
      );
    }
  },
  methods: {
    //   数量-
    decrement(index) {
      this.goodsinfo[index].count--;
    },
    // 数量+
    increment(index) {
      this.goodsinfo[index].count++;
    },
    // 删除
    del(index) {
      this.goodsinfo.splice(index, 1);
    },
    // 返回商城
    toshop() {
      this.$router.push({ path: "/shoppingmall" });
    },
    // 去结算
    toorder() {
      this.$router.push({ path: "/order" });
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
        .name {
          // background: beige;
          width: 400px;
          align-self: center;
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