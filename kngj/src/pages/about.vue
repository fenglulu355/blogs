<template>
  <div class="home">
    <banner></banner>
    <ul class="navlists">
      <li v-for="(item, index) in navli" :key="index" @click="shownav(index)">
        <img :src="item.icon" alt />
        <p class="ct">{{item.ct}}</p>
        <p class="et">{{item.et}}</p>
      </li>
    </ul>
    <div class="content">
      <!-- 公司简介 -->
      <div class="des" v-show="showcur==0">
        <p class="title">{{contentdesc.title}}</p>
        <p class="eg">{{contentdesc.yingwen}}</p>
        <div class="desc" v-html="contentdesc.desc"></div>
        <div class="pics" v-if="contentdesc.image_url">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +httpUrl+ contentdesc.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </div>
      </div>
      <!-- 企业文化 -->
      <div class="culture" v-show="showcur==1">
        <titles :titles="{title:'企业文化',ename:'COMPANY CULTURE',type:0}"></titles>
        <ul class="teamlist">
          <li class="teamli">
            <div class="pics" v-if="corporate.ln_image_url">
              <img class="mainpic" :src="httpUrl+corporate.ln_image_url" alt />
              <!-- <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + httpUrl+corporate.ln_image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>-->
            </div>

            <p class="title">{{corporate.ln}}</p>
            <p class="ename">{{corporate.ln_yingwen}}</p>
            <p class="desc">{{corporate.ln_desc}}</p>
          </li>
          <li class="teamli">
            <div class="pics" v-if="corporate.mb_image_url">
              <img class="mainpic" :src="httpUrl+corporate.mb_image_url" alt />
              <!-- <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + httpUrl+corporate.mb_image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>-->
            </div>

            <p class="title">{{corporate.mb}}</p>
            <p class="ename">{{corporate.mb_yingwen}}</p>
            <p class="desc">{{corporate.mb_desc}}</p>
          </li>
          <li class="teamli">
            <div class="pics" v-if="corporate.pp_image_url">
              <img class="mainpic" :src="httpUrl+corporate.pp_image_url" alt />
              <!-- <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + httpUrl+corporate.pp_image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>-->
            </div>

            <p class="title">{{corporate.pp}}</p>
            <p class="ename">{{corporate.pp_yingwen}}</p>
            <p class="desc">{{corporate.pp_desc}}</p>
          </li>
          <li class="teamli">
            <div class="pics" v-if="corporate.sm_image_url">
              <img class="mainpic" :src="httpUrl+corporate.sm_image_url" alt />
              <!-- <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + httpUrl+corporate.sm_image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>-->
            </div>

            <p class="title">{{corporate.sm}}</p>
            <p class="ename">{{corporate.sm_yingwen}}</p>
            <p class="desc">{{corporate.sm_desc}}</p>
          </li>
        </ul>
        <titles :titles="{title:'价值观诠释',ename:'SICHUAN KENNO',type:1}"></titles>
        <div class="conts">
          <div class="phrase-one">
            <h1 class="abstract">是值得年轻人追逐的理想——</h1>
            <p>
              在大健康发展的竞争洪流中，不忘初心，求品质求服务，坚持“两多一低”的营销理念，
              走出一条属于垦诺的社交电商模式，根植健康理念，实现紧跟时代潮流的多元化发展模式。
              我们有信心成为大健康行业在社交电商中率先被大众认可的品牌公司。
            </p>
          </div>
          <div class="phrase-two">
            <h1 class="abstract">是一个勇敢做自己的使用——</h1>
            <p>
              四川垦诺国际以“勇敢做自己”为企业及品牌的文化核心，并秉承信义为本，垦诺立业，自立自强，
              厚德履道为团队理念。在“中国制造”的产品中寻求突破和创新，垦诺员工愿意用年轻人的方式去传
              承古老的中国文化。
            </p>
          </div>
        </div>
      </div>
      <!-- 团队 -->
      <div class="team" v-show="showcur==2">
        <titles :titles="{title:'团队',ename:'TEAM',type:0}"></titles>
        <titles :titles="{title:'领导团队',ename:'LEADING TEAM',type:1}"></titles>
        <div class="leading" v-for="(item, index) in team" :key="index">
          <div class="left">
            <img src="../assets/多边形1副本2.png" alt />
            <p>{{item.article_zw}}</p>
            <p>{{item.desc}}</p>
          </div>
          <div class="right">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + httpUrl+item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </div>
        </div>
        <titles :titles="{title:'部门设置',ename:'DEPARTMENT SETTING',type:1}"></titles>
        <ul class="partlist">
          <li class="partli" v-for="(item, index) in partli" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + item.icon+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="name">{{item.title}}</p>
            <p class="parts" v-for="(items, index) in item.item" :key="index">{{items}}</p>
          </li>
        </ul>
      </div>
      <!-- 战略规划 -->
      <div class="strategic" v-show="showcur==3">
        <titles :titles="{title:'战略规划',ename:'STRATEGIC PLANNING',type:0}"></titles>
        <ul class="planlist">
          <li class="planli" v-for="(item, index) in planing" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + item.icon+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            >
              <img src="../assets/多边形2.png" alt />
            </div>

            <p class="text">{{item.text}}</p>
          </li>
        </ul>
      </div>
      <!-- 企业责任 -->
      <div class="resb" v-show="showcur==4">
        <titles :titles="{title:'企业责任',ename:'RESPONSIBILITY',type:0}"></titles>
        <ul class="resplist">
          <li class="respli" v-for="(item, index) in respons" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + item.icon+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="title">
              <span>{{item.title}}</span>
            </p>
            <p class="text">{{item.text}}</p>
          </li>
        </ul>
      </div>
      <!-- 荣誉 -->
      <div class="honor" v-show="showcur==5">
        <titles :titles="{title:'企业荣誉',ename:'ENTERPRISE HONOR',type:0}"></titles>
        <ul class="honorlist">
          <li class="honorli" v-for="(item, index) in honorlist" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + item.icon+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="text">{{item.text}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import titles from "../components/titles";
import banner from "../components/banner";
export default {
  name: "home",
  data() {
    return {
      navli: [
        {
          icon: require("../assets/公司简介.png"),
          ct: "公司简介",
          et: "COMPANY PROFILE"
        },
        {
          icon: require("../assets/企业文化.png"),
          ct: "企业文化",
          et: "COMPANY CULTURE"
        },
        {
          icon: require("../assets/团队.png"),
          ct: "团队",
          et: "TEAM"
        },
        {
          icon: require("../assets/战略规划.png"),
          ct: "战略规划",
          et: "STRATEGIC PLANNING "
        },

        {
          icon: require("../assets/企业责任.png"),
          ct: "企业责任",
          et: "RESPONSIBILITY"
        },
        {
          icon: require("../assets/企业荣誉.png"),
          ct: "企业荣誉",
          et: "ENTERPRISE HONOR"
        }
      ],
      content: {},
      contentdesc: "",
      corporate: {},
      team: {},
      showcur: 0,
      partli: [
        {
          icon: require("../assets/组121.png"),
          title: "涉外市场部",
          item: ["电商成交部", "微商成交部", "售后成交部"]
        },
        {
          icon: require("../assets/组14.png"),
          title: "涉内支持部",
          item: ["后勤支持部", "财务管理部", "公司行政部"]
        },
        {
          icon: require("../assets/组13.png"),
          title: "营销决策部",
          item: ["营销策划部", "公司产品部"]
        },
        {
          icon: require("../assets/组12.png"),
          title: "涉外广告部",
          item: ["广告公关部", "广告文案部", "网络媒体部"]
        },
        {
          icon: require("../assets/组16.png"),
          title: "执行配合部",
          item: ["市场培训部", "营销设计部", "新媒体部"]
        }
      ],
      planing: [
        {
          icon: require("../assets/p1.png"),
          text:
            "通过社交媒体、电商平台、移动电商、线下实体等不同渠道齐头并进的方式打造垦诺国际专属流量池，依靠社群经济路线增强市场用户对于产品"
        },
        {
          icon: require("../assets/p2.png"),
          text:
            "通过前端吸粉后端变现的社交电商模式，以强大的流量成交能力不断的为经销商输出交易流量。"
        },
        {
          icon: require("../assets/p3.png"),
          text:
            "公司着力打造绿色健康的产品供应链，打造垦诺品牌，同时自身的产品供应仓能够不断为市场输出高品质产品。多方承力下整个公司以独特的闭环销售链模式，将垦诺国际这一年轻的膏滋品牌打造为大健康产品市场率先被用户认可的品牌。"
        }
      ],
      respons: [
        {
          icon: require("../assets/政府非营利机构.png"),
          title: "对政府",
          text: "遵守法律和市场规律，做一个守法的企业公民。"
        },
        {
          icon: require("../assets/社会信息.png"),
          title: "对社会",
          text: "坚持公益，树立正面的正能量形象。"
        },
        {
          icon: require("../assets/消费者画像.png"),
          title: "对消费者/代理商",
          text: "保证商品的价值（产品价格与质量，性能和服务）。"
        },
        {
          icon: require("../assets/职工管理.png"),
          title: "对职工",
          text: "相当的收入水平、工作的稳定性、良好的工作环境，提升的机会。"
        },
        {
          icon: require("../assets/合同.png"),
          title: "对责权人",
          text: "对合同条款的遵守，保持值得信赖的程度。"
        }
      ],
      honorlist: [
        { icon: require("../assets/2A.png"), text: "中国行业最具影响力品牌" },
        { icon: require("../assets/6a.png"), text: "中国行业优秀创新企业" },
        { icon: require("../assets/8A.png"), text: "中国产品质量放心品牌" }
      ]
    };
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.requst();
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/about").then(res => {
        this.content = res.data.data;
        this.contentdesc = res.data.data.desc;
        this.corporate = res.data.data.corporate;
        this.team = res.data.data.team;
        console.log(this.content);
      });
    },
    shownav(index) {
      this.showcur = index;
    }
  },
  components: { titles, banner }
};
</script>
<style lang="less"  scoped>
.my-swipe {
  height: 800px;
  .mainpic {
    width: 100%;
    height: 100%;
  }
}
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
.content {
  width: 90%;
  margin: 30px auto;
  // 公司简介
  .des {
    box-sizing: border-box;
    padding: 50px 0;
    .title {
      font-size: 30px;
    }
    .eg {
      font-size: 14px;
      color: #7a7a7a;
      box-sizing: border-box;
      padding: 5px 0;
    }
    .desc {
      box-sizing: border-box;
      padding: 20px 0;
      line-height: 40px;
    }
    .pics {
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: space-between;
      .mainpic {
        width: 100%;
        height: 100%;
      }
    }
  }
  //   企业文化
  .culture {
    .teamlist {
      box-sizing: border-box;
      padding-bottom: 20px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      .teamli {
        width: 100%;
        // box-sizing: border-box;
        // padding: 0 50px;
        // margin-top: 10px;
        .pics {
          width: 100%;
          height: 120px;
          // background: #b5b5b5;
          text-align: left;
          line-height: 120px;
          .mainpic {
            width: 60px;
          }
        }
        .title {
          font-size: 18px;
          font-weight: bold;
          box-sizing: border-box;
          padding: 15px 0;
        }
        .ename {
          font-size: 14px;
        }
        .desc {
          box-sizing: border-box;
          padding-top: 10px;
          width: 100%;
          line-height: 40px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }
    }
    .conts {
      box-sizing: border-box;
      padding: 20px 0;
      .abstract {
        font-size: 20px;
        font-weight: normal;
        box-sizing: border-box;
        padding: 10px 0;
      }
    }
  }
  //   团队
  .team {
    .leading {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 45%;
        background: #f5d02c;
        box-sizing: border-box;
        padding: 50px 20px;
        line-height: 50px;
        img {
          width: 20px;
        }
      }
      .right {
        width: 45%;
        .mainpic {
          width: 100%;
          height: 400px;
        }
      }
    }
    .partlist {
      box-sizing: border-box;
      padding-bottom: 40px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      .partli {
        background: #ededed;
        text-align: center;
        box-sizing: border-box;
        padding: 20px 0;
        .mainpic {
          margin: 20px auto;
          width: 150px;
          height: 150px;
        }
        .name {
          font-weight: bold;
          font-size: 26px;
          box-sizing: border-box;
          padding-bottom: 10px;
        }
        .parts {
          color: #707070;
          line-height: 40px;
          font-size: 20px;
        }
      }
    }
  }
  // 战略规划
  .strategic {
    .planlist {
      // background: brown;
      box-sizing: border-box;
      padding: 0 50px 50px 50px;
      .planli {
        width: 100%;
        border: 1px solid #c5c4c8;
        border-top: none;
        margin-bottom: 50px;
        .mainpic {
          width: calc(100% + 2px);
          height: 300px;
          position: relative;
        }
        img {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
        }
        .text {
          box-sizing: border-box;
          padding: 30px 30px;
          font-size: 20px;
          line-height: 45px;
        }
      }
    }
  }
  // 企业责任
  .resb {
    box-sizing: border-box;
    padding-bottom: 30px;
    .resplist {
      // background: brown;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      .respli {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 40px;
      }
      .mainpic {
        width: 70px;
        height: 70px;
      }
      .title {
        width: 100%;
        box-sizing: border-box;
        padding: 30px 0;
        span {
          box-sizing: border-box;
          padding-bottom: 5px;
          border-bottom: 1px solid #959595;
        }
      }
      .text {
        width: 100%;
      }
    }
  }
  // 荣誉
  .honor {
    .honorlist {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      .honorli {
        .mainpic {
          background: #676767;
          width: 100%;
          height: 250px;
        }
        .text {
          text-align: center;
          color: 707070;
          line-height: 90px;
        }
      }
    }
  }
}
</style>