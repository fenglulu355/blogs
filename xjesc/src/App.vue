<template>
  <div
    id="app"
    :style="{backgroundImage: 'url(' + require('../src/assets/bg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
  >
    <div class="main">
      <div class="topbanner">
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' + require('../src/assets/topbg.jpg')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <div
          class="telbox"
          @click="callPhone(tel)"
        >咨询热线：{{usdata.phone[0].us_content}}({{usdata.phone[0].us_name}})</div>
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
            <span class="text">选择车型</span>
            <div class="cur-right">
              <el-select v-model="cur" placeholder="请选择" :change="curcar(cur)">
                <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </div>
          <div class="curbox">
            <span class="text">联系方式</span>
            <div class="cur-right">
              <input type="text" v-model="phone" @blur="regTel(phone)" placeholder="请输入您的联系方式" />
            </div>
          </div>
          <div class="botbox">
            <p class="toasse" @click="sendinfo">立即评估</p>
            <p class="totel" @click="callPhone(tel)">立即咨询</p>
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
        <div
          class="adv"
          :style="{backgroundImage: 'url(' + require('../src/assets/adv.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
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
          <li class="recli">
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
          <li class="recli">
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
        <div class="botbox">
          <p class="totel" @click="callPhone(tel)">电话咨询</p>
        </div>
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
          <el-carousel height="470px" :interval="4000">
            <el-carousel-item v-for="(item ,index) in evali" :key="index">
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
                    <p class="text">
                      <span class="name">{{item.author_name}}</span>
                      <span class="sx">|</span>
                      <span class="car">{{item.class_name}}</span>
                    </p>
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
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="botbox">
          <p class="totel" @click="callPhone(tel)">电话咨询</p>
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
        <p class="person">
          已成功回收
          <span>{{about[0]}}</span>
          辆二手车
        </p>
        <div class="desc" v-html="aboutinfo"></div>
      </div>
      <!-- footer -->
      <div class="footer">
        <div class="ft-left">
          <div class="ewm">
            <img :src="ewmurl" alt />
          </div>
          <div class="text">
            <p>添加微信客服</p>
            <p>随时与我们联系沟通</p>
          </div>
        </div>
        <div class="ft-right">
          <p class="tel">
            电话：
            <span>{{usdata.phone[0].us_content}}({{usdata.phone[0].us_name}})</span>
          </p>
          <p class="dz">
            地址：
            <span>{{usdata.address[0].us_content}}</span>
          </p>
          <p class="tel">
            邮件：
            <span>{{usdata.email[0].us_content}}</span>
          </p>
        </div>
      </div>
      <p class="copyright" v-html="copyright"></p>
    </div>

    <div class="btbgs"></div>
  </div>
</template>

<script>
import normalized from "./assets/normalized.css";
export default {
  name: "App",
  data() {
    return {
      options: [],
      cur: "",
      evali: [],
      about: [
        "20159",
        "成都新吉鑫二手车经销有限公司，    公司位于成都市武侯红牌楼西部汽车城二手车交易市场内，本公司是一家集二手车评估、置换、汽车售后服务、质量保证及信息管理于一体的跨品牌二手车店。公司致力于打造公平透明的交易信息平台和专业的二手车买卖服务体验。公司为广大车主提供二手货车/轿车买车、卖车（寄售/销售）、售后维修及保养、金融服务解决方案、评估检测等一站式全方位服务；公司拥有专业的检测设备及数据库，可为车辆提供100多项专业检测。公司秉承诚信、专业的经营理念，本着透明销售、品质保证的经营原则，引领全新的汽车消费和使用模式，延续品牌汽车的社会价值，让您买的放心，卖得开心！每一台进入新吉鑫的车辆都有一张“身份证”，由专业评估师测评的检测评估报告！让客户再也不用担心车辆“身份不明”了。"
      ],
      webinfo: [],
      aboutinfo: "",
      ewmurl: "",
      tel: "",
      phone: "",
      istel: false,
      copyright: "",
      usdata: []
    };
  },
  created() {
    this.requst();
  },
  mounted() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      window.location.href = "http://www.xjxesc.com/mobile.html#/";
      return;
    }
  },
  methods: {
    curcar(value) {
      this.cur = value;
    },
    callPhone(phoneNumber) {
      window.location.href = "tel:" + phoneNumber;
    },
    regTel(tel) {
      let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/,
        telnum = reg.test(tel);
      if (telnum == false) {
        tel == "";
        this.istel = false;
        this.$message.error("手机格式不正确");
      } else {
        this.istel = true;
      }
    },
    requst() {
      this.$axios
        .post("http://www.xjxesc.com/server/index/ajax/get_info")
        .then(res => {
          console.log(res.data.data);
          this.options = res.data.data.class_data;
          this.aboutinfo = res.data.data.about_data.article_contents;
          this.evali = res.data.data.comment_data;
          this.usdata = res.data.data.us_data;
          this.ewmurl =
            `http://www.xjxesc.com/server/public/` +
            res.data.data.advert_data.ad_image;
          this.tel = res.data.data.us_data.phone[0].us_content;
          this.copyright = res.data.data.web_data.website_copyright;
        });
    },
    sendinfo() {
      if (this.cur == "" || this.phone == "") {
        this.$message.error("请完善信息");
      } else {
        if (this.istel == false) {
          this.$message.error("手机格式不正确");
        } else {
          this.$axios
            .post("http://www.xjxesc.com/server/index/ajax/subMessage", {
              phone: this.phone,
              txt: this.cur
            })
            .then(res => {
              this.$message({
                message: "发送成功！",
                type: "success"
              });
            });
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
  .copyright {
    padding: 20px 0;
    color: white;
    text-align: center;
    font-size: 16px;
  }
  .topbanner {
    width: 100%;
    height: 750px;
    position: relative;
    .mainpic {
      width: 100%;
      height: 100%;
    }
    .telbox {
      cursor: pointer;
      position: absolute;
      bottom: 235px;
      left: 50%;
      transform: translateX(-50%);
      width: 290px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 10px;
      background: #f98c39;
      color: #fff;
      font-size: 16px;
    }
  }
  .common {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    box-sizing: border-box;
    margin-bottom: 50px;
    padding: 50px 0;
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
        cursor: pointer;
        display: inline-block;
        width: 200px;
        height: 60px;
        font-size: 18px;
        color: #fefefe;
        text-align: center;
        line-height: 60px;
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
      width: 740px;
      height: 70px;
      line-height: 70px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .text {
        align-self: center;
        width: 20%;
        font-size: 16px;
        color: #9d9d9d;
      }
      .cur-right {
        width: 80%;
        border-bottom: 1px solid #f2f2f2;
        .el-select {
          width: 100% !important;
        }
        .el-input__inner {
          border: none !important;
        }
      }
    }
    .botbox {
      box-sizing: border-box;
      padding-top: 45px;
    }
  }
  .advantage {
    .adv {
      width: 100%;
      height: 375px;
      margin: 30px 0;
    }
  }
  .recovery {
    .reclist {
      // position: relative;
      width: 960px;
      margin: 60px auto;
      display: flex;
      justify-content: space-around;
      .recli {
        width: 15%;
        // background: brown;
        text-align: center;
        .bgbox {
          width: 50px;
          height: 50px;
          margin: 0px auto;
          margin-top: 70px;
        }
        .toright {
          width: 24px;
          height: 17px;
          margin: 0px auto;
          margin-top: 100px;
        }
        .text {
          font-size: 16px;
          color: #333;
          margin: 30px 0 20px 0;
        }
        .btext {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
        }
      }
    }
  }
  .evabox {
    // height: 800px;
    .carouselbox {
      width: 960px;
      // height: 500px;
      margin: 0px auto;
      padding: 60px 0;
      .evainfo {
        // background: chocolate;
        width: 100%;
        height: 470px;
        display: flex;
        justify-content: space-between;
        .eva-left {
          width: 55%;
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
              padding-left: 30px;
              .sx {
                position: relative;
                bottom: 1px;
              }
            }
          }
          .des {
            font-size: 14px;
            color: #666;
            line-height: 28px;
            height: 300px;
            margin-top: 40px;
          }
        }
        .eva-right {
          width: 40%;
          height: 470px;
          position: relative;
          .price {
            width: auto;
            height: 50px;
            line-height: 50px;
            border-radius: 0 50px 50px 0;
            position: absolute;
            left: 0;
            top: 16px;
            // z-index: 1;
            font-size: 24px;
            color: #fff;
            background: #5837f1;
            padding: 0 10px 0 0;
          }
        }
      }
    }
  }
  .about {
    padding-bottom: 120px;
    .desc {
      width: 960px;
      margin: 0 auto;
      font-size: 14px;
      color: #666;
      line-height: 28px;
      white-space: pre-wrap;
      // // css保留换行符
      // white-space: pre-line;
    }
  }
  .footer {
    padding-top: 70px;
    width: 1200px;
    height: 240px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    .ft-left {
      width: 30%;
      display: flex;
      justify-content: flex-start;
      .ewm {
        width: 150px;
        height: 150px;
        background: white;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        margin: 30px;
        font-size: 14px;
        color: #fff;
        line-height: 36px;
      }
    }
    .ft-right {
      width: 30%;
      p {
        font-size: 14px;
        color: #fff;
        margin-top: 20px;
      }
    }
  }
  .btbgs {
    position: absolute;
    bottom: 0;
    background: #6538f2;
    width: 100%;
    height: 3px;
  }
}
.el-carousel__button {
  background-color: #5837f1 !important;
}
.el-carousel__indicators--horizontal {
  left: 12% !important;
}
</style>
