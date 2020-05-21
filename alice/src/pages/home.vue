<template>
  <div class="home">
    <!-- 头部轮播 -->
    <div class="carouselbox">
      <div class="warpper">
        <div class="slide">
          <img src="../assets/home/lbtext.png" alt />
        </div>
        <h1>花园私人定制</h1>
        <h2>尊享舒适生活</h2>
        <p class="text">PRIVATE CUSTOM GARDEN ENJOY COMFORTABLE LIFE</p>
      </div>
      <carousel></carousel>
      <div class="search">
        <input @click="isfocus = true" type="text" v-model="searchipt" :placeholder="searchipt" />
        <img @click="tosearch" src="../assets/home/search.png" alt />
        <div class="searchli" v-show="isfocus">
          <p @click="searchs($event)" id="1">
            {{searchipt}}
            <span @click="searchs($event)" id="3">视频</span>
          </p>
          <p @click="searchs($event)" id="2">
            {{searchipt}}
            <span @click="searchs($event)" id="4">案例</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 案例展示 -->
    <div class="casebox common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/home/case1.png" alt />
        </p>
        <p class="title">
          <span class="white">案例</span>
          <span class="span">展示</span>
        </p>
        <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIQUE LANDSCAPE</p>
      </div>
      <ul class="casenav">
        <li
          class="caseli"
          v-for="(item, index) in caseli"
          :key="index"
          :class="caseindex==index?'casecur':''"
          @click="changecaseindex(index,item)"
        >
          <p>{{item.class_name}}</p>
        </li>
      </ul>
      <div class="caseinfo">
        <ul
          class="warpper"
          :style="{'left':calleft + 'px'}"
          v-on:mouseover="stopmove()"
          v-on:mouseout="move()"
        >
          <li
            class="pic"
            v-for="(item, index) in caseslide"
            :key="index"
            @click="tocasedetail(index,item)"
          >
            <div class="pics">
              <!-- <img :src="baseurl+`/public/`+item.image_url" alt /> -->
              <div class="mainpicbox">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+ item.image_url+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
                ></div>
              </div>
              <div class="infos clearFix">
                <p class="name fl">{{item.article_title}}</p>
                <img class="green fr" src="../assets/home/case2.png" alt />
                <img class="white fr" src="../assets/home/case2-1.png" alt />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="more">
        <p class="tomore" @click="tocase">查看更多 +</p>
      </div>
    </div>
    <!-- 服务流程 -->
    <div class="servbox">
      <div class="servcont">
        <p class="title">
          服务流程 |
          <img src="../assets/home/serv-icon.png" alt />
        </p>
        <ul class="servlist">
          <li class="servli" v-for="(item, index) in servli" :key="index">
            <div class="bg">
              <img src="../assets/home/serv-green.png" alt />
              <span class="num">{{index+1}}</span>
            </div>
            <div class="info">
              <p class="bold">{{item.name}}</p>
              <p class="des">{{item.des}}</p>
            </div>
          </li>
        </ul>
        <div class="border">
          <div class="box"></div>
          <img src="../assets/home/serv-rt.png" alt />
          <span>项目完成</span>
        </div>
        <div class="telbox">
          <div class="telbox-left">
            <img src="../assets/home/serv-tle.png" alt />
            <span class="sel">服务热线</span>
            <span class="sx">|</span>
            <span class="tel">{{telnum}}</span>
          </div>
          <p class="tozx">立即咨询</p>
          <!-- <a
            class="tozx"
            target="_blank"
            href="http://wpa.qq.com/msgrd?v=3&uin=993506370&site=qq&menu=yes"
          >立即咨询</a>-->
        </div>
      </div>
    </div>
    <!-- 选择理由 -->
    <div class="reasonbox common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/home/reason1.png" alt />
        </p>
        <p class="title">
          <span class="white">选择爱丽丝景观</span>
          <span class="span">五大理由</span>
        </p>
        <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIQUE LANDSCAPE</p>
      </div>
      <div class="reason">
        <ul class="reason-left">
          <li class="rlli" v-for="(item, index) in rlli" :key="index">
            <div class="dot"></div>
            <p class="name">{{item.name}}</p>
            <p class="des">{{item.des}}</p>
          </li>
        </ul>
        <div class="pic">
          <img src="../assets/home/reason2.png" alt />
        </div>
        <ul class="reason-right">
          <li class="rlli" v-for="(item, index) in rrli" :key="index">
            <div class="dot"></div>
            <p class="name">{{item.name}}</p>
            <p class="des">{{item.des}}</p>
          </li>
        </ul>
        <div class="more">
          <p class="tomore" @click="toabout">查看更多 +</p>
        </div>
      </div>
    </div>
    <!-- 团队 -->
    <div class="teambox common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/home/reason1.png" alt />
        </p>
        <p class="title">
          <span class="white">团队</span>
          <span class="span">风采</span>
        </p>
        <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIQUE LANDSCAPE</p>
      </div>
      <ul class="teamlist">
        <li class="teamli" v-for="(item, index) in teamli" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +baseurl+`/public/`+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>

          <div class="small">
            <img src="../assets/home/teamsmall.png" alt />
          </div>
          <div class="hover">
            <img src="../assets/home/teamhover.png" alt />
            <p class="name">{{item.article_title}}</p>
            <p class="title">{{item.article_contents}}</p>
          </div>
        </li>
      </ul>
      <div class="more">
        <p class="tomore" @click="toteam">查看更多 +</p>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="cooperation common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/home/cooperation1.png" alt />
        </p>
        <p class="title">
          <span class="white">合作</span>
          <span class="span">伙伴</span>
        </p>
        <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIQUE LANDSCAPE</p>
      </div>
      <div class="copperbox">
        <ul
          class="warpper"
          :style="{'left':callefts + 'px'}"
          v-on:mouseover="stopmove()"
          v-on:mouseout="move()"
        >
          <li class="pic" v-for="(item, index) in cooperli" :key="index">
            <div class="pics">
              <div class="mainpicbox">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="more">
        <p class="tomore" @click="tocooper">查看更多 +</p>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from "../components/home-lb";
import httpUrl from "../api/url";
export default {
  name: "home",
  data() {
    return {
      isfocus: false,
      searchipt: "别墅景观",
      getProductClass: [],
      baseurl: "",
      caseli: [],
      caseindex: 0,
      caseslide: [],
      calleft: 0,
      servli: [
        { name: "下单咨询", des: "我们通过沟通，了解您的基本需求" },
        { name: "测量设计", des: "现场沟通，进行拍照，摄像，进行实地尺寸测量" },
        { name: "确定预算", des: "设计师进行方案细化，包括效果图、景观 设" },
        { name: "签订合同", des: "客户审定工程预算，双方签订施工合同" },
        { name: "售后服务", des: "完善的售后服务全面解决您的后顾之忧" }
      ],
      rlli: [
        {
          name: "众多合作  值得信赖",
          des:
            "我们有众多的合作客户，服务客户上百家，经验丰富，设计新颖，选材齐全。"
        },
        {
          name: "专业团队  私人订制",
          des:
            "拥有专业从事园林景观设计的技术人才，高级工程师为您专业定制，合理规划设计，全面考虑提供适合您需求的工程设计方案。"
        },
        {
          name: "施工经验丰富  高效快捷",
          des: "多年的园林景观设计施工经验让我们在施工方面有了丰富的施工经验。"
        }
      ],
      rrli: [
        {
          name: "物美价廉  高品质产品",
          des:
            "优质的原产地材料、完善的团队管理、内部完整的产业闭环，极大限度地控制了成本，为客户创造高性价比，高质量的作品。"
        },
        {
          name: "完善的服务  品质保障",
          des:
            "爱丽丝拥有一套完善的应对预案，对客户日常所遇到的、担心的问题精确迅速解决，真正为客户解决实际问题，24小时响应机制。我们会根据您的工程本身定制适合您的方案"
        }
      ],
      teamli: [],
      cooperli: [],
      callefts: 0,
      tesnum: ""
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    setTimeout(() => {
      this.requst();
    }, 0);
    this.requstteam();
    this.requstcooper();
    this.move();
    this.telnum = sessionStorage.getItem("tel");
  },
  methods: {
    tosearch() {
      let keywords = this.searchipt.replace(/<\/?[^>]*>/g, "");
      this.$router.push({ path: "/cases", query: { keywords: keywords } });
      document.body.scrollTop = document.documentElement.scrollTop = 300;
    },
    searchs(e) {
      let id = e.target.id;
      let keywords = this.searchipt.replace(/<\/?[^>]*>/g, "");
      if (id == "1" || id == "3") {
        this.$router.push({
          path: "/appreciation",
          query: { keywords: keywords }
        });
        document.body.scrollTop = document.documentElement.scrollTop = 300;
      } else {
        this.$router.push({ path: "/cases", query: { keywords: keywords } });
        document.body.scrollTop = document.documentElement.scrollTop = 300;
      }
      // console.log(id);
    },
    requst() {
      this.$axios.post("/index/api/getProductClass").then(res => {
        this.getProductClass = res.data.data;
        // 获取案例分类名字
        this.caseli = this.getProductClass[0].child;
        // console.log(this.getProductClass);
        // 默认请求第一个分类的数据
        this.requstcase(this.getProductClass[0].child[0].class_id, 1, 8);
      });
    },
    // 请求案例
    requstcase(id, page, limit) {
      this.$axios
        .post("/index/api/getCasedList", { id: id, page: page, limit: limit })
        .then(cases => {
          this.caseslide = cases.data.data.data;
          // console.log(cases, "casesa");
        });
    },
    // 请求团队
    requstteam(id) {
      this.$axios
        .post("/index/api/getBaseList", {
          limit: 4
        })
        .then(team => {
          this.teamli = team.data.data.data;
          // console.log(team, "team");
        });
    },
    // 请求合作伙伴
    requstcooper(id) {
      this.$axios
        .post("/index/api/getHonorList", {
          limit: 14
        })
        .then(team => {
          this.cooperli = team.data.data.data;
          // console.log(team, "cooperli");
        });
    },
    // 切换案例
    changecaseindex(index, item) {
      // 清楚定时器
      clearInterval(this.timer);
      // 请求数据
      this.requstcase(item.class_id, 1, 8);
      // 开始移动
      this.timer = setInterval(this.starmove, 10);
      this.caseindex = index;
    },
    // 案例的轮播
    move() {
      this.timer = setInterval(this.starmove, 10);
      this.timers = setInterval(this.starmoves, 10);
    },
    //案例开始移动
    starmove() {
      this.calleft--;
      //  总数-4乘宽度
      if (this.calleft < -2015) {
        this.calleft = 0;
      }
    },
    //团队开始移动
    starmoves() {
      this.callefts--;
      //  (总数-显示个数)乘宽度
      if (this.callefts < -1835) {
        this.callefts = 0;
      }
    },
    //鼠标悬停时停止移动
    stopmove() {
      clearInterval(this.timer);
      clearInterval(this.timers);
    },
    tocasedetail(index, item) {
      this.$router.push({ path: "/detail", query: { id: item.article_id } });
    },
    // 查看更多跳转
    tocase() {
      this.$router.push({ path: "/cases" });
      document.body.scrollTop = document.documentElement.scrollTop = 300;
    },
    toabout() {
      this.$router.push({ path: "/about" });
      document.body.scrollTop = document.documentElement.scrollTop = 300;
    },
    toteam() {
      this.$router.push({ path: "/about", query: { curindex: 1 } });
      document.body.scrollTop = document.documentElement.scrollTop = 300;
    },
    tocooper() {
      this.$router.push({ path: "/about", query: { curindex: 2 } });
      document.body.scrollTop = document.documentElement.scrollTop = 300;
    }
  },
  components: { carousel }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  min-width: 1200px;
  .carouselbox {
    position: relative;
    .warpper {
      position: absolute;
      top: 270px;
      left: 20%;
      z-index: 10;
      color: white;
      .slide {
        position: relative;
        top: 25px;
        left: -30px;
      }
      h1 {
        font-size: 80px;
      }
      h2 {
        font-size: 53px;
        font-weight: 400;
      }
      .text {
        padding-top: 24px;
      }
    }
    .search {
      position: absolute;
      top: 850px;
      right: 20%;
      input {
        width: 382px;
        height: 40px;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.85);
        border-radius: 20px;
        padding: 0px 48px 0 18px;
      }
      img {
        cursor: pointer;
        position: relative;
        right: 45px;
      }
      .searchli {
        cursor: pointer;
        position: relative;
        top: 2px;
        left: 16px;
        width: 350px;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.85);
        font-size: 16px;
        line-height: 40px;
        padding: 0px 10px;
        color: #999999;
        span {
          color: #32952b;
        }
        p {
          &:hover {
            color: #32952b;
          }
        }
      }
    }
  }
  .common {
    box-sizing: border-box;
    padding-top: 50px;
    .topbox {
      box-sizing: border-box;
      padding-bottom: 35px;
      text-align: center;
      .icon {
        img {
          width: 50px;
        }
      }
      .pic {
        box-sizing: border-box;
        padding: 10px 0;
      }
      .title {
        font-size: 26px;
        .white {
          color: rgba(51, 51, 51, 1);
          position: relative;
          &::before {
            content: "";
            width: 40px;
            height: 1px;
            background: rgba(153, 153, 153, 1);
            position: absolute;
            top: 50%;
            left: -60px;
          }
        }
        .span {
          color: rgba(50, 149, 43, 1);
          position: relative;
          &::before {
            content: "";
            width: 40px;
            height: 1px;
            background: rgba(153, 153, 153, 1);
            position: absolute;
            top: 50%;
            right: -60px;
          }
        }
      }
      .text {
        box-sizing: border-box;
        padding-top: 22px;
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
      }
    }
    .more {
      box-sizing: border-box;
      padding: 50px 0;
      .tomore {
        cursor: pointer;
        text-align: center;
        margin: 0px auto;
        width: 160px;
        height: 40px;
        border: 1px solid rgba(50, 149, 43, 1);
        color: rgba(50, 149, 43, 1);
        font-size: 16px;
        line-height: 40px;
      }
    }
  }

  //   案例
  .casebox {
    width: 100%;
    .casenav {
      width: 1200px;
      height: 70px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      .caseli {
        margin: 0 8px;
        cursor: pointer;
        width: 279px;
        height: 65px;
        border: 1px solid rgba(194, 189, 196, 0.8);
        color: rgba(102, 102, 102, 1);
        font-size: 18px;
        line-height: 65px;
        text-align: center;
        &:hover {
          transition: color 0.5s ease;
          width: 275px;
          height: 60px;
          line-height: 60px;
          border: 3px solid rgba(50, 149, 43, 1);
          color: rgba(50, 149, 43, 1);
          font-weight: bold;
        }
      }
      .casecur {
        width: 275px;
        height: 60px;
        line-height: 60px;
        border: 3px solid rgba(50, 149, 43, 1);
        color: rgba(50, 149, 43, 1);
        font-weight: bold;
      }
    }
    .caseinfo {
      box-sizing: border-box;
      padding-top: 40px;
      margin: 0px auto;
      position: relative;
      width: 1200px;
      height: 375px;
      overflow: hidden;
      .warpper {
        position: absolute;
        left: 0px;
        width: 3224px;
        height: 320px;
        margin: 0px auto;
        li {
          cursor: pointer;
          box-sizing: border-box;
          display: inline-block;
          margin: 0px 5px;
          width: 393px;
          height: 320px;
          .mainpicbox {
            width: 100%;
            height: 233px;
            overflow: hidden;
            .mainpic {
              width: 100%;
              height: 100%;
              transition: all 0.5s ease;
            }
          }
          .infos {
            margin-top: 10px;
            width: 394px;
            height: 74px;
            background: RGBA(248, 246, 247, 1);
            .name {
              width: 196px;
              text-align: center;
              box-sizing: border-box;
              padding: 10px 0;
              border-top: 1px solid rgba(153, 153, 153, 1);
              border-bottom: 1px solid rgba(153, 153, 153, 1);
              color: rgba(102, 102, 102, 1);
              font-size: 18px;
              font-weight: bold;
              position: relative;
              left: 95px;
              top: 14px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .green {
              display: block;
            }
            .white {
              display: none;
            }
          }
          &:hover {
            .mainpic {
              transform: scale(1.1);
            }
            .infos {
              transition: all 0.5s ease;
              background: rgba(50, 149, 43, 1);
              .name {
                border-top: 1px solid rgba(255, 255, 255, 1);
                border-bottom: 1px solid rgba(255, 255, 255, 1);
                color: rgba(255, 255, 255, 1);
              }
              .green {
                display: none;
              }
              .white {
                display: block;
              }
            }
          }
        }
      }
    }
  }
  //   服务流程
  .servbox {
    width: 100%;
    background: rgba(226, 237, 204, 1);
    .servcont {
      width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 40px 0;
      position: relative;
      .title {
        font-size: 26px;
        color: rgba(50, 149, 43, 1);
      }
      .servlist {
        width: 1150px;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 58px 0 40px 0;
        position: relative;
        .servli {
          position: relative;
          text-align: center;
          .bg {
            .num {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: 15px;
              color: rgba(255, 255, 255, 1);
              font-size: 30px;
            }
          }
          .info {
            .bold {
              box-sizing: border-box;
              padding: 17px 0 14px 0;
              font-size: 18px;
              font-weight: bold;
            }
            .des {
              width: 80%;
              margin: 0 auto;
              font-size: 16px;
              color: rgba(102, 102, 102, 1);
            }
          }
        }
      }
      .border {
        position: absolute;
        top: 210px;
        left: 0;
        width: 100%;
        .box {
          display: inline-block;
          width: 1110px;
          height: 1px;
          background: rgba(50, 149, 43, 1);
        }
        img {
          position: relative;
          top: 4px;
        }
        span {
          position: relative;
          top: 5px;
          font-weight: bold;
          color: rgba(50, 149, 43, 1);
          font-size: 18px;
        }
      }
      .telbox {
        text-align: center;
        .telbox-left {
          display: inline-block;
          width: 351px;
          height: 45px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 3px 13px 0px rgba(227, 227, 227, 0.82);
          border-radius: 10px;
          color: rgba(102, 102, 102, 1);
          line-height: 45px;
          position: relative;
          right: 5px;
          .sel {
            font-size: 20px;
            position: relative;
            top: -1px;
          }
          .sx {
            font-size: 20px;
            position: relative;
            top: -2px;
          }
          img {
            position: relative;
            top: -3px;
          }
          .tel {
            font-size: 26px;
            font-weight: bold;
          }
        }
        .tozx {
          cursor: pointer;
          display: inline-block;
          width: 147px;
          height: 45px;
          background: rgba(50, 149, 43, 1);
          box-shadow: 0px 3px 13px 0px rgba(227, 227, 227, 0.82);
          border-radius: 10px;
          font-size: 16px;
          color: white;
          font-weight: 300;
          line-height: 45px;
          position: relative;
          top: -2px;
        }
      }
    }
  }
  // 选择理由
  .reasonbox {
    background: RGBA(251, 248, 251, 1);
    height: 894px;
    .reason {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .rlli {
        // background: pink;
        box-sizing: border-box;
        padding-bottom: 60px;
        .dot {
          display: inline-block;
          width: 14px;
          height: 14px;
          background: rgba(50, 149, 43, 1);
          border-radius: 50%;
        }
        .name {
          box-sizing: border-box;
          padding-left: 5px;
          display: inline-block;
          color: rgba(50, 149, 43, 1);
          font-size: 20px;
          font-weight: bold;
        }
        .des {
          box-sizing: border-box;
          padding: 20px 0 0 20px;
          width: 310px;
          color: rgba(102, 102, 102, 1);
          font-size: 16px;
          line-height: 30px;
        }
      }
      .reason-left {
        box-sizing: border-box;
        padding-top: 40px;
      }
      .pic {
        position: absolute;
        top: 0;
        left: 26%;
      }
      .reason-right {
        position: absolute;
        top: 40px;
        right: 60px;
        .rlli {
          padding-bottom: 50px;
        }
        .rlli:last-child {
          .dot {
            position: relative;
            &::after {
              content: "";
              width: 113px;
              height: 1px;
              background: rgba(50, 149, 43, 1);
              position: absolute;
              top: 6px;
              left: 20px;
            }
          }
          .name {
            box-sizing: border-box;
            position: relative;
            left: 120px;
          }
          .des {
            width: 200px;
            position: relative;
            left: 126px;
          }
        }
      }
      .more {
        position: absolute;
        bottom: -40px;
        left: 40%;
      }
    }
  }
  // 团队
  .teambox {
    background: white;
    .teamlist {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .teamli {
        cursor: pointer;
        width: 277px;
        height: 370px;
        position: relative;
        overflow: hidden;
        .mainpic {
          transition: all 0.5s ease;
          width: 100%;
          height: 100%;
        }
        .small {
          position: absolute;
          right: 0;
          bottom: 0;
        }
        .hover {
          position: absolute;
          right: 0;
          bottom: 0;
          opacity: 0;
          .name {
            color: white;
            font-size: 18px;
            font-weight: bold;
            position: absolute;
            bottom: 70px;
            right: 25px;
          }
          .title {
            color: rgba(177, 245, 172, 1);
            font-size: 16px;
            position: absolute;
            bottom: 32px;
            right: 25px;
          }
        }
        &:hover {
          .mainpic {
            transform: scale(1.1);
          }
          .small {
            display: none;
          }
          .hover {
            transition: all 0.5s ease;
            opacity: 1;
          }
        }
      }
    }
  }
  // 合作
  .cooperation {
    background: RGBA(251, 248, 249, 1);
    box-sizing: border-box;
    padding-bottom: 90px;
    .copperbox {
      padding-top: 40px;
      margin: 0px auto;
      position: relative;
      width: 1200px;
      height: 120px;
      overflow: hidden;
      .warpper {
        position: absolute;
        left: 0px;
        width: 3052px;
        height: 106px;
        margin: 0px auto;
        li {
          cursor: pointer;
          box-sizing: border-box;
          display: inline-block;
          margin: 0px 10px;
          width: 198px;
          height: 106px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(229, 229, 229, 1);
          box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.1);
          .mainpicbox {
            width: 100%;
            height: 106px;
            margin: 0px auto;
            box-sizing: border-box;
            padding: 10px 10px;
            overflow: hidden;
            .mainpic {
              transition: all 0.5s ease;
              width: 100%;
              height: 100%;
            }
          }
          &:hover {
            .mainpic {
              transition: all 0.5s ease;
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
}
</style>