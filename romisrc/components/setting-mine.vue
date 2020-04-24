<template>
  <div class="mine">
    <form action>
      <div class="topicon">
        <p>
          <img src="../assets/mine/image_01.png" alt />
          <span>个人信息</span>
        </p>
        <div class="tp-right">
          <!-- <el-button class="change item" type="password" @click="changeInfos">
          </el-button>-->
          <!-- <el-button class="send item" @click="userInfos">
          </el-button>-->
        </div>
      </div>
      <div class="cont">
        <div class="unchange">
          <section class="item">
            <p>
              <span>用户名：</span>
              <span>{{username}}</span>
            </p>
          </section>
          <section class="item">
            <p>
              <span>性别：</span>
              <span>男</span>
            </p>
          </section>
          <section class="item">
            <p>
              <span>年龄：</span>
              <span>***</span>
            </p>
          </section>
          <section class="item">
            <p>
              <span>生日：</span>
              <span>***</span>
            </p>
          </section>
          <section class="item">
            <p>
              <span>学历：</span>
              <span>***</span>
            </p>
          </section>
          <section class="item">
            <p>
              <span>学校/公司：</span>
              <span>***</span>
            </p>
          </section>
          <section class="item">
            <p>
              <span>职位：</span>
              <span>***</span>
            </p>
          </section>
          <section class="item">
            <p>
              <span>工作年限：</span>
              <span>***</span>
            </p>
          </section>
        </div>
      </div>
      <div class="topicon">
        <p>
          <img src="../assets/mine/image_01.png" alt />
          <span>个人信息</span>
        </p>
      </div>
      <div class="cont">
        <div class="change">
          <section>
            <p class="iptinfos">
              <span>密码：</span>
              <input
                placeholder="请输入密码"
                :type="type"
                value
                v-model="password"
                v-on:input="watchpassword"
                :readonly="readonly"
                v-focus
              />
              <span class="ico">
                <el-button>
                  <img
                    src="../assets/mine/image_03.png"
                    @click="changeInfos"
                    v-show="changeicon"
                    alt
                  />
                </el-button>
              </span>
            </p>
            <p class="hint" v-if="passwordErr">"请输入6位以上的密码，且只能包含字母数字下划线"</p>
          </section>
          <!-- <section v-show="changepsw">
            <p class="iptinfos">
              <span>新密码：</span>
              <input
                placeholder="请输入新密码"
                :type="password"
                value
                v-model="newpassword"
                v-on:input="watchnewpassword"
              />
            </p>
            <p class="hint" v-if="newpasswordErr">"请输入6位以上的密码，且只能包含字母数字下划线"</p>
          </section>-->
          <section v-show="changepsw">
            <p class="iptinfos">
              <span>确认密码：</span>
              <input
                placeholder="请确认密码"
                :type="password"
                value
                v-model="lastpassword"
                v-on:input="watchlastpassword"
              />
              <span class="send-cancle">
                <span @click="sendNewPassword">确认</span>
                <span @click="canclepaw">取消</span>
              </span>
            </p>
            <p class="hint" v-if="qrpasswordErr">"两次密码不一致"</p>
          </section>
          <section>
            <p class="iptinfos">
              手机：
              <input
                type="tel"
                maxlength="11"
                value
                v-on:input="watchtel"
                v-model="tel"
                :readonly="readonly"
              />
              <!-- <span class="ico">
                <img
                  src="../assets/mine/image_03.png"
                  v-show="changetelicon"
                  alt
                  @click="changeTel"
                />
              </span>-->
            </p>
            <p class="hint" v-if="telErr">"请输入11位手机号码"</p>
          </section>
          <section v-show="!changetelicon" class="changetel">
            <p class="iptinfos">
              <span>确认手机：</span>
              <input
                placeholder="请输入新的手机号"
                type="tel"
                value
                v-model="newtel"
                v-on:input="watchnewtel"
              />
            </p>
            <p class="hint" v-if="newTelErr">"请输入11位手机号码"</p>
          </section>
          <section v-show="!changetelicon" class="changetel">
            <p class="iptinfos">
              <span>验证码：</span>
              <input placeholder="请输入验证码" type="text" value v-model="code" v-on:input="watchnewtel" />

              <span class="send-cancle">
                <span
                  class="getcode"
                  @click="sendcode"
                  :class="cancode?'cantchoose':''"
                >{{codetime}}</span>

                <span @click="sendNewTel">确认</span>
                <span @click="canclepaw">取消</span>
              </span>
            </p>
            <p class="hint" v-if="newTelErr">"请输入11位手机号码"</p>
          </section>
          <section>
            <p class="iptinfos">
              邮箱：
              <input
                type="text"
                value
                v-model="email"
                v-on:input="watchemail"
                :readonly="readonly"
              />
              <!-- <span class="ico">
                <img src="../assets/mine/image_03.png" alt />
              </span>-->
            </p>
            <p class="hint" v-if="emailErr">"请输入以@结尾的邮箱"</p>
          </section>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "mine",
  data() {
    return {
      codetime: "点击发送",
      cancode: false,
      changetelicon: true,
      newTelErr: false,
      focus: false,
      emailErr: false,
      telErr: false,
      passwordErr: false,
      usernameErr: false,
      qrpasswordErr: false,
      newpasswordErr: false,
      readonly: true,
      type: "password",
      password: "******",
      tel: "14726677857",
      newpassword: "",
      email: "7324949@qq.com",
      changepsw: false,
      code: "",
      newpassword: "",
      newtel: "",
      lastpassword: "",
      changeicon: true
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {
    ...mapState(["loginUser", "username", "item"])
  },

  methods: {
    sendNewPassword() {
      let loginUser = this.loginUser[0];
      let name = this.username;
      let oldpsw = this.item;
      let newpsw = this.lastpassword;
      this.$axios
        .post("/updatePassword", {
          verification: loginUser,
          userNumber: "",
          oldPassword: oldpsw,
          newPassword: newpsw
        })
        .then(res => {
          let { data } = res;
          if (data.code == 200) {
            alert("信息修改成功");
            sessionStorage.removeItem("vuex");
            this.$router.push({ path: "/" });
          } else {
            // this.$message.error("错了哦，请检查信息是否填写错误");
            alert("信息修改失败");
          }
        });
    },
    canclepaw() {
      this.changepsw = false;
      this.changeicon = true;
      this.changetelicon = true;
      this.readonly = true;
    },
    changeInfos() {
      this.changeicon = false;
      this.readonly = false;
      this.password = "";
      this.$prompt("请验证身份", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: val => {
          if (val == null) {
            return true;
          }
          return val == this.item;
        },
        inputErrorMessage: "验证失败"
      })
        .then(({ value }) => {
          this.changepsw = true;
          this.$message({
            type: "success",
            message: "验证成功"
          });
        })
        .catch(() => {
          this.changeicon = true;
          this.changepsw = false;
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    changeTel() {
      this.changetelicon = false;
    },
    sendcode() {
      if (this.codetime == "点击发送") {
        if (this.tel == "" || this.newTelErr) {
          alert("请输入正确手机号");
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
            .post("/messageCode", {
              messageMobile: this.newtel,
              messageId: "",
              messageVerifcationcode: "",
              messageTime: ""
            })
            .then(res => {
              if (res.data.data == 202) {
                alert("该手机已注册");
              }
            });
        }
      }
    },
    sendNewTel() {},
    userInfos() {
      if (
        this.usernameErr == true ||
        this.passwordErr == true ||
        this.telErr == true ||
        this.emailErr == true
      ) {
        alert("您还有信息没填完请检查一下哦~");
      } else {
        alert("信息修改成功");
      }
    },
    // input参数验证
    watchusername() {
      let reg = /^[a-zA-Z0-9_]{5,}/;
      if (!reg.test(this.username)) {
        this.usernameErr = true;
      } else {
        this.usernameErr = false;
      }
    },
    watchpassword() {
      let reg = /^[a-zA-Z0-9_]{6,}/;
      if (!reg.test(this.password)) {
        this.passwordErr = true;
      } else {
        this.passwordErr = false;
      }
    },
    watchnewpassword() {
      let reg = /^[a-zA-Z0-9_]{6,}/;
      if (!reg.test(this.newpassword)) {
        this.newpasswordErr = true;
      } else {
        this.newpasswordErr = false;
      }
    },
    watchlastpassword() {
      if (this.lastpassword !== this.password) {
        this.qrpasswordErr = true;
      } else {
        this.qrpasswordErr = false;
      }
    },
    watchtel() {
      let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!reg.test(this.tel)) {
        this.telErr = true;
      } else {
        this.telErr = false;
      }
    },
    watchnewtel() {
      let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!reg.test(this.newtel)) {
        this.newTelErr = true;
      } else {
        this.newTelErr = false;
      }
    },
    watchemail() {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.email)) {
        this.telErr = true;
      } else {
        this.telErr = false;
      }
    }
  }
};
</script>
<style lang="less">
.unchange {
  display: grid;
  grid-template-columns: 50% 50%;
  .item {
    p {
      color: #2e2e2e;
    }
  }
}
.send-cancle {
  span {
    display: inline-block;
    text-align: center;
    width: 40px;
    border-radius: 10px;
    border: 1px solid grey;
    font-size: 15px;
    color: grey;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      background: grey;
      color: white;
    }
  }
}
.changetel {
  position: relative;
  .getcode {
    width: 60px;
    position: absolute;
    left: 300px;
    top: 21px;
  }
}
.change {
  section {
    padding-left: 15px;
    .ico {
      text-align: right;
    }
  }
}
.mine {
  box-sizing: border-box;
  padding: 0 40px;
  height: 920px;
  font-family: 微软雅黑;
  .topicon {
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 20px;
    img {
      margin-right: 5px;
    }
    span {
      margin-left: 10px;
    }
    .tp-right {
      display: flex;
      .item {
        font-size: 16px;
        color: #3903a3;
        margin-left: 20px;
      }
    }
  }
  .cont {
    background: white;
    margin: 15px 0;
    border-radius: 15px;
    padding: 30px 50px;
    section {
      margin-bottom: 10px;
      height: 60px;
      display: grid;
      grid-template-rows: 70% 30%;
      font-size: 20px;
      .iptinfos {
        display: grid;
        grid-template-columns: 20% 50% 25%;
        align-items: flex-end;
      }
      .hint {
        font-size: 12px;
        color: red;
      }
    }
  }
}
</style>