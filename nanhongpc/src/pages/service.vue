<template>
  <div class="service">
    <!-- <banner></banner> -->
    <div class="servisebox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <!-- show -->
      <div class="repair serv" v-show="curindex===null">
        <div class="repic">
          <div class="telinfo">
            <p class="text">销售、售后及配送集于一体的综合企业</p>
            <h1>全心全意为顾客服务</h1>
            <p class="tel">服务热线：{{shtel}}</p>
            <a href="javascrpt:;" class="totel">立即咨询</a>
          </div>
          <img src="../assets/ser/show.png" alt />
        </div>
        <div class="reinfo">
          <p>售后服务</p>
          <section v-html="shfw"></section>
        </div>
      </div>
      <!-- 团队 -->
      <div class="team serv" v-show="curindex===0">
        <ul class="teamshow">
          <li
            class="ts-left"
            :style="{backgroundImage: 'url(' + require('../assets/ser/onebg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></li>
          <li
            class="ts-right"
            :style="{backgroundImage: 'url(' + require('../assets/ser/onebgs.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          >
            <div class="top">
              <p>以人为本</p>
              <p>以技为魂</p>
              <p>以管理为纽带</p>
            </div>
            <p class="deshed">------------------------------------</p>
            <div class="bottom">
              <p class="deshed">------</p>
              <p>认真对待每一个用户，带领全体员工共同努</p>
              <p>力，创造南宏更美好的明天。</p>
            </div>
          </li>
        </ul>
        <ul class="teaminfo">
          <li class="teaminfoli" v-for="(item, index) in teaminfo" :key="index">
            <div
              class="pics"
              :style="{backgroundImage: 'url('+httpUrl + item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="name">
              <span>{{item.name}}</span>
              <span>{{item.title}}</span>
            </p>
          </li>
        </ul>
        <!-- 分页 -->
        <mo-pagination
          :page-index="currentPage"
          :total="count"
          :page-size="pageSize"
          @change="pageChange"
        ></mo-pagination>
      </div>
      <!-- 服务 -->
      <div class="process serv" v-show="curindex===1">
        <div class="protop">
          <p>一站式专业服务流程</p>
          <div class="propic">
            <img src="../assets/ser/lc.png" alt />
          </div>
        </div>
        <div class="profw">
          <p>专业的安装服务</p>
          <p>南宏机电公司专业安装团队秉承“精品工程，专业耕耘”的服务原则，制定出一套完整的施工规则，严格安装国家相关规定的施工准则安装作业，交付使用，方能达到你想要的满意程度。</p>
          <div class="propic">
            <img src="../assets/ser/fw.png" alt />
          </div>
        </div>
      </div>
      <!-- 安装 -->
      <div class="install serv" v-show="curindex===2">
        <ul class="ins-list">
          <li class="ins-li" v-for="(item, index) in insli" :key="index" @click="toservde(item)">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +httpUrl+item.image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div class="ins-info">
              <p class="title">{{item.title}}</p>
              <p class="time">{{item.created_time}}</p>
              <p class="intro">
                <span>简介：{{item.intro}}</span>
                <span>小区：{{item.xq}}</span>
                <span>房间类型：{{item.home}}</span>
              </p>
              <p class="area">面积：{{item.area}}</p>
              <p class="more">查看详情+</p>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <mo-pagination
          :page-index="currentPages"
          :total="counts"
          :page-size="pageSizes"
          @change="pageChanges"
        ></mo-pagination>
      </div>
      <!-- 售后 -->
      <div class="repair serv" v-show="curindex===3">
        <div class="repic">
          <div class="telinfo">
            <p class="text">销售、售后及配送集于一体的综合企业</p>
            <h1>全心全意为顾客服务</h1>
            <p class="tel">服务热线：{{shtel}}</p>
            <a href="javascrpt:;" class="totel">立即咨询</a>
          </div>
          <img src="../assets/ser/SH.png" alt />
        </div>
        <div class="reinfo">
          <p>工程售后维保</p>
          <section v-html="shcontent"></section>
        </div>
      </div>
      <!-- 条款 -->
      <div class="clause serv" v-show="curindex===4">
        <p class="title">服务条款</p>
        <div class="clauseinfo">
          <section v-html="fwtk"></section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import tabBar from "../components/tabBar";
import moPagination from "../components/pagenation";
export default {
  name: "servise",
  data() {
    return {
      // 分页
      pageSize: 4, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      pageSizes: 3, // 每页显示20条数据
      currentPages: 1, // 当前页码
      counts: 1, // 总记录数,
      curindex: null,
      tabtitle: {
        a: "服务与",
        b: "支持"
      },
      tabnav: [
        { class_name: "团队展示" },
        { class_name: "服务流程" },
        { class_name: "安装流程" },
        { class_name: "工程售后维保" },
        { class_name: "服务条款" }
      ],
      teaminfo: [],
      insli: [],
      infos: [],
      shtel: "",
      shcontent: "",
      fwtk: "",
      shfw: ""
    };
  },
  created() {
    this.requst();
    this.requsttd(1, 4);
    this.requstazlc(1, 3);
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = null;
    } else {
      idx == 3 ? (this.curindex = 4) : (this.curindex = Number(idx));
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 300;
  },
  methods: {
    // 请求服务数据
    requst() {
      this.$axios.post("/index/api/fwzcList").then(res => {
        this.infos = res.data.data;
        this.shtel = res.data.data.shwb.tel;
        this.shfw = res.data.data.fwzc.content;
        this.shcontent = res.data.data.shwb.content;
        this.fwtk = res.data.data.fwtk.content;
        // console.log(res.data.data, "rrr");
      });
    },
    // 请求团队数据
    requsttd(page, limit) {
      this.$axios
        .post("/index/api/tdzsList", { page: page, limit: limit })
        .then(res => {
          this.teaminfo = res.data.data.data;
          this.count = res.data.data.total;
        });
    },
    // 请求安装流程数据
    requstazlc(page, limit) {
      this.$axios
        .post("/index/api/azlcList", { page: page, limit: limit })
        .then(res => {
          this.insli = res.data.data.data;
          this.counts = res.data.data.total;
        });
    },
    // 分页
    getList(page) {
      this.requsttd(page, 4);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },
    // 安装流程分页
    getLists(page) {
      this.requstazlc(page, 3);
    },
    toservde(item) {
      console.log(item);
      let id = item.id;
      this.$router.push({
        path: "/detail",
        query: { id: item.id, kind: "serv" }
      });
    },
    pageChanges(index) {
      this.currentPages = index;
      this.getLists(index);
    },
    tonav(index) {
      //  console.log(index)
      this.curindex = index;
    }
  },

  components: { banner, tabBar, moPagination }
};
</script>

<style lang="less" scoped>
.service {
  width: 100%;
  .servisebox {
    width: 100%;
    border-top: 1px solid rgba(153, 153, 153, 0.3);
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);
    box-sizing: border-box;
    padding: 60px 0 100px 0;
    .serv {
      width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      padding-top: 53px;
    }
    .mo-paging {
      width: 100%;
      // background: pink;
      text-align: center;
      box-sizing: border-box;
      padding-top: 53px;
    }
    // 0
    .team {
      .teamshow {
        width: 100%;
        height: 465px;
        display: flex;
        .ts-left {
          width: 758px;
          height: 465px;
        }
        .ts-right {
          width: 441px;
          box-sizing: border-box;
          padding: 64px 0 0 48px;
          .top {
            font-size: 24px;
            color: rgba(62, 145, 223, 1);
            line-height: 45px;
            font-weight: bold;
          }
          .deshed {
            color: rgba(204, 204, 204, 1);
            font-size: 24px;
          }
          .bottom {
            padding-top: 20px;
            color: rgba(153, 153, 153, 1);
            line-height: 35px;
          }
        }
      }
      .teaminfo {
        // background: pink;
        box-sizing: border-box;
        padding-top: 24px;
        width: 100%;
        height: 455px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        .teaminfoli {
          width: 282px;
          height: 380px;
          .pics {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          .name {
            position: relative;
            top: 10px;
            width: 282px;
            height: 39px;
            text-align: center;
            line-height: 39px;
            background: rgba(236, 236, 236, 1);
            border-radius: 10px;
            font-size: 16px;
            color: rgba(91, 91, 91, 1);
            font-weight: 300;
            span {
              margin: 0 5px;
            }
          }
        }
      }
    }
    // 1
    .process {
      width: 100%;
      .protop {
        text-align: center;
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
      }
      .propic {
        text-align: center;
        box-sizing: border-box;
        padding-top: 37px;
      }
      .profw {
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        line-height: 35px;
        // font-weight:400;
        box-sizing: border-box;
        padding-top: 40px;
        p {
          width: 908px;
          margin: 0 auto;
        }
      }
    }
    // 2
    .install {
      width: 1200px;
      margin: 0 auto;
      // background: pink;
      .ins-list {
        width: 100%;
        .ins-li {
          width: 100%;
          height: 300px;
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          display: flex;
          justify-content: flex-start;

          .mainpic {
            margin-top: 30px;
            width: 343px;
            height: 240px;
            background: rgba(255, 255, 255, 1);
            border-radius: 10px;
          }
          .ins-info {
            cursor: pointer;
            width: calc(100% - 345px);
            box-sizing: border-box;
            padding: 60px 0 0 47px;
            .title {
              font-size: 24px;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              line-height: 45px;
              &:hover {
                color: rgba(36, 130, 200, 1);
              }
            }
            .time {
              font-size: 14px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 45px;
            }
            .intro {
              font-size: 16px;
              // font-weight: 300;
              color: rgba(51, 51, 51, 1);
              line-height: 27px;
              span {
                margin-right: 25px;
              }
            }
            .more {
              width: 133px;
              height: 31px;
              text-align: center;
              border: 1px solid rgba(153, 153, 153, 1);
              border-radius: 5px;
              font-size: 14px;
              font-weight: 300;
              color: rgba(153, 153, 153, 1);
              line-height: 31px;
              margin-top: 30px;
            }
          }
          &:hover {
            .more {
              border: 1px solid rgba(62, 145, 223, 1);
              color: rgba(62, 145, 223, 1);
            }
          }
        }
      }
    }
    // 3
    .repair {
      width: 1200px;
      margin: 0 auto;
      .repic {
        width: 100%;
        position: relative;
        .telinfo {
          // background: pink;
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
          padding: 60px 0 0 33px;
          font-weight: 400;
          .text {
            color: rgba(153, 153, 153, 1);
            line-height: 42px;
            font-weight: 400;
          }
          h1 {
            color: rgba(62, 145, 223, 1);
          }
          .tel {
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
            line-height: 42px;
          }
          a {
            margin-top: 25px;
            display: inline-block;
            width: 191px;
            height: 34px;
            background: rgba(62, 145, 223, 1);
            border: 1px solid rgba(62, 145, 223, 1);
            border-radius: 10px;
            text-align: center;
            line-height: 34px;
            color: white;
          }
        }
      }
      .reinfo {
        box-sizing: border-box;
        padding-top: 60px;
        color: rgba(51, 51, 51, 1);
        p {
          font-size: 20px;
        }
        section {
          line-height: 35px;
          font-size: 16px;
          // css保留空格和换行符
          // white-space: pre-wrap;
          // css保留换行符
          white-space: pre-line;
        }
      }
    }
    //4
    .clause {
      width: 1200px;
      margin: 0 auto;
      color: rgba(51, 51, 51, 1);
      p {
        font-size: 24px;
        text-align: center;
        box-sizing: border-box;
        padding-bottom: 20px;
      }
      .clauseinfo {
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 31px 46px 24px 24px;
        section {
          margin: 0 auto;
          // background: peachpuff;
          width: 1150px;
          height: 859px;
          overflow-y: scroll;
          font-size: 16px;
          // css保留空格和换行符
          white-space: pre-wrap;
        }
      }
    }
  }
}
</style>