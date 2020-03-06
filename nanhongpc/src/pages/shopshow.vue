<template>
  <div class="shopshow">
    <banner></banner>
    <div class="shopbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav"></tabBar>
      <div class="showmain">
        <ul class="shopshowlist">
          <li class="shopshowli" v-show="curindex === 0">
            <div
              class="showpic"
              :style="{backgroundImage: 'url(' + shopshowinfo.bg+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            >
              <div class="shopinfo">
                <p class="shopname">{{shopshowinfo.shopname}}</p>
                <p class="shopdes">
                  主营产品：{{shopshowinfo.mainsell}}
                  <span>/</span>
                  地址：{{shopshowinfo.address}}
                  <span>/</span>
                  电话：{{shopshowinfo.tel}}
                </p>
              </div>
            </div>
            <div class="shopflash">
              <div class="pgbtn prev">
                <div
                  class="btpic"
                  @click="zuohua"
                  :style="{backgroundImage: 'url(' +require('../assets/shopshow/left.png') + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
              </div>

              <div class="flash">
                <ul
                  class="warpper"
                  :style="{'left':calleft + 'px'  ,'width': shopwidth+'px'}"
                  v-on:mouseover="stopmove()"
                  v-on:mouseout="move()"
                >
                  <li
                    class="pic"
                    v-for="(item, index) in shopinfo"
                    :key="index"
                    @click="showshop(index,item)"
                  >
                    <div
                      class="mainpic"
                      :style="{backgroundImage: 'url(' +item.sbg + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                    >
                      <div class="pichover">
                        <p>{{item.shopname}}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="pgbtn next">
                <div
                  class="btpic"
                  @click="youhua"
                  :style="{backgroundImage: 'url(' +require('../assets/shopshow/right.png') + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
              </div>
            </div>
          </li>
          <li class="shopshowli" v-show="curindex === 1">bbbbbbbbbbbbbbbbb</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import tabBar from "../components/tabBar";
export default {
  name: "shopshow",
  data() {
    return {
      curindex: 0,
      calleft: 0,
      showimg: "",
      shopshowinfo: [],
      tabtitle: {
        a: "门店",
        b: "展示"
      },
      tabnav: ["门店展示", "门店导航"],
      shopinfo: [
        {
          bg: require("../assets/shopshow/sbg.png"),
          sbg: require("../assets/shopshow/bg.png"),
          shopname: "首家千平体验式旗舰中心（蜀西路丰德羊西店）",
          mainsell: "分体空调、中央空调、生活家电",
          address: "成都市金牛区蜀西路9号丰德羊西中心2F",
          tel: "028-87395760"
        },
        {
          bg: require("../assets/shopshow/sbg.png"),
          sbg: require("../assets/shopshow/bg.png"),
          shopname: "一一一一一一",
          mainsell: "分体空调",
          address: "成都市金牛区",
          tel: "028-87395760"
        },
        {
          bg: require("../assets/shopshow/sbg.png"),
          sbg: require("../assets/shopshow/bg.png"),
          shopname: "二二二二二二二二二二二二二二二",
          mainsell: "分体空调、中央空调、生活家电",
          address: "成都市金牛区蜀西路9号丰德羊西中心2F",
          tel: "028-87395760"
        },
        {
          bg: require("../assets/shopshow/sbg.png"),
          sbg: require("../assets/shopshow/bg.png"),
          shopname: "三三三三三三三三三三三三三三三三三",
          mainsell: "分体空调、中央空调、生活家电",
          address: "成都市金牛区蜀西路9号丰德羊西中心2F",
          tel: "028-87395760"
        },
        {
          bg: require("../assets/shopshow/sbg.png"),
          sbg: require("../assets/shopshow/bg.png"),
          shopname: "思思思思",
          mainsell: "分体空调、中央空调、生活家电",
          address: "成都市金牛区蜀西路9号丰德羊西中心2F",
          tel: "028-87395760"
        },
        {
          bg: require("../assets/shopshow/sbg.png"),
          sbg: require("../assets/shopshow/bg.png"),
          shopname: "呜呜呜呜呜呜呜呜呜",
          mainsell: "分体空调、中央空调、生活家电",
          address: "成都市金牛区蜀西路9号丰德羊西中心2F",
          tel: "028-87395760"
        },
        {
          bg: require("../assets/shopshow/sbg.png"),
          sbg: require("../assets/shopshow/bg.png"),
          shopname: "六六六六六六六",
          mainsell: "分体空调、中央空调、生活家电",
          address: "成都市金牛区蜀西路9号丰德羊西中心2F",
          tel: "028-87395760"
        }
      ],
      shopwidth: null
    };
  },

  created() {
    // this.move();
    this.shopwidth = this.shopinfo.length * 245;
    this.shopshowinfo = this.shopinfo[0];
  },
  mounted() {},
  methods: {
    showshop(index, item) {
      // console.log(item);
      this.shopshowinfo = item;
    },
    tonav(index) {
      this.curindex = index;
    },
    //移动
    move() {
      this.timer = setInterval(this.starmove, 5000);
    },
    //开始移动
    starmove() {
      this.calleft -= 245;
      if (this.calleft < -1225) {
        this.calleft = 0;
      }
    },
    //鼠标悬停时停止移动
    stopmove() {
      clearInterval(this.timer);
    },
    //点击按钮左移
    zuohua() {
      this.calleft -= 245;
      if (this.calleft < -1225) {
        this.calleft = 0;
      }
    },
    //点击按钮右移
    youhua() {
      this.calleft += 245;
      let a = this.shopwidth - 1225;
      if (this.calleft > 0) {
        this.calleft = -a;
      }
    }

    //移动
    // move() {
    //   this.timer = setInterval(this.starmove, 20);
    // },
    //开始移动
    // starmove() {
    //   this.calleft--;
    //   let a = this.shopwidth - 1225;
    //   // console.log(a)
    //   if (this.calleft < -a) {
    //     this.calleft = 0;
    //   }
    // },
    //鼠标悬停时停止移动
    // stopmove() {
    //   clearInterval(this.timer);
    // },
    //鼠标按下
    // prevdown() {
    //   clearInterval(this.timer);
    //   this.stopmove();
    //   this.timer = setInterval(this.starmove, 5);
    //   let a = this.shopwidth - 1225;
    //   if (this.calleft < -a) {
    //     this.calleft = 0;
    //   }
    // },
    // nextdown() {
    //   this.stopmove();
    //   this.timer = setInterval(this.rightadd, 5);
    // },
    //鼠标抬起
    // prevup() {
    //   clearInterval(this.timer);
    //   this.move();
    // },
    // rightadd() {
    //   this.calleft++;
    //   let a = this.shopwidth - 1225;
    //   if (this.calleft == 0) {
    //     this.calleft = -a;
    //   }
    // },
    // add() {
    //   this.calleft++;
    //   if (this.calleft == 0) {
    //     clearInterval(this.timer);
    //   }
    // }
  },
  components: { banner, tabBar }
};
</script>

<style lang="less" scoped>
.shopshow {
  width: 100%;
  .shopbox {
    width: 100%;
    border-top: 1px solid rgba(153, 153, 153, 0.3);
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);
    box-sizing: border-box;
    padding: 60px 0 100px 0;
    .showmain {
      width: 100%;

      .shopshowlist {
        width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
        padding-top: 45px;
        .shopshowli {
          width: 100%;
          .showpic {
            width: 100%;
            height: 750px;
            position: relative;
            .shopinfo {
              width: 100%;
              height: 100px;
              background: rgba(0, 0, 0, 0.3);
              border-radius: 0px 0px 10px 10px;
              position: absolute;
              bottom: 0;
              box-sizing: border-box;
              padding: 29px 0 0 39px;
              color: rgba(255, 255, 255, 1);
              font-weight: bold;
              font-family: Microsoft YaHei;
              line-height: 28px;
              .shopname {
                font-size: 18px;
              }
              .shopdes {
                font-size: 16px;
                span {
                  margin: 0 10px;
                }
              }
            }
          }
          .shopflash {
            margin-top: 12px;
            width: 100%;
            position: relative;
            display: flex;
            .flash {
              margin: 0px auto;
              position: relative;
              width: 1100px;
              height: 164px;
              overflow: hidden;
              .warpper {
                width: 1000px;
                position: absolute;
                left: 0px;
                height: 164px;
                margin: 0px auto;
                li {
                  cursor: pointer;
                  box-sizing: border-box;
                  display: inline-block;
                  width: 245px;
                  height: 164px;
                  position: relative;
                  .mainpic {
                    width: 230px;
                    height: 164px;
                    border-radius: 10px;
                  }
                  .pichover {
                    width: 230px;
                    height: 164px;
                    border-radius: 10px;
                    position: absolute;
                    p {
                      width: 163px;
                      font-size: 14px;
                      text-align: center;
                      font-weight: bold;
                      color: rgba(255, 255, 255, 1);
                      line-height: 28px;
                      margin: 50px auto;
                      // display: none;
                    }
                  }
                  &:hover .pichover {
                    display: block;
                    background: rgba(0, 0, 0, 0.3);
                    p {
                      display: block;
                    }
                  }
                }
              }
            }
            .pgbtn {
              cursor: pointer;
              box-sizing: border-box;
              width: 44px;
              height: 164px;
              .btpic {
                width: 44px;
                height: 164px;
              }
            }
          }
        }
      }
    }
  }
}
</style>