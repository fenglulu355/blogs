<template>
  <div class="home">
    <!-- 简介 -->
    <div class="introbox">
      <ul class="introlist">
        <li class="introli" v-for="(item, index) in introlist" :key="index">
          <transition name="a">
            <div class="introbox">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + item.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>
              <p class="large">{{item.large}}</p>
              <div class="small">
                <p>{{item.smalla}}</p>
                <p>{{item.smallb}}</p>
                <p class="more">了解更多</p>
              </div>
            </div>
          </transition>
        </li>
      </ul>
    </div>
    <!-- 企业视频 -->
    <div class="videobox">
      <p class="titles">企业视频/CORPORATE VIDEO</p>
      <div class="playvideo">
        <div class="videobg">
          <div
            class="videopic"
            :style="{backgroundImage: 'url(' +
             require('../assets/home/video.jpg')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div
            @click="play"
            class="play"
            :style="{backgroundImage: 'url(' + require('../assets/nav/play.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
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
        <li
          class="newsli clearFix"
          v-for="(item, index) in newslist"
          :key="index"
          @click="tonews(index,item)"
        >
          <div
            class="mainpic fl"
            :style="{backgroundImage: 'url(' +httpUrl+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div class="newsinfo fr">
            <p class="newstitle">{{item.title}}</p>
            <p class="newsdes">{{item.content}}</p>
            <p class="tonews">查看详情</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      hoverindex: 1,
      introlist: [
        {
          class: "itroone",
          large: "一部旗舰的里程碑",
          smalla: "市场表现惊艳，",
          smallb: "媒体好评连连。",
          img: require("../assets/home/intro2.jpg")
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
          img: require("../assets/home/intro1.jpg")
        }
      ],
      videoPlay: false,
      newslist: []
    };
  },
  created() {
    this.requst();
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/home").then(res => {
        this.newslist = res.data.data.news;
      });
    },
    play() {
      this.videoPlay = true;
    },
    close() {
      this.videoPlay = false;
    },
    tonews(index, item) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.$router.push({
        path: "/detail",
        query: { id: item.id, kind: "news" }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.a-enter-active,
.b-enter-active {
  transition: all 0.5s ease-in-out;
}
.a-enter {
  opacity: 0.8;
}
.a-enter-to {
  opacity: 1;
}
.b-enter {
  opacity: 0.8;
  transform: scale(1.1);
}
.home {
  width: 100%;
  .introbox {
    width: 100%;
    .introlist {
      width: 100%;
      .introli {
        overflow: hidden;
        cursor: pointer;
        width: 100%;
        height: 750px;
        .introbox {
          position: relative;
          width: 100%;
          height: 750px;
          background: linear-gradient(
            180deg,
            rgba(102, 102, 102, 1),
            rgba(170, 170, 170, 1)
          );
          .mainpic {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
          }
          .large {
            height: 350px;
            // background: paleturquoise;
            position: relative;
            font-size: 56px;
            font-weight: 300;
            color: rgba(255, 255, 255, 1);
            box-sizing: border-box;
            text-align: center;
            width: 300px;
            margin: 0 auto;
            padding-top: 200px;
          }

          .small {
            width: 100%;

            text-align: center;
            font-size: 30px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            position: relative;
            box-sizing: border-box;
            padding-top: 60px;
            line-height: 60px;
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
            font-size: 20px;
            text-align: center;
            line-height: 39px;
            color: white;
            border: 1px solid rgba(255, 255, 255, 1);
            border-radius: 20px;
            margin: 30px auto;
          }
          &:active {
            .more {
              border: 1px solid #2482c8;
              background: #2482c8;
              color: white;
            }
          }
        }
      }
    }
  }

  .videobox {
    // background: red;
    width: 100%;
    box-sizing: border-box;
    padding: 0 25px;
    .titles {
      color: #333333;
      font-size: 36px;
      width: 100%;
      box-sizing: border-box;
      padding: 70px 0 35px 0;
    }
    .playvideo {
      width: 100%;
      height: 440px;
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
          width: 107px;
          height: 106px;
          cursor: pointer;
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%);
        }
      }
      .videos {
        position: absolute;
        z-index: 11;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        video {
          background: #111111;

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
    // background: red;
    width: 100%;
    box-sizing: border-box;
    padding: 0 25px;
    .titles {
      color: rgba(51, 51, 51, 1);
      font-size: 36px;
      width: 100%;
      box-sizing: border-box;
      padding: 80px 0 0px 0;
    }
    .newslist {
      width: 100%;
      .newsli {
        cursor: pointer;
        width: 100%;
        height: 305px;
        border-bottom: 1px solid #cccccc;
        box-sizing: border-box;
        padding: 36px 0;
        &:last-child {
          border: none;
        }
        .mainpic {
          width: 45%;
          height: 225px;
          border-radius: 10px;
        }
        .newsinfo {
          width: 55%;
          box-sizing: border-box;
          padding: 8px 0px 0px 29px;
          .newstitle {
            color: rgba(51, 51, 51, 1);
            font-size: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .newsdes {
            padding-top: 23px;
            color: rgba(91, 91, 91, 1);
            font-size: 24px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .tonews {
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            width: 174px;
            height: 41px;
            border: 1px solid rgba(153, 153, 153, 1);
            border-radius: 10px;
            font-size: 20px;
            color: #999999;
            text-align: center;
            line-height: 41px;
            margin-top: 23px;
          }
        }
        &:active .tonews {
          border: 1px solid rgba(36, 130, 200, 1);
          background: rgba(36, 130, 200, 1);
          color: white;
        }
      }
    }
  }
}
</style>