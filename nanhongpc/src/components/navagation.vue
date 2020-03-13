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
          <li class="navli" value="1" @click="tonav($event)">
            <router-link to="/" :class="navindex ==1?'sel':''">网站首页</router-link>
          </li>
          <li
            class="navli"
            @mouseenter="isbg=true"
            @mouseleave="isbg=false"
            value="2"
            @click="tonav($event)"
          >
            <router-link to="/product" :class="navindex ==2?'sel':''">产品中心</router-link>
            <mnav :btitle="bpro" :ltitle="lpro"></mnav>
          </li>
          <li
            class="navli"
            @mouseenter="isbg=true"
            @mouseleave="isbg=false"
            value="3"
            @click="tonav($event)"
          >
            <router-link to="/shopshow" :class="navindex ==3?'sel':''">门店展示</router-link>
            <mnav :btitle="bshop" :ltitle="lshop"></mnav>
          </li>
          <li
            class="navli"
            @mouseenter="isbg=true"
            @mouseleave="isbg=false"
            value="4"
            @click="tonav($event)"
          >
            <router-link to="/cases" :class="navindex ==4?'sel':''">成功案例</router-link>
            <mnav :btitle="bcase" :ltitle="lcase"></mnav>
          </li>
          <li
            class="navli"
            @mouseenter="isbg=true"
            @mouseleave="isbg=false"
            value="5"
            @click="tonav($event)"
          >
            <router-link to="/service" :class="navindex ==5?'sel':''">服务与支持</router-link>
            <mnav :btitle="bsrv" :ltitle="lsrv"></mnav>
          </li>
          <li
            class="navli"
            @mouseenter="isbg=true"
            @mouseleave="isbg=false"
            value="6"
            @click="tonav($event)"
          >
            <router-link to="/news" :class="navindex ==6?'sel':''">新闻中心</router-link>
            <mnav :btitle="bnews" :ltitle="lnews"></mnav>
          </li>
          <li
            class="navli"
            @mouseenter="isbg=true"
            @mouseleave="isbg=false"
            value="7"
            @click="tonav($event)"
          >
            <router-link to="/about" :class="navindex ==7?'sel':''">关于我们</router-link>
            <mnav :btitle="babout" :ltitle="labout"></mnav>
          </li>
          <li
            class="navli"
            value="8"
            @click="tonav($event)"
          >
            <router-link to="/shoppingmall" :class="navindex ==8?'sel':''">南宏商城</router-link>
          </li>
        </ul>
        <div class="searchbox">
          <input type="text" placeholder="产品名称" />
        </div>
        <div class="bg" v-show="isbg"></div>
      </div>
    </div>
  </div>
</template>
<script>
import mnav from "../components/minnav";
export default {
  name: "navagation",
  data() {
    return {
      navindex: 1,
      val: 0,
      isbg: false,
      bpro: ["产品中心"],
      bshop: ["门店展示"],
      bcase: ["成功案例"],
      bsrv: ["售后服务"],
      bnews: ["新闻中心"],
      babout: ["南宏信息", "加入我们", "联系我们", "公司架构"],
      lpro: [
        "冰箱",
        "洗衣机",
        "小家电",
        "空调",
        "中央空调",
        "地暖",
        "净水",
        "新风",
        "电视"
      ],
      lshop: ["门店展示", "门店导航"],
      lcase: ["工装项目", "家装项目"],
      lsrv: ["团队展示", "服务流程", "安装流程", "服务条款"],
      lnews: ["行业新闻", "公司新闻"],
      labout: [
        "公司介绍",
        "社会招聘",
        "销售网络",
        "",
        "南宏概念",
        "校园招聘",
        "",
        "",
        "荣誉资质"
      ]
    };
  },
  created() {},
  methods: {
    tonav(e) {
      this.navindex = e.currentTarget.value;
      // console.log(this.navindex);
    }
  },
  components: { mnav }
};
</script>

<style lang="less" scoped>
.navgation {
  width: 100%;
  min-width: 1200px;
  box-sizing: border-box;
  background: white;
  border-bottom: 3px solid white;
  .navcontent {
    width: 100%;
    position: relative;
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
      // background: pink;
      width: 100%;
      height: 90px;
      display: grid;
      grid-template-columns: 20% 60% 1fr;
      grid-template-rows: 90px;
      .logo {
        // background: olive;
        width: 100%;
        padding-left: 50px;
        line-height: 90px;
      }
      .navlist {
        // background: cadetblue;
        width: 100%;
        height: 90px;
        text-align: right;
        .navli {
          display: inline-block;
          text-align: center;
          margin-right: 2%;
          // position: relative;
          a {
            display: inline-block;
            width: 100%;
            height: 90px;
            line-height: 90px;
            font-size: 13px;
            color: #5b5b5b;
            font-weight: 400;
          }
          .sel {
            border-bottom: 3px solid #5b5b5b;
          }
          .minnav {
            display: none;
          }
          &:hover .minnav {
            display: block;
          }
        }
      }
      .searchbox {
        line-height: 90px;
        input {
          width: 70%;
          height: 29px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(236, 236, 236, 1);
          border-radius: 15px;
          box-sizing: border-box;
          padding-left: 15px;
        }
      }
      .bg {
        width: 100%;
        position: absolute;
        top: 123px;
        height: 185px;
        background: rgba(255, 255, 255, 0.4);
      }
    }
  }
}
</style>