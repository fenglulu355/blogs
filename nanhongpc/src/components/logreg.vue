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
        <input type="tel" id="logtel" placeholder="登录账户手机号" maxlength="11" v-model="tel" />
        <img class="clear" @click="cleartel" src="../assets/navgation/log-x.png" alt />
      </div>
      <div class="intbox">
        <span class="img">
          <img src="../assets/navgation/log-pw.png" alt />
        </span>
        <input type="password" id="logpsw" placeholder="输入密码" v-model="password" />
        <img class="clear" @click="clearpsw" src="../assets/navgation/log-x.png" alt />
      </div>

      <p class="login" @click="loging">登录</p>
      <div class="other">
        <p class="forget" @click="topaw">忘记密码</p>
        <!-- <img class="icon" src="../assets/navgation/log-qq.png" alt />
        <span class="text">QQ</span>
        <span class="text sx">|</span>
        <img class="icon" src="../assets/navgation/log-wx.png" alt />
        <span class="text">微信</span>-->
        <p class="toreg" @click="toreg">
          立即注册
          <img class="icon" src="../assets/navgation/log-r.png" alt />
        </p>
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
        <input
          type="tel"
          id="regtel"
          placeholder="建议使用常用手机号"
          maxlength="11"
          v-model="tel"
          @blur="regtel(tel)"
        />
      </div>
      <div class="intbox">
        <input
          type="password"
          id="regpsw"
          placeholder="输入密码"
          v-model="password"
          @blur="regpsw(password)"
        />
      </div>
      <div class="intbox codebox">
        <input placeholder="输入验证码" id="regcode" v-model="code" @blur="regcode(code)" />
        <p @click="sendCode" class="code" :class="cancode ? 'cantchoose':''">{{codetime}}</p>
      </div>
      <p class="login" @click="reging">注册</p>
    </div>
    <!-- 忘记密码 -->
    <div class="getpsw box" v-if="ispsw">
      <img @click="close" class="toclose" src="../assets/navgation/log-x.png" alt />

      <p class="title">找回密码</p>
      <div class="intbox telbox">
        <input
          type="tel"
          @blur="regtel(tel)"
          id="gettel"
          maxlength="11"
          v-model="tel"
          placeholder="注册账户手机号"
        />
      </div>
      <div class="intbox codebox">
        <input placeholder="输入验证码" id="getcode" v-model="code" />
        <p class="code" @click="sendCode" :class="cancode ? 'cantchoose':''">{{codetime}}</p>
      </div>
      <div class="intbox telbox">
        <input
          type="password"
          id="getnpsw"
          @blur="regpsw(password)"
          placeholder="请输入新密码"
          v-model="password"
        />
      </div>
      <div class="intbox telbox">
        <input
          type="password"
          id="getnpsws"
          @blur="regnpsw(confirmPsw)"
          placeholder="请再次输入密码"
          v-model="confirmPsw"
        />
      </div>
      <p class="login" @click="changepsw">确定</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
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
      cancode: false, //允许发送验证码,
      getcode: null
    };
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
        this.$message.error("请完善信息");
      } else {
        console.log(this.password, this.tel);
        this.$axios
          .post("/index/login/userLogin", {
            phone: this.tel,
            pwd: this.password
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.$message({
                message: "登录成功",
                type: "success"
              });
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
              this.$message.error("账号或密码错误");
            }
          });
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
        console.log(this.tel, this.code, "erwr");
        this.$axios
          .post("/index/login/register", {
            phone: this.tel,
            code: this.code,
            pwd: this.password
          })
          .then(res => {
            console.log(res, "注册");
            if (res.data.code == 1) {
              this.$message({
                message: "注册成功",
                type: "success"
              });
              // 存储userid
              this.getuserid(Number(res.data.data));
              // 设置登录状态
              this.getlogin(true);
              // 跳转到要去的页面
              this.$router.push({ path: this.topath });
              // 掩藏登录框
              this.getlogreg(false);
            } else if (res.data.code == 0) {
              this.$message.error("该手机已注册");
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
        this.$message.error("请完善信息");
      } else {
        console.log(this.tel, this.password, this.confirmPsw);
        this.$axios
          .post("/index/user/forgetpwd", {
            phone: this.tel,
            pwd: this.confirmPsw
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "重置成功，请重新登录",
                type: "success"
              });
              setTimeout(() => {
                this.islog = true;
                this.isreg = false;
                this.ispsw = false;
              }, 500);
            } else {
              this.$message.error("重置失败");
            }
          });
      }
    },
    // 发送验证码
    sendCode() {
      // let _this=this
      if (this.codetime == "获取验证码") {
        if (this.tel == "") {
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
          // 生成验证码
          let code = this.rand("0000", "9999");
          this.getcode = code;
          console.log(code, "code");
          return this.$confirm(`验证码 ${this.getcode}`);
          this.$axios
            .post("/index/login/sendPhoneCode", {
              phone: this.tel,
              code: code
            })
            .then(res => {
              console.log(res, "code");

              // 判断手机是否注册
              if (res.data.code == 0) {
                this.$message.error({
                  message: "该手机已注册"
                });
              } else {
                this.$message({
                  message: "发送成功",
                  type: "success"
                });
              }
            });
        }
      }
    },
    // 正则判断手机号
    regtel(tel) {
      let regPhone = /^(1[3|5|4|6|7|8|9]\d{1}[*|\d]{4}\d{4})$/;
      if (!regPhone.test(tel)) {
        this.$message.error("手机号码格式错误");
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
        this.$message.error("请输入至少6位数以上包含数字、字母、字符串的密码");
        setTimeout(() => {
          this.password = "";
        }, 200);
      } else {
        this.password = psw;
      }
    },
    regnpsw(confirmPsw) {
      if (this.password != confirmPsw) {
        this.$message.error("两次密码不一致");
        setTimeout(() => {
          this.confirmPsw = "";
        }, 200);
      }
    },
    regcode(code) {
      if (code == this.getcode) {
        console.log("验证码正确");
      } else {
        this.$message.error("验证码错误");
      }
    },
    // 生成验证码
    rand(min, max) {
      min = Number(min);
      max = Number(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    close() {
      this.$emit("close", false);
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
  z-index: 1111;
  background: rgba(0, 0, 0, 0.5);

  .box {
    width: 410px;
    // height: 399px;
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
        // top: -2px;
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
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      box-sizing: border-box;
    }
    .login {
      box-sizing: border-box;
      margin-top: 33px;
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
      box-sizing: border-box;
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      .toreg {
        cursor: pointer;
        color: rgba(182, 29, 29, 1);
        font-size: 14px;
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
    // height: 338px;
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