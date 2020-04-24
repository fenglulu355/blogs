<template>
  <div class="about">
    <banner></banner>
    <div class="aboutbox common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/about/01.png" alt />
        </p>
        <p class="title">
          <span class="white">关于</span>
          <span class="span">爱丽丝</span>
        </p>
        <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIQUE LANDSCAPE</p>
      </div>
      <ul class="casenav">
        <li
          class="caseli"
          v-for="(item, index) in caseli"
          :key="index"
          :class="caseindex==index?'casecur':''"
          @click="changecaseindex(index)"
        >
          <p>{{item}}</p>
        </li>
      </ul>
      <!-- 公司简介 -->
      <div class="company abt" v-show="caseindex == 0">
        <div
          class="bg"
          :style="{backgroundImage: 'url(' + require('../assets/about/bg.png')+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
        >
          <div class="text">
            <p>高清花园定制</p>
            <p>享受您的精致生活</p>
            <p>——</p>
          </div>
        </div>
        <ul class="iconlist">
          <li class="iconli" v-for="(item, index) in company" :key="index">
            <img :src="item.icon" alt />
            <p>{{item.text}}</p>
          </li>
        </ul>
        <div class="content">
          <p class="title">{{aboutinfo.title}}</p>
        </div>
        <p class="text" v-html="aboutinfo.desc"></p>
      </div>
      <!-- 团队 -->
      <div class="teambox abt" v-show="caseindex == 1">
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
        <!-- 分页 -->
        <mo-pagination
          :page-index="currentPage"
          :total="count"
          :page-size="pageSize"
          @change="pageChange"
        ></mo-pagination>
      </div>
      <!-- 合作伙伴 -->
      <div class="cooperbox abt" v-show="caseindex == 2">
        <ul class="cooperlist">
          <li class="cooperli" v-for="(item, index) in cooperli" :key="index">
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
    </div>
  </div>
</template>

<script>
import banner from "../components/banner";
import moPagination from "../components/pagenation";
import httpUrl from "../api/url";
export default {
  name: "about",
  data() {
    return {
      getProductClass: [],
      baseurl: "",
      // 分页
      pageSize: 8, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      pageSizes: 16, // 每页显示20条数据
      currentPages: 1, // 当前页码
      counts: 1, // 总记录数,
      caseli: ["公司简介", "设计施工团队", "合作伙伴"],
      caseindex: 0,
      company: [
        { icon: require("../assets/about/nav1.png"), text: "专业团队" },
        { icon: require("../assets/about/nav2.png"), text: "私人订制" },
        { icon: require("../assets/about/nav3.png"), text: "经验丰富" },
        { icon: require("../assets/about/nav4.png"), text: "优质原材" },
        { icon: require("../assets/about/nav5.png"), text: "服务保障" }
      ],
      aboutinfo: [],
      teamli: [],
      cooperli: []
    };
  },
  created() {
    let a = this.$route.query.curindex;
    if (a) {
      this.caseindex = a;
    } else {
      this.caseindex = 0;
    }
    this.baseurl = httpUrl.httpUrl;
    this.requstabout();
    this.requstteam(8, 1);
    this.requstcooper(16, 1);
  },
  methods: {
    requstabout() {
      this.$axios.post("/index/api/about").then(res => {
        this.aboutinfo = res.data.data;
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
          this.count = team.data.data.total.length;
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
          this.counts = team.data.data.total.length;
          // console.log(team, "cooperli");
        });
    },
    changecaseindex(index) {
      this.caseindex = index;
    },
    getList(page) {
      this.requstteam(8, page);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    getLists(page) {
      this.requstcooper(16, page);
    },
    pageChanges(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getLists(index);
    }
  },
  components: { banner, moPagination }
};
</script>

<style lang="less" scoped>
.common {
  box-sizing: border-box;
  padding-top: 50px;
  .topbox {
    box-sizing: border-box;
    padding-bottom: 35px;
    text-align: center;  .icon {
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
.about {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 80px;
  .casenav {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    .caseli {
      display: inline-block;
      margin: 0 9px;
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
  .abt {
    width: 1200px;
    margin: 0px auto;
    margin-top: 60px;
  }
  //   公司
  .company {
    padding-bottom: 100px;
    .bg {
      width: 100%;
      height: 460px;
      .text {
        font-size: 18px;
        color: white;
        line-height: 40px;
        padding: 150px 0 0 50px;
      }
    }
    .iconlist {
      position: relative;
      bottom: 40px;
      text-align: center;
      .iconli {
        display: inline-block;
        margin: 0 32.5px;
        p {
          color: rgba(102, 102, 102, 1);
          font-size: 14px;
          padding-top: 20px;
        }
      }
    }
    .content {
      box-sizing: border-box;
      padding-top: 62px;
      .title {
        text-align: center;
        color: rgba(50, 149, 43, 1);
        font-size: 30px;
      }
      .text {
        padding-top: 31px;
        color: rgba(102, 102, 102, 1);
        line-height: 30px;
        letter-spacing: 0.3px;
      }
    }
  }
  //   设计施工团队
  .teambox {
    .teamlist {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .teamli {
        cursor: pointer;
        width: 277px;
        height: 370px;
        position: relative;
        margin-bottom: 30px;
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
  //   合作伙伴
  .cooperbox {
    .cooperlist {
      .cooperli {
        display: inline-block;
        width: 277px;
        height: 165px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(229, 229, 229, 1);
        box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        // padding: 30px 0 0 6px;
        margin: 0 23px 42px 0;
        // background: pink;
        .mainpicbox {
          width: 257px;
          height: 102px;
          margin: 30px auto;
          overflow: hidden;
          .mainpic {
            transition: all 0.5s ease;
            width: 100%;
            height: 100%;
          }
        }
        &:hover {
          cursor: pointer;
          .mainpic {
            transition: all 0.5s ease;
            transform: scale(1.1);
          }
        }
      }
    }
  }
  .mo-paging {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 40px 0 40px 0;
  }
}
</style>