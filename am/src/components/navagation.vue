<template>
  <div class="navagation">
    <div class="flexbox">
      <div class="topbox clearFix">
        <div
          @click="tohome"
          class="logo fl"
          :style="{backgroundImage: 'url(' + require('../assets/navagation/logo.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <p class="logotitle">爱丽丝景观</p>
        <div
          @click="isnav = !isnav"
          class="menu fr"
          :style="{backgroundImage: 'url(' + require('../assets/navagation/menu.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <ul class="list" v-show="isnav">
          <li
            class="navli"
            v-for="(item, index) in navli"
            :key="index"
            :class="curindex==index?'sel':''"
            @click="topath(index,item)"
          >{{item.name}}</li>
        </ul>
        <div class="nonebox" v-show="isnav" @click="isnav = !isnav"></div>
      </div>
    </div>

    <div
      class="bgbox"
      :style="{backgroundImage: 'url(' + require('../assets/navagation/bg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
    >
      <div
        class="eng"
        :style="{backgroundImage: 'url(' + require('../assets/navagation/eng.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>

      <h1>花园私人订制</h1>
      <h2>尊享舒适生活</h2>
      <p>PRIVETE CUSTOM GARODEN ENJOY COMFORTABLE LIFE</p>
    </div>
    <div class="voicebox clearFix">
      <van-notice-bar backgroundColor="#FBF8FB" color="#666666" left-icon="volume-o" :text="msg" />
    </div>
    <div class="searchbox">
      <input @click="isfocus = true" type="text" v-model="searchipt" :placeholder="searchipt" />

      <div
        class="search"
        :style="{backgroundImage: 'url(' + require('../assets/navagation/search.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
      <div class="searchli" v-show="isfocus">
        <p @click="searchs($event)" id="1">
          {{searchipt}}
          <span @click="searchs($event)" id="3">视频</span>
        </p>
        <p @click="searchs($event)" id="2">
          {{searchipt}}
          <span @click="searchs($event)" id="4">案例</span>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "navagation",
  inject: ["reload"],
  data() {
    return {
      isfocus: false,
      searchipt: "别墅景观",
      isnav: false,
      curindex: 0,
      navli: [
        { name: "首页", path: "/" },
        { name: "案例展示", path: "/cases" },
        { name: "视频赏析", path: "/appreciation" },
        { name: "业务范围", path: "/business" },
        { name: "客户评价", path: "/evaluate" },
        { name: "关于我们", path: "/about" },
        { name: "联系我们", path: "/contact" }
      ],
      mark: 0,
      timer: null,
      viocetimer: null,
      msg:
        "四川爱丽丝景观工程有限公司是一家专业从事私家花园设计施工的景观公司，公司坐落在花卉产业集中的三圣乡花市，和其他个体经营不同的是，公司采用一站式花园服务理念，"
    };
  },
  created() {},
  methods: {
    tosearch() {
      let keywords = this.searchipt.replace(/<\/?[^>]*>/g, "");
      this.$router.push({ path: "/cases", query: { keywords: keywords } });
      this.isfocus = false;
      this.searchipt = keywords;
      document.body.scrollTop = document.documentElement.scrollTop = 300;
      this.reload();
    },
    searchs(e) {
      let id = e.target.id;
      let keywords = this.searchipt.replace(/<\/?[^>]*>/g, "");
      if (id == "1" || id == "3") {
        this.$router.push({
          path: "/appreciation",
          query: { keywords: keywords }
        });
        this.isfocus = false;
        this.searchipt = keywords;
        document.body.scrollTop = document.documentElement.scrollTop = 300;
        this.reload();
      } else {
        this.$router.push({ path: "/cases", query: { keywords: keywords } });
        this.isfocus = false;
        this.searchipt = keywords;
        document.body.scrollTop = document.documentElement.scrollTop = 300;
        this.reload();
      }
      // console.log(id);
    },
    tohome() {
      this.$router.push({ path: "/" });
    },
    topath(index, item) {
      this.curindex = index;
      this.$router.push({ path: item.path });
      console.log(window.history.length);
      this.reload();
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.navagation {
  width: 100%;
  .flexbox {
    // background: brown;
    width: 100%;
    // height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11111;
    .topbox {
      width: 100%;
      height: 125px;
      background: RGBA(51, 148, 43, 1);
      position: relative;
      .logo {
        width: 81px;
        height: 81px;
        position: relative;
        top: 23px;
        left: 25px;
      }
      .logotitle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 130px;
        font-size: 35px;
        font-weight: lighter;
        color: white;
      }
      .menu {
        width: 61px;
        height: 48px;
        position: relative;
        top: 41px;
        right: 25px;
      }
      .list {
        position: absolute;
        right: 0;
        z-index: 11;
        top: 125px;
        width: 45%;
        background: #33942b;
        .navli {
          width: 100%;
          color: white;
          text-align: center;
          font-size: 25px;
          height: 80px;
          line-height: 80px;
          border-bottom: 1px solid white;
        }
        .sel {
          background: white;
          color: #33942b;
        }
      }
      .nonebox {
        // background: brown;
        width: 100%;
        height: 2000px;
      }
    }
  }
  .bgbox {
    width: 100%;
    height: 440px;
    color: white;
    text-align: center;
    box-sizing: border-box;
    margin-top: 125px;
    padding-top: 109px;
    .eng {
      width: 371px;
      height: 90px;
      margin: 0 auto;
    }
    h1 {
      font-size: 67px;
      font-weight: bold;
    }
    h2 {
      font-size: 46px;
    }
    p {
      font-size: 14px;
    }
  }
  .viocebox {
    width: 100%;
    height: 90px;
    background: #fbf8fb;
  }
  .searchbox {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 25px 0;
    position: relative;
    input {
      width: 90%;
      height: 60px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(210, 210, 210, 0.85);
      border-radius: 30px;
      box-sizing: border-box;
      padding: 0 90px 0 30px;
      &::placeholder {
        color: rgba(102, 102, 102, 1);
        font-size: 24px;
      }
    }
    .search {
      width: 38px;
      height: 38px;
      position: absolute;
      right: 10%;
      bottom: 35px;
    }
    .searchli {
      text-align: left;
      position: absolute;
      top: 90px;
      left: 50%;
      transform: translateX(-50%);
      width: 82%;
      background: rgba(0, 0, 0, 0.15);
      p {
        box-sizing: border-box;
        padding: 0 30px;
        line-height: 40px;
      }

      span {
        color: #33942b;
      }
    }
  }
}
</style>