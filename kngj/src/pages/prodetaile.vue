<template>
  <div class="prodetail">
    <div class="names">
      <span class="cpxq">
        <router-link to="/product">产品详情</router-link>
      </span>
      <img src="../assets/组15.png" alt />
      <p class="all">
        <router-link to="/productlist">全部产品</router-link>
        <span class="name-a">{{info.article_title}}</span>
        <span class="name-b">{{info.class_name}}</span>
      </p>
    </div>
    <div class="content">
      <p class="title">{{info.article_title}}</p>
      <p class="time">{{info.created_time}}</p>
      <div class="des" id="infos-cont" v-html="info.article_content"></div>
    </div>
    <div class="btn">
      <p class="prev" v-show="prev!='0'" @click="requst(prev,info.type)">←上一篇</p>
      <p class="next" v-show="next!='0'" @click="requst(next,info.type)">下一篇→</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "prodetail",
  data() {
    return { info: "", prev: "", next: "" };
  },
  created() {
    let id = this.$route.query.id,
      type = this.$route.query.type;
    if (type) {
      this.requst(id, type);
    } else {
      this.requst(id, 0);
    }
  },
  updated() {
    let a = document.getElementById("infos-cont");
    let imgs = a.getElementsByTagName("img");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].style.width = "100%";
      imgs[i].style.height = "100%";
    }
  },
  methods: {
    requst(id, type) {
      this.$axios
        .post("/index/api/getArticlesDetail", { id: id, type: type })
        .then(res => {
          console.log(res);
          this.info = res.data.data;
          this.prev = res.data.data.prov;
          this.next = res.data.data.next;
          console.log(this.prev, this.next);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.prodetail {
  width: 100%;
  box-sizing: border-box;
  padding: 25px 25px;
  .names {
    border-left: 1px solid #f5d02c;
    box-sizing: border-box;
    padding-left: 10px;
    font-size: 28px;
    display: flex;
    justify-content: flex-start;
    a{
      color: black;
    }
    .cpxq {
      width: 21%;
    }
    img {
      align-self: center;
      width: 25px;
      height: 25px;
      //   position: relative;
      //   bottom: 2px;
      padding: 0 4px 0 8px;
    }
    .all {
      width: 100%;
      position: relative;
      .name-a {
        display: inline-block;
        // width: 50%;
        padding: 0 30px 5px 0;
        position: absolute;
        top: 40px;
        font-size: 18px;
        font-weight: bold;
        left: 0;
        border-bottom: 1px solid #f5d02c;
      }
      .name-b {
        // width: 50%;
        display: inline-block;
        padding: 0 30px 5px 0;
        position: absolute;
        top: 80px;
        font-size: 18px;
        left: 0;
        border-bottom: 1px solid #f5d02c;
      }
    }
  }
  .content {
    box-sizing: border-box;
    margin-top: 120px;
    border: 1px solid #d2d2d2;
    padding: 20px 20px;
    .title {
      font-weight: bold;
      font-size: 26px;
      line-height: 70px;
    }
    .time {
      font-size: 15px;
      color: #d2d2d2;
      box-sizing: border-box;
      padding-bottom: 20px;
    }
    .des {
      border-top: 1px solid #d2d2d2;
      //   border-bottom: 1px solid #d2d2d2;
      box-sizing: border-box;
      padding: 30px 0;
    }
  }
  .btn {
    border: 1px solid #d2d2d2;
    border-top: none;
    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
    height: 50px;
    line-height: 50px;
  }
  .prev {
    float: left;
    width: 49%;
    text-align: center;
    &:active {
      background: #f5d02c;
    }
  }
  .next {
    float: right;
    width: 49%;
    &:active {
      background: #f5d02c;
    }
    border-left: 1px solid #d2d2d2;
    text-align: center;
  }
}
</style>