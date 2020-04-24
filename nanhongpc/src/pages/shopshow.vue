<template>
  <div class="shopshow">
    <banner></banner>
    <div class="shopbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <div class="showmain">
        <ul class="shopshowlist">
          <li class="shopshowli" v-show="curindex === 0">
            <!-- swiper1 -->
            <div class="galler-top" ref="swiperTop">
              <div class="slide">
                <div class="showbox">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' + shopshowinfo.bg+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  >
                    <!-- <img :src="shopshowinfo.bg" alt /> -->
                  </div>
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
              </div>
            </div>
            <!-- swiper2 Thumbs -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
              <swiper-slide class="slide" v-for="(item, index) in shopinfo" :key="index">
                <div class="showbox" @click="swiper(index,item)" :data-id="index">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' + item.sbg+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <div class="pichover">
                    <p>{{item.shopname}}</p>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <div
              class="swiper-button-next swiper-button-white"
              slot="button-next"
              :style="{backgroundImage: 'url(' + require('../assets/shopshow/right.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div
              class="swiper-button-prev swiper-button-white"
              slot="button-prev"
              :style="{backgroundImage: 'url(' + require('../assets/shopshow/left.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
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
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "shopshow",
  inject: ["reload"],
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
      shopwidth: null,
      swiperOptionThumbs: {
        // loop:true,
        spaceBetween: 10,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        slidesPerView: 4,
        watchSlidesVisibility: true /*避免出现bug*/,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },

  created() {
    this.shopwidth = this.shopinfo.length * 245;
    this.shopshowinfo = this.shopinfo[0];
    this.getrouter;
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      this.curindex = Number(idx);
    }
  },
mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 300;
  },
  methods: {
    getrouter() {
      let i = this.$route.query.id;
      console.log(i, "i.i");
      // if (!i) {
      //   return;
      // } else {
      //  return this.curindex = i;
      // }
      console.log(this.curindex, "this.curindex");
    },
    showshop(index, item) {
      // console.log(item);
      this.shopshowinfo = item;
    },
    tonav(index) {
      this.curindex = index;
      console.log("11111");
    },
    swiper(index, item) {
      this.shopshowinfo = item;
    },
  },

  components: { banner, tabBar, swiper, swiperSlide }
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
        position: relative;
        .swiper-button-white {
          width: 44px;
          position: absolute;
          top: 827px;
          height: 164px !important;
        }
        .swiper-button-prev {
          left: 0;
        }
        .swiper-button-next {
          right: 0;
        }
        .galler-top {
          height: 750px;
          width: 100%;
          .slide {
            width: 100%;
            height: 750px;
            .showbox {
              width: 100%;
              height: 100%;
              position: relative;
              .mainpic {
                width: 100%;
                height: 100%;
              }
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
          }
        }
        .gallery-thumbs {
          // background: olive;
          width: 1100px;
          height: 165px !important;
          position: relative;
          top: 10px;
        }
        .gallery-thumbs .swiper-slide {
          width: 230px;
          height: 164px;
          border-radius: 10px;
          position: relative;
          cursor: pointer;
          .mainpic {
            border-radius: 10px;
          }
          .showbox {
            width: 100%;
            height: 100%;
            position: relative;
            .mainpic {
              width: 100%;
              height: 100%;
            }
            .pichover {
              width: 100%;
              height: 164px;
              border-radius: 10px;
              position: absolute;
              top: 0;
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
    }
  }
}
</style>