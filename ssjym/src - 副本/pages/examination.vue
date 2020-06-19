<template>
  <div class="examination">
    <mt-navbar class="page-part" v-model="seselected">
      <mt-tab-item id="1">升学政策</mt-tab-item>
      <mt-tab-item id="2">升学资讯</mt-tab-item>
      <mt-tab-item id="3">升学报告</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="seselected">
      <mt-tab-container-item id="1">
        <div class="examination-teachers">
          <!-- <div class="examination-teachers-top">
                    <span></span>
                    <p>{{this.policy.name}}</p>
          </div>-->
          <div class="examination-teachers-bottom" v-html="this.policy.content"></div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="examination-teachers">
          <!-- <div class="examination-teachers-top">
                    <span></span>
                    <p>升学资讯</p>
          </div>-->
          <ul class="mui-table-view">
            <li
              class="mui-table-view-cell"
              v-for="item in news"
              :key="item.id"
              @click="toArticlea(item.id)"
            >
              <span class="mui-pull-left">{{item.title}}</span>
              <span class="mui-pull-right">{{item.create_time}}</span>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="examination-teachers">
          <!-- <div class="examination-teachers-top">
                    <span></span>
                    <p>升学报告</p>
          </div>-->
          <ul class="mui-table-view">
            <li
              class="mui-table-view-cell"
              v-for="item in report"
              :key="item.id"
              @click="toArticle(item.id)"
            >
              <span class="mui-pull-left">{{item.title}}</span>
              <span class="mui-pull-right">{{item.create_time}}</span>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
// import unit from "../unit.js";
export default {
  name: "page-navbar",
  data() {
    return {
      seselected: "1",
      page: 1,
      policy: [],
      news: [],
      report: []
    };
  },
  created() {
    axios
      .post("http://ssjy.public.5151fw.com/index/api/category_show", {
        id: 26
      })
      .then(resp => {
        this.policy = resp.data.data;
      });

    axios
      .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        type: 27,
        pagesize: 13
      })
      .then(resp => {
        this.news = resp.data.data.data;
      });
    let reportid = {
      type: 28,
      pagesize: 13
    };
    axios
      .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        type: 28,
        pagesize: 13
      })
      .then(resp => {
        this.report = resp.data.data.data;
      });
  },
  mounted: function() {
    window.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件
    // var self=this;
    // pushHistory()
    // window.addEventListener('popstate', function(e) {
    //     self.$router.back()
    // }, false)

    // function pushHistory() {
    //     var state = {
    //     title: 'title',
    //     url: '#'
    //     }
    //     window.history.pushState(state, 'title', '#')
    // }
  },
  methods: {
    toArticlea(id) {
      // let routeUrl = this.$router.resolve({
      //   path: `/campusD/${id}`
      // });
      // window.open(routeUrl.href, "_blank");
      this.$router.push({ path: `/campusD/${id}` });
    },
    toArticle(id) {
      // let routeUrl = this.$router.resolve({
      //   path: `/examinationD/${id}`
      // });
      // window.open(routeUrl.href, "_blank");
      this.$router.push({ path: `/examinationD/${id}` });
    },
    handleScroll() {
      let clientHeight = document.body.clientHeight;
      let scrollObj = document.getElementsByClassName("app-mine");
      let scrollTop = scrollObj[0].scrollTop;
      let scrollHeight = scrollObj[0].scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight + 80) {
        let newsid = {
          type: 27,
          page: ++this.page
        };
        let reportid = {
          page: ++this.page,
          type: 28
        };
        axios
          .post(
            "http://ssjy.public.5151fw.com/index/api/category_article",
            {
          page: ++this.page,
          type: 28
        }
          )
          .then(resp => {
            var data = resp.data.data.data;
            var arr = this.news;
            for (var i in data) {
              arr.push(data[i]);
            }
            this.news = arr;
          });
        axios
          .post(
            "http://ssjy.public.5151fw.com/index/api/category_article",
            qs.stringify(reportid)
          )
          .then(resp => {
            var data = resp.data.data.data;
            var arr = this.report;
            for (var i in data) {
              arr.push(data[i]);
            }
            this.report = arr;
          });
      }
    }
  }
};
</script>

<style scoped>
.examination {
  margin-top: 20px;
}
.examination-teachers {
  background: #fff;
  margin-bottom: 20px;
}
.examination-teachers-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.examination-teachers-top span {
  margin-top: 20px;
  display: block;
  width: 3px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.examination-teachers-top p:nth-child(2) {
  float: left;
  font-size: 26px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.examination-teachers-bottom {
  line-height: 1.5;
  overflow: hidden;
  min-height: 500px;
  padding: 20px 30px;
}
.examination-teachers-bottom {
  max-width: 100%;
}
.mui-table-view {
  min-height: 420px;
  padding: 20px 30px;
  font-size: 18px;
}
.mui-pull-left {
  display: block;
  float: left;
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mui-pull-right {
  display: block;
  float: right;
}
.mui-table-view-cell {
  font-size: 28px;
  height: 29px;
  margin-bottom: 34px;
}
</style>
<style>
.examination-teachers-bottom span {
  /* font-size: 24px !important; */
  line-height: 1.5 !important;
  font-size: 32px !important;
}
.examination-teachers-bottom table {
  width: 690px !important;
  font-size: 24px !important;
  background: #fff !important;
  text-align: center;
}
.examination-teachers-bottom img {
  width: 650px !important;
}
</style>
