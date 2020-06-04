<template>
  <div class="campus">
    <div class="campus-top">
      <span></span>
      <p>校园展示</p>
    </div>
    <mt-tab-container v-model="seselected">
      <mt-tab-container-item id="1">
        <div class="campus-teachers">
          <div class="campus-teachers-bottom">
            <ul>
              <li v-for="item in campus" :key="item.id" @click="toPath(item.id)">
                <div class="pic">
                  <img :src="host+item.thumb" />
                  <p>{{item.title}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import unit from "../unit.js";
export default {
  name: "page-navbar",
  data() {
    return {
      seselected: "1",
      page: 1,
      campus: [],
      life: [],
      host: "http://ssjy.public.5151fw.com"
    };
  },
  created() {
    this.$ajax.getIndex(34, 35).then(resp => {
      //console.log(resp)
    });
    let campusid = {
      type: 34,
      pagesize: 999
    };
    let lifeid = {
      type: 35
    };
    axios
      .post(
        "http://ssjy.public.5151fw.com/index/api/category_article",
        qs.stringify(campusid)
      )
      .then(resp => {
        console.log(resp);
        this.campus = resp.data.data.data;
      });
    axios
      .post(
        "http://ssjy.public.5151fw.com/index/api/category_article",
        qs.stringify(lifeid)
      )
      .then(resp => {
        //console.log(resp)
        this.life = resp.data.data.data;
      });
  },
  mounted: function() {
    window.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件

    //   var self=this;
    //   pushHistory()
    //   window.addEventListener('popstate', function(e) {
    //         self.$router.back()
    //   }, false)

    //   function pushHistory() {
    //         var state = {
    //         title: 'title',
    //         url: '#'
    //         }
    //         window.history.pushState(state, 'title', '#')
    //   }
  },
  methods: {
    toPath(id) {
      // let routeUrl = this.$router.resolve({
      //   path: `/majorD/${id}`
      // });
      // window.open(routeUrl.href, "_blank");

      this.$router.push({ path: `/majorD/${id}` });
    },
    handleScroll() {
      let clientHeight = document.body.clientHeight;
      let scrollObj = document.getElementsByClassName("app-mine");
      let scrollTop = scrollObj[0].scrollTop;
      let scrollHeight = scrollObj[0].scrollHeight;
      if (scrollTop + clientHeight == scrollHeight + 184) {
        console.log(123);
        let campusid = {
          page: ++this.page,
          type: 34
        };
        let lifeid = {
          page: ++this.page,
          type: 27
        };
        axios
          .post(
            "http://ssjy.public.5151fw.com/index/api/category_article",
            qs.stringify(campusid)
          )
          .then(resp => {
            //console.log(resp)
            var data = resp.data.data.data;
            var arr = this.campus;
            for (var i in data) {
              arr.push(data[i]);
            }
            this.campus = arr;
            //console.log(this.campus)
          });
        axios
          .post(
            "http://ssjy.public.5151fw.com/index/api/category_article",
            qs.stringify(lifeid)
          )
          .then(resp => {
            var data = resp.data.data.data;
            var arr = this.life;
            for (var i in data) {
              arr.push(data[i]);
            }
            this.life = arr;
          });
      }
    }
  }
};
</script>

<style scoped>
.campus {
  margin-top: 20px;
}
.campus-teachers {
  background: #fff;
  margin-bottom: 20px;
}
.campus-teachers-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.campus-top {
  background: #fff;
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.campus-top span {
  margin-top: 20px;
  display: block;
  width: 5px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.campus-top p:nth-child(2) {
  float: left;
  font-size: 30px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.campus-teachers-top span {
  margin-top: 20px;
  display: block;
  width: 3px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.campus-teachers-top p:nth-child(2) {
  float: left;
  font-size: 26px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.campus-teachers-bottom {
  min-height: 500px;
  padding: 20px 30px;
}
.campus-teachers-bottom ul {
  width: 100%;
  min-height: 660px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.campus-teachers-bottom ul li {
  width: 330px;
  height: 303px;
}
.campus-teachers-bottom ul li .pic img {
  width: 330px;
  height: 230px;
}
.campus-teachers-bottom ul li p {
  height: 73px;
  line-height: 73px;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
}
</style>
<style>
.mint-tab-item-label {
  font-size: 30px !important;
}
</style>
