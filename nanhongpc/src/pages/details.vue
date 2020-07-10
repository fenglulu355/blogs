<template>
  <div class="commoditydetails">
    <div class="goodsshow">
      <div class="gs-left">
        <!-- 大图 -->
        <div class="galler-top" ref="swiperTop">
          <div class="slide">
            <div class="showbox">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' +httpUrl+ shopshowinfo+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              >
                <!-- <img :src="shopshowinfo.bg" alt /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gs-right">
        <p class="name">{{goodsinfo.article_title}}</p>
        <p
          class="style"
        >-------------------------------------------------------------------------------</p>
        <div class="colorbox select">
          <p class="text">规格</p>
          <div class="selectbox">
            <div class="selection" v-for="(item, indexs) in color" :key="indexs">
              <section class="section">
                <span class="span"></span>
                <span class="color">{{item}}</span>
              </section>
            </div>
          </div>
        </div>
        <div class="select">
          <p class="text">描述</p>
          <p>{{goodsinfo.article_description}}</p>
        </div>
        <p
          class="style bot"
        >-------------------------------------------------------------------------------</p>
      </div>
    </div>
    <div class="det-eva">
      <p class="title">
        <span class="text" @click="deteva(0)" :class="detevas==true?'deteva':''">产品详情</span>
      </p>
      <!-- 详情 -->
      <div class="det detevabox" v-show="detevanum==0">
        <div class="detinfos scorll" v-html="goodsinfo.article_contents"></div>
      </div>
      <!-- 评价 -->
    </div>
  </div>
</template>

<script>
import evaluate from "../components/evaluate";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapState } from "vuex";
export default {
  name: "prodetails",
  data() {
    return {
      isevaluate: false,
      checked: false,
      radio: 3,
      color: [],
      type: 0,
      detevas: false,
      detevanum: 0,
      shopshowinfo: [],
      evainfo: {},
      goodsinfo: [],
      eva: [],
      filter: [],
      class_id: "",
      fids: []
    };
  },
  computed: {
    ...mapState(["searchinfo"])
  },
  created() {
    console.log(this.searchinfo);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.goodsinfo = this.searchinfo;
    this.shopshowinfo = this.goodsinfo.image_url;
    this.color = this.goodsinfo.attr.split(",");
  },
  methods: {
    deteva(e) {
      this.detevas = !this.detevas;
      this.detevanum = e;
      console.log(e);
    }
  },
  components: { swiper, swiperSlide, evaluate }
};
</script>
<style lang="less" scoped>
.commoditydetails {
  width: 100%;
  background: RGBA(246, 245, 248, 1);
  position: relative;
  .goodsshow {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 50px 0;
    .gs-left {
      width: 560px;
      position: relative;
      .swiper-button-white {
        width: 31px;
        position: absolute;
        top: 590px;
        height: 114px !important;
      }
      .swiper-button-prev {
        left: 0;
      }
      .swiper-button-next {
        right: 0;
      }
      .galler-top {
        background: white;
        width: 560px;
        .slide {
          width: 100%;
          height: 544px;
          .showbox {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 33px 42px;
            .mainpic {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .gallery-thumbs {
        width: 480px;
        height: 114px !important;
        margin-top: 25px;
      }
      .gallery-thumbs .swiper-slide {
        // background: olive;
        width: 114px;
        height: 114px;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        .mainpic {
          border-radius: 10px;
        }
        .showbox {
          width: 100%;
          height: 100%;
          .mainpic {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .gs-right {
      width: 550px;
      .name {
        color: rgba(51, 51, 51, 1);
        font-size: 30px;
        box-sizing: border-box;
        padding: 50px 0 15px 0;
      }
      .style {
        color: rgba(204, 204, 204, 1);
      }
      .bot {
        box-sizing: border-box;
        padding: 15px 0;
      }
      .select {
        // background: olive;
        width: 100%;
        .text {
          color: rgba(102, 102, 102, 1);
          box-sizing: border-box;
          padding: 20px 0 20px 0;
        }
        .selection {
          display: inline-block;
          box-sizing: border-box;
          margin: 10px;
          .section {
            cursor: pointer;
            width: 180px;
            height: 55px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(229, 229, 229, 1);
            color: rgba(123, 123, 123, 1);
            text-align: center;
            line-height: 55px;
            .span {
              display: inline-block;
              width: 12px;
              height: 12px;
              background: rgba(229, 229, 229, 1);
              border-radius: 50%;
              position: relative;
              left: -50px;
            }
          }
          .cur {
            transition: all 0.2s ease-in;
            border: 1px solid rgba(235, 0, 40, 1);
            .span {
              transition: all 0.2s ease-in;
              background: rgba(235, 0, 40, 1);
            }
          }
        }
      }
    }
  }
  .det-eva {
    width: 100%;
    background: white;
    .title {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      text-align: center;
      span {
        cursor: pointer;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        line-height: 60px;
        margin: 0 20px;
      }
      .deteva {
        color: rgba(153, 153, 153, 1);
      }
    }
    .detevabox {
      width: 1200px;
      height: 1100px;
      margin: 50px auto;
      padding: 20px 0;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 10px;
      .scorll {
        width: 1150px;
        height: 1100px;
        margin: 0px auto;
        box-sizing: border-box;
        padding: 0px 20px;
        overflow-y: scroll;
      }
    }
  }
}
</style>