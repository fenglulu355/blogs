<template>
  <div class="active">
    <banner></banner>
    <ul class="navlists">
      <li v-for="(item, index) in navli" :key="index" @click="shownav(index)">
        <img :src="item.icon" alt />
        <p class="ct">{{item.ct}}</p>
        <p class="et">{{item.et}}</p>
      </li>
    </ul>
    <div class="policy" v-show="cueindex==0">
      <titles :titles="{title:'政策',ename:'POLICY',type:0}"></titles>
      <ul class="pro-list">
        <li
          class="proli"
          v-for="(item, index) in policy.child"
          :key="index"
          :class="curmineli ==index?'selmine':''"
          @click="tonav(index,item)"
        >
          <div class="picbox">
            <img class="mainpic" :src="httpUrl+ item.image_url" alt />
          </div>
          <!-- <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + item.icon+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>-->
          <p class="title">{{item.article_title}}</p>
          <p class="titles">{{item.titles}}</p>
          <p class="text" v-html="item.article_content"></p>
          <p class="btn">
            <span>查看详情</span>
          </p>
        </li>
      </ul>
      <p class="tomore">
        查看全部
        <span>
          <img src="../assets/小箭头.png" alt />
        </span>
      </p>
    </div>
    <div class="policy" v-show="cueindex==2">
      <titles :titles="{title:'活动',ename:'ACTIVITY',type:0}"></titles>
      <ul class="pro-list">
        <li
          class="proli"
          v-for="(item, index) in active.child"
          :key="index"
          :class="curmineli ==index?'selmine':''"
          @click="tonav(index,item)"
        >
          <div class="picbox">
            <img class="mainpic" :src="httpUrl+ item.image_url" alt />
          </div>
          <!-- <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + item.icon+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>-->
          <p class="title">{{item.article_title}}</p>
          <p class="titles">{{item.titles}}</p>
          <p class="text" v-html="item.article_content"></p>
          <p class="btn">
            <span>查看详情</span>
          </p>
        </li>
      </ul>
      <p class="tomore">
        查看全部
        <span>
          <img src="../assets/小箭头.png" alt />
        </span>
      </p>
    </div>
    <div class="actives" v-show="cueindex==1">
      <titles :titles="{title:'近期公益',ename:'RECENT PUBLIC INTEREST',type:0}"></titles>
      <ul class="activelist">
        <li
          class="activeli"
          v-for="(item, index) in gy.child"
          :key="index"
          @click="showmask(index)"
        >
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +httpUrl+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div class="mask" :class="maskindex==index?'masksel':''">
            <div class="box">
              <p class="border"></p>
              <p class="title">{{item.article_title}}</p>
              <p class="titles" v-html="item.article_content"></p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <kfooter></kfooter>
  </div>
</template>
<script>
import titles from "../components/titles";
import banner from "../components/banner";
import kfooter from "../components/kfooter";

export default {
  name: "active",
  data() {
    return {
      navli: [
        {
          icon: require("../assets/政策.png"),
          ct: "政策",
          et: "POLICY"
        },
        {
          icon: require("../assets/公益.png"),
          ct: "近期公益",
          et: "RECENT PUBLIC INTEREST"
        },
        {
          icon: require("../assets/活动.png"),
          ct: "活动",
          et: "ACTIVITY"
        }
      ],
      infos: [],
      cueindex: 1,
      curmineli: null,
      active: [],
      policy: [],
      gy: [],
      list: [
        {
          icon: require("../assets/女-1.png"),
          title: "潮膏-小安",
          titles: "让故事长一点，再长一点",
          content:
            "明天是我国第11个全国防灾减灾日，今年的主题是“提高灾害防治能力，构建生命安全防线”，5月6日至12日为防灾减灾宣传周。"
        },
        {
          icon: require("../assets/banner.png"),
          title: "潮膏-小安",
          titles: "让故事长一点，再长一点",
          content:
            "明天是我国第11个全国防灾减灾日，今年的主题是“提高灾害防治能力，构建生命安全防线”，5月6日至12日为防灾减灾宣传周。"
        },
        {
          icon: require("../assets/banner.png"),
          title: "潮膏-小安",
          titles: "让故事长一点，再长一点",
          content:
            "明天是我国第11个全国防灾减灾日，今年的主题是“提高灾害防治能力，构建生命安全防线”，5月6日至12日为防灾减灾宣传周。"
        }
      ],
      maskindex: null
    };
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.request();
  },
  methods: {
    request() {
      this.$axios
        .post("/index/api/getClassArticlesAll", { type: 1 })
        .then(res => {
          this.infos = res.data.data;
          for (let i = 0; i < this.infos.length; i++) {
            if (this.infos[i].class_name == "活动") {
              this.active = this.infos[i];
            } else if (this.infos[i].class_name == "近期公益") {
              this.gy = this.infos[i];
            } else if (this.infos[i].class_name == "政策") {
              this.policy = this.infos[i];
            }
          }
          console.log(this.active);
        });
    },
    shownav(index) {
      this.cueindex = index;
    },
    tonav(index, item) {
      this.curmineli = index;
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
    },
    showmask(index) {
      this.maskindex = index;
    }
  },
  components: {
    kfooter,
    banner,
    titles
  }
};
</script>
<style lang="less" scoped>
.navlists {
  width: 90%;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  li {
    background: #c2cad8;
    width: 100%;
    height: 200px;
    text-align: center;
    color: #454545;
    .ct {
      font-weight: bold;
      font-size: 18px;
    }
    .et {
      font-size: 14px;
      box-sizing: border-box;
      padding-top: 10px;
    }
    img {
      height: 50px;
      box-sizing: border-box;
      margin: 20px 0;
    }
  }
}
.policy {
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 50px 0px;
  .pro-list {
    width: 100%;
    margin: 0 auto;
    .proli {
      width: 100%;
      border: 1px solid #959595;
      margin-bottom: 30px;
      box-sizing: border-box;
      padding: 20px 20px;

      .mainpic {
        width: 100%;
        height: 100%;
        // margin: 0 auto;
        // height: 360px;
      }
      .title,
      .titles {
        font-size: 30px;
        line-height: 50px;
      }
      .titles {
        box-sizing: border-box;
        padding-bottom: 10px;
      }
      .text {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .btn {
        position: relative;
        height: 100px;
        span {
          color: white;
          position: absolute;
          right: 0;
          top: 30px;
          display: inline-block;
          width: 180px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #959595;
        }
      }
    }
    .selmine {
      border: 1px solid #f5d02c;
      .btn {
        span {
          background: #f5d02c;
        }
      }
    }
  }
  .tomore {
    box-sizing: border-box;
    padding: 10px 0;
    text-align: right;
    //   color: white;
    img {
      width: 15px;
      position: relative;
      bottom: 3px;
      left: 2px;
    }
  }
}
.actives {
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 50px 0px;
  .activelist {
    width: 100%;
    .activeli {
      width: 100%;
      height: 600px;
      margin-bottom: 20px;

      position: relative;
      .mainpic {
        width: 100%;
        height: 600px;
      }
      .mask {
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        color: rgba(255, 255, 255, 0.9);
        font-size: 28px;
        box-sizing: border-box;
        opacity: 0;
        .box {
          // background: olive;
          position: absolute;
          bottom: 30px;
          box-sizing: border-box;
          padding: 0 10%;
        }
        .border {
          width: 10%;
          height: 2px;
          background: #f5d02c;
        }
        .title {
          // background: salmon;
          box-sizing: border-box;
          padding: 30px 0 20px 0;
        }
        
      }
      .masksel {
        transition: all 0.5s ease;
        opacity: 1;
      }
    }
  }
}
</style>