<template>
  <div>
    <section class="page">
      <ul class="wishnav">
        <li
          v-for="(item, index) in nav"
          :class="{sel:num==index}"
          @click="getCur({item,index})"
          :key="index"
        >{{item.title}}</li>
      </ul>
      <ul class="wishlist">
        <component :is="cur"></component>
      </ul>
    </section>
  </div>
</template>

<script>
import nopay from "./wish-nopay.vue";
import paid from "./wish-paid.vue";
export default {
  name: "wishlist",
  data() {
    return {
      num: 0,
      nav: [
        { title: "未支付", page: "nopay" },
        { title: "已支付", page: "paid" }
      ],
      cur: nopay
    };
  },
  components: { paid, nopay },
  methods: {
    getCur({ item, index }) {
      this.num = index;
      this.cur = item.page;
    }
  }
};
</script>

<style lang="less">
.page {
  box-sizing: border-box;
}
.wishnav {
  padding: 0 0 20px 30px;
  text-align: left;
  border-bottom: 1px solid lightgray;
  li {
    margin-right: 140px;
    display: inline-block;
    font-size: 22px;
    line-height: 40px;
    cursor: pointer;
    letter-spacing: 1px;
    width: 90px;
  }
  .sel {
    font-size: 22px;
    color: #4700b8;
    &::after {
      display: block;
      content: "";
      margin-left: 16px;
      width: 35px;
      height: 2px;
      background: #4700b8;
    }
  }
}
</style>