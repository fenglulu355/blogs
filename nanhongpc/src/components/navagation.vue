<template>
  <div class="navgation">
    <div class="navcontent">
      <div class="welcome">
        <p>欢迎来到四川南宏机电工程安装有限公司官网！</p>
        <ul class="welicon"></ul>
      </div>
      <div class="navbox">
        <div class="logo">
          <img src="../assets/home/logo.png" alt />
        </div>
        <ul class="navlist">
          <li class="navli" v-for="(item, index) in navlist" :key="index" @click="tonav(index)">
            <router-link :class="navindex ==index?'sel':''" :to="item.path">{{item.name}}</router-link>
          </li>
        </ul>
        <div class="searchbox">
          <input type="text" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "navagation",
  data() {
    return {
      navindex: 0,
      navlist: [
        { path: "/", name: "网站首页" },
        { path: "/product", name: "产品中心" },
        { path: "/shopshow", name: "门店展示" },
        { path: "/cases", name: "成功案例" },
        { path: "/service", name: "服务与支持" },
        { path: "/news", name: "新闻中心" },
        { path: "/about", name: "关于我们" },
        { path: "/shoppingmall", name: "南宏商城" }
      ]
    };
  },
  created() {},
  methods: {
    tonav(index) {
      this.navindex = index;
    }
  }
};
</script>

<style lang="less" scoped>
.navgation {
  width: 100%;
  min-width: 1200px;
  // margin-bottom: 3px;
  background: white;
  .navcontent {
    width: 100%;
    .welcome {
      width: 100%;
      height: 30px;
      background: rgb(236, 236, 236);
      p {
        font-size: 12px;
        line-height: 30px;
        padding-left: 50px;
        color: rgba(158, 158, 158, 1);
      }
    }
    .navbox {
      width: 100%;
      height: 90px;
      display: grid;
      grid-template-columns: 20% 65% 15%;
      grid-template-rows: 90px;
      .logo {
        // background: olive;
        width: 100%;
        padding-left: 50px;
        line-height: 90px;
      }
      .navlist {
        width: 100%;
        text-align: right;
        .navli {
          display: inline-block;
          text-align: center;
          margin-right: 2%;
          a {
            display: inline-block;
            line-height: 90px;
            width: 100%;
            font-size: 13px;
            color: #5b5b5b;
            font-weight: 400;
          }
          .sel {
            border-bottom: 3px solid #5b5b5b;
          }
        }
      }
    }
  }
}
</style>