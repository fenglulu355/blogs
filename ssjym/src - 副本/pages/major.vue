<template>
  <div class="major">
    <mt-navbar class="page-part" v-model="seselected">
      <mt-tab-item id="1">专业介绍</mt-tab-item>
      <mt-tab-item id="2">招生专业</mt-tab-item>
      <mt-tab-item id="3">就业信息</mt-tab-item>
      <mt-tab-item id="4">招生问答</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="seselected">
      <mt-tab-container-item id="1">
        <div class="major-teachers">
          <!-- <div class="major-teachers-top">
                    <span></span>
                    <p>招生专业</p>
          </div>-->
          <div
            class="major-details"
            v-for="(item, index) in majori"
            :key="index"
            @click="toMajorD(item.id)"
          >
            <div class="major-details-left">
              <img :src="host+item.thumb" />
            </div>
            <div class="major-details-right">
              <p class="biaotia">{{item.title}}</p>
              <div class="major-details-right-top">
                <p>{{item.tags}}</p>
              </div>
              <div class="major-details-right-center">
                <p>主要课程：{{item.desc}}</p>
                <p>就业方向：{{item.getjob}}</p>
              </div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="major-teachers">
          <!-- <div class="major-teachers-top">
                    <span></span>
                    <p>{{this.introduce.name}}</p>
          </div>-->
          <div class="major-teachers-bottom" v-html="recruit.content"></div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="major-teachers">
          <!-- <div class="major-teachers-top">
                    <span></span>
                    <p>就业信息</p>
          </div>-->
          <ul class="mui-table-view">
            <li
              class="mui-table-view-cell"
              @click="toArticle(item.id)"
              v-for="(item, index) in information"
              :key="index"
            >
              <span class="mui-pull-left">{{item.title}}</span>
              <span class="mui-pull-right">{{item.create_time}}</span>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div class="major-teachers">
          <!-- <div class="major-teachers-top">
                    <span></span>
                    <p>招生问答</p>
          </div>-->
          <ul class="mui-table-view">
            <li
              class="mui-table-view-cell"
              @click="toArticle(item.id)"
              v-for="(item, index) in introduce"
              :key="index"
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
export default {
  name: "page-navbar",
  data() {
    return {
      seselected: "1",
      major: [],
      page: 1,
      introduce: [],
      information: [],
      recruit: [],
      majori: [],
      host: "http://ssjy.public.5151fw.com"
    };
  },
  created() {
    this.$ajax.getIndex().then(resp => {
      // console.log(resp);
      this.introduce = resp.data.data.splice(25, 1)[0];
    });
    this.$axios
      .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        type: 16,
        pagesize: 999
      })
      .then(resp => {
        // console.log(resp);
        this.majori = resp.data.data.data;
      });

    this.$axios
      .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        type: 17,
        pagesize: 13
      })
      .then(resp => {
        // console.log(resp);
        this.information = resp.data.data.data;
      });
    this.$axios
      .post("http://ssjy.public.5151fw.com/index/api/category_show", {
        id: 15
      })
      .then(resp => {
        // console.log(resp, "rtyr");
        this.recruit = resp.data.data;
      });
    this.$axios
      .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        type: 18,
        pagesize: 13
      })
      .then(resp => {
        this.introduce = resp.data.data.data;
        // console.log(resp, "rtyr");
      });
  },
  mounted: function() {
  // window.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件
  },
  methods: {
    toMajorD(id) {
      //console.log(id)
      this.$router.push({ path: `/majorD/${id}` });
    },
    toArticle(id) {
      this.$router.push({ path: `/majorD/${id}` });
    },
    handleScroll() {
      let clientHeight = document.body.clientHeight;
      let scrollObj = document.getElementsByClassName("app-mine");
      //
      let scrollTop = scrollObj[0].scrollTop;
      let scrollHeight = scrollObj[0].scrollHeight ;
      // console.log(scrollTop + clientHeight);
      // console.log(scrollHeight);
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log(111);
        // this.$axios
        //   .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        //     type: 16,
        //     page: ++this.page
        //   })
        //   .then(resp => {
        //     var data = resp.data.data.data;
        //     var arr = this.information;
        //     for (var i in data) {
        //       arr.push(data[i]);
        //     }
        //     this.information = arr;
        //     console.log(this.information, "  this.information 1");
        //   });
        // this.$axios
        //   .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        //     type: 15,
        //     page: ++this.page
        //   })
        //   .then(resp => {
        //     console.log(resp);
        //     var data = resp.data.data.data;
        //     var arr = this.majori;
        //     for (var i in data) {
        //       arr.push(data[i]);
        //     }
        //     this.majori = arr;
        //   });
        // this.$axios
          // .post("http://ssjy.public.5151fw.com/index/api/category_article", {
          //   type: 18,
          //   page: ++this.page
          // })
          // .then(resp => {
          //   var data = resp.data.data.data;
          //   var arr = this.recruit;
          //   for (var i in data) {
          //     arr.push(data[i]);
          //   }
          //   this.recruit = arr;
          // });
      }
    }
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.major {
  margin-top: 20px;
  background-color: #fff;
  margin-bottom: 20px;
}
.major-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.major-top span {
  margin-top: 20px;
  display: block;
  width: 5px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.major-top p:nth-child(2) {
  float: left;
  font-size: 26px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.major-details {
  height: 240px;
  padding: 20px 30px;
}
.major-details p {
  font-size: 16px;
  line-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.major-details-left {
  width: 250px;
  height: 200px;
  text-align: center;
  overflow: hidden;
  float: left;
  margin-right: 20px;
}
.major-details-left img {
  height: 100%;
}
.major-details-right-top {
  height: 50px;
}
.major-details-right-top p {
  max-width: 400px;
  display: block;
  font-size: 24px;
  padding: 0 20px;
  color: #444;
  background-color: #efefef;
  height: 40px;
  line-height: 40px;
}
.major-details-right-top p:nth-child(1) {
  margin-right: 20px;
}
.major-details-right-center p {
  font-size: 24px;
  line-height: 48px;
}
.major-details-right-center p:nth-child(1) {
}
.major-details-right-bottom a {
  float: left;
  display: block;
  width: 130px;
  height: 40px;
  background: rgba(32, 86, 159, 1);
  border-radius: 15px 2px 15px 2px;
  margin-top: 10px;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.major-details-right-bottom a:nth-child(2) {
  margin-left: 20px;
  background-color: #9f2020;
}
.major {
  margin-top: 20px;
}
.major-teachers {
  background: #fff;
}
.major-teachers-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.major-teachers-top span {
  margin-top: 20px;
  display: block;
  width: 3px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.major-teachers-top p:nth-child(2) {
  float: left;
  font-size: 26px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
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
  height: 29px;
  margin-bottom: 34px;
}
.more_loading {
  min-width: 50px;
  max-width: 120px;
  margin: 0 auto;
  text-align: center;
}
.major-teachers-bottom {
  overflow: hidden;
  line-height: 1.5;
  min-height: 420px;
  padding: 20px 30px;
}
.major-teachers-bottom img {
  max-width: 100%;
}
.mui-pull-left {
  font-size: 28px;
}
.mui-pull-right {
  font-size: 28px;
}
/* .mui-table-view{
    min-height: 420px;
    padding: 20px 30px;
}
.font-box p{
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.left{
    margin-bottom: 20px;
    width: 480px;
    float: left;
}
.font-box .left:last-child{
    margin-bottom: 0px;
}
.right{
    float:right;
} */
.biaotia {
  font-size: 32px !important;
  margin-bottom: 30px;
  font-weight: 600;
}
</style>
<style>
.major-teachers-bottom p {
  /* font-size: 24px!important; */
  line-height: 2 !important;
}
.major-teachers-bottom table {
  width: 690px !important;
  font-size: 24px !important;
  background: #fff !important;
  text-align: center;
}
table span {
  /* font-size: 24px!important; */
  line-height: 1.8;
}
</style>
