<template>
  <div class="product">
    <banner></banner>
    <div class="content">
      <titles :titles="{title:'产品详情',ename:'COMPANY CULTURE',type:2}"></titles>
      <ul class="contentlist">
        <li class="ctli" v-for="(item, index) in list" :key="index" @click="todetail(index,item)">
          <img :src="httpUrl+item.image_url" alt />
          <div class="mask" v-if="item.class_name=='思系列-雪莲红球藻膏'||item.class_name=='翎系列-松露雄花粉'">
            <p class="name">{{item.name}}</p>
            <p class="text">已下架</p>
          </div>
        </li>
      </ul>
      <router-link to="/productlist">
        <p class="tomore">
          查看全部
          <span>
            <img src="../assets/小箭头.png" alt />
          </span>
        </p>
      </router-link>
    </div>
    <kfooter></kfooter>
  </div>
</template>
<script>
import banner from "../components/banner";
import kfooter from "../components/kfooter";
import titles from "../components/titles";

export default {
  name: "product",
  data() {
    return {
      list: []
    };
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.requst();
  },
  methods: {
    requst() {
      this.$axios.post("index/api/getArticles", { limit: 4 }).then(res => {
        console.log(res);
        this.list = res.data.data;
      });
    },
    todetail(index, item) {
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
  components: { banner, kfooter, titles }
};
</script>
<style lang="less" scoped>
.content {
  background: black;
  width: 100%;
  box-sizing: border-box;
  padding: 50px 20%;
  .contentlist {
    width: 100%;
    .ctli {
      width: 100%;
      margin-bottom: 30px;
      position: relative;
      img {
        width: 100%;
      }
      .mask {
        color: rgba(255, 255, 255, 0.8);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1;
        .name {
          position: absolute;
          bottom: 25%;
          left: 50%;
          transform: translateX(-50%);
        }
        .text {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .tomore {
    box-sizing: border-box;
    padding: 10px 0;
    text-align: right;
    color: white;
    img {
      width: 15px;
      position: relative;
      bottom: 3px;
      left: 2px;
    }
  }
}
</style>