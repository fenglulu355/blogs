<template>
  <div class="evadetails">
    <banner></banner>
    <div class="main">
      <p class="toptitle">所在位置：首页 > 客户评价 > {{infos.article_title}}</p>
      <p class="title">{{infos.article_title}}</p>
      <div class="text" id="deinfos" v-html="infos.article_content"></div>
      <p class="prev-next">
        <span class="prev" @click="prev" v-if="prevtitle">上一篇：{{prevtitle}}</span>
        <span class="next" @click="next" v-if="nexttitle">下一篇：{{nexttitle}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import banner from "../components/banner";
import httpUrl from "../api/url";
export default {
  name: "evadetails",
  inject: ["reload"],
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
        // console.log(this.infos, "requst");
        // console.log(this.previd, "previd");
        // console.log(this.nextid, "nextid");
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
  components: { banner }
};
</script>

<style lang="less" scoped>
.evadetails {
  width: 100%;
}
.evadetails .main {
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 50px 0 83px 0;
}

.evadetails .main .toptitle {
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  border-bottom: 1px solid rgba(204, 204, 204, 1);
  box-sizing: border-box;
  padding-bottom: 10px;
}
.evadetails .main .title {
  width: 100%;
  height: 74px;
  color: rgba(102, 102, 102, 1);
  font-size: 24px;
  text-align: center;
  line-height: 74px;
  background: RGBA(247, 246, 249, 1);
  box-sizing: border-box;
  margin: 10px 0 40px 0;
}
.evadetails .main .text {
  width: 100%;
  min-height: 400px;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  // css保留空格和换行符
  word-break: break-all;
  // css保留空格和换行符
  white-space: pre-wrap;
  // css保留换行符
  white-space: pre-line;
  line-height: 30px;
}
.evadetails .main .prev-next {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 40px 0 40px 0;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
}
.evadetails .main .prev-next span {
  cursor: pointer;
}
.evadetails .main .prev-next span :hover {
  color: rgba(50, 149, 43, 1);
}
</style>