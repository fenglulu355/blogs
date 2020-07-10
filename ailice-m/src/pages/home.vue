<template>
  <div class="home">
    <!-- 案例展示 -->
    <div class="casebox">
      <tabbar :tabbar="caseinfo"></tabbar>
      <navbar :navbar="casenav" @changenav="casechangenav"></navbar>
      <div class="caseinfo">
        <v-touch @swipeleft="swipeleft">
          <ul class="warpper" :style="{'left':calleft + 'px'}" @click="stopmove()">
            <li class="pic" v-for="(item, index) in caseslide" :key="index" @click="todetail(item, index)">
              <div class="pics">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url('  +baseurl+`/public/`+ item.image_url+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
                ></div>
                <div class="infos">
                  <p class="name">{{item.article_title}}</p>
                </div>
              </div>
            </li>
          </ul>
        </v-touch>
      </div>
      <div class="more">
        <p class="tomore" @click="tocase">查看更多 +</p>
      </div>
    </div>
    <!-- 服务流程 -->
    <div class="servbox">
      <p class="title">
        服务流程
        <img src="../assets/home/serv-eng.png" alt />
      </p>
      <ul class="serv-list">
        <li class="serv-li" v-for="(item, index) in servli" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + require('../assets/home/serv-bg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          >
            <span>{{index}}</span>
          </div>
          <div class="text">
            <h1>{{item.one}}</h1>
            <p>{{item.two}}</p>
          </div>
        </li>
      </ul>
      <div class="over">
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' + require('../assets/home/serv-bot.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <span>项目完成</span>
      </div>
    </div>
    <!-- 理由 -->
    <div class="reasonbox">
      <tabbar :tabbar="reasoninfo"></tabbar>
      <ul class="reasonlist">
        <li class="reasonli" v-for="(item, index) in reasonlia" :key="index">
          <div class="title">
            <p class="dot"></p>
            <p class="text">{{item.one}}</p>
          </div>
          <div class="des">{{item.two}}</div>
        </li>
      </ul>
      <div
        class="mainpic"
        :style="{backgroundImage: 'url(' + require('../assets/home/reasonbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
      <ul class="reasonlist two">
        <li class="reasonli" v-for="(item, index) in reasonlib" :key="index">
          <div class="title">
            <p class="dot"></p>
            <p class="text">{{item.one}}</p>
          </div>
          <div class="des">{{item.two}}</div>
        </li>
      </ul>
      <div class="more">
        <p class="tomore" @click="toabout">查看更多 +</p>
      </div>
    </div>
    <!-- team -->
    <div class="teambox">
      <tabbar :tabbar="teaminfo"></tabbar>
      <ul class="teamlist">
        <li class="teamli" v-for="(item, index) in teamli" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url('  +baseurl+`/public/`+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div class="info">
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

    <div class="coopertion">
      <tabbar :tabbar="cooperinfo"></tabbar>
      <div class="copperbox">
        <v-touch @swipeleft="swipeleft">
          <ul class="warpper" :style="{'left':callefts + 'px'}" @click="stopmove()">
            <li class="pic" v-for="(item, index) in cooperli" :key="index">
              <div class="pics">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url('  +baseurl+`/public/`+ item.image_url+  ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
                ></div>
              </div>
            </li>
          </ul>
        </v-touch>
      </div>
      <div class="more">
        <p class="tomore" @click="tocooper">查看更多 +</p>
      </div>
    </div>
  </div>
</template>


<script>
import httpUrl from "../api/url";
import tabbar from "../components/tabbar";
import navbar from "../components/navbar";
export default {
  name: "home",
  data() {
    return {
      getProductClass: [],
      baseurl: "",
      caseinfo: {
        normal: "案例",
        green: "展示",
        img: require("../assets/home/cases.png")
      },
      reasoninfo: {
        normal: "选择爱丽丝景观",
        green: "五大理由",
        img: require("../assets/home/reason.png")
      },
      teaminfo: {
        normal: "设计施工",
        green: "团队",
        img: require("../assets/home/team.png")
      },
      cooperinfo: {
        normal: "合作",
        green: "伙伴",
        img: require("../assets/home/cooper.png")
      },
      casenav: [],
      curnav: [], //被选中的分类
      caseslide: [],
      calleft: 0,
      servli: [
        { one: "下单咨询", two: "我们通过沟通了解您的基本需求" },
        { one: "测量设计", two: "现场沟通，进行拍照，摄像，进行实地尺寸测量" },
        { one: "确定预算", two: "设计师进行方案细化，包括效果图及景观设计" },
        { one: "签订合同", two: "客户审定工程预算，双方签订施工合同" },
        { one: "售后服务", two: "完善的售后服务全面解决您的后顾之忧" }
      ],
      reasonlia: [
        {
          one: "众多合作  值得信赖",
          two:
            "我们有众多的合作客户，服务客户上百家，经验丰富，设计新颖，选材齐全。"
        },
        {
          one: "专业团队 私人订制",
          two:
            "拥有专业从事园林景观设计的技术人才，高级工程师为您专业定制，合理规划设计，全面考虑提供适合您需求的工程设计方案。"
        },
        {
          one: "施工经验丰富  高效快捷",
          two: "多年的园林景观设计施工经验让我们在施工方面有了丰富的施工经验。"
        }
      ],
      reasonlib: [
        {
          one: "物美价廉  高品质产品",
          two:
            "优质的原产地材料、完善的团队管理、内部完整的产业闭环，极大限度地控制了成本，为客户创造高性价比，高质量的作品。"
        },
        {
          one: "完善的服务  品质保障",
          two:
            "爱丽丝拥有一套完善的应对预案，对客户日常所遇到的、担心的问题精确迅速解决，真正为客户解决实际问题，24小时响应机制。"
        }
      ],
      teamli: [],
      cooperli: [],
      callefts: 0
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
    requst() {
      this.$axios.post("/index/api/getProductClass").then(res => {
        this.getProductClass = res.data.data;
        // 获取案例分类名字
        this.casenav = this.getProductClass[0].child;
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
          limit: 2
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
          limit: 8
        })
        .then(team => {
          this.cooperli = team.data.data.data;
          // console.log(team, "cooperli");
        });
    },
    // 案例切换
    casechangenav(item, index) {
      // console.log(item, index);
      this.stopmove();
      // 请求数据
      this.requstcase(item.class_id, 1, 8);
      // 开始移动
      this.move();
    },
    // 案例的轮播
    move() {
      this.timer = setInterval(this.starmove, 20);
      this.timers = setInterval(this.starmoves, 10);
    },
    //案例开始移动
    starmove() {
      this.calleft--;
      //  宽度*偏移个数
      if (this.calleft < -795) {
        this.calleft = 0;
      }
    },
    starmoves() {
      this.callefts--;
      //  (总数-显示个数)乘宽度
      if (this.callefts < -1200) {
        this.callefts = 0;
      }
    },
    swipeleft() {
      this.stopmove();
      this.move();
    },
    //鼠标悬停时停止移动
    stopmove() {
      clearInterval(this.timer);
      clearInterval(this.timers);
    },
    todetail(item, index) {
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
  components: { tabbar, navbar }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  .more {
    width: 242px;
    height: 60px;
    border: 1px solid rgba(50, 149, 43, 1);
    color: rgba(50, 149, 43, 1);
    font-size: 24px;
    text-align: center;
    line-height: 60px;
    margin: 20px auto;
  }
  .casebox {
    width: 100%;
    box-sizing: border-box;
    padding: 0 25px;
    .caseinfo {
      width: 100%;
      height: 310px;
      margin: 40px auto;
      position: relative;
      overflow: hidden;
      .warpper {
        position: absolute;
        left: 0px;
        width: 2123px;
        height: 310px;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        li {
          box-sizing: border-box;
          margin: 0px 5px;
          width: 255px;
          height: 310px;
          .mainpic {
            width: 100%;
            height: 220px;
          }
          .infos {
            margin-top: 10px;
            width: 255px;
            height: 70px;
            background: RGBA(248, 246, 247, 1);
            text-align: center;
            .name {
              line-height: 70px;
              font-size: 30px;
              width: 100%;
              height: 70px;
            }
          }
          &:active .infos {
            background: rgba(50, 149, 43, 1);
            .name {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
  }
  .servbox {
    background: RGBA(242, 248, 240, 1);
    box-sizing: border-box;
    padding: 65px 25px 40px 25px;
    position: relative;
    &::after {
      content: "";
      width: 1px;
      height: 90%;
      background: rgba(50, 149, 43, 1);
      position: absolute;
      top: 75px;
      left: 24.5%;
    }
    .title {
      color: rgba(50, 149, 43, 1);
      font-size: 36px;
      img {
        width: 176px;
        height: 30px;
        position: relative;
        left: 20px;
      }
    }
    .serv-list {
      box-sizing: border-box;
      padding-top: 70px;
      .serv-li {
        display: flex;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-left: 60px;
        margin-bottom: 30px;
        .mainpic {
          width: 134px;
          height: 81px;
          font-size: 30px;
          color: white;
          span {
            position: relative;
            left: 28px;
            top: 18px;
          }
        }
        .text {
          width: 70%;
          box-sizing: border-box;
          padding-left: 20px;
          position: relative;
          top: 10px;
          h1 {
            font-size: 34px;
            color: rgba(51, 51, 51, 1);
          }
          p {
            color: rgba(102, 102, 102, 1);
            font-size: 30px;
          }
        }
      }
    }
    .over {
      position: relative;
      .mainpic {
        width: 25px;
        height: 15px;
        position: absolute;
        top: 70px;
        left: 22.5%;
        transform: translateX(-50%);
      }
      span {
        display: inline-block;
        padding-top: 30px;
        font-size: 34px;
        color: rgba(50, 149, 43, 1);
        padding-left: 210px;
      }
    }
  }
  .reasonbox {
    background: RGBA(251, 248, 249, 1);
    width: 100%;
    box-sizing: border-box;
    padding: 25px 25px;
    .reasonlist {
      width: 100%;
      .reasonli {
        margin-top: 38px;
        .title {
          display: flex;
          justify-content: flex-start;
          .dot {
            width: 24px;
            height: 24px;
            background: rgba(50, 149, 43, 1);
            border-radius: 50%;
          }
          .text {
            color: rgba(50, 149, 43, 1);
            font-size: 34px;
            font-weight: bold;
            position: relative;
            left: 15px;
            bottom: 10px;
          }
        }
        .des {
          width: 100%;
          color: rgba(102, 102, 102, 1);
          font-size: 30px;
          box-sizing: border-box;
          padding: 10px 0px 10px 40px;
        }
      }
    }
    .two {
      position: relative;
      bottom: 60px;
    }
    .mainpic {
      width: 100%;
      height: 640px;
    }
  }
  .teambox {
    width: 100%;
    box-sizing: border-box;
    padding: 25px 25px;
    .teamlist {
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding-bottom: 40px;
      .teamli {
        width: 48%;
        .mainpic {
          width: 100%;
          height: 450px;
        }
        .info {
          margin-top: 25px;
          width: 100%;
          height: 90px;
          background: rgba(247, 247, 247, 1);
          text-align: center;
          .name {
            color: rgba(51, 51, 51, 1);
            font-size: 30px;
            padding-top: 5px;
          }
          .title {
            color: rgba(153, 153, 153, 1);
            font-size: 20px;
          }
        }
      }
    }
  }
  .coopertion {
    background: RGBA(251, 248, 249, 1);
    box-sizing: border-box;
    padding: 0 25px 30px 25px;
    .copperbox {
      padding: 20px 0;
      margin: 0px auto;
      position: relative;
      width: 100%;
      height: 209px;
      overflow: hidden;
      .warpper {
        position: absolute;
        left: 0px;
        width: 2960px;
        height: 209px;
        margin: 0px auto;
        li {
          cursor: pointer;
          box-sizing: border-box;
          display: inline-block;
          margin: 0px 10px;
          width: 350px;
          height: 209px;
          .pics {
            width: 100%;
            height: 100%;
            .mainpic {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>