<template>
  <div class="intruduece">
    <div class="content">
      <div class="conttop">
        <transition name="lfbg">
          <div v-if="trans" class="lfbg backg">
            <img src="../assets/home/homeabout/bt.png" alt />
          </div>
        </transition>
        <transition name="ctbg">
          <div v-if="trans" class="ctbg backg">
            <img src="../assets/home/homeabout/about.png" alt />
          </div>
        </transition>
        <transition name="rtbg">
          <div v-if="trans" class="rtbg backg">
            <img src="../assets/home/homeabout/logo.png" alt />
          </div>
        </transition>
      </div>
      <div class="contmain">
        <transition name="video">
          <div v-if="trans" class="playvideo">
            <div class="videobg">
              <div
                class="videopic"
                :style="{backgroundImage: 'url(' + require('../assets/home/homeabout/video.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>
              <img @click="play" class="play" src="../assets/home/homeabout/play.png" alt />
              <div class="videos" v-if="videoPlay">
                <p class="close" @click="close">关闭</p>
                <video controls autoplay>
                  <source src="../assets/mp4/video.mp4" />
                </video>
              </div>
            </div>
          </div>
        </transition>

        <transition name="des">
          <div v-if="trans" class="des">
            <vue-scroll :ops="ops" style="height:445px">
              <p>
                企业简介：【成都长湖生态环境艺术工程有限公司】(长湖水景观赏草，水生植物种植基地) 位于川西平原腹心【郫县和新津】。
                公司一号基地：四川省成都市郫县新民场镇金柏村二组；公司二号基地：成都新津花源镇串头村。 地处西南特大中心城市——成都市近郊，距成都市区仅10公里，交通十分便捷。种植面积200亩以上，生态环境优美；春天百花齐放、夏日花红翠绿、繁花似锦、满园春色，是西南大型的水生植物湿地。
                我场始建于2002年，现有员工50余人，长年专业从事水生植物培植的技术人员10余人，水生植物品种50种以上，储货量800万苗木，公司拥有丰富的种植，栽培技术经验，并拥有百亩以上专业水生植物种植基地，是一家专门从事水生花卉研发与栽培，特殊异型大树及主景景观大树栽植，销售及水面绿化为一体的专业民营企业。
                【 成都长湖生态环境艺术工程有限公司】借助【四川成都】得天独厚的地理环境资源与产品资源优势，依附于科学的管理和专业的团队，心对心、面对面的诚信经营，经过多年的摸索与实践，已形成了一整套专业的种植和推广经验。花卉种植规模初步已形成产、供、销为一体的良好格局，我们本着“精益求精”“用心经营”创造优质专业产品的发展方向，使成都长湖生态环境艺术工程有限公司在西南花卉市场成为绿色生产基地，力争成为了西南****、**具特色的水生植物种植企业。
                企业经营项目：
                ★专业提供：荷花、睡莲、花叶芦竹、香蒲、千屈菜、花叶水葱、青叶水葱、水菖蒲、石菖蒲、马蹄莲、再力花、水生美人蕉、旱伞草【水竹】、黄花鸢尾、西伯利亚鸢尾、马兰花、花叶芒、斑叶芒、细叶芒、狼尾草、玉带草、梭鱼草、金娃娃【萱草】、日本血草、灯心草、沙草、曼陀罗、射干、慈姑、蒲苇、矮蒲苇、天堂鸟【鹤望兰】等植物。
                ★专业承接:公园、庭院、花苑小区、景点旅游、河道绿化、水域置景、沼泽湿地、人工浮岛绿化、污水净化处理、水景设计、施工、养护。
                ★专业提供:园林绿化苗木、园林绿化种子
                ★特殊****异型大树供应：如：异型朴树、异型菩提树、异型柳树、多头银杏、多头朴树、等特殊景观大树及水景大树。
                ★地被植物及园林绿化苗木批发
                ★盆景培育、花木租售
              </p>
            </vue-scroll>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      transa: false,
      trans: false,
      videoPlay: false,
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true
        },
        scrollPanel: {
          scrollingY: true,
          speed: 1000
        },
        rail: {
          background: "#090909",
          opacity: 0,
          size: "5px",
          specifyBorderRadius: false,
          gutterOfEnds: "8%", //轨道距 x 和 y 轴两端的距离
          gutterOfSide: "5%", //距离容器的距离
          keepShow: false, //是否即使 bar 不存在的情况下也保持显示
          border: "none" //边框
        },
        bar: {
          minSize: 0.3,
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#82c41c" //颜色
        }
      }
    };
  },
  mounted() {
    this.trans = true;
    this.transa = true;
  },
  methods: {
    play() {
      this.videoPlay = true;
    },
    close() {
      this.videoPlay = false;
    }
  }
};
</script>
<style lang="less" scoped>
// 左边
.lfbg-enter-active,
.ctbg-enter-active,
.rtbg-enter-active,
.video-enter-active,
.des-enter-active {
  transition: all 1.5s ease-in-out;
}
.lfbg-enter {
  transform: translateX(-100px);
}
.ctbg-enter {
  transform: translateX(20px);
}
.rtbg-enter {
  transform: translateY(30px);
}
.video-enter {
  transform: translateX(-50px);
}
.des-enter {
  transform: translateY(50px);
}

.intruduece {
  // background: orange;
  width: 100%;
  height: 1080px;
  position: relative;
  .bg {
    width: 100%;
    height: 1080px;
    position: absolute;
    top: 0px;
    left: 0;
    z-index: -1;
    .topbg {
      width: 100%;
      height: 360px;
    }
    .btbg {
      width: 100%;
      height: 720px;
    }
  }
  .content {
    width: 100%;
    .conttop {
      width: 100%;
      height: 360px;
      position: relative;
      .backg {
        position: absolute;
      }
      .lfbg {
        top: 150px;
        left: 5%;
      }
      .ctbg {
        right: 21%;
        bottom: 10px;
        z-index: 2;
      }
      .rtbg {
        top: 150px;
        right: 5%;
        z-index: 2;
      }
    }
    .contmain {
      width: 100%;
      position: relative;
      .playvideo {
        position: absolute;
        top: 30px;
        left: 1%;
        width: 70%;
        background: #111111;
        height: 605px;
        .videobg {
          width: 100%;
          height: 100%;
          position: relative;
          .videopic {
            margin: 2%;
            width: 95%;
            height: 90%;
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
          width: 95%;
          height: 90%;
          position: absolute;
          top: 0px;
          left: 2%;
          video {
            background: #111111;
            position: absolute;
            z-index: 11;
            top: -0px;
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

      .des {
        box-sizing: border-box;
        border: 10px solid #939393;
        width: 29.3%;
        height: 690px;
        position: absolute;
        top: -130px;
        right: 1%;
        padding-top: 180px;
        p {
          margin: 0px auto;
          color: white;
          line-height: 24px;
          opacity: 0.8;
          font-size: 14px;
          width: 80%;
          white-space: pre-wrap;
          white-space: pre-line;
          word-break: break-all;
        }
      }
    }
  }
}
</style>