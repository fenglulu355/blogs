<template>
  <div class="ldea">
    <div class="content">
      <div class="conttop">
        <transition name="lfbg">
          <div v-if="trans" class="lfbg backg">
            <img src="../assets/home/homeabout/bt.png" alt />
          </div>
        </transition>
        <transition name="ctbg">
          <div v-if="trans" class="ctbg backg">
            <img src="../assets/about/ldea.png" alt />
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
            <transition name="main-left">
              <div v-if="trans" class="main-left">
                <p class="title">长湖理念：</p>
                <div class="cont">
                  <p>* 发展理念——创新务实 超越自我 追求卓越</p>
                  <p>* 技术理念——日新月异 领先一步</p>
                  <p>* 服务理念——人至上,客至尊</p>
                  <p>* 人才理念——******且**合适的人</p>
                  <p>* 合作理念——开诚布公，互相信任，团结奋斗。</p>
                  <p>* 管理理念——文化的熏陶 制度的约束</p>
                  <p>* 为人理念——提倡正直诚实、敢于创新、勇于负责的职业精神。</p>
                  <p>* 生存理念——不进则退，随时都有灭亡的危险。</p>
                  <p>* 追求共赢——以客户为中心，以员工为本，追求员工、公司、客户和社会的共赢。</p>
                  <p>* 使 命——提供高品质的网络产品、技术和服务。</p>
                </div>
              </div>
            </transition>
            <transition name="main-right">
              <div class="main-right">
                <p class="title">长湖文化：</p>
                <div class="cont">
                  <p>真诚——以真诚的态度对待本职工作、对待客户及同事。</p>
                  <p>团队——以团队利益为重，个人行为服从团队行为。</p>
                  <p>学习——创造学习型组织，个人在工作中通过学习不断提高自己。</p>
                  <p>创新——公司鼓励提倡员工创新</p>
                  <p>“以技术产品领先为基础立于不败之地”。在其几十年的过程中，追求领先地位的表现总结为3个明显且相关的模式：</p>
                  <p>（1）、不断开拓新产品、新市场；</p>
                  <p>（2）、不断加强、扩大和更新现有的产品生产线，发展现有市场；</p>
                  <p>（3）、不断努力，更不断改进产品品质，缩短产品周期时间；</p>
                </div>
              </div>
            </transition>
          </div>
        </transition>
        <transition name="des">
          <div class="des" v-if="trans">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + require('../assets/about/ldeabg.png')+ ')',
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
  name: "organized",
  data() {
    return {
      transa: false,
      trans: false,
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
  mounted() {
    this.trans = true;
    this.transa = true;
  },
  methods: {}
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

.ldea {
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
        color: #cfcfcf;
        display: flex;
        align-items: flex-start;
        box-sizing: border-box;
        padding: 3% 3%;
        .title {
          font-size: 18px;
          padding-bottom: 15px;
          color: #82C41C;
          font-weight: bold;
        }
        .cont {
          font-size: 14px;
          p {
            margin: 20px 0;
          }
        }
        .main-left {
            box-sizing: border-box;
          padding-top: 30px;
          width: 45%;
          height: 505px;
          border-right: 1px dashed #999999;
        }
        .main-right {
          padding-top: 30px;
          box-sizing: border-box;
          padding-left: 3%;
          width: 45%;
          height: 505px;
        }
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