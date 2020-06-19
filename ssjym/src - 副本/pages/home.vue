<template>
  <div class="home">
    <div class="contact">
      <div class="contact-top">
        <ul>
          <li v-for="item in list" :key="item.id" @click="toUrl">{{item.title}}</li>
        </ul>
      </div>
      <div class="contact-bottom">
        <div class="contact-bottom-right">
          <span>
            <a :href="'tel:'+this.mobilea">点击电话：{{this.mobilea}}咨询</a>
          </span>
        </div>
      </div>
    </div>
    <div class="major">
      <div class="major-top">
        <span></span>
        <p>招生专业</p>
        <router-link :to="{name:'major'}">更多 ></router-link>
      </div>
      <div class="major-bottom">
        <ul>
          <li v-for="item in major" :key="item.id">
            <div class="pic">
              <img :src="host+item.thumb" @click.stop="toMajorD(item.id)" />
            </div>
            <div class="title">
              <p>{{item.title}}</p>
              <a @click.stop="toMajorD(item.id)">专业详情</a>
              <a href="https://tb.53kf.com/code/client/3a9d5a2b9d4fd553ae193d55dbb7cf064/2">点击咨询</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="information">
      <div class="information-top">
        <span></span>
        <p>猜你想知道</p>
      </div>
      <div class="information-bottom">
        <a href="https://tb.53kf.com/code/client/3a9d5a2b9d4fd553ae193d55dbb7cf064/2">
          <ul>
            <li>学费是多少？</li>
            <li>能不能上大专？</li>
            <li>如何能保障就业？</li>
            <li>有没有高考班？</li>
            <li>现在什么专业最热门？</li>
            <li>学校管理怎么样？</li>
          </ul>
        </a>
        <div class="button">
          <img src="../assets/comments.png" />
          <p>
            <a
              href="https://tb.53kf.com/code/client/3a9d5a2b9d4fd553ae193d55dbb7cf064/2"
            >在线咨询 学费 课程 就业</a>
          </p>
        </div>
      </div>
    </div>
    <div class="campus">
      <div class="campus-top">
        <span></span>
        <p>校园展示</p>
        <router-link :to="{name:'campus'}">更多 ></router-link>
      </div>
      <ul>
        <li v-for="item in campus" :key="item.id" @click="toCampus">
          <div class="pic2">
            <img :src="host+item.thumb" />
          </div>
          <p>{{item.title}}</p>
        </li>
      </ul>
      <div class="campus-bottom">
        <div class="campus-bottom-right">
          <span>
            <a :href="'tel:'+this.mobilea">点击电话：{{this.mobilea}}咨询</a>
          </span>
        </div>
      </div>
    </div>
    <div class="news">
      <div class="news-top">
        <span></span>
        <p>学校资讯</p>
        <router-link :to="{name:'examination'}">更多 ></router-link>
      </div>
      <div class="news-bottom">
        <ul>
          <li v-for="item in news" :key="item.id" @click="toExamination(item.id)">
            <a>{{item.title}}</a>
            <a>{{item.create_time}}</a>
          </li>
        </ul>
        <div class="online">
          <a href="https://tb.53kf.com/code/client/3a9d5a2b9d4fd553ae193d55dbb7cf064/2">
            <img src="../assets/comments.png" />在线咨询 学费 课程 就业
          </a>
        </div>
      </div>
    </div>
    <div class="tzgg">
      <div class="tzgg-top">
        <span></span>
        <p>通知公告</p>
        <!-- <router-link :to="{name:'examination'}">更多 ></router-link> -->
      </div>
      <div class="tzgg-bottom">
        <ul>
          <li v-for="item in tzgg" :key="item.id" @click="toExamination(item.id)">
            <a>{{item.title}}</a>
            <a>{{item.create_time}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="sub">
      <div class="sub-top">
        <span></span>
        <p>留下你的【姓名+电话】可以获取最新招生简章</p>
      </div>
      <div class="sub-bottom">
        <div class="sub-bottom-top">
          学生姓名：
          <input class="ipt1" type="text" v-model="name" />
        </div>
        <div class="sub-bottom-center">
          联系电话：
          <input class="ipt2" type="text" v-model="mobile" />
        </div>
        <div class="sub-bottom-bottom" @click="subFrom">提交信息</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import axios from "axios";
import qs from "qs";
// import { plus } from "../unit.js";
export default {
  data() {
    return {
      name: [],
      mobile: [],
      mobilea: [],
      major: [],
      host: "http://ssjy.public.5151fw.com",
      campus: [],
      news: [],
      phone: [],
      list: [],
      tzgg: []
    };
  },
  created() {
    this.$ajax.getConfig().then(resp => {
      // console.log(resp,'getConfig')
      this.mobilea = resp.data.data.mobile;
      //// console.log(this.phone)
    });
    this.$ajax.getIndex().then(resp => {
      ////console.log(resp)
      this.phone = resp.data.data.mobile;
      //// console.log(this.phone)
    });
    this.$ajax.getList().then(resp => {
      ////console.log(resp)
      this.list = resp.data.data.splice(0, 4);
      ////console.log(this.list)
      //// console.log(this.phone)
    });

    // let newsid = {
    //     type: 27
    // }

    let tzid = {
      type: 4,
      pagesize: 4
    };
    this.$axios.post("http://ssjy.public.5151fw.com/index/api/category_article", {
        type: 16
      })
      .then(resp => {
        this.major = resp.data.data.data.splice(0, 4);
        // console.log(this.major, "aasasasas");
      });
    this.$axios
      .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        type: 34
      })
      .then(resp => {
        // console.log(resp, "fefwefwe");
        this.campus = resp.data.data.data.splice(0, 4);
      });
    this.$axios
      .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        type: 31
      })
      .then(resp => {
        //// console.log(resp)
        this.news = resp.data.data.data;
        //  console.log(this.news)
      });
    this.$axios
      .post("http://ssjy.public.5151fw.com/index/api/category_article", {
        type: 4,
        pagesize: 4
      })
      .then(resp => {
        //// console.log(resp)
        this.tzgg = resp.data.data.data;
        //  console.log(this.news)
      });
  },
  mounted() {
    //     var pushHistory = function() {
    //         var state = {
    //           title: 'title',
    //           url: '#'
    //         }
    //         window.history.pushState(state, 'title', '#')
    //       }
    //pushHistory()
  },
  methods: {
    toMajorD(id) {
      ////console.log(id)
      let _that = this;
      _that.scrollTop -= 50;
      document.getElementsByClassName("app-mine")[0].scrollTop =
        _that.scrollTop;
      // let routeUrl = this.$router.resolve({
      //   path: `/majorD/${id}`
      // });
      // window.open(routeUrl.href, "_blank");
      this.$router.push({ path: `/majorD/${id}` });
    },
    toUrl() {
      // let routeUrl = this.$router.resolve({
      //   path: `/examination`
      // });
      // window.open(routeUrl.href, "_blank");
      this.$router.push({ path: `/examination` });
      //window.navigate(e)
      ////console.log(e)
    },
    toCampus() {
      // console.log(111);
    },
    subFrom() {
      let pramas = {
        name: this.name,
        mobile: this.mobile
      };
      axios
        .post(
          "http://ssjy.public.5151fw.com/index/api/add_mobileEnroll",
          qs.stringify(pramas)
        )
        .then(resp => {
          if (resp.data.code === 200) {
            Toast("提交成功");
          } else {
            Toast("提交失败");
          }
          this.name = [];
          this.mobile = [];
        });
    },
    toCampus() {
      // let routeUrl = this.$router.resolve({
      //   path: `/campus`
      // });
      // window.open(routeUrl.href, "_blank");
      this.$router.push({ path: `/campus` });
    },
    toExamination(id) {
      let _that = this;
      _that.scrollTop -= 50;
      document.getElementsByClassName("app-mine")[0].scrollTop =
        _that.scrollTop;

      // let routeUrl = this.$router.resolve({
      //   path: `/campusD/${id}`
      // });
      // window.open(routeUrl.href, "_blank");

      this.$router.push({ path: `/campusD/${id}` });
    }
  }
};
</script>

<style scoped>
.home {
  padding-top: 20px;
  width: 100%;
  overflow-x: hidden;
  min-height: 3960px;
  background: #eee;
}
.contact {
  margin-top: 20px;
  width: 100%;
  height: 330px;
  background: #fff;
}
.contact-top ul {
  padding: 30px 35px;
  height: 220px;
}
.contact-top ul li {
  float: left;
  text-align: center;
  width: 330px;
  height: 70px;
  padding: 0px 20px;
  font-size: 26px;
  font-weight: 400;
  line-height: 70px;
  border-radius: 15px 2px 15px 2px;
  background: rgba(239, 239, 239, 1);
}
.contact-bottom {
  height: 87px;
  text-align: center;
}
.contact-bottom-right {
  height: 100%;
  background: #9f2020;
}
.contact-bottom-right span {
  line-height: 87px;
  color: #ffffff;
  font-weight: bold;
}
.contact-bottom-right a {
  color: #ffffff;
  font-size: 36px;
  text-align: center;
}
.major {
  height: 970px;
  background: #fff;
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
  font-size: 32px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.major-top a {
  font-size: 28px;
  float: right;
  line-height: 75px;
  margin-right: 29px;
}
.major-bottom ul {
  height: 890px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 30px;
}
.major-bottom ul li {
  width: 330px;
  height: 400px;
  border: 1px solid rgba(245, 245, 245, 1);
  margin-bottom: 25px;
}
.major-bottom ul li .pic img {
  width: 330px;
  height: 250px;
}
.title p {
  font-size: 24px;
  line-height: 67px;
  text-align: center;
  overflow: hidden;
}
.title a {
  display: block;
  width: 130px;
  height: 40px;
  border-radius: 10px 2px 10px 2px;
  background: #9f2020;
  float: left;
  color: #fff;
  font-size: 26px;
  line-height: 40px;
  text-align: center;
  margin-left: 25px;
}
.title a:nth-child(2) {
  background: #20569f;
}
.information {
  height: 500px;
  background: #fff;
  margin-bottom: 20px;
}
.information-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.information-top span {
  margin-top: 20px;
  display: block;
  width: 5px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.information-top p:nth-child(2) {
  float: left;
  font-size: 32px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.information-bottom ul {
  width: 100%;
  padding: 31px 35px;
  height: 312px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.information-bottom ul li {
  width: 330px;
  height: 70px;
  background: #efefef;
  border-radius: 15px 2px 15px 2px;
  text-align: center;
  line-height: 70px;
  font-size: 28px;
  margin-top: 7px;
}
.information-bottom .button {
  width: 750px;
  height: 80px;
  background: #9f2020;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.information-bottom .button img {
  width: 46px;
  height: 44px;
  margin-top: 21px;
  margin-right: 28px;
}
.information-bottom .button p {
  line-height: 80px;
  color: #fff;
  font-size: 38px;
}
.information-bottom .button a {
  width: 100%;
  height: 100%;
  color: #ffffff;
}
.campus {
  height: 850px;
  background: #fff;
  margin-bottom: 20px;
}
.campus-top {
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
  font-size: 32px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.campus-top a {
  font-size: 28px;
  float: right;
  line-height: 75px;
  margin-right: 29px;
}
.campus ul {
  width: 100%;
  height: 660px;
  padding: 30px 30px 22px 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.campus ul li {
  width: 330px;
  height: 303px;
}
.campus ul li .pic2 img {
  width: 330px;
  height: 230px;
}
.campus ul li p {
  height: 73px;
  line-height: 73px;
  text-align: center;
  font-size: 28px;
  font-weight: 400;
}
.campus-bottom {
  height: 87px;
  text-align: center;
}
.campus-bottom-right {
  height: 100%;
  background: #9f2020;
}
.campus-bottom-right span {
  line-height: 87px;
  color: #ffffff;
  font-weight: bold;
}
.campus-bottom-right a {
  color: #ffffff;
  font-size: 36px;
  text-align: center;
}
.contact {
  margin-top: 20px;
  width: 100%;
  height: 330px;
  background: #fff;
}
.contact-top ul {
  padding: 30px 35px;
  display: flex;
  height: 220px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.contact-top ul li {
  text-align: center;
  height: 70px;
  padding: 0px 20px;
  font-size: 28px;
  font-weight: 400;
  line-height: 70px;
  border-radius: 15px 2px 15px 2px;
  background: rgba(239, 239, 239, 1);
}
.contact-top ul li:nth-child(1) {
  padding: 0 36px;
  margin-bottom: 15px;
}
.contact-top ul li:nth-child(2) {
  padding: 0 73px;
}
.contact-bottom {
  height: 87px;
}
.contact-bottom-left {
  width: 173px;
  height: 87px;
  float: left;
  margin-left: 70px;
  display: flex;
  margin-right: 12px;
}
.contact-bottom-left img {
  width: 88px;
}
.contact-bottom-left p {
  line-height: 1;
  margin-top: 10px;
  font-size: 36px;
  color: #20569f;
  font-weight: bold;
  text-align: center;
  margin-left: 8px;
}
.contact-bottom-right {
  height: 100%;
}
.news {
  background: #fff;
  margin-bottom: 20px;
}
.news-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.news-top span {
  margin-top: 20px;
  display: block;
  width: 5px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.news-top p:nth-child(2) {
  float: left;
  font-size: 32px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.news-top a {
  font-size: 28px;
  float: right;
  line-height: 75px;
  margin-right: 29px;
}
.news-bottom {
  min-height: 650px;
}
.news-bottom ul {
  padding: 34px 32px 31px 30px;
  min-height: 475px;
}
.news-bottom ul li {
  margin-bottom: 34px;
  display: flex;
  justify-content: space-between;
}
.news-bottom ul li a {
  font-size: 28px;
  color: #333333;
}
.news-bottom ul li a:visited {
  color: #9f2020;
}
.news-bottom ul li a:nth-child(1) {
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.news-bottom ul li a:nth-child(2) {
  float: right;
}
.news-bottom ul li:last-child {
  margin-bottom: 30px;
}
.news-bottom ul li span {
  float: right;
}
.online {
  width: 750px;
  height: 80px;
  background: #9f2020;
  text-align: center;
  margin: 0 auto;
  color: #fff;
  font-size: 36px;
  line-height: 80px;
}
.online a {
  width: 100%;
  height: 100%;
  display: block;
  color: #ffffff;
}
.online img {
  width: 44px;
  margin-right: 30px;
}
.sub {
  background: #fff;
  margin-bottom: 20px;
}
.sub-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.sub-top span {
  margin-top: 20px;
  display: block;
  width: 5px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.sub-top p:nth-child(2) {
  float: left;
  font-size: 32px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.sub-top p:nth-child(3) {
  font-size: 32px;
  float: right;
  line-height: 70px;
  margin-right: 29px;
}
.sub-bottom {
  padding: 30px;
  height: 350px;
}
.sub-bottom div {
  height: 80px;
  line-height: 80px;
  margin-bottom: 20px;
  font-size: 28px;
}
.sub-bottom input {
  font-size: 24px;
  width: 520px;
  height: 80px;
  border: 2px solid #666;
  padding-left: 20px;
  border-radius: 10px;
}
.sub-bottom input:focus {
  border: 1px solid #9f2020;
  border-radius: 10px;
}
.sub-bottom-bottom {
  width: 520px;
  margin-left: 140px;
  background: #9f2020;
  text-align: center;
  color: #fff;
  border-radius: 15px;
  font-size: 29px;
  margin-bottom: 0px;
}
.zuihou {
  width: 42.5%;
}
.diyi {
  width: 49.4%;
}
.dier {
  width: 49%;
}
.disan {
  width: 56%;
}
.tzgg {
  background: #fff;
  margin-bottom: 20px;
}
.tzgg-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.tzgg-top span {
  margin-top: 20px;
  display: block;
  width: 5px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.tzgg-top p:nth-child(2) {
  float: left;
  font-size: 32px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.tzgg-top a {
  font-size: 28px;
  float: right;
  line-height: 75px;
  margin-right: 29px;
}
.tzgg-bottom {
}
.tzgg-bottom ul {
  padding: 34px 32px 31px 30px;
  min-height: 150px;
}
.tzgg-bottom ul li {
  margin-bottom: 34px;
  display: flex;
  justify-content: space-between;
}
.tzgg-bottom ul li a {
  font-size: 28px;
  color: #333333;
}
.tzgg-bottom ul li a:visited {
  color: #9f2020;
}
.tzgg-bottom ul li a:nth-child(1) {
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tzgg-bottom ul li a:nth-child(2) {
  float: right;
}
.tzgg-bottom ul li:last-child {
  margin-bottom: 30px;
}
.tzgg-bottom ul li span {
  float: right;
}
</style>
