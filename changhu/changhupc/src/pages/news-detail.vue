<template>
  <div class="news-detail">
    <div class="bg">
      <div
        class="topbg"
        :style="{backgroundImage: 'url(' + require('../assets/home/tpbanner.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
    </div>
    <div
      class="content"
      :style="{backgroundImage: 'url(' + require('../assets/mainbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
    >
      <div class="cont-left">
        <div class="icon" id="proicon">
          <transition name="trans-pro">
            <img v-if="trans" src="../assets/news/news.png" alt />
          </transition>
        </div>
        <div class="chpoint">
          <transition name="trans-prolfli">
            <div v-if="trans" class="point-cont">
              <div class="pc-top">
                <p class="cname">长湖观点</p>
                <p class="ename">Changhu Guandian</p>
              </div>
              <div class="tpic" v-if="point[0]" @click="toThisNews(point[0])">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' + baseurl+`/public/`+point[0].image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title" @click="toThisNews(point[1])">{{point[1].article_title}}</p>
              </div>
              <div class="bpic" v-if="point[2]" @click="toThisNews(point[2])">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' + baseurl+`/public/`+point[2].image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="cont-right">
        <div class="infosbox">
          <div class="infos-top">
            <p class="title" v-if="res.article_title">{{res.article_title}}</p>
            <p class="time" v-if="res.created_time">{{res.created_time}}</p>
          </div>
          <div class="infos-cont" id="infomain" v-html="res.article_content"></div>
          <div class="othernews">
            <div class="prev">
              <span class="btn tbt" @click="toprev" v-if="prevtitle">上一个项目：</span>
              <span class="name">{{prevtitle}}</span>
            </div>
            <div class="next">
              <span class="btn" @click="tonext" v-if="nexttitle">下一个项目：</span>
              <span class="name">{{nexttitle}}</span>
            </div>
          </div>
        </div>
        <div class="newsinfo">
          <div class="pc-top">
            <p class="cname">长湖观点</p>
            <p class="ename">Changhu Guandian</p>
          </div>
          <div class="news newstp">
            <div class="name">
              <p class="chnews">
                长湖新闻
                <span>Changhu News</span>
              </p>
            </div>
            <ul class="newslist">
              <transition name="newslista">
                <li v-if="trans" class="newsli" @click="toThisNews(chnewslit[0])">
                  <p class="title" v-if="chnewslit[0]">{{chnewslit[0].article_title}}</p>
                  <p class="time" v-if="chnewslit[0]">{{chnewslit[0].created_time}}</p>
                </li>
              </transition>
              <transition name="newslistb">
                <li v-if="trans" class="newsli" @click="toThisNews(chnewslit[1])">
                  <p class="title" v-if="chnewslit[1]">{{chnewslit[1].article_title}}</p>
                  <p class="time" v-if="chnewslit[1]">{{chnewslit[1].created_time}}</p>
                </li>
              </transition>
              <transition name="newslistc">
                <li v-if="trans" class="newsli" @click="toThisNews(chnewslit[2])">
                  <p class="title" v-if="chnewslit[2]">{{chnewslit[2].article_title}}</p>
                  <p class="time" v-if="chnewslit[2]">{{chnewslit[2].created_time}}</p>
                </li>
              </transition>
              <transition name="newslistd">
                <li v-if="trans" class="newsli" @click="toThisNews(chnewslit[3])">
                  <p class="title" v-if="chnewslit[3]">{{chnewslit[3].article_title}}</p>
                  <p class="time" v-if="chnewslit[3]">{{chnewslit[3].created_time}}</p>
                </li>
              </transition>
              <transition name="newsliste">
                <li v-if="trans" class="newsli" @click="toThisNews(chnewslit[4])">
                  <p class="title" v-if="chnewslit[4]">{{chnewslit[4].article_title}}</p>
                  <p class="time" v-if="chnewslit[4]">{{chnewslit[4].created_time}}</p>
                </li>
              </transition>
            </ul>
          </div>
          <div class="news">
            <div class="name">
              <p class="chnews">
                行业动态
                <span>Changhu News</span>
              </p>
            </div>
            <ul class="newslist">
              <transition name="newslista">
                <li v-if="trans" class="newsli" @click="toThisNews(Industry[0])">
                  <p class="title" v-if="Industry[0]">{{Industry[0].article_title}}</p>
                  <p class="time" v-if="Industry[0]">{{Industry[0].created_time}}</p>
                </li>
              </transition>
              <transition name="newslistb">
                <li v-if="trans" class="newsli" @click="toThisNews(Industry[1])">
                  <p class="title" v-if="Industry[1]">{{Industry[1].article_title}}</p>
                  <p class="time" v-if="Industry[1]">{{Industry[1].created_time}}</p>
                </li>
              </transition>
              <transition name="newslistc">
                <li v-if="trans" class="newsli" @click="toThisNews(Industry[2])">
                  <p class="title" v-if="Industry[2]">{{Industry[2].article_title}}</p>
                  <p class="time" v-if="Industry[2]">{{Industry[2].created_time}}</p>
                </li>
              </transition>
              <transition name="newslistd">
                <li v-if="trans" class="newsli" @click="toThisNews(Industry[3])">
                  <p class="title" v-if="Industry[3]">{{Industry[3].article_title}}</p>
                  <p class="time" v-if="Industry[3]">{{Industry[3].created_time}}</p>
                </li>
              </transition>
              <!-- <transition name="newsliste">
                <li v-if="trans" class="newsli" @click="toThisNews(Industry[4])">
                  <p class="title"  v-if="Industry[4]">{{Industry[4].article_title}}</p>
                  <p class="time"  v-if="Industry[4]">{{Industry[4].created_time}}</p>
                </li>
              </transition>-->
            </ul>
          </div>
        </div>
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
      hydt: "",
      pointid: "",
      res: [],
      total: [],
      infos: [],
      chnewslit: [],
      Industry: [],
      point: [],
      newslist: []
    };
  },
  updated() {
    let a = document.getElementById("infomain");
    let imgs = a.getElementsByTagName("img");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].style.width = "100%";
      imgs[i].style.height = "100%";
    }
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.detailid = this.$route.query.id;
    this.requst(this.detailid);
  },
  mounted() {
    this.trans = true;
  },
  methods: {
    // 请求数据
    requst(val) {
      this.$axios.post("/index/api/getNewsShow", { id: val }).then(resall => {
        this.res = resall.data.data;
        this.previd = resall.data.data.prov;
        this.nextid = resall.data.data.next;
        this.chnewslit = resall.data.data.baselist.splice(1, 5);
        this.requstnext();
        this.requstprev();
        this.requstclass();
      });
    },
    requstnext() {
      this.$axios
        .post("/index/api/getNewsShow", { id: this.nextid })
        .then(res => {
          this.nexttitle = res.data.data.article_title;
        });
    },
    requstprev() {
      this.$axios
        .post("/index/api/getNewsShow", { id: this.previd })
        .then(res => {
          this.prevtitle = res.data.data.article_title;
        });
    },
    requstclass() {
      this.$axios.post("/index/api/getNewsClass").then(res => {
        this.pointid = res.data.data[1].class_id;
        this.hydt = res.data.data[2].class_id;
        this.requstHy(this.hydt, 1);
        this.requstPoint(this.pointid, 1);
      });
    },
    // 请求行业动态
    requstHy(val, page) {
      this.$axios
        .post("/index/api/getNewsList", {
          pid: val,
          limit: 5,
          page: page
        })
        .then(res => {
          this.Industry = res.data.data.data;
        });
    },
    // 请求观点
    requstPoint(val, page) {
      this.$axios
        .post("/index/api/getNewsList", {
          pid: val,
          limit: 3,
          page: page
        })
        .then(res => {
          this.point = res.data.data.data;
          // console.log(this.point, "requstPoint");
        });
    },
    toThisNews(val) {
      this.detailid = val.article_id;
      this.requst(this.detailid);
    },
    toprev() {
      this.requst(this.previd);
    },
    tonext() {
      this.requst(this.nextid);
    }
  }
};
</script>
<style  scoped>
/* // 左边 */
.trans-pro-enter-active {
  transition: all 1.5s ease-in-out;
}
.trans-prolfli-enter-active {
  transition: all 2s ease-in-out;
}
.trans-pro-enter,
.trans-prolfli-enter {
  transform: translateX(-100px);
}

/* 新闻列表动画 */
.newslista-enter-active {
  transition: all 2s ease-in-out;
}
.newslistb-enter-active {
  transition: all 2.5s ease-in-out;
}
.newslistc-enter-active {
  transition: all 3s ease-in-out;
}
.newslistd-enter-active {
  transition: all 3.5s ease-in-out;
}
.newsliste-enter-active {
  transition: all 4s ease-in-out;
}
.newslista-enter,
.newslistb-enter,
.newslistc-enter,
.newslistd-enter,
.newsliste-enter {
  transform: translateY(-50px);
}

.news-detail {
  width: 100%;
  min-width: 1200px;
  position: relative;
}
.news-detail .bg {
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 0;
}
.news-detail .bg .topbg {
  width: 100%;
  height: 360px;
}
.news-detail .bg .ctbg {
  width: 100%;
}
.news-detail .content {
  width: 100%;
  min-height: 1120px;
  display: flex;
  justify-content: space-between;
}
.news-detail .content .cont-left {
  box-sizing: border-box;
  width: 25%;
  padding: 230px 0 0 7px;
  position: relative;
  /* // background: pink; */
}
.news-detail .content .cont-left .icon {
  height: 200px;
}
.news-detail .content .cont-left .icon img {
  height: 100%;
}
.news-detail .content .cont-left .chpoint {
  border: 10px solid #939393;
  width: 62%;
  height: 630px;
  position: absolute;
  top: 480px;
  left: 16%;
  box-sizing: border-box;
}
.news-detail .content .cont-left .chpoint .point-cont {
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  background: #111111;
  padding: 30px 30px;
  position: absolute;
  top: 60px;
  right: 20%;
}
.news-detail .content .pc-top {
  position: relative;
}
.news-detail .content .cname {
  color: #ffffff;
  font-size: 24px;
}
.news-detail .content .pc-top .ename {
  font-size: 12px;
  font-size: #666666;
  color: #666666;
  padding-top: 2px;
}
.news-detail .content .cont-left .chpoint .point-cont .pc-top ::after {
  content: "";
  height: 2px;
  width: 60px;
  background: #82c41c;
  position: absolute;
  bottom: -10px;
  left: 0;
}
.news-detail .content .cont-left .chpoint .point-cont .mainpic {
  width: 100%;
  height: 100%;
}
.news-detail .content .cont-left .chpoint .point-cont .tpic {
  cursor: pointer;
  margin-top: 30px;
  width: 100%;
  height: 118px;
}
.news-detail .content .cont-left .chpoint .point-cont .tpic .title {
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  line-height: 24px;
  color: #cdcdcd;
}
.news-detail .content .cont-left .chpoint .point-cont .bpic {
  cursor: pointer;
  box-sizing: border-box;
  margin-top: 50px;
  width: 100%;
  height: 190px;
}
.news-detail .content .cont-right {
  width: 72%;
  height: 100%;
  margin: 300px 0 0 0;
  position: relative;
}
.news-detail .content .cont-right .infosbox {
  box-sizing: border-box;
  background: #111111;
  width: 65%;
  padding: 50px 50px;
}
.news-detail .content .cont-right .infosbox .infos-top {
  width: 100%;
  height: 40px;
  color: #82c41c;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #939393;
  line-height: 24px;
}
.news-detail .content .cont-right .infosbox .infos-top .title {
  font-size: 20px;
}

.news-detail .content .cont-right .infosbox .infos-cont {
  padding: 30px 0;
  /* max-width: 100% !important; */
  width: 100%;

  min-height: 200px;
  height: 100%;
  color: #cdcdcd;
  line-height: 24px;
  white-space: pre-wrap;
  white-space: pre-line;
  word-break: break-all;
  border-bottom: 1px dashed #939393;
}

.news-detail .content .cont-right .infosbox .othernews {
  width: 100%;
  border-bottom: 1px dashed #939393;
  font-size: 14px;
  padding: 20px 0;
  box-sizing: border-box;
}

.news-detail .content .cont-right .infosbox .othernews .btn {
  color: #cdcdcd;
  cursor: pointer;
}
.news-detail .content .cont-right .infosbox .othernews .name {
  color: #82c41c;
}
.news-detail .content .cont-right .infosbox .othernews .next {
  margin-top: 5px;
}
.news-detail .content .cont-right .newsinfo {
  box-sizing: border-box;
  border-top: 10px solid #222222;
  background: #111111;
  width: 29.5%;
  height: 775px;
  position: absolute;
  top: -10px;
  right: 40px;
}
.news-detail .content .cont-right .newsinfo .pc-top {
  box-sizing: border-box;
  padding-top: 40px;
  padding-right: 5%;
  text-align: right;
}
.news-detail .content .cont-right .newsinfo .pc-top ::after {
  content: "";
  height: 2px;
  width: 60px;
  background: #82c41c;
  position: absolute;
  bottom: -10px;
  right: 5%;
}
.news-detail .content .cont-right .newsinfo .news {
  width: 90%;
  margin: 29px auto;
}
.news-detail .content .cont-right .newsinfo .news .name {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #82c41c;
}
.news-detail .content .cont-right .newsinfo .news .name p {
  color: #82c41c;
  line-height: 24px;
}
.news-detail .content .cont-right .newsinfo .news .name span {
  color: #939393;
  font-size: 14px;
}
.news-detail .content .cont-right .newsinfo .news .newslist .newsli {
  cursor: pointer;
  border-bottom: 1px dashed #939393;
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}
.news-detail .content .cont-right .newsinfo .news .newslist .newsli .time {
  width: 25%;
  text-align: right;
  white-space: nowrap;
  color: #939393;
  font-size: 13px;
}
.news-detail .content .cont-right .newsinfo .news .newslist .newsli .title {
  color: #dddddd;
  font-size: 14px;
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.news-detail .content .cont-right .newsinfo .newstp {
  margin-bottom: 40px;
}

.news-detail .newsbox {
  width: 7%;
  position: absolute;
  top: 80px;
  right: 5.5%;
  z-index: 1111;
  background: #111111;
  /* // background: orange; */
  color: #ffffff;
  font-size: 14px;
}
.news-detail .newsbox .newslist {
  width: 100%;
}
.news-detail .newsbox .newslist .newslibox {
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.news-detail .newsbox .newslist .newslibox p {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.news-detail .newsbox .sel {
  background: #333333;
}
</style>