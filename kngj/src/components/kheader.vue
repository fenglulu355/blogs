<template>
  <div class="headers">
    <div class="white"></div>
    <router-link to="/">
      <img src="../assets/logo.png" alt class="logo" />
    </router-link>
    <div class="h-content">
      <div class="h-center">
        <p>京东商城</p>
        <p>天猫商城</p>
        <p class="search">
          <input type="text" v-model="search" @blur="regtext(search)" placeholder="SEARCH" />
          <img @click="tosearch" src="../assets/search.png" alt />
        </p>
      </div>
      <nav>
        <router-link to="/about">关于垦诺</router-link>
        <router-link to="/product">产品详情</router-link>
        <router-link to="/active">企业动态</router-link>
        <router-link to="/videos">企业视频</router-link>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: "headers",
  inject: ["reload"],
  data() {
    return {
      search: ""
    };
  },
  methods: {
    tosearch() {
      console.log(this.search);
      if (this.search == "") {
        this.$toast.fail("搜索内容为空");
      } else {
        this.$router.push({
          path: "/productlist",
          query: { keyword: this.search }
        });
        this.reload();
      }
    },
    regtext(text) {
      let regwords = text.replace(/<\/?[^>]*>/g, "");
      this.search = regwords;
    }
  }
};
</script>
<style lang="less"  scoped>
.headers {
  width: 100%;
  height: 200px;
  background: black;
  position: relative;
  .white {
    background: white;
    height: 15px;
    width: 100%;
    position: absolute;
    top: 0;
  }
  .logo {
    width: 150px;
    position: absolute;
    top: 0;
    z-index: 1;
    left: 3%;
  }
  .h-content {
    box-sizing: border-box;
    // padding-right: 15px;
    width: 72%;
    height: 140px;

    position: absolute;
    right: 0;
    bottom: 0;
    .h-center {
      width: 100%;
      display: grid;
      grid-template-columns: 30% 30% 1fr;
      p {
        height: 40px;
        width: 90%;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;
        background: #f5d02c;
      }
      input {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0 65px 0 0;
        &::placeholder {
          font-size: 20px;
        }
      }
      .search {
        // background: blue;
        width: 95%;
        position: relative;
        img {
          width: 60px;
          position: absolute;
          top: 0;
          right: 0;
          height: 40px;
        }
      }
    }
    nav {
      position: absolute;
      bottom: 10px;
      a {
        display: inline-block;
        box-sizing: border-box;
        padding-right: 15px;
        color: white;
        font-size: 27px;
      }
    }
  }
}
</style>