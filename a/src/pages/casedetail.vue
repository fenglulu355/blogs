<template>
  <div class="casedetails">
    <banner></banner>
    <div class="main">
      <p class="toptitle">所在位置：首页 > 案例展示 > {{infos.class_name}} > {{infos.article_title}}</p>
      <p class="title">{{infos.article_title}}</p>
      <div class="carousel">
        <el-carousel :interval="4000" type="card" height="540px" indicator-position="none">
          <el-carousel-item v-for="(item,index) in infos.article_pics" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url('  +  baseurl + `/public/` +item+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="text" v-html="infos.article_content"></div>
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
  name: "casedetails",
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
  components: { banner }
};
</script>

<style lang="less" scoped>
.casedetails {
  width: 100%;
  .main {
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 50px 0 83px 0;
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
      margin: 10px 0 40px 0;
    }
    .carousel {
      box-sizing: border-box;
      padding-bottom: 40px;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      .el-carousel__item {
        .mainpic {
          width: 100%;
          height: 100%;
        }
      }
    }
    .text {
      color: rgba(51, 51, 51, 1);
      font-size: 16px;
      // css保留空格和换行符
      white-space: pre-wrap;
      line-height: 30px;
    }
    .prev-next {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20px 0 60px 0;
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
</style>