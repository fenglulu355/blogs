<template>
  <div class="casedetail">
    <p class="title">所在位置：首页 > 案例展示 > {{infos.class_name}} > {{infos.article_title}}</p>
    <p class="name">{{infos.article_title}}</p>
    <carousel :slides="infos.article_pics"></carousel>
    <div class="cont" v-html="infos.article_content"></div>
    <div class="other">
      <span class="prev" @click="prev" v-if="prevtitle">上一篇：{{prevtitle}}</span>
      <span class="next" @click="next" v-if="nexttitle">下一篇：{{nexttitle}}</span>
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
      baseurl: "",
      infos: [],
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
  methods: {
    prev(prev) {
      this.requst(this.previd);
    },
    next(next) {
      this.requst(this.nextid);
    },
    requst(id) {
      this.$axios.post("/index/api/casedDetail", { id: id }).then(res => {
        this.infos = res.data.data;
        this.previd = res.data.data.prov;
        this.nextid = res.data.data.next;
        this.requstprev();
        this.requstnext();
        let pics = this.infos.article_pics;
        let arr = [];

      

        console.log(pics);
      });
    },
    // 请求上一篇
    requstprev(previd) {
      this.$axios
        .post("/index/api/casedDetail", { id: this.previd })
        .then(res => {
          this.prevtitle = res.data.data.article_title;
        });
    },
    // 请求下一篇
    requstnext(nextid) {
      this.$axios
        .post("/index/api/casedDetail", { id: this.nextid })
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
  .title {
    color: rgba(153, 153, 153, 1);
    font-size: 18px;
    box-sizing: border-box;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(204, 204, 204, 1);
  }
  .name {
    width: 100%;
    height: 74px;
    line-height: 74px;
    text-align: center;
    font-size: 36px;
    color: rgba(102, 102, 102, 1);
    background: RGBA(248, 246, 249, 1);
    margin: 10px 0 46px 0;
  }
  .content {
    margin-bottom: 45px;
  }
  .cont {
    border-top: 1px solid rgba(204, 204, 204, 1);
    box-sizing: border-box;
    padding-top: 46px;
    color: rgba(51, 51, 51, 1);
    font-size: 30px;
    line-height: 44px;
    white-space: pre-wrap;
    white-space: pre-line;
    word-break: break-all;
  }
  .other {
    width: 100%;
    display: flex;
    justify-content: space-between;
    p {
      color: rgba(153, 153, 153, 1);
      font-size: 24px;
    }
    .next {
      color: rgba(50, 149, 43, 1);
    }
  }
}
</style>