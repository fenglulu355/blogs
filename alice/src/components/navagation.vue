<template>
  <div class="navagation">
    <div class="navbox">
      <div class="logo">
        <img @click="tohome" src="../assets/home/02.png" alt />
        <p @click="tohome" class="text">爱丽丝景观</p>
        <!-- <div
          class="mainpic"
          :style="{backgroundImage: 'url(' + require('../assets/home/01.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>-->
      </div>
      <ul class="navlist">
        <li class="navli" v-for="(item, index) in navli" :key="index" @click="changeindex(index)">
          <router-link :class="curindex==index?'sel':''" :to="item.path">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "navagation",
  inject: ["reload"],
  data() {
    return {
      curindex: 0,
      navli: [
        { name: "首页", path: "/" },
        { name: "案例展示", path: "/cases" },
        { name: "视频赏析", path: "/appreciation" },
        { name: "业务范围", path: "/business" },
        { name: "客户评价", path: "/evaluate" },
        { name: "关于我们", path: "/about" },
        { name: "联系我们", path: "/contact" }
      ]
    };
  },
  created() {
    let navindex = sessionStorage.getItem("navindex");
    if (navindex) {
      this.curindex = navindex;
    } else {
      this.curindex = 0;
    }
  },
  methods: {
    tohome() {
      this.$router.push({ path: "/" });
    },
    changeindex(index) {
      this.curindex = index;
      sessionStorage.setItem("navindex", index);
      this.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.navagation {
  position: relative;
  .navbox {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 111;
    width: 1200px;
    height: 100px;
    background: rgba(50, 149, 43, 0.9);
    opacity: 0.9;
    display: flex;
    .logo {
      // width: 30%;
      line-height: 100px;
      box-sizing: border-box;
      padding-left: 40px;
      position: relative;
      img {
        cursor: pointer;
        height: 80px;
      }
      .text {
        cursor: pointer;
        width: 150px;
        color: white;
        position: absolute;
        top: 0;
        left: 130px;
        font-size: 28px;
        font-weight: lighter;
      }
      // .mainpic{
      //   width: 100px;
      //   height: 100px;
      // }
    }
    .navlist {
      width: 100%;
      height: 100%;
      text-align: right;
      .navli {
        display: inline-block;
        a {
          display: inline-block;
          width: 67px;
          text-align: center;
          line-height: 100px;
          margin: 0 30px;
          color: white;
          position: relative;
          &::after {
            opacity: 0;
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 67px;
            height: 4px;
            background: rgba(255, 255, 255, 1);
          }
          &:hover {
            &::after {
              transition: all 0.5s ease;
              opacity: 1;
            }
          }
        }

        .sel {
          position: relative;
          &::after {
            opacity: 1;
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 67px;
            height: 4px;
            background: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
}
</style>