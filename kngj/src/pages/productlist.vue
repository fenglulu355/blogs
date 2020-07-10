<template>
  <div class="prolist">
    <div class="content">
      <p class="names">
        <router-link to="/product">产品详情</router-link>
        <img src="../assets/组15.png" alt /> 全部产品
      </p>
      <titles :titles="{title:'全部产品',ename:'ALL PRODUCTS',type:0}"></titles>
      <ul class="pro-list">
        <li
          class="proli"
          v-for="(item, index) in list"
          :key="index"
          :class="curmineli ==index?'selmine':''"
          @click="tonav(index,item)"
        >
          <div class="picbox">
            <img class="mainpic" :src="httpUrl+item.image_url" alt />
          </div>
          <!-- <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + item.icon+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>-->
          <p class="title">{{item.class_name }}</p>
          <p class="titles">{{item.article_title}}</p>
          <p class="text" v-html="item.article_content"></p>
          <p class="btn">
            <span>查看详情</span>
          </p>
        </li>
      </ul>
    </div>
    <kfooter></kfooter>
  </div>
</template>
<script>
import kfooter from "../components/kfooter";
import titles from "../components/titles";

export default {
  name: "prolist",

  data() {
    return {
      curmineli: null,
      list: []
    };
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    let keyword = this.$route.query.keyword;
    if (keyword) {
      this.requstsearch();
    } else {
      this.requst();
    }
  },
  methods: {
    requstsearch() {
      this.$axios
        .post("/index/api/getClassArticlesList", { keyword: this.search })
        .then(res => {
          console.log(res);
          this.list = res.data.data;
        });
    },
    requst() {
      this.$axios
        .post("index/api/getClassArticlesList", { id: 0 })
        .then(res => {
          console.log(res);
          this.list = res.data.data;
        });
    },
    tonav(index, item) {
      this.curmineli = index;
      console.log(item);

      setTimeout(() => {
        if (item.type) {
          this.$router.push({
            path: "/prodetail",
            query: { id: item.article_id, type: item.type }
          });
        } else {
          this.$router.push({
            path: "/prodetail",
            query: { id: item.article_id }
          });
        }
      }, 500);
    }
  },
  components: { kfooter, titles }
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  box-sizing: border-box;
  padding: 25px 25px;
  .names {
    a{
      color: black;
    }
    border-left: 1px solid #f5d02c;
    box-sizing: border-box;
    padding-left: 10px;
    font-size: 28px;
    img {
      width: 25px;
      position: relative;
      bottom: 2px;
      padding: 0 2px;
    }
  }
  .pro-list {
    width: 90%;
    margin: 0 auto;
    .proli {
      width: 100%;
      border: 1px solid #959595;
      margin-bottom: 30px;
      box-sizing: border-box;
      padding: 20px 20px;

      .mainpic {
        width: 100%;
        height: 100%;
        // margin: 0 auto;
        // height: 360px;
      }
      .title {
        font-size: 30px;
        box-sizing: border-box;
        padding: 10px 0 0 0;
      }
      .titles {
        font-size: 30px;
        box-sizing: border-box;
        padding-bottom: 10px;
      }
      .text {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .btn {
        position: relative;
        height: 100px;
        span {
          color: white;
          position: absolute;
          right: 0;
          top: 30px;
          display: inline-block;
          width: 180px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #959595;
        }
      }
    }
    .selmine {
      border: 1px solid #f5d02c;
      .btn {
        span {
          background: #f5d02c;
        }
      }
    }
  }
}
</style>