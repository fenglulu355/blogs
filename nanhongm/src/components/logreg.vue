<template>
  <div class="logreg" :style="{'height':height+`px`}">
    <!-- 登录 -->
    <div class="loginbox box" v-if="islog">
      <img @click="toclose" class="toclose" src="../assets/navgation/log-x.png" alt />
      <p class="title">账户登录</p>
      <div class="intbox">
        <span class="img">
          <img src="../assets/navgation/log-tel.png" alt />
        </span>
        <input type="tel" placeholder="登录账户手机号" @blur="regtel(tel)" maxlength="11" v-model="tel" />
        <img class="clear" @click="cleartel" src="../assets/navgation/log-x.png" alt />
      </div>
      <div class="intbox">
        <span class="img">
          <img src="../assets/navgation/log-pw.png" alt />
        </span>
        <input type="password" placeholder="输入密码" @blur="regpsw(password)" v-model="password" />
        <img class="clear" @click="clearpsw" src="../assets/navgation/log-x.png" alt />
      </div>
      <p class="tologin btn" @click="loging">登录</p>
      <p class="toreg btn" @click="toreg">注册</p>
      <p class="text">
        <!-- <span>短信验证码登录</span>| -->
        <span @click="toreg">注册</span>|
        <span @click="topaw">忘记密码</span>
      </p>
      <!-- <p class="texts">选择其他方式登录</p>
      <div class="other">
        <img class="icon" src="../assets/nav/qq.png" alt />
        <img class="icon" src="../assets/nav/wx.png" alt />
      </div>-->
    </div>
    <!-- 注册 -->
    <div class="register box" v-if="isreg">
      <img @click="toclose" class="toclose" src="../assets/navgation/log-x.png" alt />
      <p class="title">账户注册</p>
      <div class="intbox telbox">
        <p class="tel">
          中国0086
          <span>
            <img src="../assets/navgation/log-b.png" alt />
          </span>
        </p>
        <input
          type="tel"
          @blur="regtel(tel)"
          class="inputtel"
          placeholder="建议使用常用手机号"
          maxlength="11"
          v-model="tel"
        />
      </div>
      <div class="intbox">
        <input type="password" placeholder="输入密码" @blur="regpsw(password)" v-model="password" />
      </div>
      <div class="intbox codebox">
        <input placeholder="输入验证码" @blur="regcode(code)" v-model="code" />
        <p @click="sendCode" class="code" :class="cancode ? 'cantchoose':''">{{codetime}}</p>
      </div>
      <p class="tologin btn" @click="reging">注册</p>
      <p class="toreg btn" @click="tologs">登录</p>
    </div>
    <!-- 忘记密码 -->
    <div class="getpsw box" v-if="ispsw">
      <img @click="toclose" class="toclose" src="../assets/navgation/log-x.png" alt />
      <p class="title">找回密码</p>
      <div class="intbox telbox">
        <input type="tel" @blur="regtel(tel)" maxlength="11" v-model="tel" placeholder="注册账户手机号" />
      </div>
      <div class="intbox codebox">
        <input placeholder="输入验证码" v-model="code" />
        <p class="code" @click="sendCode" :class="cancode ? 'cantchoose':''">{{codetime}}</p>
      </div>
      <div class="intbox telbox">
        <input type="password" @blur="regpsw(password)" placeholder="请输入新密码" v-model="password" />
      </div>
      <div class="intbox telbox">
        <input
          type="password"
          @blur="regnpsw(confirmPsw)"
          placeholder="请再次输入密码"
          v-model="confirmPsw"
        />
      </div>
      <p class="tologin btn" @click="changepsw">确定</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "logreg",
  data() {
    return {
      height: "",
      islog: true,
      isreg: false,
      ispsw: false,
      username: "", // 用户名
      password: "", // 密码
      confirmPsw: "", // 确认密码
      tel: "", // 手机号码
      code: "", //验证码
      codetime: "获取验证码", //验证码倒计时
      cancode: false, //允许发送验证码
      getcode: null
    };
  },
  created() {
    this.height = document.documentElement.clientHeight + 200;
    console.log(this.height);
  },
  computed: {
    ...mapState(["logreg", "islogin", "topath"])
  },
  methods: {
    ...mapMutations(["setuserid"]),
    ...mapActions(["getlogin", "getlogreg", "getuserid"]),
    // 登录ing
    loging() {
      if (this.password == "" || this.tel == "") {
        this.$toast.fail("请完善信息");
      } else {
        this.$axios
          .post("/index/login/userLogin", {
            phone: this.tel,
            pwd: this.password
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.$toast.success("登录成功");
              // 存储userid
              this.setuserid(Number(res.data.data));
              // 设置登录状态;
              this.getlogin(true);
              // 跳转到要去的页面
              this.$router.push({ path: this.topath });
              // 掩藏登录框
              this.getlogreg(false);
              // 掩藏登录框
              this.$emit("close", false);
            } else if (res.data.code == 0) {
              this.$toast.fail("账号或密码错误");
            }
          });
      }
    },
    // 显示登录
    tologs() {
      this.islog = true;
      this.isreg = false;
      this.ispsw = false;
    },
    // 显示注册
    toreg() {
      this.islog = false;
      this.isreg = true;
      this.ispsw = false;
    },
    // 注册ing
    reging() {
      if (this.code == "" || this.tel == "") {
        this.$toast.fail("请完善信息");
      } else {
        this.$axios
          .post("/index/login/register", {
            phone: this.tel,
            code: this.code,
            pwd: this.password
          })
          .then(res => {
            console.log(res, "注册");
            if (res.data.code == 1) {
              this.$toast.success("注册成功");
              // 存储userid
              this.getuserid(Number(res.data.data));
              // 设置登录状态
              this.getlogin(true);
              // 跳转到要去的页面
              this.$router.push({ path: this.topath });
              // 掩藏登录框
              this.getlogreg(false);
            } else if (res.data.code == 0) {
              this.$toast.fail("该手机已注册");
            }
          });
      }
    },
    // 忘记密码
    topaw() {
      this.islog = false;
      this.isreg = false;
      this.ispsw = true;
    },
    changepsw() {
      if (
        this.tel == "" ||
        // this.code == "" ||
        this.password == "" ||
        this.confirmPsw == ""
      ) {
        this.$toast.fail("请完善信息");
      } else {
        console.log(this.tel, this.password, this.confirmPsw);
        this.$axios
          .post("/index/user/forgetpwd", {
            phone: this.tel,
            pwd: this.confirmPsw
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$toast.success("重置成功，请重新登录");

              setTimeout(() => {
                this.islog = true;
                this.isreg = false;
                this.ispsw = false;
              }, 500);
            } else {
              this.$toast.fail("重置失败");
            }
          });
      }
    },
    // 发送验证码
    sendCode() {
      // let _this=this
      if (this.codetime == "获取验证码") {
        if (this.tel == "") {
          this.$toast.fail("请输入正确手机号");
        } else {
          this.cancode = true;
          this.codetime = 30;
          let timer = setInterval(() => {
            this.codetime--;
            if (this.codetime <= 0) {
              this.codetime = "点击发送";
              this.cancode = false;
              clearInterval(timer);
            }
          }, 1000);
          // 生成验证码
          let code = this.rand("0000", "9999");
          this.getcode = code;
          console.log(code, "code");
          this.$dialog({message:"验证码为" + this.getcode});
          this.$axios
            .post("/index/login/sendPhoneCode", {
              phone: this.tel,
              code: code
            })
            .then(res => {
              console.log(res, "code");
              // 判断手机是否注册
              if (res.data.code == 0) {
                this.$toast.fail("该手机已注册");
              } else {
                this.$toast.success("发送成功");
              }
            });
        }
      }
    },
    // 正则判断手机号
    regtel(tel) {
      let regPhone = /^(1[3|5|4|6|7|8|9]\d{1}[*|\d]{4}\d{4})$/;
      if (!regPhone.test(tel)) {
        this.$toast.fail("手机号码格式错误");
        setTimeout(() => {
          this.tel = "";
        }, 200);
      } else {
        this.tel = tel;
        console.log(this.tel);
      }
    },
    regpsw(psw) {
      let regpsw = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,}$/;
      if (!regpsw.test(psw)) {
        this.$toast.fail("请输入至少6位数以上包含数字、字母、字符串的密码");
        setTimeout(() => {
          this.password = "";
        }, 200);
      } else {
        this.password = psw;
      }
    },
    regcode(code) {
      if (code == this.getcode) {
        console.log("验证码正确");
      } else {
        this.$toast.fail("验证码错误");
      }
    },
    regnpsw(confirmPsw) {
      if (this.password != confirmPsw) {
        this.$toast.fail("两次密码不一致");
        setTimeout(() => {
          this.confirmPsw = "";
        }, 200);
      }
    },
    // 生成验证码
    rand(min, max) {
      min = Number(min);
      max = Number(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    toclose() {
      this.getlogreg(false);
    },
    cleartel() {
      this.tel = "";
    },
    clearpsw() {
      this.password = "";
    }
  }
};
</script>

<style lang="less" scoped>
.logreg {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 111;
  background: white;
  box-sizing: border-box;
  padding: 200px 90px 0 90px;
  .box {
    background: white;
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding-top: 20px;
    .toclose {
      position: absolute;
      right: 0;
      top: 0;
    }
    .title {
      width: 100%;
      text-align: center;
      font-size: 33px;
      font-weight: bold;
      color: #333333;
    }
    .intbox {
      box-sizing: border-box;
      width: 100%;
      height: 70px;
      line-height: 70px;
      margin: 20px auto;
      border: 1px solid rgba(228, 228, 228, 1);
      display: flex;
      justify-content: flex-start;
      .img {
        width: 11%;
        box-sizing: border-box;
        height: 69px;
        background: #f4f4f4;
        text-align: center;
        border: 1px solid rgba(228, 228, 228, 1);
        border-top: none;
      }
      input {
        align-self: center;
        box-sizing: border-box;
        width: 80%;
        height: 60px;
        padding: 0 20px;
      }
      .clear {
        margin: 0 auto;
        align-self: center;
      }
    }
    .btn {
      width: 100%;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color: white;
      font-size: 30px;
    }
    .tologin {
      background: #eb0028;
      margin-top: 50px;
    }
    .toreg {
      background: #999999;
      margin-top: 36px;
    }
  }
  .loginbox {
    width: 100%;
    .text {
      box-sizing: border-box;
      padding: 50px 0;
      width: 100%;
      text-align: center;
      color: #dfdfdf;
      font-size: 20px;
      span {
        color: #3db2d8;
        padding: 0 15px;
      }
    }
    .texts {
      // background: chartreuse;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      position: relative;
      font-size: 20px;
      color: #333333;
      &::before {
        content: "";
        width: 25%;
        height: 2px;
        background: #dfdfdf;
        position: absolute;
        top: 50%;
        left: 0;
      }
      &::after {
        content: "";
        width: 25%;
        height: 2px;
        background: #dfdfdf;
        position: absolute;
        top: 50%;
        right: 0;
      }
    }
    .other {
      text-align: center;
      box-sizing: border-box;
      padding-top: 50px;
      img {
        width: 86px;
        margin: 0 40px;
      }
    }
  }
  .getpsw {
    width: 100%;
    .intbox {
      input {
        width: 99%;
      }
      .code {
        width: 36%;
        text-align: center;
        line-height: 70px;
        font-size: 25px;
        color: #333333;
        background: rgba(228, 228, 228, 1);
      }
    }
  }
  .register {
    width: 100%;
    input {
      position: relative;
      left: 1px;
    }

    .telbox {
      .tel {
        text-align: center;
        width: 35%;
        border-right: 1px solid rgba(228, 228, 228, 1);
      }
      input {
        width: 64%;
      }
    }
    .codebox {
      .code {
        background: #e4e4e4;
        width: 35%;
        text-align: center;
      }
    }
  }

  //     .intbox {
  //       margin-top: 20px;
  //       border: 1px solid rgba(228, 228, 228, 1);
  //       width: 300px;
  //       height: 40px;
  //       line-height: 40px;
  //       .img {
  //         display: inline-block;
  //         text-align: center;
  //         width: 40px;
  //         height: 40px;
  //         background: rgba(228, 228, 228, 1);
  //       }
  //       input {
  //         cursor: pointer;
  //         width: 230px;
  //         height: 40px;
  //         position: relative;
  //         top: -2px;
  //         right: 2px;
  //         border-left: 1px solid rgba(228, 228, 228, 1);
  //         box-sizing: border-box;
  //         padding-left: 10px;
  //         &::-webkit-input-placeholder {
  //           font-size: 12px;
  //           color: rgba(204, 204, 204, 1);
  //         }
  //       }
  //       .clear {
  //         cursor: pointer;
  //       }
  //     }
  //     .cur {
  //       border: 1px solid rgba(153, 153, 153, 1);
  //     }
  //     .forget {
  //       cursor: pointer;
  //       text-align: right;
  //       font-size: 12px;
  //       font-weight: 400;
  //       color: rgba(102, 102, 102, 1);
  //       box-sizing: border-box;
  //       padding-top: 23px;
  //     }
  //     .login {
  //       box-sizing: border-box;
  //       margin-top: 23px;
  //       cursor: pointer;
  //       width: 301px;
  //       height: 35px;
  //       background: rgba(228, 57, 60, 1);
  //       color: white;
  //       text-align: center;
  //       line-height: 35px;
  //     }
  //     .other {
  //       width: 300px;
  //       position: absolute;
  //       left: 50px;
  //       bottom: 40px;
  //       .text {
  //         cursor: pointer;
  //         font-size: 14px;
  //         color: rgba(102, 102, 102, 1);
  //       }
  //       .sx {
  //         margin: 0 10px;
  //       }
  //       .toreg {
  //         cursor: pointer;
  //         color: rgba(182, 29, 29, 1);
  //         font-size: 14px;
  //         position: relative;
  //         left: 95px;
  //       }
  //       .icon {
  //         cursor: pointer;
  //         position: relative;
  //         bottom: 2px;
  //       }
  //     }
  //     .toclose {
  //       cursor: pointer;
  //       position: absolute;
  //       z-index: 11;
  //       top: 20px;
  //       right: 5%;
  //     }
  //   }
  //   .loginbox {
  //     .intbox {
  //       input {
  //         position: relative;
  //         right: 5px;
  //       }
  //     }
  //   }
  //   .register {
  //     height: 338px;
  //     .telbox,
  //     .codebox {
  //       display: flex;
  //       justify-content: space-between;
  //       input {
  //         position: relative;
  //         top: 0px;
  //       }
  //       .tel {
  //         width: 102px;
  //         text-align: center;
  //         font-size: 12px;
  //         color: rgba(51, 51, 51, 1);
  //         //   box-sizing: border-box;
  //         //   margin: 0 15px;
  //       }
  //       .code {
  //         cursor: pointer;
  //         width: 102px;
  //         text-align: center;
  //         background: rgba(228, 228, 228, 1);
  //         font-size: 14px;
  //         color: rgba(51, 51, 51, 1);
  //       }
  //     }
  //   }
  //   .getpsw {
  //     .codebox {
  //       display: flex;
  //       justify-content: space-between;
  //       input {
  //         position: relative;
  //         top: 0px;
  //       }
  //     }
  //     .code {
  //       cursor: pointer;
  //       width: 102px;
  //       text-align: center;
  //       background: rgba(228, 228, 228, 1);
  //       font-size: 14px;
  //       color: rgba(51, 51, 51, 1);
  //     }
  //   }
}
</style>