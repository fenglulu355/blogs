<template>
  <div class="navgation">
    <!-- 官网 -->
    <div class="webbox" v-if="isbanshow">
      <div class="navs">
        <div class="logo">
          <router-link to="/">
            <img class="mainpic" src="../assets/nav/toplogo.png" alt />
          </router-link>
        </div>
        <!-- 官网 -->

        <div class="homebanner">
          <div class="shoplogo">
            <div
              @click="toshapingmall"
              class="mainpic"
              :style="{backgroundImage: 'url(' + require('../assets/nav/shop.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p @click="toshapingmall">商城</p>
          </div>
          <div class="menu" @click="isnav = !isnav">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + require('../assets/nav/menu.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p>目录</p>
          </div>
          <ul class="navlist" v-show="isnav">
            <li
              class="navli"
              v-for="(item, index) in navli"
              :key="index"
              :class="navindex==index?'sel':''"
              @click="tonav(index,item)"
            >
              <p class="text">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="swiper">
        <van-swipe class="my-swiper" :autoplay="3000" indicator-color="#2482C8">
          <van-swipe-item v-for="(image, index) in swiperli" :key="index">
            <div
              class="mainpic"
              :style="{
              backgroundImage: 'url(' +httpUrl+image.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="viocebox" v-show="isswiper">
        <van-notice-bar
          color="#5B5B5B"
          background="#F5F5F5"
          class="vioce"
          :text="vioce"
          left-icon="volume-o"
        />
      </div>
      <div class="searchbox">
        <input type="text" placeholder="产品名称" v-model="search" />
        <div
          @click="tosearch('product',search)"
          class="mainpic"
          :style="{backgroundImage: 'url(' + require('../assets/nav/search.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
      </div>
    </div>
    <!-- 商城 -->
    <div class="shopbox" v-else>
      <div class="navs">
        <div class="logo">
          <router-link to="/">
            <img class="mainpic" src="../assets/nav/toplogo.png" alt />
          </router-link>
        </div>
        <!-- 商城 -->
        <div class="homebanner">
          <div class="shoplogo">
            <div
              @click="tohome"
              class="mainpic"
              :style="{backgroundImage: 'url(' + require('../assets/nav/home.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p @click="tohome">官网</p>
          </div>
          <div class="menu">
            <div
              @click="tomine"
              class="mainpic dh"
              :style="{backgroundImage: 'url(' + require('../assets/nav/menu.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p @click="tomine">我的</p>
          </div>
        </div>
      </div>
      <div class="viocebox" v-show="isswiper">
        <van-notice-bar
          color="#5B5B5B"
          background="#F5F5F5"
          class="vioce"
          :text="vioce"
          left-icon="volume-o"
        />
      </div>
      <div class="searchbox">
        <input type="text" placeholder="产品名称" v-model="search" />
        <div
          @click="tosearch('shop',search)"
          class="mainpic"
          :style="{backgroundImage: 'url(' + require('../assets/nav/search.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
      </div>
    </div>

    <!-- 登录注册 -->
    <logreg v-if="logreg" @close="close"></logreg>
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
      islogreg: false,
      showindex: 0,
      search: "",
      vioce:
        "强强联手抢占市场高地强强联手抢占市场高地强强联手抢占市场高地强强联手抢占市场高地强强联手抢占市场高地强强联手抢占市场高地强强联手抢占市场高地强强联手抢占市场高地强强联手抢占市场高地 南宏成都店今日正式亮相！",
      swiperli: [],
      isnav: false,
      navli: [
        { name: "网站首页", path: "/" },
        { name: "智慧中心", path: "/product" },
        { name: "门店展示", path: "/shopshow" },
        { name: "成功案例", path: "/cases" },
        { name: "服务与支持", path: "/service" },
        { name: "新闻中心", path: "/news" },
        { name: "关于我们", path: "/about" }
      ],
      navindex: 0,
      val: 0
    };
  },
  computed: {
    ...mapState(["isbanshow", "islogin", "logreg", "isswiper"])
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
    requst() {
      this.$axios.post("/index/api/home").then(res => {
        // console.log(res.data.data);
        this.swiperli = res.data.data.banner;
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
      }
    },
    // 跳转官网各个页面
    tonav(e, item) {
      this.navindex = e;
      sessionStorage.setItem("navindex", e);
      setTimeout(() => {
        this.$router.push({ path: item.path });
        this.isnav = false;
      }, 200);
    },
    tomine() {
      this.$router.push({ path: "/mine" });
    },
    // 跳转商城
    toshapingmall() {
      this.$router.push({ path: "/shoppingmall" });
    },
    // 回到首页
    tohome() {
      this.navindex = 0;
      sessionStorage.setItem("navindex", 0);
      this.reload();
      this.$router.push({ path: "/" });
    },
    // 去car。mine，order
    topath(index, item) {
      console.log(item);
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
          });
      } else {
        this.$router.push({ path: item.path });
      }
    },
    close(e) {
      console.log(e);
      this.islogreg = e;
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
  .navs {
    width: 100%;
    height: 125px;
    box-sizing: border-box;
    padding: 33px 25px 0 25px;
    display: grid;
    grid-template-columns: 75% 25%;
    position: relative;
    .logo {
      width: 476px;
      height: 64px;
      .mainpic {
        width: auto;
        height: 64px;
      }
    }
    .homebanner {
      // background: violet;
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .shoplogo {
        width: 50%;
        position: relative;
        .mainpic {
          width: 40px;
          height: 40px;
          position: absolute;
          left: 0;
        }
        p {
          font-size: 20px;
          color: rgba(91, 91, 91, 1);
          position: absolute;
          left: 0;
          bottom: 20px;
        }
      }
      .menu {
        // background: yellow;
        width: 50%;
        text-align: right;
        position: relative;
        .mainpic {
          position: absolute;
          right: 0;
          top: 0;
          width: 43px;
          height: 37px;
        }
        // .dh {
        //   width: 45px;
        //   height: 39px;
        // }
        p {
          font-size: 20px;
          color: rgba(91, 91, 91, 1);
          position: absolute;
          right: 0;
          bottom: 18px;
        }
      }
      .navlist {
        position: absolute;
        z-index: 10;
        top: 90px;
        right: -25px;
        width: 150%;
        .navli {
          background: #2482c8;
          width: 100%;
          height: 60px;
          font-size: 20px;
          color: white;
          text-align: center;
          line-height: 60px;
          border-bottom: 1px solid white;
          &:last-child {
            border: none;
          }
        }
        .sel {
          background: white;
          color: #2482c8;
        }
      }
    }
  }
  .swiper {
    // background: pink;
    width: 100%;
    height: 440px;
    .my-swiper {
      width: 100%;
      height: 100%;
      .mainpic {
        width: 100%;
        height: 100%;
      }
    }
  }
  .viocebox {
    width: 100%;
    height: 90px;
    overflow: hidden;
    .vioce {
      width: 100%;
      height: 100%;
    }
  }
  .searchbox {
    width: 100%;
    box-sizing: border-box;
    padding: 25px 25px;
    position: relative;
    input {
      width: 100%;
      height: 60px;
      border: 1px solid rgba(210, 210, 210, 0.5);
      border-radius: 30px;
      box-sizing: border-box;
      padding: 0 25px;
      font-size: 24px;
      color: #666666;
      &::placeholder {
        font-size: 24px;
        color: #666666;
      }
    }
    .mainpic {
      width: 38px;
      height: 38px;
      position: absolute;
      right: 7%;
      top: 36px;
    }
  }
}
</style>