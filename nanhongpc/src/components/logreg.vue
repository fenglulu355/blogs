<template>
  <div class="logreg">
    <!-- 登录 -->
    <div class="loginbox box" v-if="islog">
      <img @click="close" class="toclose" src="../assets/navgation/log-x.png" alt />
      <p class="title">账户登录</p>
      <div class="intbox">
        <span class="img">
          <img src="../assets/navgation/log-tel.png" alt />
        </span>
        <input type="tel" placeholder="登录账户手机号" maxlength="11" v-model="tel" />
        <img class="clear" src="../assets/navgation/log-x.png" alt />
      </div>
      <div class="intbox">
        <span class="img">
          <img src="../assets/navgation/log-pw.png" alt />
        </span>
        <input type="password" placeholder="输入密码" v-model="password" />
        <img class="clear" src="../assets/navgation/log-x.png" alt />
      </div>
      <p class="forget" @click="topaw">忘记密码</p>
      <p class="login" @click="loging">登录</p>
      <div class="other">
        <img class="icon" src="../assets/navgation/log-qq.png" alt />
        <span class="text">QQ</span>
        <span class="text sx">|</span>
        <img class="icon" src="../assets/navgation/log-wx.png" alt />
        <span class="text">微信</span>
        <span class="toreg" @click="toreg">
          立即注册
          <img class="icon" src="../assets/navgation/log-r.png" alt />
        </span>
      </div>
    </div>
    <!-- 注册 -->
    <div class="register box" v-if="isreg">
      <img @click="close" class="toclose" src="../assets/navgation/log-x.png" alt />
      <p class="title">账户注册</p>
      <div class="intbox telbox">
        <p class="tel">
          中国0086
          <span>
            <img src="../assets/navgation/log-b.png" alt />
          </span>
        </p>
        <input type="tel" placeholder="建议使用常用手机号" maxlength="11" v-model="tel" />
      </div>
      <div class="intbox codebox">
        <input placeholder="输入验证码" v-model="code" />
        <p @click="sendCode" class="code" :class="cancode ? 'cantchoose':''">{{codetime}}</p>
      </div>
      <p class="login" @click="reging">注册</p>
    </div>
    <!-- 忘记密码 -->
    <div class="getpsw box" v-if="ispsw">
      <img @click="close" class="toclose" src="../assets/navgation/log-x.png" alt />

      <p class="title">找回密码</p>
      <div class="intbox telbox">
        <input type="tel" maxlength="11" v-model="tel" placeholder="注册账户手机号" />
      </div>
      <div class="intbox codebox">
        <input placeholder="输入验证码" v-model="code" />
        <p class="code" @click="sendCode" :class="cancode ? 'cantchoose':''">{{codetime}}</p>
      </div>
      <div class="intbox telbox">
        <input type="password" placeholder="请输入新密码" v-model="password" />
      </div>
      <div class="intbox telbox">
        <input type="password" placeholder="请再次输入密码" v-model="confirmPsw" />
      </div>
      <p class="login" @click="changepsw">确定</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "logreg",
  data() {
    return {
      islog: true,
      isreg: false,
      ispsw: false,
      username: "", // 用户名
      password: "", // 密码
      confirmPsw: "", // 确认密码
      tel: "", // 手机号码
      code: "", //验证码
      codetime: "获取验证码", //验证码倒计时
      cancode: false //允许发送验证码
    };
  },
  computed: {
    ...mapState(["logreg", "islogin", "topath"])
  },
  methods: {
    ...mapActions(["getlogin", "getlogreg"]),
    // 登录ing
    loging() {
      if (this.password == "" || this.tel == "") {
        this.$message.error("请完善信息");
      } else {
        var regPhone = /^(1[3|5|4|6|7|8|9]\d{1}[*|\d]{4}\d{4})$/,
          regpsw = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,}$/;
        if (!regpsw.test(this.password) || !regPhone.test(this.tel)) {
          this.$message.error(
            "请输入11位正确手机号码或者包含必须数字、字母、字符串的6位数以上的密码"
          );
        } else {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          // 设置登录状态
          this.getlogin(true);
          // 跳转到要去的页面
          this.$router.push({ path: this.topath });
          // 掩藏登录框
          this.$emit("close", false);
        }
      }
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
        this.$message.error("请完善信息");
      } else {
        // 判断验证码和手机号码
        var regcode = /^\d{4}$/,
          regPhone = /^(1[3|5|4|6|7|8|9]\d{1}[*|\d]{4}\d{4})$/;
        if (!regcode.test(this.code) || !regPhone.test(this.tel)) {
          this.$message.error("您输入的格式有错误");
        } else {
          this.$message({
            message: "发送成功",
            type: "success"
          });
          // 设置登录状态
          this.getlogin(true);
          // 跳转到要去的页面
          this.$router.push({ path: this.topath });
          // 掩藏登录框
          this.getlogreg(false);
        }
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
        this.code == "" ||
        this.password == "" ||
        this.confirmPsw == ""
      ) {
        this.$message.error("请完善信息");
      } else {
        var regPhone = /^(1[3|5|4|6|7|8|9]\d{1}[*|\d]{4}\d{4})$/,
          regcode = /^\d{4}$/,
          regpsw = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,}$/;
        if (
          !regcode.test(this.code) ||
          !regPhone.test(this.tel) ||
          !regpsw.test(this.password) ||
          !regpsw.test(this.confirmPsw)
        ) {
          this.$message.error("您输入的格式有错误");
        } else {
          if (this.password != this.confirmPsw) {
            this.$message.error("两次密码不一致");
          } else {
            this.$message({
              message: "发送成功",
              type: "success"
            });
            // 设置登录状态
            this.getlogin(true);
            // 跳转到要去的页面
            this.$router.push({ path: this.topath });
            // 掩藏登录框
            this.getlogreg(false);
          }
        }
      }
    },
    // 发送验证码
    sendCode() {
      if (this.codetime == "获取验证码") {
        if (this.tel == "" || this.telErr) {
          this.$message.error("请输入正确手机号");
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
          // this.$axios
          //   .post("/register-verification", {
          //     mobile: this.tel,
          //     state: "注册",
          //     verifcationCode: "",
          //     id: ""
          //   })
          //   .then(res => {
          //     if (res.data.code == 202) {
          //       this.$message.error({
          //         message: "该手机已注册",
          //         duration: 500
          //       });
          //     }
          //   });
        }
      }
    },
    close() {
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="less" scoped>
.logreg {
  width: 100%;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.5);

  .box {
    width: 410px;
    height: 399px;
    background: white;
    box-sizing: border-box;
    margin: 300px auto;
    padding: 40px 52px;
    position: relative;
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .intbox {
      margin-top: 20px;
      border: 1px solid rgba(228, 228, 228, 1);
      width: 300px;
      height: 40px;
      line-height: 40px;
      .img {
        display: inline-block;
        text-align: center;
        width: 40px;
        height: 40px;
        background: rgba(228, 228, 228, 1);
      }
      input {
        cursor: pointer;
        width: 230px;
        height: 40px;
        position: relative;
        top: -2px;
        right: 2px;
        border-left: 1px solid rgba(228, 228, 228, 1);
        box-sizing: border-box;
        padding-left: 10px;
        &::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(204, 204, 204, 1);
        }
      }
      .clear {
        cursor: pointer;
      }
    }
    .cur {
      border: 1px solid rgba(153, 153, 153, 1);
    }
    .forget {
      cursor: pointer;
      text-align: right;
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      box-sizing: border-box;
      padding-top: 23px;
    }
    .login {
      box-sizing: border-box;
      margin-top: 23px;
      cursor: pointer;
      width: 301px;
      height: 35px;
      background: rgba(228, 57, 60, 1);
      color: white;
      text-align: center;
      line-height: 35px;
    }
    .other {
      width: 300px;
      position: absolute;
      left: 50px;
      bottom: 40px;
      .text {
        cursor: pointer;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
      }
      .sx {
        margin: 0 10px;
      }
      .toreg {
        cursor: pointer;
        color: rgba(182, 29, 29, 1);
        font-size: 14px;
        position: relative;
        left: 95px;
      }
      .icon {
        cursor: pointer;
        position: relative;
        bottom: 2px;
      }
    }
    .toclose {
      cursor: pointer;
      position: absolute;
      z-index: 11;
      top: 20px;
      right: 5%;
    }
  }
  .loginbox {
    .intbox {
      input {
        position: relative;
        right: 5px;
      }
    }
  }
  .register {
    height: 338px;
    .telbox,
    .codebox {
      display: flex;
      justify-content: space-between;
      input {
        position: relative;
        top: 0px;
      }
      .tel {
        width: 102px;
        text-align: center;
        font-size: 12px;
        color: rgba(51, 51, 51, 1);
        //   box-sizing: border-box;
        //   margin: 0 15px;
      }
      .code {
        cursor: pointer;
        width: 102px;
        text-align: center;
        background: rgba(228, 228, 228, 1);
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .getpsw {
    .codebox {
      display: flex;
      justify-content: space-between;
      input {
        position: relative;
        top: 0px;
      }
    }
    .code {
      cursor: pointer;
      width: 102px;
      text-align: center;
      background: rgba(228, 228, 228, 1);
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>