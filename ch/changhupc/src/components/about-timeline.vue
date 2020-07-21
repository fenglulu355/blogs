<template>
  <div class="timeline">
    <div class="content">
      <div class="conttop">
        <transition name="lfbg">
          <div v-if="trans" class="lfbg backg">
            <img src="../assets/home/homeabout/bt.png" alt />
          </div>
        </transition>
        <transition name="ctbg">
          <div v-if="trans" class="ctbg backg">
            <img src="../assets/about/LonglakeMilestone.png" alt />
          </div>
        </transition>
        <transition name="rtbg">
          <div v-if="trans" class="rtbg backg">
            <img src="../assets/home/homeabout/logo.png" alt />
          </div>
        </transition>
      </div>
      <div class="contmain">
        <transition name="intru">
          <div v-if="trans" class="intru">
            <ul class="intrubox">
              <li class="yearli" v-for="(item, index) in res" :key="index">
                <p class="year" @click="openYear(index)">{{item.article_y}}年</p>
                <div class="pic">
                  <img @click="openYear(index)" v-show="proClass ==index?open:!open" src="../assets/about/rt.png" alt />
                  <img @click="openYear(index)" v-show="proClass ==index?!open:open" src="../assets/about/bot.png" alt />
                </div>
              </li>
            </ul>
            <ul
              class="timelist"
              v-show="proClass ==index"
              v-for="(item, index) in res"
              :key="'a'+index"
            >
              <vue-scroll :ops="ops" style="height:350px">
                <li class="timeli title">
                  <p class="thing">长湖大记事</p>
                </li>
                <li class="timeli" v-for="(items, index) in item.list" :key="index">
                  <span class="mone">{{items.article_m}}月</span>
                  <p
                    class="thing"
                    v-for="(itemss, index) in items.list"
                    :key="index"
                  >{{itemss.article_content}}</p>
                </li>
              </vue-scroll>
            </ul>
          </div>
        </transition>
        <transition name="des">
          <div class="des" v-if="trans">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + require('../assets/about/timebg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "timeline",
  data() {
    return {
      open: false,
      proClass: 0,
      transa: false,
      trans: false,
      res: [],
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true
        },
        scrollPanel: {
          scrollingY: true,
          speed: 300
        },
        rail: {
          background: " #111111",
          opacity: 1,
          size: "5px",
          specifyBorderRadius: false,
          gutterOfEnds: null, //轨道距 x 和 y 轴两端的距离
          gutterOfSide: "0", //距离容器的距离
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
  created() {
    this.requst();
  },
  mounted() {
    this.trans = true;
    this.transa = true;
  },
  methods: {
    openYear(index) {
      //   this.open = !this.open
      this.proClass = index;
    },
    requst() {
      this.$axios.post("/index/api/getDsj").then(resa => {
        this.res = resa.data.data;
        // console.log(this.res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
// 左边
.lfbg-enter-active,
.ctbg-enter-active,
.rtbg-enter-active,
.intru-enter-active,
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
.intru-enter {
  transform: translateX(-50px);
}
.des-enter {
  transform: translateY(50px);
}

.timeline {
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
        right: 420px;
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
      .intru {
        position: absolute;
        top: 30px;
        left: 1%;
        width: calc(100% - 587px);
        background: #111111;
        height: 605px;
        color: #82c41c;
        box-sizing: border-box;
        padding: 6% 3%;
        display: flex;
        justify-content: space-around;
        .intrubox {
          box-sizing: border-box;
          // background: pink;
          width: 15%;
          text-align: center;
          .yearli {
            cursor: pointer;
            width: 100%;
            display: flex;
            justify-content: space-around;
            font-size: 18px;
            font-weight: bold;
            padding-bottom: 30px;
          }
        }
        .timelist {
          padding-left: 60px;
          width: 78%;
          .title {
            font-size: 24px;
            font-weight: bold;
            position: relative;
            .thing {
              height: 87px;
            }
            &::before {
              content: "";
              position: absolute;
              top: 4px;
              left: 52px;
              z-index: 111;
              width: 14px;
              height: 14px;
              background: url("../assets/about/point.png") no-repeat;
              background-size: cover;
            }
          }
          .timeli {
            box-sizing: border-box;
            width: 100%;
            // border-left: 1px solid #82c41c;
            position: relative;
            padding: 0 0 20px 100px;

            .mone {
              color: #cfcfcf;
              position: absolute;
              top: 0;
              left: 0px;
              &::before {
                content: "";
                position: absolute;
                top: 4px;
                left: 52px;
                z-index: 111;
                width: 14px;
                height: 14px;
                background: url("../assets/about/point.png") no-repeat;
                background-size: cover;
              }
            }
            .thing {
              position: relative;
              //   background: pink;
              width: 100%;
              min-height: 40px;
              line-height: 24px;
              &::before {
                content: "";
                width: 2px;
                height: 100%;
                background: #82c41c;
                position: absolute;
                position: absolute;
                top: 21px;
                left: -42px;
              }
            }
          }
        }
        // .timeline {
        //   width: 100%;
        //   height: 100%;
        //   //   background: pink;
        //     .time-box {
        //       background: pink;
        //       width: 15%;
        //       font-size: 18px;
        //       font-weight: bold;
        //       display: flex;
        //       justify-content: space-around;
        //     }
        //     .timelist {
        //       padding-left: 60px;
        //       width: 78%;
        //       .title {
        //         font-size: 24px;
        //         font-weight: bold;
        //         position: relative;
        //         .thing {
        //           height: 87px;
        //         }
        //         &::before {
        //           content: "";
        //           position: absolute;
        //           top: 4px;
        //           left: 52px;
        //           z-index: 111;
        //           width: 14px;
        //           height: 14px;
        //           background: url("../assets/about/point.png") no-repeat;
        //           background-size: cover;
        //         }
        //       }
        //       .timeli {
        //         box-sizing: border-box;
        //         width: 100%;
        //         // border-left: 1px solid #82c41c;
        //         position: relative;
        //         padding: 0 0 20px 100px;

        //         .mone {
        //           color: #cfcfcf;
        //           position: absolute;
        //           top: 0;
        //           left: 0px;
        //           &::before {
        //             content: "";
        //             position: absolute;
        //             top: 4px;
        //             left: 52px;
        //             z-index: 111;
        //             width: 14px;
        //             height: 14px;
        //             background: url("../assets/about/point.png") no-repeat;
        //             background-size: cover;
        //           }
        //         }
        //         .thing {
        //           position: relative;
        //           //   background: pink;
        //           width: 100%;
        //           min-height: 40px;
        //           line-height: 24px;
        //           &::before {
        //             content: "";
        //             width: 2px;
        //             height: 100%;
        //             background: #82c41c;
        //             position: absolute;
        //             position: absolute;
        //             top: 21px;
        //             left: -42px;
        //           }
        //         }
        //       }
        //     }

        // }
      }
      .des {
        border: 10px solid #939393;
        width: 567px;
        height: 672px;
        position: absolute;
        top: -130px;
        right: 1%;

        .mainpic {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>