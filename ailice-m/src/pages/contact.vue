<template>
  <div class="contact" ref="element">
    <tabbar :tabbar="contactinfo"></tabbar>
    <navbar :navbar="contactnav" @changenav="casechangenav"></navbar>
    <div class="telbox" v-show="showindex==0">
      <p class="title">四川爱丽丝景观工程有限公司</p>
      <ul class="list">
        <li>
          <img src="../assets/contact/nav1.png" alt class="mainpic" />
          <div class="infos">
            <p class="text">电话联系：{{tel[0]}} {{name[0]}}</p>
            <p class="text">电话联系：{{tel[1]}} {{name[1]}}</p>
          </div>
        </li>
        <li>
          <img src="../assets/contact/nav2.png" alt class="mainpic" />
          <div class="infos">
            <p class="text">Q Q：{{infos.qq}}</p>
            <p class="text">邮箱：{{infos.email}}</p>
          </div>
        </li>
        <li>
          <img src="../assets/contact/nav3.png" alt class="mainpic" />
          <div class="infos">
            <p class="text">地址：{{infos.address}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="iptbox" v-show="showindex==1"></div>
    <div class="mapbox" v-if="showindex == 2">
      <div class="mapshow">
        <bdmap :mapinfos="infos"></bdmap>
      </div>
    </div>
  </div>
</template>


<script>
import bdmap from "../components/maps";
import httpUrl from "../api/url";
import tabbar from "../components/tabbar";
import navbar from "../components/navbar";
export default {
  name: "contact",
  data() {
    return {
      baseurl: "",
      showindex: 0,
      contactinfo: {
        normal: "联系",
        green: "我们",
        img: require("../assets/contact/eng.png")
      },
      contactnav: [
        { class_name: "联系方式" },
        { class_name: "在线留言" },
        { class_name: "地图导向" }
      ],
      tel: [],
      name: [],
      infos: {},
      bcli: [
        {
          name: "公交",
          icon1: require("../assets/contact/bus.png"),
          icon2: require("../assets/contact/bus-w.png")
        },
        {
          name: "驾车",
          icon1: require("../assets/contact/car.png"),
          icon2: require("../assets/contact/car-w.png")
        }
      ],
      bcindex: 0,
      msgname: "",
      msgtel: "",
      msgtext: ""
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.requst();
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/web_config").then(res => {
        this.infos = res.data.data;
        this.tel = res.data.data.mobile.split(",");
        this.name = res.data.data.name.split(",");
      });
    },
    casechangenav(item, index) {
      this.showindex = index;
    },
    changebcindex(index) {
      this.bcindex = index;
    }
  },
  components: { tabbar, navbar, bdmap }
};
</script>

<style lang="less" scoped>
.contact {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px;
  .telbox {
    box-sizing: border-box;
    padding: 60px 0;
    .title {
      color: rgba(50, 149, 43, 1);
      font-size: 36px;
      font-weight: bold;
      text-align: center;
    }
    .list {
      width: 100%;
      padding-top: 45px;
      border-bottom: 1px solid rgba(205, 205, 205, 1);
      li {
        width: 100%;
        box-sizing: border-box;
        padding: 36px 35px;
        display: flex;
        justify-content: flex-start;
        border-top: 1px solid rgba(205, 205, 205, 1);
        .mainpic {
          width: auto;
          height: 67px;
          position: relative;
          top: 3px;
        }
        .infos {
          color: rgba(102, 102, 102, 1);
          font-size: 30px;
          padding-left: 32px;
          .text {
            position: relative;
            bottom: 2px;
          }
        }
      }
    }
  }
  .iptbox {
    box-sizing: border-box;
    padding: 30px 0;
  }
  .mapbox {
    box-sizing: border-box;
    padding: 60px 0;
    .mapshow {
      width: 100%;
      height: 969px;
    
    }
  }
}
</style>