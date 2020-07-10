<template>
  <div class="navgation">
    <div class="navtop">
      <div class="logo">
        <div class="logopic">
          <img src="../assets/navgetion/LOGO.png" @click="tohome" alt />
        </div>
      </div>
      <div class="search">
        <input type="text" @blur="toSerach" placeholder="请输入产品关键字搜索" v-model="search" />
        <p class="tosearch" @click="toSerach">搜索</p>
      </div>
      <div class="nav-right">
        <ul class="navlist">
          <li
            class="navli"
            v-for="(item, index) in navlist"
            :key="index"
            @mouseenter="mouseenter(index)"
          >
            <div class="navitem" @click="toNav(index)" :class="activeClass ==index?'show':''">
              <router-link :to="item.path">{{item.name}}</router-link>
            </div>
          </li>
        </ul>
        <div class="twonav">
          <section class="sectionnone"></section>
          <section v-show="proshow" @mouseleave="mouseleave">
            <div class="twobox">
              <p
                v-for="(item, index) in prores"
                :key="index"
                @click="toproduct(item,index)"
                :class="twoclass ==index?'sel':''"
              >{{item.class_name}}</p>
            </div>
          </section>
          <section class="sectionnone"></section>
          <section v-show="caseshow" @mouseleave="mouseleave">
            <div class="twobox">
              <p
                v-for="(item, index) in caseres"
                :key="index "
                @click="tocase(item,index)"
                :class="twoclass ==index?'sel':''"
              >{{item.class_name}}</p>
            </div>
          </section>
          <section class="sectionnone"></section>
          <section v-show="aboutshow" @mouseleave="mouseleave">
            <div class="twobox">
              <router-link
                class="minnavli"
                v-for="(item, index) in aboutlist"
                :key="index"
                :class="twoclass ==index?'sel':''"
                :to="item.path"
              >{{item.name}}</router-link>
            </div>
          </section>
          <section class="sectionnone"></section>
          <section v-show="newshow" @mouseleave="mouseleave">
            <div class="twobox">
              <p
                v-for="(item, index) in newres"
                :class="twoclass ==index?'sel':''"
                :key="index"
                @click="tonews(item,index)"
              >{{item.class_name}}</p>
            </div>
          </section>
          <section class="sectionnone"></section>
        </div>
      </div>
    </div>

    <div class="navflxed">
      <ul class="nflist">
        <li
          class="nfli"
          v-for="(item, index) in nflist"
          :key="index"
          @click="tosel(index)"
          :class="selClass ==index?'sel':''"
        >
          <a :href="item.asrc" :target="item.target">
            <img :src="item.img" alt />
          </a>
        </li>
      </ul>
    </div>
    <transition name="ewm">
      <ul v-if="trans" class="ewmlist">
        <li class="ewmli">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + baseurl +`/public/`+webinfo.about_ewm+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </li>
        <li class="ewmli">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + baseurl +`/public/`+webinfo.zx_ewm+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </li>
        <li class="ewmli">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + baseurl +`/public/`+webinfo.zx_ewm+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import httpUrl from "../utils/url";
let timer = null; //定义初始值
export default {
  name: "navgation",
  data() {
    return {
      nav: false,
      trans: false,
      search: "",
      news: false,
      res: [],
      newres: [],
      newshow: false,
      prores: [],
      proshow: false,
      caseres: [],
      caseshow: false,
      aboutres: [],
      aboutshow: false,
      proClass: 0,
      proClass: 0,
      baseurl: "",
      activeClass: 0,
      twoclass: 0,
      selClass: 0,
      navlist: [
        { name: "首页", path: "/" },
        { name: "长湖产品", path: "/product" },
        { name: "长湖案例", path: "/cases" },
        { name: "关于长湖", path: "/about" },
        { name: "新闻动态", path: "/news" },
        { name: "联系我们", path: "/contact" }
      ],
      aboutlist: [
        { name: "长湖简介", path: "/about" },
        { name: "长湖理念", path: "/about/idea" },
        { name: "组织架构", path: "/about/organize" },
        { name: "长湖大记事", path: "/about/timeline" },
        { name: "长湖荣誉", path: "/about/honor" }
      ],
      navbox: [],
      nflist: [
        {
          asrc: "http://wpa.qq.com/msgrd?v=3&uin=88417881&site=qq&menu=yes",
          img: require("../assets/navgetion/fkf-3.png"),
          target: "_black"
        },
        {
          asrc: "tel:028-89541286",
          img: require("../assets/navgetion/fkf-4.png"),
          target: ""
        },
        {
          asrc: "javascript:;",
          img: require("../assets/navgetion/fkf-7.png"),
          target: ""
        },
        {
          asrc: "javascript:;",
          img: require("../assets/navgetion/fkf-8.png"),
          target: ""
        }
      ],
      scrolldis: "",
      searchRes: "",
      webinfo: []
    };
  },
  created() {
    this.requstProduct();
    this.requstCases();
    this.requstNews();
    this.requstWeb();
    this.baseurl = httpUrl.httpUrl;

    //
  },
  mounted() {
    if (!sessionStorage.getItem("curindex")) {
      this.activeClass = 0;
    } else {
      this.activeClass = sessionStorage.getItem("curindex");
    }
  },
  methods: {
    toSerach() {
      // 正则表达式判断，只能输入中文、数字、英文字符
      let pattern = /^[\u4E00-\u9FA5A-Za-z0-9]+|$ /,
        searchInfo = pattern.test(this.search);
      if (this.search == "") {
        alert("输入值为空");
      } else {
        if (searchInfo == true) {
          this.$axios
            .post("/index/api/getProductList", {
              keyword: this.search
            })
            .then(res => {
              // 判断是否有内容
              this.searchRes = res.data.data.data[0];
              if (res.data.data.data.length == 0) {
                alert("您搜索的内容不存在");
              } else {
                this.$router.push({
                  path: "/searchs",
                  query: { search: this.search }
                });
                this.$router.go(0);
              }
            });
        } else {
          alert("只能输入中文、数字、英文字符");
        }
      }
    },
    mouseenter(index) {
      if (index == 1) {
        this.proshow = true;
      } else {
        this.proshow = false;
      }
      if (index == 2) {
        this.caseshow = true;
      } else {
        this.caseshow = false;
      }
      if (index == 3) {
        this.aboutshow = true;
      } else {
        this.aboutshow = false;
      }
      if (index == 4) {
        this.newshow = true;
      } else {
        this.newshow = false;
      }
    },
    mouseleave() {
      this.proshow = false;
      this.caseshow = false;
      this.newshow = false;
      this.aboutshow = false;
    },
    requstWeb() {
      this.$axios.post("/index/api/web_config").then(res => {
        this.webinfo = res.data.data;
      });
    },
    requstNews() {
      this.$axios.post("/index/api/getNewsClass").then(resa => {
        this.newres = resa.data.data;
        // console.log(this.newres, " this.newres ");
      });
    },
    requstProduct() {
      this.$axios.post("/index/api/getProductClass").then(respro => {
        this.prores = respro.data.data;
      });
    },
    requstCases() {
      this.$axios.post("/index/api/getProductClass").then(respro => {
        this.caseres = respro.data.data;
      });
    },
    // 返回首页
    tohome() {
      // 跳转至首页
      this.$router.push({
        path: "/"
      });
      // 头部和固定导航栏下标清零
      sessionStorage.setItem("curindex", 0);
      this.activeClass = sessionStorage.getItem("curindex");
      sessionStorage.setItem("selindex", 0);
      this.selClass = sessionStorage.getItem("selindex");
    },
    toNav(index) {
      // 回到初始位置
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // 存储头部列表下标
      sessionStorage.setItem("curindex", index);
      this.activeClass = sessionStorage.getItem("curindex");
      // 存储产品分类下标
      sessionStorage.setItem("caseproClass", 0);
      sessionStorage.setItem("productClass", 0);
    },
    tonews(item, index) {
      // 存储头部列表下标
      sessionStorage.setItem("curindex", 4);
      this.activeClass = sessionStorage.getItem("curindex");
      this.nav = false;
      // 带分类id跳转至新闻页面
      let id = item.class_id;
      this.$router.push({
        path: "/news",
        query: { id: id }
      });
      // 回到初始位置
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // 刷新页面
      this.$router.go(0);
    },
    tocase(item, index) {
      // 存储头部列表下标
      sessionStorage.setItem("curindex", 2);
      this.activeClass = sessionStorage.getItem("curindex");
      // 存储产品分类下标
      sessionStorage.setItem("caseproClass", index);
      // 带分类id跳转至案例页面
      let id = item.class_id;
      this.$router.push({
        path: "/cases",
        query: { id: id }
      });
      // 回到初始位置
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // 刷新页面
      this.$router.go(0);
    },
    toproduct(item, index) {
      // 存储头部列表下标
      sessionStorage.setItem("curindex", 1);
      this.activeClass = sessionStorage.getItem("curindex");
      // 存储产品分类下标
      sessionStorage.setItem("productClass", index);
      // 带分类id跳转至产品页面
      let id = item.class_id;
      this.$router.push({
        path: "/product",
        query: { id: id }
      });
      // 回到初始位置
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // 刷新页面
      this.$router.go(0);
    },
    // 点击右下方固定导航栏
    tosel(index) {
      sessionStorage.setItem("selindex", index);
      this.selClass = sessionStorage.getItem("selindex");
      if (index == 0) {
        this.trans = false;
      }
      if (index == 1) {
        this.trans = false;
        this.nflist[1].asrc;
      }
      if (index == 2) {
        this.trans = true;
      }
      if (index == 3) {
        // 回到顶部
        this.trans = false;
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
    }
  }
};
</script>
<style lang="less" scoped>
.ewm-enter {
  transform: translateX(100px);
}
.ewm-leave-to {
  opacity: 0;
}
.ewm-enter-active {
  transition: all 1.5s ease-in-out;
}
.ewm-leave-active {
  transition: all 0.5s linear;
}

.navgation {
  width: 100%;
  min-width: 1200px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  .navtop {
    display: flex;
    justify-content: space-between;
    .logo {
      width: 25%;
      box-sizing: border-box;
      padding-left: 1%;
      .logopic {
        width: 285px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          cursor: pointer;
          // line-height: 80px;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .search {
      width: 30%;
      text-align: right;
      line-height: 80px;
      position: relative;
      padding-right: 100px;
      input {
        box-sizing: border-box;
        border: 1px solid #dde0df;
        background: rgba(0, 0, 0, 0);
        width: 255px;
        height: 35px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        padding-left: 25px;
        color: white;
        &::placeholder {
          color: white;
        }
      }
      .tosearch {
        cursor: pointer;
        width: 100px;
        height: 35px;
        background: white;
        font-size: 16px;
        line-height: 35px;
        text-align: center;
        position: absolute;
        top: 23px;
        right: 3px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
      }
      .nullbox {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(50%);
        background: #ffffff;
        width: 300px;
        height: 200px;
        text-align: center;
      }
    }

    .nav-right {
      width: 50%;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      position: relative;
      .navlist {
        // background: pink;
        box-sizing: border-box;
        width: 80%;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        height: 80px;
        justify-items: end;
        .navli {
          display: inline-block;
          width: 100%;
          height: 80px;
          text-align: center;
          padding-left: 2%;
          // .tonav {
          //   display: inline-block;
          //   height: 100%;
          //   width: 100%;
          //   line-height: 80px;
          //   color: white;
          // }
          .navitem {
            margin-top: 20px;
            width: 100%;
            height: 100%;
            a {
              display: inline-block;
              height: 100%;
              width: 100%;
              line-height: 40px;
              color: white;
            }
            &:hover {
              width: 100%;
              height: 40px;
              background: #82c41c;
            }
          }

          .show {
            width: 100%;
            height: 40px;
            background: #82c41c;
          }
        }
      }
      .twonav {
        // background: pink;
        position: absolute;
        top: 80px;
        right: 0;
        box-sizing: border-box;
        width: 80%;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        justify-items: end;
        .sectionnone {
          opacity: 0;
        }
        section {
          cursor: pointer;
          width: 100%;
          text-align: center;
          color: #ffffff;
          font-size: 12px;
          height: 40px;
          line-height: 40px;
          .twobox {
            background: #111111;
          }
          p {
            width: 100%;
            height: 40px;
            line-height: 40px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            &:hover {
              background: #333333;
            }
          }
          a {
            display: block;
            width: 100%;
            height: 40px;
            line-height: 40px;

            color: #ffffff;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:hover {
              background: #333333;
            }
          }
          .sel {
            background: #333333;
          }
        }
      }
    }
  }
}
</style>