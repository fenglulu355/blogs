<template>
  <div class="nhfooter">
    <!-- <div class="footmain">
      <div class="footer-left">
        <div class="logo">
          <img src="../assets/footer/logo.png" alt />
        </div>
        <div class="ewm">
          <img src="../assets/footer/ewm.png" alt />
          <p>
            <span class="focus">关注南宏更多资讯</span>
            <span class="sys">【扫一扫】</span>
          </p>
        </div>
      </div>
      <div class="footer-center">
        <ul class="navlist">
          <li class="navli" v-for="(item, index) in navlist" :key="index" @click="tonav(index)">
            <router-link :class="curindex ==index?'sel':''" :to="item.path">{{item.name}}</router-link>
          </li>
        </ul>
        <div class="footinfo">
          <div class="telbox">
            <span>联系人：</span>
            <span>李经理，陈经理</span>
            <span class="slant">/</span>
            <span>销售热线：</span>
            <span>0830-6027777，18181878760，18090855133</span>
            <span class="slant">/</span>
            <span>售后热线：</span>
            <span>0830-3380333，13320783392</span>
          </div>
          <div class="dressbox">
            <span>总公司地址：</span>
            <span>总公司地址：四川省泸州市佳乐世纪城（金融中心）7号楼1301号</span>
            <span class="slant">/</span>
            <span>联系电话：</span>
            <span>0830-6027777</span>
            <span class="slant">/</span>
            <span>分公司地址：</span>
            <span>四川省宜宾市临港新天地互联网产业基地513号</span>
            <span class="slant">/</span>
            <span>联系电话：</span>
            <span>0830-3581585</span>
          </div>
          <div class="email">
            <span>传真：</span>
            <span>0830-2571485</span>
            <span class="slant">/</span>
            <span>Q Q：</span>
            <span>2073376722</span>
            <span class="slant">/</span>
            <span>邮箱：</span>
            <span>20008345@qq.com</span>
          </div>
        </div>
      </div>
      <div class="footer-right">
        <div class="icon">
          <img src="../assets/footer/tel.png" alt />
          <p>联系电话</p>
        </div>
        <div class="num">
          <p>0830-6027777</p>
          <p>18181878760</p>
        </div>
      </div>
    </div>-->
    <div class="content">
      <div class="footertop">
        <div class="ft-box">
          <div class="footer-li" v-for="(item, index) in topli" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + item.icon+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="text">{{item.text}}</p>
          </div>
        </div>
      </div>
      <div class="footer-center">
        <ul class="fc-list">
          <li class="fc-li" v-for="(item, index) in navlist" :key="index">
            <p class="title">
              <router-link :to="item.path">{{item.name}}</router-link>
            </p>
            <ul class="lists">
              <li class="mli" v-for="(items, i) in item.lname" :key="i" @click="topath(item,items)">
                <p :to="{path:item.path}">{{items.text}}</p>
              </li>
            </ul>
          </li>
        </ul>
        <div class="fc-bot">
          <div class="fc-b-left">
            <p>
              更多选购方式，请
              <router-link to="/shopshow">查找零售店</router-link>或
              <router-link to="shoppingmall">南宏商城</router-link>
            </p>
          </div>
          <div class="fc-b-right">
            <span class="tel">
              <img class="telimg" src="../assets/footer/tels.png" alt /> 0830-0267-6452
            </span>
            <span class="kf">
              <a href="http://wpa.qq.com/msgrd?v=3&uin=2073376722&site=qq&menu=yes"
               target="_blank" > <img src="../assets/footer/info.png" alt />在线客服</a>
             
            </span>
            <span class="time">周一至周日</span>
            <span class="time">08:30-18:30</span>
            <span class="icon">
              <img src="../assets/footer/dy.png" alt />
              <img src="../assets/footer/wx.png" alt />
              <img class="jd" src="../assets/footer/jd.png" alt />
            </span>
          </div>
        </div>
      </div>
      <div class="footer-bot">
        <p class="fb-top">
          <span class="text" @click="toprivacy">隐私政策</span>
          <span class="style">|</span>
          <span class="text" @click="toprolicy">用户协议</span>
          <span class="style">|</span>
          <span class="text" @click="qustion">安全问题反馈</span>
          <span class="style">|</span>
          <span class="text" @click="tostatemap">站点地图</span>
        </p>
        <div class="fb-bot">
          <div class="copyright">{{webinfo.website_copyright}}</div>
          <div class="fb-right">
            <img src="../assets/footer/kx.jpg" alt />
            <img src="../assets/footer/kx.jpg" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="policy-box" v-if="ispol">
      <div class="pol-item pol-pri">
        <img @click="ispol=false" src="../assets/navgation/log-x.png" alt />
        <policy></policy>
      </div>
    </div>
    <div class="policy-box" v-if="ispri">
      <div class="pri-item pol-pri">
        <img @click="ispri=false" src="../assets/navgation/log-x.png" alt />
        <privacy></privacy>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import policy from "../components/policy";
import privacy from "../components/privacy";
export default {
  name: "nhfooter",
  inject: ["reload"],
  data() {
    return {
      ispol: false,
      ispri: false,
      isqustion: false,
      curindex: 0,
      topli: [
        { icon: require("../assets/footer/7.png"), text: "7天无理由退货" },
        { icon: require("../assets/footer/15.png"), text: "15天退货保障" },
        { icon: require("../assets/footer/30.png"), text: "30天换货保障" },
        { icon: require("../assets/footer/hy.png"), text: "会员中心" }
      ],
      navlist: [
        // { path: "/", name: "网站首页" },
        {
          path: "/product",
          name: "智慧中心"
        },
        {
          path: "/shopshow",
          name: "门店展示",
          lname: [
            { text: "门店展示", index: 0 },
            { text: "门店导航", index: 1 }
          ]
        },
        {
          path: "/cases",
          name: "成功案例",
          lname: [
            { text: "工装项目", index: 0 },
            { text: "家装项目", index: 1 }
          ]
        },
        {
          path: "/service",
          name: "服务与支持",
          lname: [
            { text: "团队展示", index: 0 },
            { text: "服务流程", index: 1 },
            { text: "安装流程", index: 2 },
            { text: "服务条款", index: 3 }
          ]
        },
        {
          path: "/news",
          name: "新闻中心",
          lname: [
            { text: "行业新闻", index: 0 },
            { text: "公司新闻", index: 1 }
          ]
        },
        {
          path: "/about",
          name: "关于我们",
          lname: [
            { text: "南宏信息", index: 0 },
            { text: "加入我们", index: 1 },
            { text: "联系我们", index: 10 }
          ]
        }
        // { path: "/shoppingmall", name: "南宏商城" }
      ],
      webinfo: []
    };
  },
  created() {
    this.requst();
    let navindex = sessionStorage.getItem("navindex");
    if (navindex) {
      this.curindex = navindex;
    } else {
      this.curindex = 0;
    }
  },
  components: { policy, privacy },
  methods: {
    ...mapMutations(["setispri"]),
    requst() {
      this.$axios.post("/index/login/getWebsiteCache").then(res => {
        this.webinfo = res.data.data;
        console.log(res);
      });
    },
    topath(item, items) {
      console.log(item, items);
      this.$router.push({ path: item.path });
      sessionStorage.setItem("mnavindex", items.index);
      this.reload();
    },
    tonav(index) {
      this.curindex = index;
      sessionStorage.setItem("navindex", index);
      this.reload();
    },
    toprivacy() {
      this.ispri = true;
      // this.$router.push({ path: "/privacy" });
    },
    tostatemap() {
      this.$router.push({ path: "/statemap" });
    },
    toprolicy() {
      this.ispol = true;
      // this.$router.push({ path: "/policy" });
    },
    qustion() {
      this.isqustion = true;
    }
  }
};
</script>

<style lang="less" scoped>
.nhfooter {
  width: 100%;
  box-sizing: border-box;
  padding: 50px 0 20px 0px;
  .policy-box {
    width: 100%;
    height: 3000px;
    position: fixed;
    top: 0;
    z-index: 11111;
    background: rgba(0, 0, 0, 0.5);
    .pol-pri {
      width: 1200px;
      margin: 0px auto;
      background: white;
      position: relative;
      img {
        cursor: pointer;
        position: absolute;
        right: 30px;
        top: 30px;
      }
    }
  }
  .content {
    width: 100%;
    .footertop {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      width: 100%;
      .ft-box {
        box-sizing: border-box;
        padding: 20px 0 60px 0;
        width: 1200px;
        margin: 0px auto;
        display: flex;
        justify-content: space-around;
      }
      .footer-li {
        text-align: center;
        .mainpic {
          margin: 20px auto;
          width: 35px;
          height: 35px;
        }
      }
    }
    .footer-center {
      box-sizing: border-box;
      width: 1200px;
      margin: 0 auto;
      padding: 30px 0 10px 0;
      .fc-list {
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        text-align: center;
        .title {
          a {
            font-size: 18px;
            color: #333333;
          }
        }
        .lists {
          cursor: pointer;
          p {
            color: #828282;
            &:hover {
              color: #000;
            }
          }
        }
      }
      .fc-bot {
        box-sizing: border-box;
        padding: 50px 0 0px 0;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        .fc-b-left {
          align-self: center;
        }
        .telimg {
          position: relative;
          bottom: 1px;
          left: 5px;
        }
        a,
        .tel,
        .kf {
          cursor: pointer;
          color: rgba(36, 130, 200, 1);
          padding: 0 10px;
          img {
            width: 20px;
            height: auto;
            padding: 0 5px;
          }
        }
        .icon {
          position: relative;
          bottom: 2px;
          left: 10px;
          img {
            box-sizing: border-box;
            padding: 0 5px;
          }
          // background: brown;
          .jd {
            width: 65px;
            position: relative;
            right: 15px;
          }
        }
      }
    }
    .footer-bot {
      width: 100%;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      background-color: #f9f9f9;
      // padding-bottom: 20px;
      .fb-top {
        width: 1200px;
        margin: 20px auto;
        text-align: right;
        span {
          cursor: pointer;
          box-sizing: border-box;
          padding: 0 5px;
          font-size: 15px;
        }
      }
      .fb-bot {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .copyright {
          // background: brown;
          box-sizing: border-box;
          width: 500px;
          padding: 10px 0;
          font-size: 12px;
        }
        .fb-right {
          img {
            width: 120px;
          }
        }
      }
    }
  }

  //   // background: pink;
  //   display: grid;
  //   grid-template-columns: 18% 63% 1fr;
  //   .footer-left {
  //     // background: olive;;
  //     width: 100%;
  //     box-sizing: border-box;
  //     padding: 44px 10px 0px 40px;
  //     .logo {
  //       box-sizing: border-box;
  //       padding-bottom: 19px;
  //     }
  //     .ewm {
  //       width: 159px;
  //       height: 122px;
  //       border: 1px solid rgba(153, 153, 153, 1);
  //       border-radius: 5px;
  //       display: flex;
  //       justify-content: space-between;
  //       img {
  //         box-sizing: border-box;
  //         padding: 9px 9px;
  //       }
  //       p {
  //         writing-mode: vertical-lr;

  //         color: rgba(153, 153, 153, 1);
  //       }
  //       .focus {
  //         font-size: 10px;
  //         position: relative;
  //         top: 12px;
  //         right: 8px;
  //       }
  //       .sys {
  //         font-size: 14px;
  //         position: relative;
  //         top: 25px;
  //         right: 5px;
  //       }
  //     }
  //   }
  //   .footer-center {
  //     // background: pink;
  //     width: 100%;
  //     .navlist {
  //       box-sizing: border-box;
  //       padding: 61px 0 31px 0;
  //       .navli {
  //         display: inline-block;
  //         a {
  //           font-size: 13px;
  //           color: rgba(51, 51, 51, 1);
  //           margin-right: 40px;
  //         }
  //       }
  //       .sel {
  //         font-weight: bold;
  //       }
  //     }
  //     .footinfo {
  //       border-top: 1px solid rgba(153, 153, 153, 0.3);
  //       box-sizing: border-box;
  //       padding: 18px 0 30px 0;
  //       font-size: 14px;
  //       color: rgba(153, 153, 153, 1);
  //       line-height: 28px;
  //       .slant {
  //         margin: 0 5px;
  //       }
  //     }
  //   }
  //   .footer-right {
  //     box-sizing: border-box;
  //     width: 224px;
  //     height: 52px;
  //     margin: 90px auto;
  //     border: 1px solid rgba(153, 153, 153, 1);
  //     border-radius: 5px;
  //     display: flex;
  //     justify-content: space-around;
  //     align-content: center;

  //     .icon {
  //       width: 50px;
  //       font-size: 10px;
  //       text-align: center;
  //       font-weight: 300;
  //       color: rgba(153, 153, 153, 1);
  //       box-sizing: border-box;
  //       padding-top: 10px;
  //     }
  //     .num {
  //       width: 126px;
  //       height: 35px;
  //       font-size: 17px;
  //       font-weight: bold;
  //       color: rgba(153, 153, 153, 1);
  //       line-height: 20px;
  //       box-sizing: border-box;
  //       padding-top: 10px;
  //     }
  //   }
  // }
}
</style>