<template>
  <div class="footers">
    <div class="footerbox">
      <div class="botbox clearFix">
        <div class="bot-left fl">
          <div class="logo">
            <img src="../assets/home/02.png" alt />
            <span>爱丽丝景观</span>
          </div>
          <p class="tozx">立即咨询</p>
          <div class="telbox">
            <img class="sel" src="../assets/home/serv-tle.png" alt />
            <span class="sel">服务热线 |</span>
            <span class="tel">{{tels[0]}}</span>
          </div>
        </div>
        <div class="bot-center clearFix">
          <div class="bot-center-left fl">
            <div
              class="ewm"
              :style="{backgroundImage: 'url(' +  baseurl + `/public/` +infos.about_ewm+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="sys">【扫一扫】</p>
            <p class="text">获取更多花园资讯</p>
          </div>
          <div class="bot-center-right fr">
            <p class="title">四川爱丽丝景观工程有限公司</p>
            <p class="text lxfs">联系方式</p>
            <p class="text">{{tels[0]}} {{names[0]}} {{tels[1]}} {{names[1]}}</p>
            <p class="text">QQ：{{infos.qq}} 邮箱：{{infos.email}}</p>
            <p class="text">地址：{{infos.address}}</p>
          </div>
        </div>
        <div class="bot-right">
          <input type="text" v-model="name" placeholder="姓名" @blur="regname(name)" />
          <input type="text" v-model="tel" placeholder="电话" @blur="regTel(tel)" />
          <input type="text" v-model="area" placeholder="面积" @blur="regarea(area)" />
          <input type="text" v-model="dress" placeholder="项目地址" @blur="regdress(dress)" />
          <input type="text" v-model="text" placeholder="留言" @blur="regtext(text)" />
          <p class="submit" @click="send">提交留言</p>
        </div>
      </div>
      <p class="copyright">{{infos.foot_content}}</p>
    </div>
  </div>
</template>

<script>
import httpUrl from "../api/url";
export default {
  name: "footers",
  inject: ["reload"],
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
    // this.tels = sessionStorage.getItem("tel");
  },


  methods: {
    requst() {
      this.$axios.post("/index/api/web_config").then(res => {
        this.infos = res.data.data;
        this.tels = res.data.data.mobile.split(",");
        sessionStorage.setItem("tel", this.tels[0]);
        this.names = res.data.data.name.split(",");

        // console.log(this.infos);
      });
    },
    changeindex(index) {
      this.curindex = index;
      sessionStorage.setItem("navindex", index);
      this.reload();
    },
    send() {
      if (
        this.name == "" ||
        this.tel == "" ||
        this.area == "" ||
        this.dress == "" ||
        this.text == ""
      ) {
        this.$message.error("请完善留言~");
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
            this.$message({
              message: "提交成功，感谢您的留言~",
              type: "success"
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
          this.$message.error("电话号码格式有误~");
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
  }
};
</script>

<style lang="less" scoped>
.footers {
  width: 100%;
  background: rgba(50, 149, 43, 1);
  .footerbox {
    background: rgba(50, 149, 43, 1);
    width: 1200px;
    margin: 0 auto;
    position: relative;

    .botbox {
      box-sizing: border-box;
      padding-top: 70px;
      .bot-left {
        width: 260px;
        .logo {
          text-align: center;
          img {
            width: 60px;
          }
          span {
            color: white;
            font-size: 25px;
            font-weight: lighter;
            position: relative;
            top: 5px;
            left: 10px;
          }
        }
        .tozx {
          width: 109px;
          height: 33px;
          background: rgba(143, 195, 32, 1);
          border-radius: 10px;
          line-height: 33px;
          text-align: center;
          color: white;
          margin: 15px auto;
        }
        .telbox {
          margin-top: 10px;
          width: 260px;
          height: 33px;
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
          line-height: 33px;
          text-align: center;
          .sel {
            color: rgba(102, 102, 102, 1);
            font-size: 14px;
            position: relative;
            bottom: 2px;
          }
          .tel {
            color: rgba(102, 102, 102, 1);
            font-size: 19px;
            font-weight: bold;
            // position: relative;
            // top: 2px;
          }
        }
      }
      .bot-center {
        width: 470px;
        padding-left: 300px;
        .bot-center-left {
          width: 119px;
          height: 162px;
          border: 1px solid rgba(255, 255, 255, 1);
          box-sizing: border-box;
          padding: 9px 8px;
          text-align: center;
          color: rgba(255, 255, 255, 1);
          font-size: 12px;
          line-height: 20px;
          .ewm {
            width: 103px;
            height: 103px;
          }
          .sys {
            padding-top: 5px;
          }
        }
        .bot-center-right {
          width: 70%;
          color: white;
          .title {
            font-size: 20px;
            font-weight: bold;
            box-sizing: border-box;
            padding-bottom: 20px;
          }
          .lxfs {
            border-top: 1px solid white;
            box-sizing: border-box;
            padding-top: 20px;
          }
          .text {
            font-size: 14px;
            font-weight: 300;
            line-height: 25px;
          }
        }
      }
      .bot-right {
        width: 290px;
        position: absolute;
        right: 0;
        top: 70px;
        input {
          width: 286px;
          height: 24px;
          background: rgba(255, 255, 255, 1);
          border-radius: 12px;
          margin-bottom: 6px;
          box-sizing: border-box;
          padding-left: 15px;
          &::placeholder {
            color: rgba(153, 153, 153, 1);
            font-size: 12px;
          }
        }
        p {
          cursor: pointer;
          background: rgba(143, 195, 32, 1);
          width: 286px;
          height: 24px;
          border-radius: 12px;
          text-align: center;
          font-size: 12px;
          line-height: 24px;
          color: white;
        }
      }
    }
  }
  .copyright {
    // background: rgba(50, 149, 43, 1);
    text-align: center;
    color: white;
    font-size: 14px;
    padding: 30px 0 10px 0;
  }
}
</style>