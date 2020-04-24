<template>
  <div class="commoditydetails">
    <div class="goodsshow">
      <div class="swiperbox">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#2482C8">
          <van-swipe-item v-for="(item, index) in goodsinfo.imgs" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + item+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="gs-right">
        <p class="name">{{goodsinfo.name}}</p>
        <div class="colorbox select">
          <p class="text">颜色</p>
          <div class="selection">
            <section
              class="section"
              v-for="(item, index) in goodsinfo.color"
              :key="index"
              :class="color==index?'cur':''"
              @click="curcolor(index)"
            >
              <span class="span"></span>
              <span class="color">{{item}}</span>
            </section>
          </div>
        </div>
        <div class="typebox select">
          <p class="text">规格</p>
          <div class="selection">
            <section
              class="section"
              v-for="(item, index) in goodsinfo.type"
              :key="index"
              :class="type==index?'cur':''"
              @click="curtype(index)"
            >
              <span class="span"></span>
              <span class="type">{{item}}</span>
            </section>
          </div>
        </div>
        <p class="price">￥{{goodsinfo.price}}</p>
        <p class="addcar" @click="tocar">加入购物车</p>
        <p class="info">
          <span class="sale">销量：{{goodsinfo.sale}}</span>
          <span>/</span>
          <span class="stock">库存{{goodsinfo.stock}}</span>
        </p>
      </div>
    </div>
    <div class="det-eva">
      <div class="title">
        <p class="text" @click="deteva(0)" :class="detevas==true?'deteva':''">产品详情</p>
        <p class="text" @click="deteva(1)" :class="detevas==false?'deteva':''">用户评价</p>
      </div>
      <!-- 详情 -->
      <div class="det detevabox" v-show="detevanum==0">
        <div class="detinfos scorll">产品详情</div>
      </div>
      <!-- 评价 -->
      <div class="eva detevabox" v-show="detevanum==1">
        <div class="evainfos scorll">
          <ul class="evalist">
            <li class="evali" v-for="(item, index) in filter" :key="index">
              <div class="evali-left">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' + item.headimg+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                 }"
                ></div>
              </div>
              <div class="evali-right">
                <p class="name">{{item.name}}</p>
                <p class="time">{{item.time}}</p>
                <p
                  class="cont"
                  @click="isstyle(index)"
                  :class="styleindex==index?'open':''"
                >{{item.cont}}</p>
                <div class="pics" v-if="item.imgs">
                  <div class="slide" v-for="(items, index) in item.imgs" :key="index">
                    <div
                      class="showpic"
                      :style="{backgroundImage: 'url(' + items+ ')',
                        backgroundSize:'cover',
                        backgroundRepeat: 'no-repeat',
                    backgroundPosition:'center'
                     }"
                    ></div>
                  </div>
                </div>
                <p class="ctype">
                  <span>{{item.color}}</span>
                  <span>{{item.type}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import evaluate from "../components/evaluate";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "commoditydetails",
  data() {
    return {
      styleindex: 0,
      isevaluate: false,
      checked: false,
      radio: 0,
      color: 0,
      type: 0,
      detevas: false,
      detevanum: 0,
      shopshowinfo: [],
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
      evainfo: {},
      goodsinfo: {
        id: 1,
        name: "格力晶晶滚筒洗衣机",
        color: ["白色", "灰色", "米色", "黑色"],
        type: ["1.5匹", "1匹"],
        imgs: [
          require("../assets/product/goods1.png"),
          require("../assets/about/1-1.png"),
          require("../assets/about/1-2.png"),
          require("../assets/about/1-3.png"),
          require("../assets/about/1-4.png"),
          require("../assets/about/1-2.png")
        ],
        price: 1588.0,
        sale: 500,
        stock: 200
      },
      eva: [
        {
          name: "中评1",
          time: "2019.05.06.09:34",
          headimg: require("../assets/shop/eva-head.png"),
          cont:
            "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内内容评价内内容评价内内容评价内内容评价内内容评价内容评价内容",
          imgs: [
            require("../assets/shop/eva-goods.png"),
            require("../assets/shop/eva-goods.png"),
            require("../assets/shop/eva-goods.png"),
            require("../assets/shop/eva-goods.png")
          ],
          color: "白色",
          type: "1.5匹",
          code: 1
        },
        {
          name: "好评1",
          time: "2019.05.06.09:34",
          headimg: require("../assets/shop/eva-head.png"),
          cont:
            "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容",
          imgs: [
            require("../assets/shop/eva-goods.png"),
            require("../assets/shop/eva-goods.png")
          ],
          color: "白色",
          type: "1.5匹",
          code: 0
        },
        {
          name: "差评1",
          time: "2019.05.06.09:34",
          headimg: require("../assets/shop/eva-head.png"),
          cont:
            "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容",
          imgs: [
            require("../assets/shop/eva-goods.png"),
            require("../assets/shop/eva-goods.png")
          ],
          color: "白色",
          type: "1.5匹",
          code: 2
        },
        {
          name: "中评1",
          time: "2019.05.06.09:34",
          headimg: require("../assets/shop/eva-head.png"),
          cont:
            "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容",
          imgs: [
            require("../assets/shop/eva-goods.png"),
            require("../assets/shop/eva-goods.png")
          ],
          color: "白色",
          type: "1.5匹",
          code: 1
        },
        {
          name: "好评1",
          time: "2019.05.06.09:34",
          headimg: require("../assets/shop/eva-head.png"),
          cont:
            "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容",
          imgs: [
            require("../assets/shop/eva-goods.png"),
            require("../assets/shop/eva-goods.png")
          ],
          color: "白色",
          type: "1.5匹",
          code: 0
        },
        {
          name: "差评1",
          time: "2019.05.06.09:34",
          headimg: require("../assets/shop/eva-head.png"),
          cont:
            "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容",
          imgs: [
            require("../assets/shop/eva-goods.png"),
            require("../assets/shop/eva-goods.png")
          ],
          color: "白色",
          type: "1.5匹",
          code: 2
        },
        {
          name: "中评1",
          time: "2019.05.06.09:34",
          headimg: require("../assets/shop/eva-head.png"),
          cont:
            "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容",

          color: "白色",
          type: "1.5匹",
          code: 1
        },
        {
          name: "好评1",
          time: "2019.05.06.09:34",
          headimg: require("../assets/shop/eva-head.png"),
          cont:
            "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容",

          color: "白色",
          type: "1.5匹",
          code: 0
        },
        {
          name: "差评1",
          time: "2019.05.06.09:34",
          headimg: require("../assets/shop/eva-head.png"),
          cont:
            "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容",

          color: "白色",
          type: "1.5匹",
          code: 2
        }
      ],
      filter: []
    };
  },
  created() {
    this.shopshowinfo = this.goodsinfo.imgs[0];
    this.evainfo.name = this.goodsinfo.name;
    this.evainfo.img = this.goodsinfo.imgs[0];
    // 过滤好评
    let nums = this.eva;
    let res = nums.filter(nums => {
      return nums.code == 0;
    });
    this.filter = res;
  },
  methods: {
    tocar() {
      this.$router.push({ path: "/shoppingcar" });
    },
    // open
    isstyle(index) {
      this.styleindex = index;
    },
    swiper(index, item) {
      this.shopshowinfo = item;
    },
    toprev() {},
    tonext() {},
    curtype(index) {
      this.type = index;
    },
    curcolor(index) {
      this.color = index;
    },
    deteva(e) {
      this.detevas = !this.detevas;
      this.detevanum = e;
      console.log(e);
    },
    change(e) {
      let nums = this.eva;
      let res = nums.filter(nums => {
        return nums.code == e;
      });
      this.filter = res;
    },
    // 只看有图
    pic() {
      let nums = this.eva;
      let res = nums.filter(nums => {
        return nums.imgs;
      });
      this.filter = res;
    }
  },
  components: { swiper, swiperSlide, evaluate }
};
</script>
<style lang="less" scoped>
.commoditydetails {
  width: 100%;
  position: relative;
  .goodsshow {
    width: 100%;
    .swiperbox {
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      width: 100%;
      height: 670px;
      .my-swipe {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 70px 0;
        .mainpic {
          width: 100%;
          height: 100%;
        }
      }
    }
    .gs-right {
      width: 100%;
      // background: brown;
      box-sizing: border-box;
      padding: 75px 25px 0 25px;
      .name {
        color: rgba(51, 51, 51, 1);
        font-size: 30px;
        box-sizing: border-box;
        padding: 50px 0 15px 0;
        border-bottom: 1px dashed #e5e5e5;
      }

      .bot {
        box-sizing: border-box;
        padding: 15px 0;
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
        .selection {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .section {
            width: 48%;
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
        width: 50%;
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
      // .scorll {
      //   width: 100%;
      //   height: 1100px;
      //   margin: 0px auto;
      //   box-sizing: border-box;
      //   padding: 0px 20px;
      //   overflow-y: scroll;
      // }
    }
    .evainfos {
      // background: pink;

      .evalist {
        .evali {
          box-sizing: border-box;
          padding: 50px 0;
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          display: flex;
          justify-content: flex-start;
          .evali-left {
            width: 120px;
            // height: 558px;
            .mainpic {
              width: 117px;
              height: 117px;
              border-radius: 50%;
            }
          }
          .evali-right {
            width: calc(100% - 120px);
            box-sizing: border-box;
            padding-left: 25px;
            // background: pink;
            .name {
              color: #333333;
              font-size: 36px;
            }
            .time {
              padding-top: 10px;
              font-size: 24px;
              color: rgba(153, 153, 153, 1);
            }
            .cont {
              box-sizing: border-box;
              padding: 45px 0 0px 0;
              font-size: 30px;
              line-height: 45px;
              width: 100%;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }
            .open {
              -webkit-line-clamp: 9999999;
            }
            .pics {
              margin-top: 20px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              .slide {
                width: 49%;
                height: 285px;
                .showpic {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .ctype {
              box-sizing: border-box;
              padding-top: 20px;
              color: rgba(153, 153, 153, 1);
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>