<template>
  <div class="service">
    <div class="servisebox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <!-- 服务与支持 -->
      <div class="repair serv" v-show="curindex===0">
        <div class="repic">
          <div class="telinfo">
            <p class="text">销售、售后及配送集于一体的综合企业</p>
            <h1>全心全意为顾客服务</h1>
            <p class="tel">服务热线：{{shtel}}</p>
            <div class="totel">
              <img src="../assets/ser/tel.png" alt />
              <span>立即咨询</span>
            </div>
          </div>
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + require('../assets/ser/show.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </div>
        <div class="reinfo">
          <p>售后服务</p>
          <section v-html="shfw"></section>
        </div>
      </div>
      <!-- 团队 -->
      <div class="team serv" v-show="curindex===1">
        <ul
          class="teamshow"
          :style="{backgroundImage: 'url(' + require('../assets/ser/teambg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        >
          <li class="ts-left"></li>
          <li class="ts-right">
            <div class="top">
              <p>以人为本，以技为魂，以管理为纽带</p>
            </div>
            <p class="deshed">-----------------------</p>
            <div class="bottom">
              <p>认真对待每一个用户，带领全体员工共同努力，创造南宏更美好的明天。</p>
            </div>
          </li>
        </ul>
        <ul class="teaminfo">
          <li class="teaminfoli" v-for="(item, index) in teaminfo" :key="index">
            <div
              class="pics"
              :style="{backgroundImage: 'url(' +httpUrl + item.image_url+  ')',
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
        <div class="pagenation">
          <mo-pagination
            :page-index="currentPage"
            :total="count"
            :page-size="pageSize"
            @change="pageChange"
          ></mo-pagination>
        </div>
      </div>
      <!-- 服务流程 -->
      <div class="process serv" v-show="curindex===2">
        <div class="protop">
          <p class="title">一站式专业服务流程</p>
          <ul class="toplist">
            <li class="topli" v-for="(item, index) in fwlca" :key="index">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + item.img+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
              ></div>
              <p class="text">{{item.text}}</p>
            </li>
          </ul>
        </div>
        <div class="profw">
          <p class="title">专业的安装服务</p>
          <p
            class="text"
          >南宏机电公司专业安装团队秉承“精品工程，专业耕耘”的服务原则，制定出一套完整的施工规则，严格安装国家相关规定的施工准则安装作业，交付使用，方能达到你想要的满意程度。</p>
          <ul class="botlist">
            <li class="botli" v-for="(item, index) in fwlcb" :key="index">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + item+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 安装流程 -->
      <div class="install serv" v-show="curindex===3">
        <ul class="ins-list">
          <li class="ins-li" v-for="(item, index) in insli" :key="index"  @click="toservde(item)">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +httpUrl+item.image_url +  ')',
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
              </p>
              <p class="intro">房间类型：{{item.home}}</p>
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
      <div class="repair serv" v-show="curindex===4">
        <div class="repic">
          <div class="telinfo">
            <p class="text">销售、售后及配送集于一体的综合企业</p>
            <h1>全心全意为顾客服务</h1>
            <p class="tel">服务热线：{{shtel}}</p>
            <div class="totel">
              <img src="../assets/ser/tel.png" alt />
              <span>立即咨询</span>
            </div>
          </div>
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + require('../assets/ser/SH.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </div>
        <div class="reinfo">
          <p>工程售后维保</p>
          <section v-html="shcontent"></section>
        </div>
      </div>
      <!-- 条款 -->
      <div class="clause serv" v-show="curindex===5">
        <p class="title">服务条款</p>
        <!-- <p class="time">更新时间：2019-02-26 21:56:24</p> -->
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
        "服务支持",
        "团队展示",
        "服务流程",
        "安装流程",
        "工程售后维保",
        "服务条款"
      ],
      fwlca: [
        { img: require("../assets/ser/az.png"), text: "安装" },
        { img: require("../assets/ser/ts.png"), text: "调试" },
        { img: require("../assets/ser/ys.png"), text: "验收" }
      ],
      fwlcb: [
        require("../assets/ser/lc1.png"),
        require("../assets/ser/lc2.png"),
        require("../assets/ser/lc3.png")
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
      this.curindex = 0;
    } else {
      idx == 3 ? (this.curindex = 4) : (this.curindex = Number(idx));
    }
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
    padding: 60px 0 70px 0;
    .serv {
      box-sizing: border-box;
      padding: 42px 25px 0 25px;
    }
    .pagenation {
      // background: violet;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      padding-top: 50px;
    }
    //1团队
    .team {
      .teamshow {
        width: 100%;
        height: 280px;
        display: flex;
        .ts-left {
          width: 55%;
          height: 280px;
        }
        .ts-right {
          width: 45%;
          box-sizing: border-box;
          padding: 24px 10px 0 0px;
          .top {
            font-size: 30px;
            color: rgba(62, 145, 223, 1);
            line-height: 40px;
            font-weight: bold;
          }
          .deshed {
            color: rgba(204, 204, 204, 1);
            font-size: 24px;
          }
          .bottom {
            padding-top: 5px;
            color: #999999;
            font-size: 24px;
            line-height: 35px;
          }
        }
      }
      .teaminfo {
        box-sizing: border-box;
        padding-top: 24px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .teaminfoli {
          width: 49%;

          margin-bottom: 25px;
          .pics {
            width: 100%;
            height: 463px;
            border-radius: 10px;
          }
          .name {
            margin-top: 10px;
            width: 100%;
            height: 48px;
            text-align: center;
            line-height: 48px;
            background: rgba(236, 236, 236, 1);
            border-radius: 10px;
            font-size: 24px;
            color: #5b5b5b;
            font-weight: 300;
            span {
              margin: 0 5px;
            }
          }
        }
      }
    }
    // 2服务流程
    .process {
      width: 100%;
      .protop {
        text-align: center;
        .title {
          font-size: 36px;
          color: #333333;
          padding-bottom: 40px;
        }
        .toplist {
          display: flex;
          justify-content: space-between;
          .topli {
            width: 211px;
            height: 211px;
            position: relative;
            .mainpic {
              width: 100%;
              height: 100%;
            }
            .text {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 137px;
              height: 42px;
              background: rgba(36, 130, 200, 1);
              border-radius: 21px;
              color: white;
              text-align: center;
              line-height: 42px;
            }
          }
        }
      }
      .profw {
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        line-height: 35px;
        // font-weight:400;
        box-sizing: border-box;
        padding-top: 50px;
        .title {
          font-size: 36px;
          color: #333333;
          font-weight: bold;
        }
        .text {
          font-size: 30px;
          color: #333333;
          padding-top: 10px;
          line-height: 45px;
        }
        .botlist {
          width: 100%;
          .botli {
            width: 100%;
            height: 278px;
            margin-top: 30px;
            .mainpic {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    // 3安装流程
    .install {
      // background: pink;
      .ins-list {
        width: 100%;
        .ins-li {
          width: 100%;
          // height: 300px;
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          display: flex;
          justify-content: flex-start;
          .mainpic {
            margin: 40px 0;
            width: 48%;
            height: 225px;
            background: rgba(255, 255, 255, 1);
            border-radius: 10px;
          }
          .ins-info {
            // background: chartreuse;
            width: 50%;
            box-sizing: border-box;
            padding: 40px 0 40px 30px;
            .title {
              width: 100%;
              font-size: 30px;
              color: #333333;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }
            .time,
            .intro,
            .area {
              font-size: 24px;
              font-weight: 400;
              color: #5b5b5b;
              line-height: 35px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }

            .more {
              width: 174px;
              height: 41px;
              border: 1px solid rgba(153, 153, 153, 1);
              border-radius: 10px;
              color: #999999;
              font-size: 20px;
              text-align: center;
              line-height: 41px;
            }
          }
          &:last-child {
            border: none;
            margin-bottom: 20px;
          }
        }
      }
    }
    // 1,3服务与支持
    .repair {
      width: 100%;
      margin: 0 auto;
      .mainpic {
        width: 100%;
        height: 320px;
      }
      .repic {
        width: 100%;
        position: relative;
        .telinfo {
          // background: pink;
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
          padding: 30px 0 0 17px;
          font-weight: 400;
          .text {
            color: rgba(153, 153, 153, 1);
            line-height: 42px;
            font-weight: 400;
            color: #999999;
            font-size: 19px;
          }
          h1 {
            color: rgba(62, 145, 223, 1);
            font-size: 36px;
            padding-top: 40px;
          }
          .tel {
            font-size: 30px;
            color: rgba(51, 51, 51, 1);
            line-height: 42px;
            padding-top: 5px;
          }
          .totel {
            margin-top: 25px;
            width: 227px;
            height: 47px;
            background: rgba(62, 145, 223, 1);
            border: 1px solid rgba(62, 145, 223, 1);
            border-radius: 10px;
            border: 1px solid rgba(62, 145, 223, 1);
            border-radius: 10px;
            text-align: center;
            line-height: 47px;
            color: white;
            img {
              width: 20px;
            }
          }
        }
      }
      .reinfo {
        box-sizing: border-box;
        padding-top: 30px;
        color: rgba(51, 51, 51, 1);
        p {
          font-size: 36px;
          color: #2482c8;
        }
        section {
          line-height: 35px;
          font-size: 16px;
          word-break: break-all;
          // css保留空格和换行符
          white-space: pre-wrap;
          // css保留换行符
          white-space: pre-line;
        }
      }
    }
    //4
    .clause {
      width: 100%;
      color: #333333;
      .title {
        text-align: center;
        font-size: 36px;
      }
      .time {
        font-size: 20px;
        text-align: center;
        box-sizing: border-box;
        padding: 10px 0 20px 0;
      }
      .clauseinfo {
        width: 100%;

        section {
          width: 100%;
          font-size: 24px;
          // css保留空格和换行符

          // css保留空格和换行符
          white-space: pre-wrap;
          // css保留换行符
          white-space: pre-line;
          word-break: break-all;
        }
      }
    }
  }
}
</style>