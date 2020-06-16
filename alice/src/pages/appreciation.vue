<template>
  <div class="appreciation">
    <banner></banner>
    <div class="casebox common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/appreciation/01.png" alt />
        </p>
        <p class="title">
          <span class="white">视频</span>
          <span class="span">赏析</span>
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
        <ul class="warpper">
          <li
            class="pic"
            v-for="(item, index) in caseslide"
            :key="index"
            @click="playvideo(item,index)"
          >
            <div class="pics">
              <div class="mainpicbox" v-if="item">
                <div
                  class="mainpic lazypic"
                  v-lazy:background-image="baseurl+`/public/`+item.image_url"
                ></div>
                <img src="../assets/appreciation/02.png" alt />
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
      <div class="main" :style="{'height':height+`px`}" v-if="isreload">
        <p
          class="toptitle"
        >所在位置：首页 > 视频赏析 > {{videos.class_name}} > {{videos.article_title}}</p>
        <img src="../assets/appreciation/close.png" alt class="close" @click="closevideo" />
        <p class="title">{{videos.article_title}}</p>
        <div class="video" v-if="palyvideos.image_url">
          <div
            v-show="!play"
            class="mainpic"
            :style="{backgroundImage: 'url(' +baseurl+`/public/`+ palyvideos.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          >
            <img @click="plays" src="../assets/appreciation/02.png" alt />
          </div>
          <video ref="video" controls v-show="play" ></video>
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
import moPagination from "../components/pagenation";
import httpUrl from "../api/url";
export default {
  name: "appreciation",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isreload: true,
      getProductClass: [],
      baseurl: "",
      play: false,
      isvedio: false,
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      caseli: [],
      caseindex: 0,
      caseslide: [],
      palyvideos: [],
      videos: [],
      previd: "",
      nextid: "",
      prevtitle: "",
      nexttitle: "",
      clientHeight: "",
      height: null,
      videosrc: "",
      keyword: ""
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.keyword = this.$route.query.keywords;
    if (this.keyword) {
      this.requst(this.keyword);
    } else {
      this.requst();
    }
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    this.height = Number(this.clientHeight) - 200;
    // console.log(this.height);
  },
  methods: {
    requst(keyword) {
      this.$axios.post("/index/api/getProductClass").then(res => {
        this.getProductClass = res.data.data[1];
        // console.log(this.getProductClass, "this.getProductClass");
        // // 获取案例分类名字
        this.caseli = this.getProductClass.child;
        // console.log(this.caseli, "this.caseli");
        // 主要获取默认的第一个classid
        this.curitem = this.getProductClass.child[0];
        // console.log(this.curitem, "this.curitem");
        // // 默认请求第一个分类的数据
        this.requstvideo(this.curitem.class_id, 1, 6, keyword);
      });
    },
    requstvideo(id, page, limit, keyword) {
      this.$axios
        .post("/index/api/getVideoList", {
          id: id,
          page: page,
          limit: limit,
          keyword: keyword
        })
        .then(res => {
          this.caseslide = res.data.data.data;
          this.count = res.data.data.total;
          // console.log(res, "video");
        });
    },
    changecaseindex(index, item) {
      this.caseindex = index;
      this.curitem = item;
      this.currentPage=0
      this.requstvideo(this.curitem.class_id, 1, 6, this.keyword);
    },
    getList(page) {
      this.requstvideo(this.curitem.class_id, page, 6, this.keyword);
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
    },
    reload() {
      let self = this;
      self.isreload = false;
      self.$nextTick(function() {
        self.isreload = true;
      });
    },
    // 请求视频详情
    requstvideodetail(id) {
      this.$axios.post("/index/api/videoShow", { id: id }).then(res => {
     
        this.videos = res.data.data;
        this.previd = res.data.data.prov;
        this.nextid = res.data.data.next;
        this.requstprev();
        this.requstnext();
          //  this.reload();
          // :src="baseurl+`/public/`+videos.video_url"
        this.$refs.video.src =this.baseurl+`/public/`+ res.data.data.video_url
        // console.log(res, "videos");
      });
    },
    prev(prev) {
      this.requstvideodetail(this.previd);
    },
    next(next) {
      this.requstvideodetail(this.nextid);
    }, // 请求上一篇
    requstprev(previd) {
      this.$axios
        .post("/index/api/videoShow", { id: this.previd })
        .then(res => {
          // console.log(res, "requstprev");
          this.prevtitle = res.data.data.article_title;
        });
    },
    // 请求下一篇
    requstnext(nextid) {
      this.$axios
        .post("/index/api/videoShow", { id: this.nextid })
        .then(res => {
          this.nexttitle = res.data.data.article_title;
        });
    },
    closevideo() {
      this.isvedio = false;
    },
    plays() {
      this.play = true;
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
.appreciation {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 80px;
  .casenav {
    height: 70px;
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    .caseli {
      display: inline-block;
      margin: 0 10px;
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
          position: relative;
          .mainpic {
            // transition: all 0.5s ease;
            width: 100%;
            height: 233px;
          }
          img {
            position: absolute;
            top: 35%;
            left: 50%;
            z-index: 11;
            transform: translateX(-50%);
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
            transition: all 0.5s ease;
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
    // height: 2500px;
    background: RGBA(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    z-index: 11111111;
    .main {
      background: white;
      width: 1200px;
      margin: 40px auto;
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
        height: 70%;
        position: relative;
        .mainpic {
          // transition: all 0.5s ease;
          width: 100%;
          height: 100%;
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
          height: 100%;
        }
      }
      .prev-next {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 20px 0 10px 0;
        margin-top: 25px;
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