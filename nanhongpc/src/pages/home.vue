<template>
  <div class="home">
    <banner></banner>
    <!-- 简介 -->
    <ul class="introlist">
      <li class="introli" v-for="(item, index) in introlist" :key="index">
        <div class="introbox">
          <p class="large">{{item.large}}</p>
          <div class="small">
            <p>{{item.smalla}}</p>
            <p>{{item.smallb}}</p>
          </div>
        </div>
        <div
          class="intro-hover"
          :style="{backgroundImage: 'url(' + item.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        >
          <p class="large">{{item.large}}</p>
          <div class="small">
            <p>{{item.smalla}}</p>
            <p>{{item.smallb}}</p>
            <p class="more">了解更多</p>
          </div>
        </div>
      </li>
    </ul>
    <!-- 企业视频 -->
    <div class="videobox">
      <p class="titles">企业视频/CORPORATE VIDEO</p>
      <div class="playvideo">
        <div class="videobg">
          <div
            class="videopic"
            :style="{backgroundImage: 'url(' + require('../assets/home/homebanner.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <img @click="play" class="play" src="../assets/home/play.png" alt />
        </div>
        <div class="videos" v-if="videoPlay">
          <p class="close" @click="close">关闭</p>
          <video controls autoplay>
            <source src="../assets/home/mp4/video.mp4" />
          </video>
        </div>
      </div>
    </div>
    <!-- 新闻中心 -->
    <div class="newsbox">
      <p class="titles">新闻中心/NEWS CENTER</p>
      <ul class="newslist">
        <li class="newsli" v-for="(item, index) in newslist" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + item.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div class="newsinfo">
            <p class="newstitle">{{item.title}}</p>
            <p class="newsdes">{{item.dec}}</p>
            <p class="tonews">查看详情</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import banner from "../components/homebanner";
export default {
  name: "home",
  data() {
    return {
      introlist: [
        {
          class: "itroone",
          large: "一部旗舰的里程碑",
          smalla: "市场表现惊艳，",
          smallb: "媒体好评连连。",
          img: require("../assets/home/intro.png")
        },
        {
          class: "itrotwo",
          large: "一个品牌的不凡成就 ",
          smalla: "不到5年，用户遍布全球，",
          smallb: "屡获殊荣。",
          img: require("../assets/home/intro.png")
        },
        {
          class: "itrothree",
          large: " 工程设计",
          smalla: "点击欣赏",
          smallb: "更多工程案例",
          img: require("../assets/home/intro.png")
        }
      ],
      videoPlay: false,
      newslist: [
        {
          img: require("../assets/home/news1.png"),
          title: "新闻大标题新闻大标题新闻大标题新闻大标题",
          dec:
            "7月25日，南宏机电副总经理南宏机电副总经理南宏机电副总经理带领南宏品牌及营销团队负责人一行进行商务洽谈，受到了公司……"
        },
        {
          img: require("../assets/home/news2.png"),
          title: "新闻大标题新闻大标题新闻大标题新闻大标题",
          dec:
            "7月25日，南宏机电副总经理南宏机电副总经理南宏机电副总经理带领南宏品牌及营销团队负责人一行进行商务洽谈，受到了公司……"
        },
        {
          img: require("../assets/home/news3.png"),
          title: "新闻大标题新闻大标题新闻大标题新闻大标题",
          dec:
            "7月25日，南宏机电副总经理南宏机电副总经理南宏机电副总经理带领南宏品牌及营销团队负责人一行进行商务洽谈，受到了公司……"
        }
      ]
    };
  },
  created() {},
  methods: {
    play() {
      this.videoPlay = true;
    },
    close() {
      this.videoPlay = false;
    }
  },
  components: { banner }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;

  .viocebox {
    // background: pink;
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: rgba(91, 91, 91, 1);
    .viopic {
      width: 10%;
      text-align: right;
      box-sizing: border-box;
      padding-right: 15px;
      img {
        box-sizing: border-box;
        padding-right: 5px;
      }
    }
    .vio {
      width: 90%;
    }
  }
  .introlist {
    background: pink;
    width: 100%;
    .introli {
      cursor: pointer;
      width: calc(100% / 3);
      display: inline-block;
      height: 924px;
      position: relative;
      .large {
        font-size: 56px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        box-sizing: border-box;
        text-align: center;
        line-height: 95px;
        width: 300px;
        height: 600px;
        margin: 0 auto;
        padding-top: 400px;
      }
      .small {
        font-size: 24px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: relative;
      }
      .introbox {
        width: 100%;
        height: 100%;
        background: linear-gradient(
          180deg,
          rgba(102, 102, 102, 1),
          rgba(170, 170, 170, 1)
        );
        .small {
          // background: olive;
          box-sizing: border-box;
          width: 100%;
          height: 324px;
          margin: 0 auto;
          padding-top: 200px;
          text-align: center;
          &::after {
            content: "";
            width: 40px;
            height: 4px;
            background: white;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 150px;
          }
        }
      }
      .intro-hover {
        display: none;
        position: absolute;
        top: 0;
        // z-index: 2;
        width: 100%;
        height: 100%;
        .small {
          // background: pink;
          box-sizing: border-box;
          width: 100%;
          height: 324px;
          margin: 0 auto;
          padding-top: 60px;
          text-align: center;
          &::after {
            content: "";
            width: 40px;
            height: 4px;
            background: white;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 30px;
          }
        }
        .more {
          width: 180px;
          height: 39px;
          font-size: 18px;
          text-align: center;
          line-height: 39px;
          color: white;
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 20px;
          position: absolute;
          bottom: 130px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      &:hover .intro-hover {
        display: block;
      }
    }
  }

  .videobox {
    width: 1200px;
    margin: 0 auto;
    .titles {
      color: rgba(51, 51, 51, 1);
      font-size: 28px;
      height: 142px;
      width: 100%;
      box-sizing: border-box;
      padding: 70px 0 43px 0;
    }
    .playvideo {
      width: 100%;
      height: 654px;
      position: relative;
      .videobg {
        width: 100%;
        height: 100%;
        position: relative;
        .videopic {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .play {
          cursor: pointer;
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%);
        }
      }
      .videos {
        width: 100%;
        height: 100%;
        video {
          background: #111111;
          position: absolute;
          z-index: 11;
          top: 0%;
          left: 0%;
          width: 100%;
          height: 100%;
        }
        .close {
          cursor: pointer;
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 111;
          color: white;
          background: red;
          width: 3em;
          text-align: center;
          height: 25px;
          line-height: 25px;
        }
      }
    }
  }
  .newsbox {
    width: 1200px;
    margin: 0 auto;
    .titles {
      color: rgba(51, 51, 51, 1);
      font-size: 28px;
      width: 100%;
      box-sizing: border-box;
      padding: 80px 0 74px 0;
    }
    .newslist {
      .newsli {
        height: 365px;
        display: flex;
        justify-content: flex-start;
        .mainpic {
          width: 475px;
          height: 314px;
        }
        .newsinfo {
          box-sizing: border-box;
          width: 460px;
          padding: 40px 0px 0px 45px;
          .newstitle {
            color: rgba(51, 51, 51, 1);
            font-size: 30px;
          }
          .newsdes {
            padding-top: 24px;
            color: rgba(91, 91, 91, 1);
            font-size: 18px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .tonews {
            cursor: pointer;
            width: 138px;
            height: 32px;
            background: rgba(153, 153, 153, 1);
            border-radius: 5px;
            font-size: 14px;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 32px;
            margin-top: 84px;
          }
        }
      }
    }
  }
}
</style>