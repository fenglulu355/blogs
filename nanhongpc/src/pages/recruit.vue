<template>
  <div class="detail">
    <!-- 根据路由传参判断显示校园还是社会招聘 -->
    <p class="title" v-if="isrecruit">校园招聘</p>
    <p class="title" v-if="iscase">工装项目</p>
    <p class="title" v-if="isserv">安装流程</p>
    <p class="title" v-if="isnews">公司新闻</p>
    <div class="cont">
      <!-- recruit -->
      <div class="recruit" v-if="isrecruit">
        <p class="zwname">{{zpinfo.title}}</p>
        <p class="time">更新时间：{{zpinfo.created_time}}</p>
        <div class="caseinfo" id="deinfos" v-html="zpinfo.content"></div>
      </div>
      <div class="case" v-if="iscase">
        <p class="name">{{caseinfo.title}}</p>
        <div class="caseinfo" id="deinfos" v-html="caseinfo.content"></div>
      </div>
      <div class="serv" v-if="isserv">
        <p class="name">{{servinfo.title}}</p>
        <div class="content" id="deinfos" v-html="servinfo.content"></div>
      </div>
      <div class="case" v-if="isnews">
        <p class="name">{{newsinfo.title }}</p>
        <p class="time">更新时间：{{newsinfo.created_time}}</p>
        <div class="caseinfo" id="deinfos" v-html="newsinfo.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
      iscase: false,
      isrecruit: false,
      isserv: false,
      isnews: false,
      newsinfo: [],
      caseinfo: [],
      servinfo: [],
      zpinfo: []
    };
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    let kind = this.$route.query.kind,
      id = this.$route.query.id;
    if (kind == "case") {
      this.requstcase(id);
      this.iscase = true;
    } else if (kind == "serv") {
      this.requstserv(id);
      this.isserv = true;
    } else if (kind == "recruit") {
      this.requstzp(id);
      this.isrecruit = true;
    } else if (kind == "news") {
      this.requstnews(id);
      this.isnews = true;
    }
    console.log(kind);
  },
  updated() {
    let a = document.getElementById("deinfos");
    let imgs = a.getElementsByTagName("img");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].style.width = "100%";
      imgs[i].style.height = "100%";
    }
  },
  methods: {
    requstnews(id) {
      this.$axios.post("/index/api/newsDetail", { id: id }).then(res => {
        this.newsinfo = res.data.data;
        console.log(this.newsinfo, "this.newsinfo");
      });
    },
    requstcase(id) {
      this.$axios.post("/index/api/cgalDetail", { id: id }).then(res => {
        this.caseinfo = res.data.data;
        console.log(this.caseinfo, "this.newsinfo");
      });
    },
    requstserv(id) {
      this.$axios.post("/index/api/azlcDetail", { id: id }).then(res => {
        this.servinfo = res.data.data;
        console.log(this.servinfo, "this.servinfo");
      });
    },
    requstzp(id) {
      this.$axios.post("/index/api/jobDetail", { id: id }).then(res => {
        this.zpinfo = res.data.data;
        console.log(this.zpinfo, "this.servinfo");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  box-sizing: border-box;
  padding: 60px 0 90px 0;
  border-top: 1px solid rgba(236, 236, 236, 1);
  // border-bottom: 1px solid rgba(236, 236, 236, 1);
  color: rgba(51, 51, 51, 1);
  .title {
    width: 1200px;
    margin: 0 auto;
    height: 40px;
    background: rgba(236, 236, 236, 1);
    border: 1px solid rgba(236, 236, 236, 1);
    border-radius: 10px;
    font-size: 18px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 20px;
  }
  .cont {
    width: 1200px;
    margin: 0 auto;
    height: 1017px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 45px 30px;
    // zp
    .recruit {
      .zwname {
        font-size: 29px;
        font-weight: bold;
      }
      .time {
        font-size: 12px;
        line-height: 50px;
        color: rgba(204, 204, 204, 1);
        box-sizing: border-box;
        padding-bottom: 20px;
      }
      .mainpic {
        width: 560px;
        height: 220px;
        border-radius: 10px;
      }
      .num {
        box-sizing: border-box;
        padding-top: 50px;
      }
      .text {
        font-size: 16px;
        line-height: 35px;
        color: rgba(102, 102, 102, 1);
      }
      .intro,
      .zg {
        // css保留空格和换行符
        white-space: pre-line;
      }
    }
    // case
    .case {
      width: 100%;
      .name {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding-bottom: 32px;
      }
      .mainpic {
        width: 100%;
        height: 635px;
      }
      .caseinfo {
        box-sizing: border-box;
        padding-top: 32px;
        .text {
          font-size: 16px;
          color: rgba(204, 204, 204, 1);
          line-height: 30px;
          span {
            color: rgba(51, 51, 51, 1);
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>