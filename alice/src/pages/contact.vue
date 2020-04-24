<template>
  <div class="contact">
    <banner></banner>
    <div class="contactbox common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/contact/01.png" alt />
        </p>
        <p class="title">
          <span class="white">联系</span>
          <span class="span">我们</span>
        </p>
        <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIQUE LANDSCAPE</p>
      </div>
      <ul class="casenav">
        <li
          class="caseli"
          v-for="(item, index) in caseli"
          :key="index"
          :class="caseindex==index?'casecur':''"
          @click="changecaseindex(index)"
        >
          <p>{{item}}</p>
        </li>
      </ul>
      <!-- 联系方式 -->
      <div class="showtel cont" v-show="caseindex == 0">
        <p class="title">四川爱丽丝景观工程有限公司</p>
        <div class="telbox">
          <div class="stbox">
            <img src="../assets/contact/i01.png" alt />
            <p class="text">{{tel[0]}} {{name[0]}}</p>
            <p class="text">{{tel[1]}} {{name[1]}}</p>
          </div>
          <div class="stbox">
            <img src="../assets/contact/i02.png" alt />
            <p class="text">QQ：{{infos.qq}}</p>
            <p class="text">邮箱：{{infos.email}}</p>
          </div>
          <div class="stbox">
            <img src="../assets/contact/i03.png" alt />
            <p class="text">地址：{{infos.address}}</p>
          </div>
        </div>
      </div>
      <!-- 在线留言 -->
      <div class="msgbox cont" v-show="caseindex == 1">
        <div class="msgcont clearFix">
          <div class="msg-left fl">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + require('../assets/contact/Alice.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="text">需要了解更多，或者有任何疑问，</p>
            <p class="text">请留言给我们，</p>
            <p class="text">我们会尽快与您联系，谢谢。</p>
          </div>
          <div class="msg-right fr">
            <p class="text">在线留言</p>
            <input
              type="text"
              class="name"
              v-model="msgname"
              placeholder="姓名"
              @blur="regname(msgname)"
            />
            <input type="text" class="tel" v-model="msgtel" placeholder="电话" @blur="regTel(msgtel)" />
            <textarea
              name
              id
              class="msg"
              v-model="msgtext"
              placeholder="留言内容"
              @blur="regtext(msgtext)"
            ></textarea>
            <div class="send" @click="sendmsg">
              <img src="../assets/contact/send.png" alt />
              <span>确认提交</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 地图导向 -->
      <div class="mapbox cont" v-if="caseindex == 2">
        <div class="mapshow">
          <bdmap :mapinfos="infos"></bdmap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bdmap from "../components/maps";
import banner from "../components/banner";
import httpUrl from "../api/url";
export default {
  name: "contact",
  data() {
    return {
      baseurl: "",
      caseindex: 0,
      caseli: ["联系方式", "在线留言", "地图导向"],
      bcli: [
        {
          name: "公交",
          icon1: require("../assets/contact/bus.png"),
          icon2: require("../assets/contact/busw.png")
        },
        {
          name: "驾车",
          icon1: require("../assets/contact/car.png"),
          icon2: require("../assets/contact/carw.png")
        }
      ],
      infos: {},
      bcindex: 0,
      tel: [],
      name: [],
      msgname: "",
      msgtel: "",
      msgtext: ""
    };
  },

  created() {
    this.baseurl = httpUrl.httpUrl;
    this.requst();
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/web_config").then(res => {
        this.infos = res.data.data;
        this.tel = res.data.data.mobile.split(",");
        this.name = res.data.data.name.split(",");
      });
    },
    changecaseindex(index) {
      this.caseindex = index;
    },
    changebcindex(index) {
      this.bcindex = index;
    },
    sendmsg() {
      if (this.msgtext == "" || this.msgname == "" || this.msgtel == "") {
        this.$message.error("请完善留言~");
      } else {
        this.$axios
          .post("/index/api/sendMessage", {
            name: this.msgname,
            phone: this.msgtel,
            content: this.msgtext
          })
          .then(res => {
            this.msgtext = "";
            this.msgname = "";
            this.msgtel = "";
            this.$message({
              message: "提交成功，感谢您的留言~",
              type: "success"
            });
          });
      }
    },
    regTel(tel) {
      if (tel == "") {
        this.msgtel = "";
      } else {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
          telnum = reg.test(tel);

        if (telnum == false) {
          this.$message.error("电话号码格式有误~");
          this.tel = "";
        } else {
          this.msgtel = tel;
        }
      }
    },
    regtext(text) {
      let regwords = text.replace(/<\/?[^>]*>/g, "");
      this.msgtext = regwords;
    },
    regname(text) {
      let regwords = text.replace(/<\/?[^>]*>/g, "");
      this.msgname = regwords;
    }
  },
  components: { banner, bdmap }
};
</script>

<style lang="less" scoped>
.common {
  box-sizing: border-box;
  padding-top: 50px;
  .topbox {
    box-sizing: border-box;
    padding-bottom: 35px;
    text-align: center;
    .icon {
      img {
        width: 50px;
      }
    }
    .pic {
      box-sizing: border-box;
      padding: 10px 0;
    }
    .title {
      font-size: 26px;
      .white {
        color: rgba(51, 51, 51, 1);
        position: relative;
        &::before {
          content: "";
          width: 40px;
          height: 1px;
          background: rgba(153, 153, 153, 1);
          position: absolute;
          top: 50%;
          left: -60px;
        }
      }
      .span {
        color: rgba(50, 149, 43, 1);
        position: relative;
        &::before {
          content: "";
          width: 40px;
          height: 1px;
          background: rgba(153, 153, 153, 1);
          position: absolute;
          top: 50%;
          right: -60px;
        }
      }
    }
    .text {
      box-sizing: border-box;
      padding-top: 22px;
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
    }
  }
  .more {
    box-sizing: border-box;
    padding: 50px 0;
    .tomore {
      cursor: pointer;
      text-align: center;
      margin: 0px auto;
      width: 160px;
      height: 40px;
      border: 1px solid rgba(50, 149, 43, 1);
      color: rgba(50, 149, 43, 1);
      font-size: 16px;
      line-height: 40px;
    }
  }
}
.cont {
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 62px 0 90px 0;
}
.contact {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 80px;
  .casenav {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    .caseli {
      display: inline-block;
      margin: 0 9px;
      cursor: pointer;
      width: 279px;
      height: 65px;
      border: 1px solid rgba(194, 189, 196, 0.8);
      color: rgba(102, 102, 102, 1);
      font-size: 18px;
      line-height: 65px;
      text-align: center;
      &:hover {
        transition: color 0.5s ease;
        width: 275px;
        height: 60px;
        line-height: 60px;
        border: 3px solid rgba(50, 149, 43, 1);
        color: rgba(50, 149, 43, 1);
        font-weight: bold;
      }
    }
    .casecur {
      width: 275px;
      height: 60px;
      line-height: 60px;
      border: 3px solid rgba(50, 149, 43, 1);
      color: rgba(50, 149, 43, 1);
      font-weight: bold;
    }
  }
  .showtel {
    .title {
      text-align: center;
      font-size: 24px;
      color: rgba(50, 149, 43, 1);
      font-weight: bold;
    }
    .telbox {
      display: flex;
      justify-content: space-between;
      .stbox {
        width: 379px;
        height: 215px;
        background: rgba(249, 249, 249, 1);
        margin: 40px 0 0 18px;
        text-align: center;
        box-sizing: border-box;
        padding-top: 40px;
        img {
          margin-bottom: 15px;
        }
        .text {
          margin: 0 auto;
          width: 250px;
          color: rgba(102, 102, 102, 1);
          font-size: 19px;
          line-height: 30px;
        }
      }
    }
  }
  .msgbox {
    .msgcont {
      background: rgba(249, 249, 249, 1);
      width: 100%;
      height: 576px;
      position: relative;
      .msg-left {
        width: 436px;
        height: 100%;
        .mainpic {
          width: 100%;
          height: 100%;
        }
        .text {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          position: relative;
          bottom: 150px;
          line-height: 30px;
          left: 40px;
        }
      }
      .msg-right {
        width: 764px;
        box-sizing: border-box;
        padding: 37px 45px 0 45px;
        .text {
          font-size: 27px;
          color: rgba(51, 51, 51, 1);
          font-weight: 300;
          box-sizing: border-box;
          padding-bottom: 32px;
        }
        input {
          width: 675px;
          height: 55px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(204, 204, 204, 1);
          box-sizing: border-box;
          margin-bottom: 25px;
          padding: 20px 20px;
          &::placeholder {
            font-weight: 300;
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
          }
        }
        textarea {
          border: 1px solid rgba(204, 204, 204, 1);
          width: 675px;
          height: 252px;
          box-sizing: border-box;
          padding: 20px 20px;
          resize: none;
          &::placeholder {
            font-family: 微软雅黑;
            font-weight: 300;
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
          }
        }
        .send {
          cursor: pointer;
          position: absolute;
          bottom: 40px;
          right: 90px;
          width: 138px;
          height: 40px;
          background: rgba(50, 149, 43, 1);
          color: white;
          text-align: center;
          line-height: 40px;
          img {
            position: relative;
            top: -1px;
            left: -2px;
          }
        }
      }
    }
  }
  .mapbox {
    .mapshow {
      width: 1200px;
      //
    }
  }
}
</style>