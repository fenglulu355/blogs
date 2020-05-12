<template>
  <div id="app">
    <div
      class="main"
      :style="{backgroundImage: 'url(' + require('../src/assets/bg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
    >
      <div class="topbanner">
        <img class="mainpic" src="../src/assets/topbg.jpg" alt />
      </div>
      <!-- 车辆评估 -->
      <div class="assessment common">
        <div class="cont">
          <div
            class="bgicon"
            :style="{backgroundImage: 'url(' + require('../src/assets/bgicon.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          >
            <p>车辆评估</p>
          </div>
          <p class="person">
            今日已有
            <span>{{about[0]}}</span>
            名车主提交信息
          </p>
          <div class="curbox">
            <span class="text">
              <img src="../src/assets/cars.png" alt />
            </span>
            <div class="cur-right">
              <selection @selected="getSelect" :options="webinfo.class_data"></selection>
            </div>
          </div>
          <div class="curbox">
            <span class="text">
              <img class="tel" src="../src/assets/tel.png" alt />
            </span>
            <div class="cur-right">
              <input
                class="tel"
                type="text"
                placeholder="请输入您的联系方式"
                v-model="phone"
                @blur="regTel(phone)"
              />
            </div>
          </div>
          <div class="botbox">
            <p class="toasse" @click="sendinfo">立即评估</p>
            <p class="totel" @click="callPhone(tel)">一键拨号咨询</p>
          </div>
        </div>
      </div>
      <!-- 优势 -->
      <div class="advantage common">
        <div
          class="bgicon"
          :style="{backgroundImage: 'url(' + require('../src/assets/bgicon.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        >
          <p>新吉鑫的优势</p>
        </div>
        <ul class="advlist">
          <li class="advli" v-for="(item, index) in advli" :key="index">
            <div class="adv-left">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' +item.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>
            </div>
            <div class="adv-right">
              <h3 class="ttext">{{item.ttext}}</h3>
              <p class="btext">{{item.btext}}</p>
            </div>
          </li>
        </ul>
        <div class="botbox">
          <p class="totels" @click="callPhone(tel)">一键拨号咨询</p>
        </div>
      </div>
      <!-- 回收流程 -->
      <div class="recovery common">
        <div
          class="bgicon"
          :style="{backgroundImage: 'url(' + require('../src/assets/bgicon.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        >
          <p>回收流程</p>
        </div>
        <ul class="reclist">
          <li class="recli">
            <div
              class="bgbox"
              :style="{backgroundImage: 'url(' + require('../src/assets/rec1.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="text">见面洽谈</p>
            <p class="btext">预约上门验车</p>
          </li>
          <li class="recli tr">
            <div
              class="toright"
              :style="{backgroundImage: 'url(' + require('../src/assets/toright.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </li>
          <li class="recli">
            <div
              class="bgbox"
              :style="{backgroundImage: 'url(' + require('../src/assets/rec2.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="text">车辆查验</p>
            <p class="btext">对车辆进行全面查验</p>
          </li>
          <li class="recli tr">
            <div
              class="toright"
              :style="{backgroundImage: 'url(' + require('../src/assets/toright.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </li>
          <li class="recli">
            <div
              class="bgbox"
              :style="{backgroundImage: 'url(' + require('../src/assets/rec3.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="text">进行交易</p>
            <p class="btext">最终确认交易</p>
          </li>
        </ul>
      </div>
      <!-- 客户评价 -->
      <div class="evabox common">
        <div
          class="bgicon"
          :style="{backgroundImage: 'url(' + require('../src/assets/bgicon.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        >
          <p>客户评价</p>
        </div>
        <div class="carouselbox">
          <van-swipe class="my-swipe" :autoplay="4000" indicator-color="#5837f1">
            <van-swipe-item v-for="(item ,index) in evali" :key="index">
              <div class="evainfo">
                <div class="eva-left">
                  <div class="el-top">
                    <div
                      class="mainpic"
                      :style="{backgroundImage: 'url(' +`http://www.xjxesc.com/server/public/`+ item.author_image_url+ ')',
                    backgroundSize:'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition:'center'
                    }"
                    ></div>
                    <div class="text">
                      <p class="name">{{item.author_name}}</p>
                      <p class="car">{{item.class_name}}</p>
                    </div>
                  </div>
                  <div class="des" v-html="item.product_contents"></div>
                </div>
                <div
                  class="eva-right"
                  :style="{backgroundImage: 'url('+`http://www.xjxesc.com/server/public/`+ item.product_image_url+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
                >
                  <div class="price">
                    <span>￥{{item.product_price}}</span>
                  </div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>

        <div class="botbox">
          <p class="totels" @click="callPhone(tel)">一键拨号咨询</p>
        </div>
      </div>
      <!-- 关于 -->
      <div class="about common">
        <div
          class="bgicon"
          :style="{backgroundImage: 'url(' + require('../src/assets/bgicon.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        >
          <p>关于新吉鑫</p>
        </div>
        <!-- <p class="person">
          已成功回收
          <span>{{about[0]}}</span>
          辆二手车
        </p>-->
        <div class="desc" v-html="aboutinfo"></div>
        <div class="ewmbox">
          <p>添加微信客服</p>
          <p>随时与我们联系沟通</p>
          <div class="ewm">
            <img :src="ewmurl" alt />
          </div>
        </div>
      </div>
      <div class="btbgs">
        <p @click="callPhone(tel)">一键拨号咨询</p>
      </div>
      <p class="copyright" v-html="copyright"></p>
    </div>
  </div>
</template>

<script>
import normalized from "./assets/normalized.css";
import selection from "../src/components/select";
export default {
  name: "App",
  data() {
    return {
      advli: [
        {
          img: require("../src/assets/1.png"),
          ttext: "卖得高",
          btext: "多卖25%，个人买家商家同时报价"
        },
        {
          img: require("../src/assets/1.png"),
          ttext: "成交快",
          btext: "平均2天成交，海量买家"
        },
        {
          img: require("../src/assets/2.png"),
          ttext: "时效长",
          btext: "报价15天内有效，价格随便比"
        },
        {
          img: require("../src/assets/1.png"),
          ttext: "安全放心",
          btext: "行业诚信品牌，交易全程都有保障"
        }
      ],
      evali: [],
      about: ["20159"],
      webinfo: [],
      aboutinfo: "",
      ewmurl: "",
      tel: "",
      curcar: "",
      phone: "",
      istel: false,
      copyright: ""
    };
  },
  components: { selection },
  created() {
    this.requst();
  },
  methods: {
    callPhone(phoneNumber) {
      window.location.href = "tel:" + phoneNumber;
    },
    regTel(tel) {
      let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/,
        telnum = reg.test(tel);
      if (telnum == false) {
        tel == "";
        this.istel = false;
        this.$toast.fail("手机格式不正确");
      } else {
        this.istel = true;
      }
    },
    getSelect(val) {
      this.curcar = val;
    },
    requst() {
      this.$axios
        .post("http://www.xjxesc.com/server/index/ajax/get_info")
        .then(res => {
          // console.log(res.data.data);
          this.webinfo = res.data.data;
          this.aboutinfo = res.data.data.about_data.article_contents;
          this.evali = res.data.data.comment_data;
          this.ewmurl =
            `http://www.xjxesc.com/server/public/` +
            res.data.data.advert_data.ad_image;
          this.tel = res.data.data.us_data.phone[0].us_content;
          this.copyright = res.data.data.web_data.website_copyright;
        });
    },
    sendinfo() {
      if (this.curcar == "" || this.phone == "") {
        this.$toast.fail("请完善信息");
      } else {
        if (this.istel == false) {
          this.$toast.fail("手机格式不正确");
        } else {
          this.$axios
            .post("http://www.xjxesc.com/server/index/ajax/subMessage", {
              phone: this.phone,
              txt: this.curcar
            })
            .then(res => {});
        }
      }
    }
  }
};
</script>

<style lang='less'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  // height: 100%;
  position: relative;
  .main {
    padding-bottom: 20px;
  }
  .topbanner {
    width: 100%;
    height: 460px;
    position: relative;
    .mainpic {
      width: 100%;
      height: 100%;
    }
  }
  .common {
    width: calc(100% - 50px);
    height: 100%;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    box-sizing: border-box;
    margin-bottom: 50px;
    padding: 50px 40px;
    .bgicon {
      width: 280px;
      height: 59px;
      margin: 0 auto;
      text-align: center;
      line-height: 59px;
      font-size: 30px;
      color: #fff;
      p {
        position: relative;
        left: 20px;
      }
    }
    .botbox {
      text-align: center;
      p {
        display: inline-block;
        width: 275px;
        height: 70px;
        font-size: 18px;
        color: #fefefe;
        text-align: center;
        line-height: 70px;
        border-radius: 10px;
      }
      .toasse {
        background: #2435ee;
        margin-right: 50px;
      }
      .totel {
        background: #6738f2;
        // margin: 0 auto;
      }
      .totels {
        background: #2435ee;
        width: 100%;
      }
    }
    .person {
      text-align: center;
      text-align: center;
      font-size: 22px;
      color: #666;
      margin-top: 20px;
      margin-bottom: 62px;
      span {
        color: #0b30dc;
      }
    }
  }
  .assessment {
    .curbox {
      width: 100%;
      height: 100px;
      line-height: 70px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .text {
        width: 10%;
        align-self: center;
        img {
          width: auto;
          height: 35px;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
        // .tel {
        //   position: relative;
        //   left: 50%;
        //   transform: translateX(-50%);
        // }
      }
      .cur-right {
        width: 90%;
        border-bottom: 1px solid #f2f2f2;
        .el-select {
          width: 100% !important;
        }
        .el-input__inner {
          border: none !important;
        }
        .tel {
          position: relative;
          top: 20px;
          width: 100%;
          box-sizing: border-box;
          padding: 0px 30px;
          &::placeholder {
            color: #b8b8b8;
          }
        }
      }
    }
    .botbox {
      box-sizing: border-box;
      padding-top: 45px;
    }
  }
  .advantage {
    .advlist {
      // background: green;
      box-sizing: border-box;
      padding: 65px 0;
      .advli {
        display: flex;
        padding: 20px 0;
        .adv-left {
          width: 80px;
          .mainpic {
            width: 80px;
            height: 80px;
          }
        }
        .adv-right {
          box-sizing: border-box;
          padding-left: 35px;
          .btext {
            box-sizing: border-box;
            padding-top: 10px;
            color: #adadad;
          }
        }
      }
    }
  }
  .recovery {
    .reclist {
      // position: relative;
      width: 100%;
      margin: 40px auto;
      display: flex;
      justify-content: space-around;
      .recli {
        width: 30%;
        // background: brown;
        text-align: center;
        .bgbox {
          width: 50px;
          height: 50px;
          margin: 0px auto;
          margin-top: 40px;
        }
        .toright {
          width: 24px;
          height: 17px;
          margin: 0px auto;
          margin-top: 50px;
        }
        .text {
          width: 100%;
          font-size: 20px;
          // color: #333;
          margin: 20px 0 10px 0;
        }
        .btext {
          width: 100%;
          font-size: 14px;
          color: #666;
        }
      }
      .tr {
        width: 5%;
      }
    }
  }
  .evabox {
    // height: 800px;
    .carouselbox {
      width: 100%;
      height: 460px;
      margin: 0px auto;
      padding: 60px 0;
      .evainfo {
        width: 100%;
        height: 460px;
        display: flex;
        justify-content: space-between;
        .eva-left {
          width: 50%;
          // background: chartreuse;
          .el-top {
            height: 80px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            .mainpic {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }
            .text {
              align-self: center;
              font-size: 18px;
              color: #222;
              font-weight: 700;
              display: inline-block;
              padding-left: 20px;
              .name {
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                word-break: break-all;
              }
            }
          }
          .des {
            font-size: 14px;
            color: #666;
            line-height: 38px;
            height: 260px;
            margin-top: 40px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 7;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
        }
        .eva-right {
          width: 45%;
          height: 460px;
          position: relative;
          .price {
            width: auto;
            height: 50px;
            line-height: 50px;
            border-radius: 0 50px 50px 0;
            position: absolute;
            left: 0;
            top: 20px;
            // z-index: 1;
            font-size: 24px;
            color: #fff;
            background: #5837f1;
            padding: 10px 20px 10px 10px;
          }
        }
      }
    }
  }
  .about {
    padding-bottom: 80px;
    .desc {
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding-top: 20px;
      font-size: 16px;
      color: #666;
      white-space: pre-wrap;
      p {
        line-height: 40px;
      }
      // // css保留换行符
      // white-space: pre-line;
    }
    .ewmbox {
      text-align: center;
      color: #a5a5a5;
      font-size: 20px;
      padding-top: 30px;
      p {
        margin-top: 10px;
      }
      .ewm {
        margin: 45px auto 0;
        width: 255px;
        height: 255px;
        img {
          width: 255px;
          height: 255px;
        }
        // background: chocolate;
      }
    }
  }

  .btbgs {
    width: calc(100% - 50px);
    height: 100%;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    p {
      height: 70px;
      font-size: 18px;
      color: #fefefe;
      text-align: center;
      line-height: 70px;
      border-radius: 10px;
      background-image: linear-gradient(to right, #fb9239, #e34333);
    }
  }
  .copyright {
    color: white;
    text-align: center;
    font-size: 12px;
    padding: 50px 55px 20px 5px;
  }
}
.van-swipe__indicators {
  left: 15% !important;
}
</style>
