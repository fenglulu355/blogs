<template>
  <div class="footernav">
    <div class="footerlist">
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
  name: "footernav",
  inject: ["reload"],
  data() {
    return {
      curindex: 0,
      isAlive: true,
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
    changeindex(index) {
      this.curindex = index;
      sessionStorage.setItem("navindex", index);
      this.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.footerlist {
  background: rgba(50, 149, 43, 1);
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
    z-index: 1;
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
}
</style>