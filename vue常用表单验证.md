##### vue常用表单验证

1、html代码

```
   <form action>
    <div class="rtbd">
              <p class="tomine">给我们留言</p>
              <div class="info">
                <div class="nametel">
                  <input type="text" placeholder="姓名" v-model="name" />
                  <input type="text" placeholder="电话" v-model="tel" @blur="regTel(tel)" />
                </div>
                <div class="yx">
                  <input type="text" placeholder="邮箱" v-model="email" @blur="regEmail(email)" />
                </div>
                <div class="words">
                  <textarea
                    class="textarea"
                    v-model="words"
                    placeholder="想对我们说的话..."
                    @blur="regWords(words)"
                  ></textarea>
                </div>
              </div>
              <div class="sub">
                <p class="btn" @click="sendinfo">提交</p>
              </div>
            </div>
          </form>
```

data：

```
 data() {
    return {
      name: "",
      tel: "",
      email: "",
      words: "",
      texts: ""
    };
  },
```

方法：

```
    sendinfo() {
      if (
        this.name == "" ||
        this.email == "" ||
        this.tel == "" ||
        this.words == ""
      ) {
        alert("您的留言信息还没有完善哦！");
      } else {
        this.$axios
          .post("/index/api/web_config", {
            name: this.name,
            phone: this.tel,
            email: this.email,
            content: this.texts
          })
          .then(res => {
            this.name = "";
            this.email = "";
            this.tel = "";
            this.words = "";
            alert("提交成功，感谢您的留言");
          });
      }
    },
    regTel(tel) {
      if (tel == "") {
        this.tel = "";
      } else {
        let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/,
          telnum = reg.test(tel);
        if (telnum == false) {
          alert("手机格式不正确");
        }
      }
    },
    regEmail(email) {
      if (email == "") {
        this.email = "";
      } else {
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          emailnum = reg.test(email);
        if (emailnum == false) {
          alert("邮箱格式不正确");
        }
      }
    },
    regWords(words) {
      let regwords = words.replace(/<\/?[^>]*>/g, "");
      this.texts = regwords;
    },
```

