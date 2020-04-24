<template>
  <div class="footers">
    <div class="iptbox">
      <input type="text" v-model="name" placeholder="姓名" @blur="regname(name)" />
      <input type="text" v-model="tel" placeholder="电话" @blur="regTel(tel)" />
      <input type="text" v-model="area" placeholder="面积" @blur="regarea(area)" />
      <input type="text" v-model="dress" placeholder="项目地址" @blur="regdress(dress)" />
      <input type="text" v-model="text" placeholder="留言" @blur="regtext(text)" />
      <p class="send" @click="send">提交留言</p>
    </div>
    <div class="infobox clearFix">
      <div class="info-left fl">
        <div class="logobox">
          <div class="tops">
            <div
              class="logo"
              :style="{backgroundImage: 'url(' + require('../assets/footers/logo.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <span>爱丽丝景观</span>
          </div>
        </div>
    
        <p class="info text" @click="callPhone(tels[0])">联系方式：{{tels[0]}} {{names[0]}}</p>
        <p class="info" @click="callPhone(tels[1])">联系方式：{{tels[1]}} {{names[1]}}</p>
        <p class="info">Q Q：{{infos.qq}}</p>
        <p class="info">邮箱：{{infos.email}}</p>
        <p class="info">地址：{{infos.address}}</p>
      </div>
      <div class="info-right fr">
        <div
          class="ewm"
          :style="{backgroundImage: 'url(' +  baseurl + `/public/` +infos.about_ewm+  ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <p class="text">【扫一扫】</p>
        <p class="text">获取更多花园资讯</p>
      </div>
    </div>
  </div>
</template>


<script>
import httpUrl from "../api/url";
export default {
  name: "footers",
  data() {
    return {
      baseurl: "",
      curindex: 0,
      infos: [],
      name: "",
      tel: "",
      area: "",
      dress: "",
      text: "",
      tels: [],
      names: []
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.requst();
  },
  methods: {
    callPhone(phoneNumber) {
      window.location.href = "tel:" + phoneNumber;
    },
    requst() {
      this.$axios.post("/index/api/web_config").then(res => {
        this.infos = res.data.data;
        this.tels = res.data.data.mobile.split(",");
        this.names = res.data.data.name.split(",");
        sessionStorage.setItem("tel", this.tels[0]);
        // console.log(this.infos);
      });
    },
    send() {
      if (
        this.name == "" ||
        this.tel == "" ||
        this.area == "" ||
        this.dress == "" ||
        this.text == ""
      ) {
        this.$dialog
          .alert({
            title: "提示",
            message: "请完善留言~"
          })
          .then(() => {
            // on close
          });
      } else {
        this.$axios
          .post("/index/api/sendMessage", {
            name: this.msgname,
            phone: this.msgtel,
            content: this.msgtext
          })
          .then(res => {
            // console.log(this.name, this.tel, this.area, this.dress, this.text);
            this.name = "";
            this.tel = "";
            this.area = "";
            this.dress = "";
            this.text = "";
            this.$dialog
              .alert({
                title: "提示",
                message: "提交成功，感谢您的留言~"
              })
              .then(() => {
                // on close
              });
          });
      }
    },
    regTel(tel) {
      if (tel == "") {
        this.tel = "";
      } else {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
          telnum = reg.test(tel);
        if (telnum == false) {
          this.$dialog
            .alert({
              title: "提示",
              message: "电话号码格式有误~"
            })
            .then(() => {
              // on close
            });
          this.tel = "";
        } else {
          this.tel = tel;
        }
      }
    },
    regtext(text) {
      let regwords = text.replace(/<\/?[^>]*>/g, "");
      this.text = regwords;
    },
    regname(text) {
      let regwords = text.replace(/<\/?[^>]*>/g, "");
      this.name = regwords;
    },
    regarea(text) {
      let regwords = text.replace(/<\/?[^>]*>/g, "");
      this.area = regwords;
    },
    regdress(text) {
      let regwords = text.replace(/<\/?[^>]*>/g, "");
      this.dress = regwords;
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.footers {
  width: 100%;
  background: rgba(50, 149, 43, 1);
  box-sizing: border-box;
  padding: 0 25px;
  .iptbox {
    width: 100%;
    box-sizing: border-box;
    padding: 30px 0;
    input {
      width: 100%;
      height: 59px;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
      margin-bottom: 15px;
      box-sizing: border-box;
      padding: 0 20px;
      &::placeholder {
        color: rgba(153, 153, 153, 1);
        font-size: 24px;
      }
    }
    .send {
      width: 100%;
      height: 59px;
      background: rgba(143, 195, 32, 1);
      border-radius: 12px;
      color: white;
      line-height: 59px;
      text-align: center;
    }
  }
  .logobox {
    width: 100%;
    text-align: center;
    .tops {
      position: relative;
      .logo {
        width: 120px;
        height: 120px;
      }
      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 40%;
        color: white;
        font-weight: lighter;
        font-size: 40px;
      }
    }
    h1 {
      font-size: 31px;
      color: white;
      box-sizing: border-box;
      padding: 23px 0 48px 0;
    }
  }
  .infobox {
    box-sizing: border-box;
    padding: 50px 0 40px 0;
    color: white;
    .info-left {
      width: 55%;
      .text {
      
        box-sizing: border-box;
        padding-top: 20px;
   
      }
      .info {
        font-size: 24px;
        font-weight: lighter;
        line-height: 40px;
      }
    }
    .info-right {
      width: 35%;
      height: 330px;
      border: 1px solid rgba(255, 255, 255, 1);
      text-align: center;
      box-sizing: border-box;
      padding-top: 40px;
      .ewm {
        width: 188px;
        height: 188px;
        margin: 0px auto;
      }
      p {
        font-size: 22px;
        line-height: 35px;
      }
    }
  }
}
</style>