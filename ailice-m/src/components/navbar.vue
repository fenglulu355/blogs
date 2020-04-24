<template>
  <div class="navbar">
    <ul class="navlist">
      <li
        class="navli"
        :class="navindex==index?'sel':''"
        @click="changenav(item,index)"
        v-for="(item, index) in navbar"
        :key="index"
      >{{item.class_name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {
      navindex: 0
    };
  },
  methods: {
    changenav(item, index) {
      // console.log(index);

      this.navindex = index;
      this.$emit("changenav", item, index);
    }
  },
  props: {
    navbar: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  width: 100%;
  //   box-sizing: border-box;
  //   padding: 40px 0;
  text-align: center;
  .navlist {
    width: 100%;
    text-align: center;
    .navli {
      display: inline-block;
      padding: 20px 10px;
      border: 1px solid rgba(194, 189, 196, 0.8);
      margin: 0 5px;
      text-align: center;
      font-size: 30px;
      color: rgba(102, 102, 102, 1);
    }
    .sel {
      padding: 18px 8px;
      background: rgba(255, 255, 255, 1);
      border: 3px solid rgba(50, 149, 43, 1);
      color: rgba(50, 149, 43, 1);
      font-weight: bold;
    }
  }
}
</style>