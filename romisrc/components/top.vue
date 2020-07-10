<template>
  <div class="top">
    <div class="nav">
      <ul class="navlist">
        <li>
          <router-link to="/">
            <img src="../assets/mine/图层2.png" alt title="首页" />
          </router-link>
        </li>
        <li @click="tosearch">
          <router-link to>
            <img src="../assets/rm搜索.png" title="搜索" />
          </router-link>
        </li>
        <li>
          <router-link to="/setting">
            <img src="../assets/rm个人.png" title="个人中心" />
          </router-link>
        </li>
      </ul>
      <form action>
        <div class="banner">
          <div class="pic item">
            <div class="img">
              <router-link to="/">
                <img src="../assets/LOGO.png" alt />
              </router-link>
            </div>
          </div>

          <div class="ipt item">
            <div></div>
            <div class="ipt-box">
              <input class="searchipt" type="text " placeholder="你想要学习的内容" v-model="keyword" />
              <img src="../assets/topsearch.png" @click="godetail" @keyup.enter="godetail" alt />
            </div>
            <div></div>
          </div>
          <div class="logReg item" v-if="!loginUser">
            <button class="log btn">
              <router-link to="/logReg">登录</router-link>
            </button>
            <button class="reg btn">
              <router-link to="/logReg">注册</router-link>
            </button>
          </div>
          <div class="out" v-else>
            <p class="title">
              欢迎您！
              <span>{{username}}</span>
            </p>
            <section @click="out">
              <img src="../assets/mine/image_17.png" alt />
            </section>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "top",
  data() {
    return {
      keyword: ""
      // username: JSON.parse(sessionStorage.vuex.username)
    };
  },
  computed: {
    ...mapState(["showTOP", "showBOTTOM", "loginUser", "username"]) // aplus: {
  },
  methods: {
    tosearch() {
      let keywords = "";
      this.$router.push(`/search?keywords=${keywords}`);
    },
    godetail() {
      let keywords = this.keyword;
      this.$router.push(`/search?keywords=${keywords}`);
    },

    out() {
      if (confirm("您确定退出吗") == true) {
        sessionStorage.removeItem("vuex");
        this.$router.push({ path: "/" });
      } else {
        return;
      }
    }
  }
};
</script>


<style lang="less" scoped>
.top {
  width: 100%;
  min-width: 1200px;
  height: 102px;
  background: #3804a2;
  .nav {
    width: 1200px;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    .navlist {
      z-index: 111;
      background: rgb(124, 122, 122);
      position: fixed;
      right: -60px;
      top: 50%;
      transform: translateY(-50%);
      width: 70px;
      transition: all 0.5s linear;
      li {
        padding: 15px;
        &::after {
          content: "";
          display: inline-block;
          width: 40px;
          height: 2px;
          margin-right: 8px;
          background: rgba(255, 255, 255, 0.8);
        }
        img {
          width: 40px;
        }
      }

      &:hover {
        right: 0px;
      }
    }
    .banner {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 200px 820px 180px;
      .pic {
        width: 200px;
        height: 100%;
        .img {
          width: 200px;
          line-height: 102px;
        }
      }
      .ipt {
        line-height: 102px;
        display: grid;
        grid-template-columns: 194px 465px 1fr;
        .ipt-box {
          position: relative;
          .searchipt {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 400px;
            height: 40px;
            border-radius: 30px;
            padding-left: 65px;
            font-size: 18px;
          }
          img {
            cursor: pointer;
            width: 20px;
            position: absolute;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .logReg {
        text-align: right;
        line-height: 102px;
        .btn {
          width: 80px;
          height: 40px;
          border-radius: 20px;
          margin-left: 10px;
          border: 1.5px solid white;
          background: white;

          a {
            color: #3804a2;
          }
        }
        .log {
          background: #3804a2;
          a {
            color: white;
          }
        }
      }
      .out {
        width: 220px;
        text-align: right;
        line-height: 102px;
        color: white;
        font-size: 18px;
        display: grid;
        grid-template-columns: 1fr 40px;
        justify-items: flex-start;

        section {
          cursor: pointer;
        }
      }
    }
  }
}
</style>