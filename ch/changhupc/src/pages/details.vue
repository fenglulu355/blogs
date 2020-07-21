<template>
  <div class="news-detail">
    <div class="bg">
      <div
        class="topbg"
        :style="{backgroundImage: 'url(' + bg+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
    </div>
    <div
      class="content"
      :style="{backgroundImage: 'url(' + require('../assets/home/btbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
    >
      <transition name="trans-pro">
        <div v-if="trans" class="cont-left">
          <ul class="piclist">
            <vue-scroll :ops="ops" style="height:825px">
              <li
                class="picli"
                id="picli"
                v-for="(item, index) in res.article_pics_url"
                :key="index"
              >
                <img v-if="item" :src="baseurl+`/public/`+item " alt />
              </li>
              <li class="picli">
                <div
                  class="intru-des"
                  id="casecont"
                  v-if="res.article_contents"
                  v-html="res.article_contents"
                ></div>
              </li>
            </vue-scroll>
          </ul>
        </div>
      </transition>

      <div class="cont-right">
        <transition name="intruinfos">
          <div v-if="trans" class="intru-infos">
            <p class="title">【{{res.article_title}}】</p>

            <div class="intru-cont" v-if="res.article_content" v-html="res.article_content"></div>
            <div class="intru-des" v-if="res.desc" v-html="res.desc"></div>
            <!--案例 -->
            <div class="case" v-if="iscase"></div>
          </div>
        </transition>

        <transition name="othernews">
          <div v-if="trans" class="othernews">
            <div class="prev" @click="toprev">
              <span class="btn tbt" v-if="prevtitle">上一个产品：</span>
              <span class="name">{{prevtitle}}</span>
            </div>
            <div class="next" @click="tonext">
              <span class="btn" v-if="nexttitle">下一个产品：</span>
              <span class="name">{{nexttitle}}</span>
            </div>
          </div>
        </transition>
        <transition name="recom">
          <div v-if="trans" class="recom">
            <div class="recombox" v-for="(item, index) in chnewslit" :key="index">
              <div
                v-if="item.image"
                class="mainpic"
                @click="toThisNews(item)"
                :style="{backgroundImage: 'url(' +baseurl+`/public/`+item.image +')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>
              <p class="name" @click="toThisNews(item)">{{item.article_title}}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrl from "../utils/url";
export default {
  name: "product",
  data() {
    return {
      iscase: false,
      bg: require("../assets/product/tpbg.png"),
      previd: "",
      nextid: "",
      prevtitle: "",
      nexttitle: "",
      detailid: "",
      baseurl: "",
      pronameshow: false,
      trans: false,
      proClass: 0,
      prolistclass: 0,
      scrolldis: "",
      proNameList: [],
      class_id: "",
      res: [],
      total: [],
      infos: [],
      chnewslit: [],
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true
        },
        scrollPanel: {
          scrollingY: true,
          speed: 500
        },
        rail: {
          background: " #111111",
          opacity: 0,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: "200px ", //轨道距 x 和 y 轴两端的距离
          gutterOfSide: "0", //距离容器的距离
          keepShow: false, //是否即使 bar 不存在的情况下也保持显示
          border: "none" //边框
        },
        bar: {
          minSize: 0.3,
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#82c41c" //颜色
        }
      }
    };
  },
  updated() {
     let imgs = this.$refs.mainpic;
    //  console.log(imgs);
     
      if (imgs) {
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].style.width = "100%";
          imgs[i].style.height = "100%";
        }
      }
    // if (this.iscase == false) {
     
    // } else {
    //   let a = document.getElementById("casecont");
    //   let imgs = a.getElementsByTagName("img");
    //   for (let i = 0; i < imgs.length; i++) {
    //     imgs[i].style.width = "100%";
    //     imgs[i].style.height = "100%";
    //   }
    // }
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.detailid = this.$route.query.id;
    if (this.$route.query.kind == "case") {
      this.iscase = true;
      this.bg = require("../assets/case/casebanner.png");
      this.requstCase(this.detailid);
    } else {
      this.requstPro(this.detailid);
    }
  },
  mounted() {
    this.trans = true;
  },
  methods: {
    // 请求数据
    requstCase(id) {
      this.$axios.post("/index/api/getCaseShow", { id: id }).then(resAll => {
        this.res = resAll.data.data;
        // console.log(resAll, "resAll");
        this.previd = resAll.data.data.prov;
        this.nextid = resAll.data.data.next;
        this.chnewslit = resAll.data.data.baselist;
        let api = "/index/api/getCaseShow";
        this.requstprev(api);
        this.requstnext(api);
      });
    },
    requstPro(id) {
      this.$axios.post("/index/api/getNewsShow", { id: id }).then(resAll => {
        this.res = resAll.data.data;
        console.log(resAll, "resAlla");
        this.previd = resAll.data.data.prov;
        this.nextid = resAll.data.data.next;
        this.chnewslit = resAll.data.data.baselist;
        let api = "/index/api/getNewsShow";
        this.requstprev(api);
        this.requstnext(api);
      });
    },
    requstnext(api, id) {
      this.$axios.post(api, { id: this.nextid }).then(res => {
        this.nexttitle = res.data.data.article_title;
      });
    },
    requstprev(api, id) {
      this.$axios.post(api, { id: this.previd }).then(res => {
        this.prevtitle = res.data.data.article_title;
      });
    },
    toThisNews(val) {
      // console.log(val);
      this.detailid = val.article_id;
      if (this.$route.query.kind == "case") {
        this.requstCase(this.detailid);
      } else {
        this.requstPro(this.detailid);
      }
    },
    toprev() {
      if (this.$route.query.kind == "case") {
        this.requstCase(this.previd);
      } else {
        this.requstPro(this.previd);
      }
    },
    tonext() {
      if (this.$route.query.kind == "case") {
        this.requstCase(this.nextid);
      } else {
        this.requstPro(this.nextid);
      }
    }
  }
};
</script>
<style  scoped>
/* // 左边 */
.trans-pro-enter-active {
  transition: all 1.5s ease-in-out;
}
.trans-pro-enter {
  transform: translateX(-100px);
}

/* 右边 */
.intruinfos-enter-active {
  transition: all 1.5s ease-in-out;
}
.othernews-enter-active {
  transition: all 2.5s ease-in-out;
}
.recom-enter-active {
  transition: all 3.5s ease-in-out;
}
.intruinfos-enter,
.othernews-enter,
.recom-enter {
  transform: translateX(50px);
}

.news-detail {
  /* // background: orange; */
  width: 100%;
  min-width: 1200px;
  position: relative;

  /* margin-bottom: 10px; */
}
.news-detail .bg {
  width: 100%;
  height: 1215px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 0;
}
.news-detail .bg .topbg {
  width: 100%;
  height: 360px;
}
.news-detail .content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.news-detail .content .cont-left {
  box-sizing: border-box;
  width: 71%;
  height: 100%;
  padding: 130px 0px 70px 40px;
  position: relative;
}
.news-detail .content .cont-left .piclist {
  width: 100%;
  height: 100%;
  /* background: pink; */
}
.news-detail .content .cont-left .piclist .picli {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  color: white;
  /* text-align: center; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
/* .news-detail .content .cont-left .piclist .picli img {
  max-width: 100%;
  max-height: 100%;
} */
.news-detail .content .cont-right {
  box-sizing: border-box;
  width: 28%;
  padding: 140px 40px 10px 10px;
  position: relative;
}
.news-detail .content .cont-right .intru-infos {
  padding-bottom: 20px;
  border-bottom: 1px dashed #f5f5f5;
  color: #ffffff;
  box-sizing: border-box;
}
.news-detail .content .cont-right .intru-infos .title {
  box-sizing: border-box;
  padding: 40px 30px 30px 0px;
  position: relative;
}
.news-detail .content .cont-right .intru-infos .title::before {
  content: "";
  width: 240px;
  height: 4px;
  background: #82c41c;
  position: absolute;
  top: 20px;
  left: -100px;
  z-index: 2;
}
.news-detail .content .cont-right .intru-infos .intru-cont {
  padding: 10px 30px 30px 0px;
  line-height: 24px;
  white-space: pre-wrap;
  white-space: pre-line;
  word-break: break-all;
}
.news-detail .content .cont-right .intru-infos .intru-des {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 30px 0px 0px;
  line-height: 24px;
  white-space: pre-wrap;
  white-space: pre-line;
  word-break: break-all;
}

.news-detail .content .cont-right .othernews {
  width: 100%;
  border-bottom: 1px dashed #f5f5f5;
  font-size: 14px;
  box-sizing: border-box;
  padding: 20px 30px 20px 0px;
}

.news-detail .content .cont-right .othernews .btn {
  color: #cdcdcd;
  cursor: pointer;
}
.news-detail .content .cont-right .othernews .btn :hover {
  color: #82c41c;
}
.news-detail .content .cont-right .othernews .name {
  color: #82c41c;
}
.news-detail .content .cont-right .othernews .next {
  margin-top: 5px;
}
.news-detail .content .cont-right .recom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 20px 0px 20px 0px;
}
.news-detail .content .cont-right .recom .recombox {
  width: 30%;
  height: 100%;
}
.news-detail .content .cont-right .recom .recombox .mainpic {
  width: 100%;
  height: 100px;
  /* border: 1px dashed #939393; */
  cursor: pointer;
}
.news-detail .content .cont-right .recom .recombox .name {
  cursor: pointer;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #cdcdcd;
  font-size: 14px;
  padding: 10px 0px 20px 0px;
}
</style>