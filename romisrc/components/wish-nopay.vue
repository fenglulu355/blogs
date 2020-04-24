<template>
  <div class="nopay-check">
    <ul class="nopaynav">
      <li class="nopaynavli" @click="allchecked">
        <div class="li-vbox">
          <img class="icon" v-if="checked" src="../assets/check.png" alt />
          <img class="icon" v-else src="../assets/nocheck.png" alt />
          全选
        </div>
      </li>
      <li class="nopaynavli">
        <p>商品信息</p>
      </li>
      <li class="nopaynavli">
        <p>价格</p>
      </li>
    </ul>
    <div class="nopaygoods">
      <ul class="infoslist" v-for="(item, index) in infos" :key="index">
        <li class="infosli" @click="radio(item,index)">
          <div class="checkbox">
            <img class="icon" v-if="selIndex.indexOf(index)!=-1" src="../assets/check.png" alt />
            <img v-else class="icon" src="../assets/nocheck.png" alt />
          </div>
          <div class="goods">
            <div class="pic">
              <img :src="item.pic" alt />
            </div>
            <div class="des">
              <p class="name">{{item.name}}</p>
              <p class="school">{{item.school}}</p>
              <p class="teacher">{{item.teacher}}</p>
            </div>
          </div>
          <p class="price">￥{{item.price}}</p>
        </li>
      </ul>
    </div>
    <div class="count">
      <p class="allprice">总价：{{totalPrice}}元</p>
      <p class="handle">
        <span class="buy" @click="buy">结算</span>
        <span class="del" @click="del">删除</span>
      </p>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "nopay",
  data() {
    return {
      checked: false,
      totalPrice: 0,
      selIndex: [], //sel
      totalOrder: [], //addorder

      infos: [
        {
          pic: require("../assets/setting/jimage_05.png"),
          name: "动态",
          school: "成都大学",
          teacher: "李雷",
          price: "111"
        },
        {
          pic: require("../assets/setting/uimage_05.png"),
          name: "动态网站",
          school: "成都大学",
          teacher: "李雷",
          kind: "初级",
          price: "222"
        },
        {
          pic: require("../assets/setting/himage_02.png"),
          name: "动态网站开发",
          school: "成都大学",
          teacher: "李雷",
          kind: "初级",
          price: "333"
        },
        {
          pic: require("../assets/setting/himage_05.png"),
          name: "动态网站开发",
          school: "成都大学",
          teacher: "李雷",
          kind: "初级",
          price: "333"
        }
      ],
      arr: []
    };
  },
  computed: {
    ...mapState(["shoppingCart"])
  },
  methods: {
    buy() {
      alert(
        "您购买的商品为: " +
          this.totalOrder +
          "    总价为：" +
          this.totalPrice +
          "元"
      );
    },
    allchecked() {
      if (!this.checked) {
        (this.selIndex = []),
          this.infos.forEach((item, index) => {
            this.selIndex.push(index);
          });
        this.allPrice();
      } else {
        this.selIndex = [];
        this.allPrice();
      }
      this.checked = !this.checked;
    },
    allPrice() {
      this.totalPrice = 0;
      this.totalOrder = [];
      for (let i of this.selIndex) {
        this.totalPrice += Number(this.infos[i].price);
        this.totalOrder.push(this.infos[i].name);
      }
    },
    del() {
      let infos = this.infos;
      let arr = this.selIndex.sort().reverse();
      for (let i of arr) {
        infos.splice(i, 1);
      }
      this.selIndex = [];
      this.allPrice();
    },
    radio(item, index) {
      if (this.selIndex.indexOf(index) == -1) {
        this.selIndex.push(index);
        this.allPrice();
        if (this.selIndex.length == this.infos.length) {
          this.checked = true;
        }
      } else {
        for (let i in this.selIndex) {
          if (this.selIndex[i] == index) {
            this.selIndex.splice(i, 1);
            this.allPrice();
          }
        }
        if (this.selIndex.length != this.infos.length) {
          this.checked = false;
        }
      }
    }
  }
};
</script>



<style lang="less">
.count {
  position: absolute;
  left: 100px;
  bottom: -30px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 20px;
  .handle {
    span {
      cursor: pointer;
      display: inline-block;
      margin-right: 15px;
      background: rgb(212, 6, 6);
      border-radius: 20px;
      width: 100px;
      height: 40px;
      line-height: 40px;
      color: white;
    }
  }
}
.nopay-check {
  position: relative;
  padding-left: 40px;
  .icon {
    width: 18px;
  }
}
.nopaynav {
  padding-top: 30px;
  display: grid;
  grid-template-columns: 70px 1fr 150px;
  li {
    color: grey;
    display: inline-block;
    font-size: 18px;
  }
}
.nopaygoods {
  height: 700px;
}
.infoslist {
  padding-top: 20px;
  .infosli {
    padding: 10px 0;
    display: grid;
    grid-template-columns: 70px 1fr 150px;
    align-items: center;
    .goods {
      border: 1px solid lightgray;
      border-radius: 12px;
      display: flex;
      font-size: 15px;
      .pic {
        width: 200px;
        img {
          width: 100%;
        }
      }
      .des {
        width: 400px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        p {
          color: grey;
        }
      }
    }
    .del {
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>