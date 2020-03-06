<template>
  <div class="tabBar">
    <div class="shoptitle">
      <p class="title">
        <span>{{tabinfo.a}}</span>
        {{tabinfo.b}}
      </p>
      <p class="stitle">致力于提供家用空调、中央空调、采暖、新风、全屋净水处理、智能家居等产品服务</p>
    </div>
    <ul class="shopnavlist">
      <li
        class="shopnavli"
        v-for="(item, index) in tabnav"
        :key="index"
        @click="tonav(index,$event)"
        :class="curindex ==index?'shopsel':''"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {
      curindex: 0,
      shopnavli: ["门店展示", "门店导航"]
    };
  },
  created() {
    //   console.log(this.tabBarlist)
  },
  props: {
    tabinfo: {
      type: Object,
      default: {
        a: "123",
        b: "123"
      }
    },
    tabnav: {
      type: Array,
      default: {}
    }
  },
  methods: {
    tonav(index, e) {
        this.curindex = index;
      this.$emit("change", index);
    }
  }
};
</script>
<style lang="less" scoped>
.tabBar {
  width: 100%;
}
.shoptitle {
  text-align: center;
  // background: olive;
  box-sizing: border-box;
  padding-bottom: 61px;
  .title {
    font-size: 41px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    span {
      color: rgba(36, 130, 200, 1);
    }
  }
  .stitle {
    box-sizing: border-box;
    padding-top: 14px;
    font-size: 12px;
    font-weight: 300;
    color: rgba(158, 158, 158, 1);
    position: relative;
    &::after {
      content: "";
      width: 30px;
      height: 2px;
      background: rgba(36, 130, 200, 1);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 50px;
    }
  }
}
.shopnavlist {
  text-align: center;
  .shopnavli {
    cursor: pointer;
    display: inline-block;
    width: 186px;
    height: 45px;
    font-size: 18px;
    line-height: 45px;
    text-align: center;
    border: 1px solid rgba(36, 130, 200, 1);
    color: rgba(51, 51, 51, 1);
    border-radius: 10px;
    margin: 0 24px;
  }
  .shopsel {
    background: rgba(36, 130, 200, 1);
    color: white;
  }
}
</style>