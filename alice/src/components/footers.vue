<template>
  <div class="footers">
    <div class="footerbox">
      <ul class="navlist">
        <li class="navli" v-for="(item, index) in navli" :key="index" @click="changeindex(index)">
          <router-link :class="curindex==index?'sel':''" :to="item.path">{{item.name}}</router-link>
        </li>
      </ul>
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
      navli: [
        { name: "首页", path: "/" },
        { name: "案例展示", path: "/cases" },
        { name: "视频赏析", path: "/appreciation" },
        { name: "业务范围", path: "/business" },
        { name: "客户评价", path: "/evaluate" },
        { name: "关于我们", path: "/about" },
        { name: "联系我们", path: "/contact" }
      ],
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
    let navindex = sessionStorage.getItem("navindex");
    if (navindex) {
      this.curindex = navindex;
    } else {
      this.curindex = 0;
    }
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/web_config").then(res => {
        this.infos = res.data.data;
        this.tels = res.data.data.mobile.split(",");
        this.names = res.data.data.name.split(",");
        sessionStorage.setItem("tel", this.tels[0]);
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
  height: 270px;
  background: rgba(50, 149, 43, 1);

  .footerbox {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .navlist {
      width: 1200px;
      height: 80px;
      background: rgba(241, 250, 238, 1);
      position: absolute;
      top: -40px;
      display: flex;
      justify-content: space-around;
      .navli {
        a {
          display: inline-block;
          width: 67px;
          text-align: center;
          height: 80px;
          line-height: 80px;
          color: rgba(50, 149, 43, 1);
        }
        .sel {
          position: relative;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 67px;
            height: 4px;
            background: rgba(50, 149, 43, 1);
          }
        }
      }
    }
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
}
</style>