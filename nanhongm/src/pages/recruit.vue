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
        <p class="zwname">国际贸易专员</p>
        <p class="time">更新时间：2019-02-26</p>
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' +require('../assets/about/7-1.png') + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <p class="num text">招聘人数：3人</p>
        <p class="department text">招聘部门：营销部</p>
        <p class="address text">工作地点：泸州市</p>
        <p class="pubtime text">发布时间：2019-07-01</p>
        <p class="intro text">工作职责：</p>
        <p class="intro text">
          1、本科及以上学历，国际贸易类、经济类等相关专业毕业；
          2、男性，有英语读写能力、有工作经验者优先。
        </p>
        <p class="zg text">任职资格：</p>
        <p class="zg text">1、收付汇管理、国际贸易合同签订、信用证的开立、协调报关运输、基本业务谈判。 简历投递至：20008345@</p>
      </div>
      <div class="case" v-if="iscase">
        <p class="name">项目名称</p>
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' +require('../assets/case/case2.png') + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <div class="caseinfo">
          <p class="time text">
            <span>【工程日期】</span>
            <!-- {{item.time}} -->
            8年
          </p>
          <p class="area text">
            <span>【项目面积】</span>56775
            <!-- {{item.area}} -->
          </p>
          <p class="type text">
            <span>【使用机型】</span>567567
            <!-- {{item.type}} -->
          </p>
          <p class="inro text">
            <span>【项目简介】</span>678867
            <!-- {{item.type}} -->
          </p>
        </div>
      </div>
      <div class="serv" v-if="isserv">
        <p class="name">{{servinfo.title}}</p>
        <div class="content" v-html="servinfo.content"></div>
      </div>
      <div class="case" v-if="isnews">
        <p class="name">{{newsinfo.title }}</p>
        <p class="time">更新时间：{{newsinfo.created_time}}</p>
        <div class="caseinfo" v-html="newsinfo.content"></div>
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
  padding: 60px 25px;
  border-top: 1px solid rgba(236, 236, 236, 1);
  border-bottom: 1px solid rgba(236, 236, 236, 1);
  color: rgba(51, 51, 51, 1);
  .title {
    height: 60px;
    background: rgba(236, 236, 236, 1);
    border: 1px solid rgba(236, 236, 236, 1);
    border-radius: 10px;
    font-size: 30px;
    line-height: 60px;
    box-sizing: border-box;
    padding-left: 20px;
  }
  .cont {
    background: rgba(255, 255, 255, 1);
    // border: 1px solid rgba(204, 204, 204, 1);
    // border-radius: 10px;
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
        font-size: 20px;
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
        font-size: 30px;
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