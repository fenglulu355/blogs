<template>
  <div class="logReg">
    <section class="close fas fa-undo" @click="handleCloseClick"></section>
    <form action="javascript:;">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/log-logo.png" alt />
        </router-link>
      </div>
      <div class="cont">
        <div class="bg">
          <img src="../assets/loginbg.png" alt />
        </div>
        <div class="infos">
          <section class="item">
            <div class="item-ipt">
              <span>用户名：</span>
              <input type="text" placeholder="用户名" v-model="username" v-on:input="watchUsername" />
            </div>
            <p class="hint" v-if="usernameErr">"请输入6位以上的账号，且只能包含字母数字下划线"</p>
          </section>
          <section class="item">
            <div class="item-ipt">
              <span>密码：</span>
              <input
                type="password"
                placeholder="请填写密码"
                v-model="password"
                v-on:input="watchPassword"
              />
            </div>
            <p class="hint" v-if="passwordErr">"请输入6位以上的密码，且只能包含字母数字下划线"</p>
          </section>
          <section v-show="!login" class="item">
            <div class="item-ipt">
              <span>密码：</span>
              <input
                type="password"
                placeholder="请确认密码"
                v-model="confirmPsw"
                v-on:input="watchPwdAgin"
              />
            </div>

            <p class="hint" v-if="pwdAginErr">"两次输入密码不一致"</p>
          </section>
          <section v-show="!login" class="item">
            <div class="item-ipt">
              <span>手机：</span>
              <input
                type="tel"
                placeholder="请填写手机号"
                maxlength="11"
                v-model="tel"
                v-on:input="watchTel"
              />
            </div>
            <p class="hint" v-if="telErr">"请输入11位手机号码"</p>
          </section>
          <section v-show="!login" class="item code">
            <div class="item-ipt">
              <span>验证码：</span>
              <input type="text" placeholder="手机验证码" v-model="code" />
            </div>
            <div class="getCode" @click="sendCode" :class="cancode ? 'cantchoose':''">{{codetime}}</div>
          </section>
          <section class="handle">
            <section v-show="login" class="remember">
              记住账号或密码？
              <input type="checkbox" v-model="isRemember" />
            </section>
            <section v-if="!login" class="btn go-login" @click="login = !login">返回登录</section>
            <section v-if="login" class="btn go-register" @click="login = !login">没有账号？点击注册</section>
          </section>
          <section
            :class="['login-register-btn', {'err': !isComplete}]"
            v-text="login ? '登录' : '注册'"
            @click="handleBtnClick"
          >
            <!-- <el-button :plain="true"></el-button> -->
          </section>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { type } from "os";
import { log } from "util";
export default {
  name: "login-register",
  data() {
    return {
      login: true,
      isRemember: false,
      username: "", // 用户名
      password: "", // 密码
      confirmPsw: "", // 确认密码
      tel: "", // 手机号码
      code: "", //验证码
      codetime: "点击发送", //验证码倒计时
      cancode: false, //允许发送验证码
      usernameErr: false,
      passwordErr: false,
      pwdAginErr: false,
      telErr: false
    };
  },
  mounted() {
    if (localStorage.SHOP_STORE_SAVE_USER) {
      this.isRemember = true;
      let user = JSON.parse(localStorage.SHOP_STORE_SAVE_USER);
      this.username = user.username;
      this.password = user.password;
    }
  },
  watch: {
    isRemember(val) {
      if (!val && localStorage.SHOP_STORE_SAVE_USER) {
        localStorage.removeItem("SHOP_STORE_SAVE_USER");
      }
    },
    login(val) {
      this.username = this.password = this.confirmPsw = this.tel = "";
      if (val && localStorage.SHOP_STORE_SAVE_USER) {
        this.isRemember = true;
        let user = JSON.parse(localStorage.SHOP_STORE_SAVE_USER);
        this.username = user.username;
        this.password = user.password;
      }
    }
  },
  computed: {
    ...mapState(["item"]),
    isComplete() {
      if (this.login) {
        return this.username && this.password;
      } else {
        return (
          this.username &&
          this.password &&
          this.confirmPsw &&
          this.tel &&
          this.password == this.confirmPsw
        );
      }
    }
  },
  methods: {
    ...mapMutations([
      "SET_LOGIN_USER",
      "SET_USER_NAME",
      "SET_PSW",
      "SET_SHOPPING_CART"
    ]),
    handleBtnClick() {
      if (!this.isComplete) return;
      if (this.login) {
        // 登录
        this.handleLogin();
      } else {
        // 注册
        this.handleRegister();
      }
    },
    handleLogin() {
      this.$axios
        .post("/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          let { data } = res;
          if (data.code == 200) {
            alert("登录成功");
            this.SET_LOGIN_USER(data.data);
            this.SET_USER_NAME(JSON.parse(res.config.data).username);
            this.SET_PSW(JSON.parse(res.config.data).password);

            if (this.isRemember) {
              localStorage.SHOP_STORE_SAVE_USER = JSON.stringify({
                username: this.username,
                password: this.password
              });
            }

            this.$router.go(-1);
          } else {
            // this.$message.error("错了哦，请检查信息是否填写错误");
            alert("用户名或密码错误~~~~");
          }
        });
    },
    handleRegister() {
      if (
        this.username == "" ||
        this.password == "" ||
        this.confirmPsw == "" ||
        this.tel == "" ||
        this.code == "" ||
        this.usernameErr ||
        this.passwordErr ||
        this.pwdAginErr ||
        this.telErr
      ) {
        // this.$message.error("请根据提示输入信息");
        alert("您还有信息没填完请检查一下哦~");
      } else {
        let user = {
          username: this.username,
          password: this.password,
          telephoneNumber: this.tel,
          authCode: this.code
        };
        this.$axios.post("/register", user).then(res => {
          let data = res.data;
          if (data.code == 200) {
            // this.$message({
            //   message: "恭喜你，注册成功",
            //   type: "success"
            // });
            alert("注册成功");
            this.SET_USER_NAME(JSON.parse(res.config.data).username);
            this.SET_PSW(JSON.parse(res.config.data).password);
            this.SET_LOGIN_USER(data.data);

            this.$router.go(-1);
          } else {
            this.$message.error({
              message: data.message,
              duration: 500
            });
          }
        });
      }
    },
    handleCloseClick() {
      this.$router.go(-1);
    },

    // input参数验证
    watchUsername() {
      let reg = /^[a-zA-Z0-9_]{5,}/;
      if (!reg.test(this.username)) {
        this.usernameErr = true;
      } else {
        this.usernameErr = false;
      }
    },
    watchPassword() {
      let reg = /^[a-zA-Z0-9_]{6,}/;
      if (!reg.test(this.password)) {
        this.passwordErr = true;
      } else {
        this.passwordErr = false;
      }
    },
    watchPwdAgin() {
      if (this.confirmPsw != this.password) {
        this.pwdAginErr = true;
      } else {
        this.pwdAginErr = false;
      }
    },
    watchTel() {
      let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!reg.test(this.tel)) {
        this.telErr = true;
      } else {
        this.telErr = false;
      }
    },

    // 发送验证码
    sendCode() {
      if (this.codetime == "点击发送") {
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
          this.$axios
            .post("/register-verification", {
              mobile: this.tel,
              state: "注册",
              verifcationCode: "",
              id: ""
            })
            .then(res => {
              if (res.data.code == 202) {
                this.$message.error({
                  message: "该手机已注册",
                  duration: 500
                });
              }
            });
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.logReg {
  height: 100%;
  width: 100%;
  background: rgb(234, 236, 254);
  padding-bottom: 300px;
  .logo {
    padding: 50px;
  }
  .cont {
    width: 900px;
    height: 540px;
    margin: 0 auto;
    background: white;
    border-radius: 26px;
    display: flex;
    position: relative;
    .infos {
      box-sizing: border-box;
      border-radius: 12px;
      padding: 30px;

      .item {
        border: 1px solid lightgrey;
        border-radius: 12px;
        width: 100%;
        height: 55px;
        margin-bottom: 25px;
        display: grid;
        grid-template-rows: 65% 35%;
        align-self: flex-end;

        .item-ipt {
          display: grid;
          grid-template-columns: 80px 1fr;
          align-self: flex-end;
          span {
            width: 100%;
            text-align: right;
          }
          input {
            padding-right: 10px;
          }
        }
        .hint {
          padding: 0 0 3px 18px;
          color: red;
          font-size: 10px;
        }
      }
      .code {
        cursor: pointer;
        position: relative;
        .getCode {
          color: blue;
          position: absolute;
          right: 15px;
          bottom: 15px;
          font-size: 16px;
        }
      }
      .btn {
        color: blue;
      }
      .login-register-btn {
        margin-top: 15px;
        background: rgb(57, 3, 163);
        border-radius: 12px;
        width: 87%;
        height: 55px;
        color: white;
        text-align: center;
        line-height: 55px;
        cursor: pointer;
        position: absolute;
        bottom: 10px;
        right: 30px;
        &:hover {
          background: blue;
        }
      }
      .handle {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>