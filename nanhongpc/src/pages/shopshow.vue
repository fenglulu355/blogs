<template>
  <div class="shopshow">
    <!-- <banner></banner> -->
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
                    :style="{backgroundImage: 'url(' +httpUrl+  shopshowinfo.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  >
                    <!-- <img :src="shopshowinfo.bg" alt /> -->
                  </div>
                  <div class="shopinfo">
                    <p class="shopname">{{shopshowinfo.shopname}}</p>
                    <p class="shopdes" v-html="shopshowinfo.content">
                      <!-- <span class="text desc">主营产品：{{shopshowinfo.content}}</span> -->
                      <!-- <span class="sx">/</span>
                      <span class="text">地址：{{shopshowinfo.address}}</span>
                      <span class="sx">/</span>
                      <span class="text">电话：{{shopshowinfo.tel}}</span>-->
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
                    :style="{backgroundImage: 'url('+ httpUrl+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <div class="pichover">
                    <p>{{item.title}}</p>
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
          <li class="shopshowli" v-if="curindex === 1">
            <!-- swiper1 -->
            <baidu-map class="galler-top" v-if="ismap" :center="{lng: lng, lat: lat}" :zoom="15">
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <bm-marker
                :position="{lng: lng, lat: lat}"
                :dragging="true"
                animation="BMAP_ANIMATION_BOUNCE"
                @click="tomap"
              >
                <bm-label
                  @click="tomap"
                  :content="mapinfo.title"
                  :labelStyle="{color: 'red', fontSize : '24px' ,padding:'0 15px',textAlign:'center'} "
                  :offset="{width: -35, height: 30}"
                />
              </bm-marker>
            </baidu-map>

            <!-- swiper2 Thumbs -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
              <swiper-slide class="slide" v-for="(item, index) in shopinfo" :key="index">
                <div class="showbox" @click="swipermap(index,item)" :data-id="index">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url('+ httpUrl+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <div class="pichover">
                    <p>{{item.title}}</p>
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
  provide() {
    return {
      reload: this.mapreload
    };
  },
  data() {
    return {
      curindex: 0,
      calleft: 0,
      showimg: "",
      shopshowinfo: [],
      mapinfo: [],
      tabtitle: {
        a: "门店",
        b: "展示"
      },
      tabnav: [{ class_name: "门店展示" }, { class_name: "门店导航" }],
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
      },
      shopinfo: [],
      lng: 116.404,
      lat: 39.915,
      zb: [
        { lng: 116.504, lat: 39.915 },
        { lng: 117.404, lat: 39.915 },
        { lng: 118.404, lat: 39.815 },
        { lng: 119.404, lat: 39.715 },
        { lng: 110.404, lat: 39.615 },
        { lng: 120.404, lat: 39.515 }
      ],
      ismap: true
    };
  },

  created() {
    this.requst();

    this.getrouter;
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      this.curindex = Number(idx);
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 600;
  },
  methods: {
    mapreload() {
      let self = this;
      self.ismap = false;
      self.$nextTick(function() {
        self.ismap = true;
      });
    },
    tomap() {
      console.log(this.mapinfo);
      window.open(
        `http://api.map.baidu.com/geocoder?address=` +
          this.mapinfo.address +
          `&output=html`
      );
    },
    requst() {
      this.$axios.post("/index/api/mdzsList").then(res => {
        console.log(res.data.data);
        this.shopinfo = res.data.data;
        this.shopshowinfo = this.shopinfo[0];
        this.shopwidth = this.shopinfo.length * 245;
        this.mapinfo = this.shopinfo[0];
      });
    },
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
    swipermap(index, item) {
      this.mapinfo = item;
      this.lng = this.zb[index].lng;
      this.lat = this.zb[index].lat;
      this.mapreload();
      console.log(this.lat, this.lng);
    }
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
    // border-bottom: 1px solid rgba(153, 153, 153, 0.3);
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
                  .desc {
                    // display: inline-block;
                    // width: 80%;
                    // overflow: hidden;
                    // white-space: nowrap;
                    // text-overflow: ellipsis;

                    font-size: 16px;
                  }
                  .sx {
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