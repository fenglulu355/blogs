<template>
  <div class="chfooter">
    <div class="foot-logo">
      <div class="logopic">
        <img src="../assets/footer/LOGO.png" alt />
      </div>
    </div>
    <ul class="foot-tel">
      <li class="telli">
        <div class="icon">
          <img :src="tel[0].icon" alt />
        </div>
        <p>{{tel[0].name}}</p>
        <p class="num">{{webinfo.mobile}}</p>
      </li>
      <li class="telli">
        <div class="icon">
          <img :src="tel[1].icon" alt />
        </div>
        <p>{{tel[1].name}}</p>
        <p class="num">{{webinfo.qq}}</p>
      </li>
      <li class="telli">
        <div class="icon">
          <img :src="tel[2].icon" alt />
        </div>
        <p>{{webinfo.name}}</p>
        <p class="num">{{webinfo.phone}}</p>
      </li>
    </ul>
    <div class="foot-right">
      <div class="location">
        <p class="copyright">{{webinfo.foot_content}}</p>
        <p>公司地址：{{webinfo.address}}</p>
        <p>公司一号基地：{{webinfo.address1}}</p>
        <p>公司二号基地：{{webinfo.address2}}</p>
      </div>
      <ul class="ewm">
        <li>
          <div class="ewmicon">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + baseurl +`/public/`+ webinfo.about_ewm+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </div>
          <p>扫描关注微信公众号</p>
        </li>
        <li>
          <div class="ewmicon">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + baseurl +`/public/`+ webinfo.zx_ewm+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </div>
          <p>扫描关注微信公众号</p>
        </li>
        <li>
          <div class="ewmicon">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + baseurl +`/public/`+ webinfo.ewm3                + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </div>
          <p>扫描关注微信公众号</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import httpUrl from "../utils/url";

export default {
  name: "chfooter",
  data() {
    return {
      baseurl: "",
      webinfo: [],
      res: [],
      tel: [
        {
          icon: require("../assets/footer/dbtel.png"),
          name: "工程技术热线:",
          num: "028-8954 1286"
        },
        {
          icon: require("../assets/footer/dbem.png"),
          name: "微信号:",
          num: "18982182772"
        },
        {
          icon: require("../assets/footer/dbhp.png"),
          name: "袁先生(副总):",
          num: "18982182772"
        }
      ]
    };
  },
  created() {
    this.requstWeb();
    this.baseurl = httpUrl.httpUrl;
  },
  methods: {
    requstWeb() {
      this.$axios.post("/index/api/web_config").then(res => {
        this.webinfo = res.data.data;
        // console.log(this.webinfo, "  this.webinfo ");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.chfooter {
  background: #111111;
  width: 100%;
  min-width: 1200px;
  height: 200px;
  display: flex;
  color: #888888;
  font-size: 14px;
  .foot-logo {
    width: 13%;
    .logopic {
      width: 150px;
      margin: 30px auto;
      img {
        width: 100%;
      }
    }
  }
  .foot-tel {
    width: 30%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    li {
      box-sizing: border-box;
      text-align: center;
      .icon {
        padding: 55px 0 11px 0;
        width: 50px;
        margin: 0px auto;
        img {
          width: 100%;
        }
      }
      p {
        padding-top: 6px;
      }
    }
  }
  .foot-right {
    width: 57%;
    display: flex;
    .location {
      box-sizing: border-box;
      width: 58%;
      height: 85px;
      margin-top: 60px;
      padding-left: 20px;
      line-height: 24px;
      .copyright {
        color: #82c41c;
      }
    }
    .ewm {
      width: 42%;
      display: flex;
      justify-content: space-around;
      li {
        width: 130px;
        margin-top: 50px;
        .ewmicon {
          width: 85px;
          height: 85px;
          margin: 0 auto;
          background: #82c41c;
          .mainpic {
            width: 100%;
            height: 100%;
          }
        }
        p {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>