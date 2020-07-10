<template>
  <div class="casedetail">
    <div class="title">所在位置：首页 > 客户评价 > {{infos.article_title}}</div>
    <p class="name">{{infos.article_title}}</p>
    <div class="cont" id="deinfos" v-html="infos.article_content"></div>
    <div class="other">
      <p class="prev" @click="prev" v-if="prevtitle">
        <span>上一篇：</span>
        <span class="names">{{prevtitle}}</span>
      </p>
      <p class="next nxt" @click="next" v-if="nexttitle">
        <span>下一篇：</span>
        <span class="names nxt">{{nexttitle}}</span>
      </p>
    </div>
  </div>
</template>


<script>
import carousel from "../components/carousel";
import httpUrl from "../api/url";
export default {
  name: "casedetail",
  data() {
    return {
      caseinfo: {},
      baseurl: "",
      infos: {},
      previd: "",
      nextid: "",
      prevtitle: "",
      nexttitle: "",
      detailid: ""
    };
  },
  created() {
    let id = Number(this.$route.query.id);
    this.baseurl = httpUrl.httpUrl;
    this.requst(id);
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
    prev(prev) {
      this.requst(this.previd);
    },
    next(next) {
      this.requst(this.nextid);
    },
    requst(id) {
      this.$axios.post("/index/api/getNewsShow", { id: id }).then(res => {
        this.infos = res.data.data;
        this.previd = res.data.data.prov;
        this.nextid = res.data.data.next;
      
        this.requstprev();
        this.requstnext();
      });
    },
    // 请求上一篇
    requstprev(previd) {
      this.$axios
        .post("/index/api/getNewsShow", { id: this.previd })
        .then(res => {
          // console.log(res, "requstprev");
          this.prevtitle = res.data.data.article_title;
        });
    },
    // 请求下一篇
    requstnext(nextid) {
      this.$axios
        .post("/index/api/getNewsShow", { id: this.nextid })
        .then(res => {
          this.nexttitle = res.data.data.article_title;
        });
    }
  },
  components: { carousel }
};
</script>

<style lang="less" scoped>
.casedetail {
  width: 100%;
  box-sizing: border-box;
  padding: 50px 25px;
}
.casedetail .title {
  color: rgba(153, 153, 153, 1);
  font-size: 18px;
  box-sizing: border-box;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(204, 204, 204, 1);
}
.casedetail .name {
  width: 100%;
  height: 74px;
  line-height: 74px;
  text-align: center;
  font-size: 36px;
  color: rgba(102, 102, 102, 1);
  background: RGBA(248, 246, 249, 1);
  margin: 10px 0 46px 0;
}
.casedetail .content {
  margin-bottom: 45px;
}
.casedetail .cont {
  box-sizing: border-box;
  padding-bottom: 44px;
  color: rgba(51, 51, 51, 1);
  font-size: 30px;
  line-height: 44px;
  white-space: pre-wrap;
  white-space: pre-line;
  word-break: break-all;
}
.casedetail .other {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.casedetail .other p {
  width: 41%;
  color: rgba(153, 153, 153, 1);
  font-size: 24px;
  display: flex;
}
.casedetail .other p .names {
  display: inline-block;
  width: 60%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.casedetail .other .nxt {
  text-align: right;
}
.casedetail .other .next {
  color: rgba(50, 149, 43, 1);
  text-align: right;
}
</style>