<template>
  <div class="search">
    <div class="content">
      <p class="res">
        共
        <span>{{length}}</span>条
        <span>{{keys}}</span>相关搜索结果
      </p>
      <ul class="search-list">
        <li class="search-li" v-for="(item, index) in searchRes" :key="index">
          <img class="pic" :src="httpUrl+item.courseintroductionBreviarypictyre" alt />
          <div class="infos">
            <div class="topinfo">
              <p class="name">{{item.courseintroductionNarrate}}</p>
              <span @click="toplay(item)">立即观看</span>
            </div>
            <div class="college">
              <p class="school">{{item.courseintroductionUniversity}}</p>
              <p class="teacher">{{item.courseintroductionTeacher}}</p>
              <p class="num">
                <i class="icon">
                  <img src="../assets/searchmine1.png" alt />
                  {{item.courseintroductionWatchnumber}}
                </i>
              </p>
            </div>
            <div class="des">
              <p>【课程概述】{{item.courseintroductionSummarize}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "search",
  data() {
    return {
      source: [],
      length: "",
      keys: ""
    };
  },
  computed: {
    searchRes() {
      let $this = this;
      // 1. 创建正则
      let reg = new RegExp(this.$route.query.keywords, "gi");
      let res = this.source.filter(data => reg.test(JSON.stringify(data)));
      this.length = res.length;
      this.keys = $this.$route.query.keywords;
      return res;
    },
    ...mapState(["httpUrl"])
  },
  created() {
    this.request();
  },
  methods: {
    ...mapMutations(["SET_SEARCH_SECTION"]),
    //请求数据
    request() {
      let $this = this;
      let keywords = $this.$route.query.keywords;
      this.$axios.post(`/getAllSuit`).then(res => {
        this.source = res.data.data;
      });
    },
    toplay(item) {
      let coding = item.courseintroductionDistinction;
      this.SET_SEARCH_SECTION(item);
      this.$router.push(`/curriculum?coding=${coding}`);
      // let obj = JSON.stringify(item);
      // sessionStorage.item = obj;
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  background: #f8f7f7;
  .content {
    width: 1200px;
    margin: 0 auto;
    .res {
      font-size: 12px;
      color: #636363;
      padding: 30px 0 40px 0;
      span {
        color: #8fd561;
      }
    }
    .search-list {
      padding-bottom: 40px;
      width: 100%;
      box-sizing: border-box;
      .search-li {
        width: 100%;
        background: white;
        border-radius: 15px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        margin-top: 15px;
        display: grid;
        grid-template-columns: 28% 72%;
        .pic {
          padding: 20px;
        }
        .infos {
          width: 100%;
          .topinfo {
            display: flex;
            justify-content: space-between;
            .name {
              margin-top: 36px;
              font-size: 18px;
              color: #2e2e2e;
            }
            span {
              cursor: pointer;
              margin: 30px 166px 0 0;
              font-size: 12px;
              color: #8fd561;
            }
          }
          .college {
            width: 100%;
            margin-top: 10px;
            display: grid;
            grid-template-columns: 20% 20% 15%;
            font-size: 12px;
            color: #737373;
          }
          .des {
            width: 78%;
            margin-top: 30px;
            font-size: 14px;
            color: #5c5b5b;
          }
        }
      }
    }
  }
}
</style>