<template>
  <div class="business">
    <banner></banner>
    <div class="casebox common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/buiness/01.png" alt />
        </p>
        <p class="title">
          <span class="white">业务</span>
          <span class="span">范围</span>
        </p>
        <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIQUE LANDSCAPE</p>
      </div>
      <div class="caseinfo">
        <ul class="warpper">
          <li
            class="pic"
            v-for="(item, index) in caseslide"
            @click="playvideo(item,index)"
            :key="index"
          >
            <div class="pics">
              <div class="mainpicbox">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+ item.image_url+  ')',
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
      <!-- 分页 -->
      <mo-pagination
        :page-index="currentPage"
        :total="count"
        :page-size="pageSize"
        @change="pageChange"
      ></mo-pagination>
    </div>
    <!-- paly -->
    <div class="videobox" :style="{'height':clientHeight+`px`}" v-show="isvedio">
      <div class="main" :style="{'height':height+`px`}">
        <p class="toptitle">所在位置：首页 > 业务范围 > {{businessdetail.article_title}}</p>
        <img src="../assets/appreciation/close.png" alt class="close" @click="closevideo" />
        <p class="title">{{businessdetail.article_title}}</p>
        <div class="video" v-if="businessdetail.image_url">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +baseurl+`/public/`+ businessdetail.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </div>

        <p class="prev-next">
          <span class="prev" @click="prev" v-if="prevtitle">上一篇：{{prevtitle}}</span>
          <span class="next" @click="next" v-if="nexttitle">下一篇：{{nexttitle}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "../components/banner";
import httpUrl from "../api/url";
import moPagination from "../components/pagenation";
export default {
  name: "business",
  data() {
    return {
      isvedio: false,
      getProductClass: [],
      baseurl: "",
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      caseli: [],
      caseindex: 0,
      caseslide: [],
      palyvideos: [],
      businessdetail: [],
      previd: "",
      nextid: "",
      prevtitle: "",
      nexttitle: "",
      clientHeight: "",
      curitem:[],
      height: null
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.requst();
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    this.height = Number(this.clientHeight) - 200;
    // console.log(this.height);
  },
  methods: {
    prev(prev) {
      this.requst(this.previd);
    },
    next(next) {
      this.requst(this.nextid);
    },
    requst() {
      this.$axios.post("/index/api/getProductClass").then(res => {
        this.getProductClass = res.data.data;
        // console.log(this.getProductClass);
        // 主要获取默认的第一个classid
        this.curitem = this.getProductClass[6];
        // console.log(this.curitem);
        // 默认请求第一个分类的数据
        this.requstcase(this.curitem.class_id, 1, 9);
      });
    },
    // 请求案例
    requstcase(id, page, limit) {
      this.$axios
        .post("/index/api/getProductList", { id: id, page: page, limit: limit })
        .then(cases => {
          this.caseslide = cases.data.data.data;
          this.count = cases.data.data.total.length;
          // console.log(cases);
        });
    },
    getList(page) {
      this.requstcase(this.curitem.class_id, page, 9);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    playvideo(item, index) {
      this.palyvideos = item;
      // console.log(this.palyvideos, "aaaa");
      this.requstvideodetail(item.article_id);
      setTimeout(() => {
        this.isvedio = true;
      }, 200);
    }, // 请求视频详情
    requstvideodetail(id) {
      this.$axios.post("/index/api/getNewsShow", { id: id }).then(res => {
        this.businessdetail = res.data.data;
        this.requstprev();
        this.requstnext();
        // console.log(res, "sdfsdfs");
      });
    },
    // 请求上一篇
    requstprev(previd) {
      this.$axios
        .post("/index/api/getNewsShow", { id: this.previd })
        .then(res => {
          this.prevtitle = res.data.data.article_title;
        });
    }, // 请求下一篇
    requstnext(nextid) {
      this.$axios
        .post("/index/api/getNewsShow", { id: this.nextid })
        .then(res => {
          this.nexttitle = res.data.data.article_title;
        });
    },

    closevideo() {
      this.isvedio = false;
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
.business {
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
    .warpper {
      width: 1200px;
      margin: 0px auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      li {
        cursor: pointer;
        box-sizing: border-box;
        width: 393px;
        height: 320px;
        margin: 10px 0 40px 0;

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
  .mo-paging {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 40px 0 70px 0;
  }
  .videobox {
    width: 100%;
    background: RGBA(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    z-index: 11111111;
    .main {
      background: white;
      width: 1200px;
      margin: 30px auto;
      box-sizing: border-box;
      padding: 23px 43px;
      position: relative;
      .toptitle {
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        border-bottom: 1px solid rgba(204, 204, 204, 1);
        box-sizing: border-box;
        padding-bottom: 10px;
      }
      .title {
        width: 100%;
        height: 74px;
        color: rgba(102, 102, 102, 1);
        font-size: 24px;
        text-align: center;
        line-height: 74px;
        background: RGBA(247, 246, 249, 1);
        box-sizing: border-box;
        margin: 10px 0 30px 0;
      }
      .close {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
      }
      .video {
        width: 100%;
        height: 575px;
        position: relative;
        .mainpic {
          width: 100%;
          height: 70%;
        }
        img {
          cursor: pointer;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 45%;
        }
        video {
          width: 1117px;
          height: 625px;
        }
      }
      .prev-next {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 20px 0 0px 0;
        margin-top: 35px;
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        span {
          cursor: pointer;
          &:hover {
            color: rgba(50, 149, 43, 1);
          }
        }
      }
    }
  }
}
</style>