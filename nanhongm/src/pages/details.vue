<template>
  <div class="commoditydetails">
    <div class="goodsshow">
      <div class="swiperbox">
        <img class="mainpic" :src="httpUrl+goodsinfo.image_url" alt />
        <!-- <div
          class="mainpic"
          :style="{backgroundImage: 'url('  +httpUrl+ goodsinfo.image_url+  ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>-->
      </div>
      <div class="gs-right">
        <p class="name">{{goodsinfo.article_title}}</p>
        <div class="typebox select">
          <p class="text">规格</p>
          <div class="selectbox">
            <div class="selection" v-for="(item, indexs) in color" :key="indexs">
              <section class="section">
                <span class="span"></span>
                <span class="type">{{item}}</span>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="det-eva">
      <div class="title">
        <p class="text" @click="deteva(0)" :class="detevas==false?'deteva':''">产品详情</p>
      </div>
      <!-- 详情 -->
      <div class="det detevabox" v-show="detevanum==0">
        <div class="detinfos scorll" id="infos-cont" v-html="goodsinfo.article_contents"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "commoditydetails",
  data() {
    return {
      styleindex: 0,

      color: [],
      type: 0,
      detevas: false,
      detevanum: 0,

      goodsinfo: [],
      eva: [],
      filter: [],
      class_id: "",
      fids: []
    };
  },
  updated() {
    let a = document.getElementById("infos-cont");
    let imgs = a.getElementsByTagName("img");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].style.width = "100%";
      imgs[i].style.height = "100%";
    }
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
  }
};
</script>
<style lang="less" scoped>
.commoditydetails {
  width: 100%;
  position: relative;
  .goodsshow {
    width: 100%;
    .swiperbox {
      //   background: chartreuse;
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      width: 100%;
      height: 470px;
      box-sizing: border-box;
      padding: 10px 0;
      text-align: center;
      .mainpic {
        margin: 0px auto;
        // width: 95%;
        height: 100%;
      }
    }
    .gs-right {
      width: 100%;
      // background: brown;
      box-sizing: border-box;
      padding: 15px 25px 0 25px;
      .name {
        color: rgba(51, 51, 51, 1);
        font-size: 30px;
        box-sizing: border-box;
        padding: 30px 0 15px 0;
        border-bottom: 1px dashed #e5e5e5;
      }
      .select {
        // background: olive;
        width: 100%;
        .text {
          color: #666666;
          font-size: 24px;
          box-sizing: border-box;
          padding: 20px 0 20px 0;
        }
        .selectbox {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .selection {
          width: 48%;
          .section {
            width: 100%;
            height: 70px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(229, 229, 229, 1);
            color: rgba(123, 123, 123, 1);
            text-align: center;
            line-height: 70px;
            margin-bottom: 4%;
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
      .price {
        border-top: 1px dashed #e5e5e5;
        color: rgba(51, 51, 51, 1);
        font-size: 60px;
      }
      .addcar {
        cursor: pointer;
        width: 255px;
        height: 70px;
        background: rgba(235, 0, 40, 1);
        font-size: 24px;
        color: white;
        text-align: center;
        line-height: 70px;
        margin: 21px 0 52px 0;
      }
      .info {
        font-size: 24px;
        color: #333333;
      }
    }
  }
  .det-eva {
    width: 100%;
    box-sizing: border-box;
    padding: 50px 25px;
    .title {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      .text {
        text-align: center;
        width: 100%;
        background: #ececec;
        height: 60px;
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        line-height: 60px;
      }
      .deteva {
        background: #2482c8;
        color: white;
      }
    }
    .detevabox {
      width: 100%;
      padding: 25px 0;
      background: rgba(255, 255, 255, 1);
    }
  }
}
</style>