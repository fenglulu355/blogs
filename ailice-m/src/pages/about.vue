<template>
  <div class="about">
    <tabbar :tabbar="aboutinfo"></tabbar>
    <navbar :navbar="aboutnav" @changenav="casechangenav"></navbar>
    <div class="intrubox" v-show="showindex==0">
      <div
        class="bg"
        :style="{backgroundImage: 'url(' + require('../assets/about/bg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      >
        <div class="text">
          <p>高端花园定制</p>
          <p>享受你的精致生活</p>
          <p>——</p>
        </div>
      </div>
      <ul class="intrulist">
        <li class="intruli" v-for="(item, index) in intruli" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + item.icon+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <p class="msg">{{item.msg}}</p>
        </li>
      </ul>
      <div class="intrutext">
        <p class="title">{{aboutinfos.title}}</p>
        <p class="text" v-html="aboutinfos.desc"></p>
      </div>
    </div>
    <div class="teambox" v-show="showindex==1">
      <ul class="teamlist">
        <li class="teamli" v-for="(item, index) in teamli" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url('  +baseurl+`/public/`+ item.image_url+  ')',
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
      <!-- 分页 -->
      <mo-pagination
        :page-index="teamcurrentPage"
        :total="teamcount"
        :page-size="teampageSize"
        @change="teampageChange"
      ></mo-pagination>
    </div>
    <div class="cooperbox" v-show="showindex==2">
      <ul class="warpper">
        <li class="pic" v-for="(item, index) in cooperli" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url('  +baseurl+`/public/`+ item.image_url+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
          ></div>
        </li>
      </ul>
      <mo-pagination
        :page-index="coopercurrentPage"
        :total="coopercount"
        :page-size="cooperpageSize"
        @change="cooperpageChange"
      ></mo-pagination>
    </div>
  </div>
</template>


<script>
import tabbar from "../components/tabbar";
import navbar from "../components/navbar";
import moPagination from "../components/pagenation";
import httpUrl from "../api/url";
export default {
  name: "about",
  data() {
    return {
      // 分页
      teampageSize: 4, // 每页显示20条数据
      teamcurrentPage: 1, // 当前页码
      teamcount: 1, // 总记录数
      coopercurrentPage: 1, // 当前页码
      coopercount: 1, // 总记录数,
      cooperpageSize: 8, // 每页显示20条数据
      showindex: 0,
      aboutinfo: {
        normal: "关于",
        green: "爱丽丝",
        img: require("../assets/about/eng.png")
      },
      aboutnav: [
        { class_name: "公司简介" },
        { class_name: "设计施工团队" },
        { class_name: "合作伙伴" }
      ],
      intruli: [
        { icon: require("../assets/about/nav1.png"), msg: "专业团队" },
        { icon: require("../assets/about/nav2.png"), msg: "私人订制" },
        { icon: require("../assets/about/nav3.png"), msg: "经验丰富" },
        { icon: require("../assets/about/nav4.png"), msg: "优质原材" },
        { icon: require("../assets/about/nav5.png"), msg: "服务保障" }
      ],
      aboutinfos: [],
      teamli: [],
      cooperli: [],
      getProductClass: [],
      curitem: []
    };
  },
  created() {
    let a = this.$route.query.curindex;
    if (a) {
      this.showindex = a;
    } else {
      this.showindex = 0;
    }
    this.baseurl = httpUrl.httpUrl;

    this.requstabout();
    this.requstteam(4, 1);
    this.requstcooper(8, 1);
  },
  methods: {
    requstabout() {
      this.$axios.post("/index/api/about").then(res => {
        this.aboutinfos = res.data.data;
        // this.cooperli = team.data.data.data;
        // console.log(this.aboutinfo, "this.aboutinfo");
      });
    },

    // 请求团队
    requstteam(limit, page) {
      this.$axios
        .post("/index/api/getBaseList", {
          limit: limit,
          page: page
        })
        .then(team => {
          this.teamli = team.data.data.data;
          this.teamcount = team.data.data.total.length;
          // console.log(team, "team");
        });
    },
    // 请求合作伙伴
    requstcooper(limit, page) {
      this.$axios
        .post("/index/api/getHonorList", {
          limit: limit,
          page: page
        })
        .then(team => {
          this.cooperli = team.data.data.data;
          this.coopercount = team.data.data.total.length;
          console.log(team, "cooperli");
        });
    },
    casechangenav(item, index) {
      this.showindex = index;
      // console.log(item);
    },
    teamgetList(page) {
      this.requstteam(4, page);
    },
    teampageChange(index) {
      this.teamcurrentPage = index;
      // console.log( this.currentPage)
      this.teamgetList(index);
    },
    coopergetList(page) {
      this.requstcooper(8, page);
    },
    cooperpageChange(index) {
      this.teamcurrentPage = index;
      // console.log( this.currentPage)
      this.coopergetList(index);
    },
   
  },
  components: { tabbar, navbar, moPagination }
};
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px;
  .intrubox {
    box-sizing: border-box;
    padding: 70px 0;
    .bg {
      width: 100%;
      height: 460px;
      position: relative;
      .text {
        color: rgba(255, 255, 255, 1);
        font-size: 30px;
        position: relative;
        left: 38px;
        top: 35%;
        padding-top: 10px;
      }
    }
    .intrulist {
      position: relative;
      bottom: 70px;
      display: flex;
      justify-content: space-between;
      .intruli {
        .mainpic {
          width: 123px;
          height: 123px;
        }
        .msg {
          font-size: 24px;
          padding-top: 26px;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .intrutext {
      .title {
        text-align: center;
        font-size: 36px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: rgba(50, 149, 43, 1);
      }
      .text {
        box-sizing: border-box;
        color: rgba(102, 102, 102, 1);
        font-size: 30px;
        line-height: 50px;
        padding-top: 30px;
      }
    }
  }
  .teambox {
    box-sizing: border-box;
    padding: 70px 0 40px 0;
    .teamlist {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      box-sizing: border-box;
      margin-bottom: 25px;
      .teamli {
        margin-bottom: 25px;
        width: 48%;
        .mainpic {
          transition: all 0.5s ease;
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
        &:active .info {
          background: rgba(50, 149, 43, 1);
          .name,
          .title {
            color: white;
          }
        }
      }
    }
  }
  .cooperbox {
    box-sizing: border-box;
    padding: 70px 0 40px 0;
    .warpper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 25px;
      li {
        box-sizing: border-box;
        border: 1px solid rgba(210, 210, 210, 1);
        width: 47%;
        height: 211px;
        padding: 38px 23px;
        margin-bottom: 25px;
        .mainpic {
          transition: all 0.5s ease;
          width: 100%;
          height: 124px;
        }
      }
    }
  }
}
</style>