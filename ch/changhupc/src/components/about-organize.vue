<template>
  <div class="organized">
    <div class="content">
      <div class="conttop">
        <transition name="lfbg">
          <div v-if="trans" class="lfbg backg">
            <img src="../assets/home/homeabout/bt.png" alt />
          </div>
        </transition>
        <transition name="ctbg">
          <div v-if="trans" class="ctbg backg">
            <img src="../assets/about/Structure.png" alt />
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
                <p class="title">组织架构：</p>
                <div class="cont">
                  <p>总经理：负责整个公司发展规划，制定详细计划，重大项目合作的指导</p>
                  <p>行政部：管理公司所有行政事项，接待客户，公司内勤等事务</p>
                  <p>财务部：负责公司内外资金支出与收入的审计核算</p>
                  <p>客服部：接待客户来电咨询，以及项目完工后，后期客户维护的事情</p>
                  <p>市场部：采购公司所需物资，设备等</p>
                  <p>销售部：负责代表公司与客户进行洽淡，达成合作意向</p>
                </div>
              </div>
            </transition>
            <transition name="main-right">
              <div class="main-right">
                <vue-scroll :ops="ops" style="height:400px">
                  <p class="title">售后服务：</p>
                  <div class="cont">
                    <p>1、工程竣工交付使用后，在保修期内，由工程项目负责人带领有关人员定期或不定期回访，听取使用单位对工程质量的意见。</p>
                    <p>2、无论什么原因造成的质量问题，我公司负责无偿保修和换苗。</p>
                    <p>3、质量检验及技术措施。</p>
                    <p>4、各分项工程质量严格执行三检制，对各班定时、定点、部位施工，层层把关，做好质量等级的验评工作。</p>
                    <p>5、所有苗木必须有检疫证明。</p>
                    <p>6、苗木种植前，必须经业主、监理、质检站及有关验收单位签字认可，才能组织下道工序施工。</p>
                    <p>7、苗木的规格及形状必须通过专职质检员的检验，方能进行种植。</p>
                    <p>8、加强成品、半成品的保护工作。</p>
                    <p>9、严格检查制度，做好预防措施。</p>
                    <p>10、检查质量参控措施,检查其是否符合实际，内容是否齐全，是否有针对性，主要检查项目是：</p>
                    <p>A、选择施工队伍的标准；</p>
                    <p>B、项目技术交底内容；</p>
                    <p>C、关键工序质量控制措施；</p>
                    <p>D、细部处理统一施工方法；</p>
                    <p>E、样板工程的质量标准；</p>
                    <p>F、后期养护质量检测方法。</p>
                    <p>11、强化管理监督、落实预控措施。</p>
                    <p>12、组织质检员和各工种班组认真学习质量标准和施工工艺标准，做到每个人员都掌握各自的施工工序和验收标准，精心施工，责任落实到人，保证工程质量。</p>
                    <p>13、严格执行自检、互检、交接检制度，实行主要工程操作者名字、级别质量等级挂牌上墙制、奖优罚劣。</p>
                    <p>14、项目质检员要经常深入施工现场，掌握施工质量动态，分析质量情况，加强检查验收，找出影响的薄弱环节，提出改进措施，把质量问题控制在萌芽状态，推动工程总体质量水平提高。</p>
                  </div>
                </vue-scroll>
              </div>
            </transition>
          </div>
        </transition>
        <transition name="des">
          <div class="des" v-if="trans">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + require('../assets/about/organize.png')+ ')',
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
          speed: 300
        },
        rail: {
          background: " #111111",
          opacity: 1,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: '60px', //轨道距 x 和 y 轴两端的距离
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

.organized {
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
          color: #82c41c;
          font-weight: bold;
        }
        .cont {
          width: 100%;

          font-size: 14px;
          p {
          width: 95%;  
            margin: 25px 0;
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
          // background: pink;
          padding : 30px 0 0 3%;
          box-sizing: border-box;
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