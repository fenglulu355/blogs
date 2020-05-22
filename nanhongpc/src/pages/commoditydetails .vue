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
        <!-- swiper2 Thumbs -->
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
          <swiper-slide class="slide" v-for="(item, index) in goodsinfo.goods_images" :key="index">
            <div class="showbox" @click="swiper(index,item)" :data-id="index">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' +httpUrl+ item.image_url+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                 }"
              ></div>
            </div>
          </swiper-slide>
        </swiper>
        <div
          class="swiper-button-next swiper-button-white"
          @click="tonext"
          slot="button-next"
          :style="{backgroundImage: 'url(' + require('../assets/shopshow/right.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <div
          class="swiper-button-prev swiper-button-white"
          @click="toprev"
          slot="button-prev"
          :style="{backgroundImage: 'url(' + require('../assets/shopshow/left.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
      </div>
      <div class="gs-right">
        <p class="name">{{goodsinfo.goods_info.goods_name}}</p>
        <p
          class="style"
        >-------------------------------------------------------------------------------</p>
        <div class="colorbox select">
          <div class="selectbox" v-for="(item, indexs) in goodsinfo.goods_format" :key="indexs">
            <p class="text">{{item.format_name}}</p>
            <div class="selection">
              <section
                class="section"
                v-for="(items, i) in item.format_children"
                :key="i"
                :class="color[indexs]==i?'cur':''"
                @click="curcolor(indexs,i,items)"
              >
                <span class="span"></span>
                <span class="color">{{items.format_name}}</span>
              </section>
            </div>
          </div>
        </div>
        <!-- <div class="typebox select">
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
        </div>-->
        <p
          class="style bot"
        >-------------------------------------------------------------------------------</p>
        <p class="price">￥{{goodsinfo.goods_info.goods_price}}</p>
        <p class="addcar" @click="tocar">加入购物车</p>
        <p class="info">
          <span class="sale">销量：{{goodsinfo.goods_info.goods_discount}}</span>
          <span>/</span>
          <span class="stock">库存{{goodsinfo.goods_info.goods_number}}</span>
        </p>
      </div>
    </div>
    <div class="det-eva">
      <p class="title">
        <span class="text" @click="deteva(0)" :class="detevas==true?'deteva':''">产品详情</span>
        <span class="text" @click="deteva(1)" :class="detevas==false?'deteva':''">用户评价</span>
      </p>
      <!-- 详情 -->
      <div class="det detevabox" v-show="detevanum==0">
        <div class="detinfos scorll" v-html="goodsinfo.goods_info.goods_contents"></div>
      </div>
      <!-- 评价 -->
      <div class="eva detevabox" v-show="detevanum==1">
        <div class="evainfos scorll">
          <div class="eitop">
            <el-radio-group v-model="radio">
              <el-radio :label="3" @change="change">好评(93%)</el-radio>
              <el-radio :label="2" @change="change">中评(6%)</el-radio>
              <el-radio :label="1" @change="change">差评(1%)</el-radio>
            </el-radio-group>
            <div class="showpic">
              <el-checkbox v-model="checked" @change="pic">有图</el-checkbox>
            </div>
            <!-- 用户登陆后判断订单里是否有此商品，有就评价，没有就提示没有购买请先购买再评价 -->
            <div class="writing" @click="toeva()">
              <img src="../assets/shop/pj.png" alt />
              <span>写评价</span>
            </div>
          </div>
          <ul class="evalist">
            <li class="evali" v-for="(item, index) in filter" :key="index">
              <div class="evali-left">
                <div
                  v-if=" item.user.bd_headimg"
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +httpUrl+ item.user.bd_headimg+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                 }"
                ></div>
                <div
                  v-else
                  class="mainpic"
                  :style="{backgroundImage: 'url(' + item.user.wx_headimg+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                 }"
                ></div>
              </div>
              <div class="evali-right">
                <p class="name" v-if="item.user.user_name">{{item.user.user_name}}</p>
                <p class="name" v-else>{{item.user.user_nickname}}</p>
                <p class="time">{{item.created_time}}</p>
                <p class="cont" v-html="item.content"></p>
                <div class="pics" v-if="item.image_url">
                  <div class="slide" v-for="(items, index) in item.image_url" :key="index">
                    <div
                      class="showpic"
                      :style="{backgroundImage: 'url(' +httpUrl+ items+ ')',
                        backgroundSize:'cover',
                        backgroundRepeat: 'no-repeat',
                    backgroundPosition:'center'
                     }"
                    ></div>
                  </div>
                </div>
                <p class="ctype">
                  <span>{{item.spec}}</span>
                  <!-- <span>{{item.type}}</span> -->
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <evaluate :goodsinfos="evainfo" @close="close" v-show="isevaluate"></evaluate>
  </div>
</template>

<script>
import evaluate from "../components/evaluate";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "commoditydetails",
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
      goodsinfo: [],
      eva: [],
      filter: [],
      class_id: "",
      fids: []
    };
  },

  created() {
    this.class_id = this.$route.query.class_id;
    this.requst(this.class_id);
  },
  methods: {
    // 详情
    requst(class_id) {
      this.$axios
        .post("/index/shop/getGoodsInfo", { gid: class_id })
        .then(res => {
          console.log(res);
          this.goodsinfo = res.data.data;
          this.shopshowinfo = this.goodsinfo.goods_images[0].image_url;
          this.eva = this.goodsinfo.goods_commtent;
          this.evainfo.name = this.goodsinfo.goods_info.goods_name;
          this.evainfo.img = this.goodsinfo.goods_images[0].image_url;
          for (
            let i = 0, lenth = this.goodsinfo.goods_format.length;
            i < lenth;
            i++
          ) {
            this.fids.push([
              this.goodsinfo.goods_format[i].format_children[0].format_name
            ]);
            this.color.push([]);
          }
          console.log(this.fids, " this.fids");
          // 过滤好评
          let nums = this.eva;
          let a = nums.filter(nums => {
            return nums.star == 3;
          });
          this.filter = a;
          console.log(a, "a");
        });
    },
    tocar() {
      let userid = JSON.parse(sessionStorage.getItem("vuex")).userid,
        goodsid = this.goodsinfo.goods_info.goods_id,
        fids = this.fids.join(",");
      console.log(fids);

      this.$axios
        .post("/index/shop/addShoppingCart", {
          userId: userid,
          gid: goodsid,
          num: 1,
          fids: fids
        })
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: "加入购物车成功",
              type: "success"
            });
            setTimeout(() => {
              // 跳转至购物车
              this.$router.push({ path: "/shoppingcar" });
            }, 500);
          } else {
            this.$message.error("添加失败");
          }
        });
      // console.log(userid, this.goodsinfo, "userid");
    },
    toeva() {
      this.$axios.post("/index/user/orders").then(res => {
        console.log(res);

        // 循环判断订单列表里面是否有这个订单，有就评价
        this.isevaluate = true;
      });
      console.log(this.evainfo);
    },
    close(e) {
      this.isevaluate = e;
      console.log(e, "wwww");
    },
    swiper(index, item) {
      this.shopshowinfo = item.image_url;
    },
    toprev() {},
    tonext() {},
    curtype(index) {
      this.type = index;
    },
    curcolor(index, indexs, items) {
      let id = items.format_name;
      this.fids[index] = id;
      this.color[index] = indexs;
      this.$forceUpdate();
    },
    deteva(e) {
      this.detevas = !this.detevas;
      this.detevanum = e;
      console.log(e);
    },
    change(e) {
      let nums = this.eva;
      let res = nums.filter(nums => {
        return nums.star == e;
      });
      this.filter = res;
    },
    // 只看有图
    pic() {
      let nums = this.eva;
      let res = nums.filter(nums => {
        return nums.image_url;
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
          //   background: pink;
          display: grid;
          grid-template-columns: 50% 50%;
          grid-row-gap: 10px;
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
      .price {
        color: rgba(51, 51, 51, 1);
        font-size: 48px;
      }
      .addcar {
        cursor: pointer;
        width: 203px;
        height: 55px;
        background: rgba(235, 0, 40, 1);
        font-size: 18px;
        color: white;
        text-align: center;
        line-height: 55px;
        margin: 5px 0 45px 0;
      }
      .info {
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
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
    .evainfos {
      // background: pink;

      .eitop {
        box-sizing: border-box;
        padding: 15px 0px;
        position: relative;
        .showpic {
          display: inline-block;
          margin-left: 30px;
        }
        .writing {
          cursor: pointer;
          position: absolute;
          right: 5px;
          top: 20px;
          font-size: 14px;
          color: rgba(235, 0, 40, 1);
          span {
            position: relative;
            top: 2px;
            left: 3px;
          }
        }
        border-bottom: 1px solid rgba(204, 204, 204, 1);
      }
      .evalist {
        .evali {
          //   height: 558px;
          box-sizing: border-box;
          padding: 60px 0;
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          display: flex;
          justify-content: flex-start;
          .evali-left {
            width: 87px;
            // height: 558px;
            .mainpic {
              width: 57px;
              height: 57px;
            }
          }
          .evali-right {
            width: calc(100% - 87px);
            // background: pink;
            .name {
              color: rgba(51, 51, 51, 1);
              font-size: 16px;
              line-height: 30px;
            }
            .time {
              font-size: 14px;
              color: rgba(153, 153, 153, 1);
            }
            .cont {
              box-sizing: border-box;
              padding: 10px 0 0 0;
              //   background: plum;
              line-height: 25px;
              width: 100%;
              height: 100px;
            }
            .pics {
              width: 100%;
              display: flex;
              justify-content: flex-start;
              .slide {
                width: 285px;
                height: 285px;
                padding: 10px 10px 26px 0;
                .showpic {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .ctype {
              color: rgba(153, 153, 153, 1);
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>