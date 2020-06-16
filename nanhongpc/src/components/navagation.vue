<template>
  <div class="navgation">
    <div class="navcontent">
      <div class="welcome" v-show="isbanshow">
        <p>欢迎来到四川南宏机电工程安装有限公司官网！</p>
        <ul class="welicon">
          <li class="welli" v-for="(item, index) in welli" :key="index">
            <img :src="item.icon" alt />
            <div class="ewm">
              <img :src="item.ewm" alt />
            </div>
          </li>
        </ul>
      </div>
      <div class="navbox">
        <div class="logo">
          <img src="../assets/navgation/logo.png" alt />
        </div>
        <!-- shangcheng -->
        <div class="shopnav" v-show="!isbanshow">
          <div class="searchbox">
            <input type="text" placeholder="产品名称" v-model="search" />
            <img @click="tosearch('shop',search)" src="../assets/navgation/search.png" alt />
          </div>
          <div class="guide">
            <p class="text" @click="toshapingmall">南宏商城</p>
            <p class="text" @click="tohome">企业官网</p>
          </div>
        </div>
        <!-- 商城icon -->
        <ul class="shopicon" v-show="!isbanshow">
          <li class="iconlist" v-for="(item, index) in iconli" :key="index">
            <div @click="topath(index,item)" class="pic">
              <img :src="item.img" alt />
            </div>
            <p class="name" @click="topath(index,item)">{{item.name}}</p>
          </li>
        </ul>
        <!-- 官网nav -->
        <ul class="navlist" v-show="isbanshow " @mouseenter="isbg=true" @mouseleave="isbg=false">
          <li class="navli" value="0" @click.stop="tonav($event)">
            <router-link to="/" :class="navindex ==0?'sel':''">网站首页</router-link>
            <mnav :btitle="bhome" :ltitle="lhome" :path="'/'" :navindex="0"></mnav>
          </li>
          <li class="navli" value="1" @click.stop="tonav($event)">
            <router-link to="/product" :class="navindex ==1?'sel':''">智慧中心</router-link>
            <mnav :btitle="bpro" :ltitle="lpro" :path="'/product'" :navindex="1"></mnav>
          </li>
          <li class="navli" value="2" @click.stop="tonav($event)">
            <router-link to="/shopshow" :class="navindex ==2?'sel':''">门店展示</router-link>
            <mnav :btitle="bshop" :ltitle="lshop" :path="'/shopshow'" :navindex="2"></mnav>
          </li>
          <li class="navli" value="3" @click.stop="tonav($event)">
            <router-link to="/cases" :class="navindex ==3?'sel':''">成功案例</router-link>
            <mnav :btitle="bcase" :ltitle="lcase" :path="'/cases'" :navindex="3"></mnav>
          </li>
          <li class="navli" value="4" @click.stop="tonav($event)">
            <router-link to="/service" :class="navindex ==4?'sel':''">服务与支持</router-link>
            <mnav :btitle="bsrv" :ltitle="lsrv" :path="'/service'" :navindex="4"></mnav>
          </li>
          <li class="navli" value="5" @click.stop="tonav($event)">
            <router-link to="/news" :class="navindex ==5?'sel':''">新闻中心</router-link>
            <mnav :btitle="bnews" :ltitle="lnews" :path="'/news'" :navindex="5"></mnav>
          </li>
          <li class="navli" value="6" @click.stop="tonav($event)">
            <router-link to="/about" :class="navindex ==6?'sel':''">关于我们</router-link>
            <mnav :btitle="babout" :ltitle="labout" :path="'/about'" :navindex="6"></mnav>
          </li>
          <li class="navli" value="7" @click.stop="tonav($event)">
            <router-link to="/shoppingmall" :class="navindex ==7?'sel':''" :navindex="7">南宏商城</router-link>
          </li>
        </ul>
        <div class="searchbox" v-show="isbanshow">
          <input type="text" v-model="search" placeholder="产品名称" />
          <img src="../assets/navgation/search.png" @click="tosearch('product',search)" alt />
        </div>
        <div
          class="bg"
          :class="isbanshow==true?'topa':'topb'"
          v-show="isbg"
          @mouseenter="isbg=true"
          @mouseout="isbg=false"
        ></div>
      </div>
    </div>
    <ul class="leftbox">
      <li class="leftli" v-for="(item, index) in leftli" :key="index" @click="toicon(index,item)">
        <img :src="item" alt />
      </li>
    </ul>
    <!-- 登录注册 -->
    <logreg v-if="islogreg" @close="close"></logreg>
  </div>
</template>
<script>
import mnav from "../components/minnav";
import logreg from "../components/logreg";
import { mapState, mapActions } from "vuex";
let timer = null; //定义初始值
export default {
  name: "navagation",
  inject: ["reload"],
  data() {
    return {
      searchipt: "",
      islogreg: false,
      showindex: 0,
      search: "",
      leftli: [
        require("../assets/navgation/bj.png"),
        require("../assets/navgation/gc.png"),
        require("../assets/navgation/md.png"),
        require("../assets/navgation/tel.png"),
        require("../assets/navgation/top.png")
      ],
      navindex: 0,
      val: 0,
      isbg: false,
      welli: [
        {
          icon: require("../assets/navgation/wx.png"),
          ewm: require("../assets/navgation/ewm.png")
        },
        {
          icon: require("../assets/navgation/wb.png"),
          ewm: require("../assets/navgation/ewm.png")
        },
        {
          icon: require("../assets/navgation/dy.png"),
          ewm: require("../assets/navgation/ewm.png")
        },
        {
          icon: require("../assets/navgation/sj.png"),
          ewm: require("../assets/navgation/ewm.png")
        }
      ],
      iconli: [
        {
          img: require("../assets/navgation/car.png"),
          name: "购物车",
          path: "/shoppingcar"
        },
        {
          img: require("../assets/navgation/pay.png"),
          name: "我的订单",
          path: "/orderlist"
        },
        {
          img: require("../assets/navgation/mine.png"),
          name: "个人中心",
          path: "/mine"
        }
      ],
      bhome: [""],
      bpro: ["智慧中心"],
      bshop: ["门店展示"],
      bcase: ["成功案例"],
      bsrv: ["售后服务"],
      bnews: ["新闻中心"],
      babout: ["南宏信息", "加入我们", "联系我们", "公司架构"],
      lhome: [""],
      lpro: [],
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
  computed: {
    ...mapState(["isbanshow", "islogin", "logreg"])
  },
  created() {
    this.requst();
    let navidx = sessionStorage.getItem("navindex");

    if (navidx) {
      this.navindex = navidx;
    } else {
      this.navindex = 0;
    }
  },
  methods: {
    ...mapActions(["getlogreg", "gettopath"]),
    requst(classid) {
      this.$axios.post("/index/api/productClass").then(res => {
        this.tabnav = res.data.data;
        let a = res.data.data;
        this.lpro = a;
      });
    },
    toicon(index, item) {
      if (index == 4) {
        timer = setInterval(function() {
          let osTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          let ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop =
            osTop + ispeed;
          this.isTop = true;
          if (osTop === 0) {
            clearInterval(timer);
          }
        }, 30);
      } else if (index == 2) {
        this.$router.push({ path: "/shopshow" });
        sessionStorage.setItem("mnavindex", 1);
      }
    },
    tonav(e) {
      this.navindex = e.currentTarget.value;
      sessionStorage.setItem("navindex", e.currentTarget.value);
      if (this.navindex == 4) {
        sessionStorage.removeItem("mnavindex");
      } else {
        sessionStorage.setItem("mnavindex", 0);
      }

      this.reload();
    },
    toshapingmall() {
      this.navindex = 7;
      sessionStorage.setItem("navindex", 7);
      this.reload();
      this.$router.push({ path: "/shoppingmall" });
    },
    tohome() {
      this.navindex = 0;
      sessionStorage.setItem("navindex", 0);
      this.reload();
      this.$router.push({ path: "/" });
    },
    // 去car。mine，orderlist
    topath(index, item) {
      if (this.islogin == false) {
        this.$confirm("您还未登录，前往登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // 存入状态
            this.gettopath(item.path);
            this.islogreg = true;
          })
          .catch(() => {
            this.islogreg = false;
            this.getlogreg(false);
          });
      } else {
        this.$router.push({ path: item.path });
      }
    },
    close(e) {
      console.log(e);
      this.islogreg = e;
      this.getlogreg(e);
    },
    tocurpage(e) {
      console.log(e);
      this.showindex = e;
    },
    tosearch(pro, val) {
      console.log(val);
      let keywords = this.search.replace(/<\/?[^>]*>/g, "");
      this.$router.push({
        path: "/searchs",
        query: { from: pro, keyword: keywords }
      });
      this.reload();
      console.log(keywords);
    }
  },
  components: { mnav, logreg }
};
</script>

<style lang="less" scoped>
.navgation {
  width: 100%;
  min-width: 1200px;
  box-sizing: border-box;
  background: white;
  border-bottom: 3px solid white;
  // overflow: hidden;
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
      .welicon {
        position: absolute;
        right: 80px;
        top: 2px;
        .welli {
          cursor: pointer;
          display: inline-block;
          margin-left: 50px;
          position: relative;
          .ewm {
            position: absolute;
            z-index: -1;
            left: -52px;
            top: 30px;
            width: 129px;
            height: 144px;
            background: url("../assets/navgation/bg.png");
            box-sizing: border-box;
            padding: 27px 12px 12px 12px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            opacity: 0;
            img {
              width: 105px;
              height: 105px;
            }
          }
          &:hover .ewm {
            transition: all 0.2s ease;
            z-index: 1;
            opacity: 1;
          }
        }
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
      .shopnav {
        width: 100%;
        height: 93px;
        // background: pink;
        display: flex;
        justify-content: flex-end;
        .searchbox {
          width: 55%;
          // background: olive;

          input {
            width: 70%;
            height: 29px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(236, 236, 236, 1);
            border-radius: 15px;
            box-sizing: border-box;
            padding: 0 30px 0 10px;
            font-size: 12px;
          }
        }
        .guide {
          width: 25%;
          // background: blueviolet;
          .text {
            cursor: pointer;
            display: inline-block;
            color: rgba(91, 91, 91, 1);
            font-size: 12px;
            line-height: 93px;
            margin: 0 10%;
          }
        }
      }
      .shopicon {
        width: 100%;
        height: 90px;
        text-align: center;
        box-sizing: border-box;
        padding-top: 25px;
        .iconlist {
          cursor: pointer;
          display: inline-block;
          box-sizing: border-box;
          margin: 0 10px;
          .name {
            color: rgba(153, 153, 153, 1);
            font-size: 10px;
            padding-top: 5px;
          }
        }
      }
      .navlist {
        // background: cadetblue;
        width: 100%;
        height: 90px;
        text-align: right;
        // position: relative;
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
            transition: color 0.5s ease;
            border-bottom: 3px solid #5b5b5b;
          }
          .minnav {
            opacity: 0;
          }
          &:hover a {
            border-bottom: 3px solid #5b5b5b;
          }

          &:hover .minnav {
            // display: block;
            transition: all 0.5s linear;
            // transform: scale(1.1);
            z-index: 11;
            opacity: 1;
          }
        }
      }
      .searchbox {
        // background: blueviolet;
        line-height: 90px;
        position: relative;
        input {
          width: 70%;
          height: 29px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(236, 236, 236, 1);
          border-radius: 15px;
          box-sizing: border-box;
          padding: 0 30px 0 10px;
          font-size: 12px;
        }
        img {
          cursor: pointer;
          position: absolute;
          top: 42%;
          left: 62%;
          z-index: 1;
        }
      }
      .bg {
        width: 100%;
        position: absolute;
        height: 185px;
        background: rgba(255, 255, 255, 0.5);
      }
      .topa {
        transition: all 0.5s ease;
        top: 123px;
      }
      .topb {
        transition: all 0.5s ease;
        top: 93px;
      }
    }
  }
  .leftbox {
    position: fixed;
    z-index: 111111;
    top: 30%;
    right: 10px;
    li {
      cursor: pointer;
      margin-top: 20px;
    }
  }
}
</style>