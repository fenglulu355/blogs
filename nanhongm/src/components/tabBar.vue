<template>
  <div class="tabBar">
    <div class="shoptitle">
      <p class="title">
        <span>{{tabinfo.a}}</span>
        {{tabinfo.b}}
      </p>
    </div>
    <ul class="shopnavlist">
      <li
        class="shopnavli"
        v-for="(item, index) in tabnav"
        :key="index"
        @click="tonav(index,$event)"
        :class="curi ==index?'shopsel':''"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {
      // curindex: 0
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
    },
    curi: {
      type: Number,
      default: null
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
    position: relative;
    &::after {
      content: "";
      width: 30px;
      height: 2px;
      background: rgba(36, 130, 200, 1);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 70px;
    }
  }
  .stitle {
    box-sizing: border-box;
    padding-top: 14px;
    font-size: 12px;
    font-weight: 300;
    color: rgba(158, 158, 158, 1);
  }
}
.shopnavlist {
  text-align: center;
  width: 100%;
  .shopnavli {
    cursor: pointer;
    display: inline-block;
    width: 219px;
    height: 60px;
    border-radius: 10px;
    font-size: 30px;
    line-height: 60px;
    text-align: center;
    border: 1px solid #898989;
    color: rgba(51, 51, 51, 1);
    border-radius: 10px;
    margin: 10px 1%;
    background: rgba(36, 130, 200, 0);
  }
  .shopsel {
    // transition: all 0.2s linear;
    border: 1px solid rgba(36, 130, 200, 1);
    background: rgba(36, 130, 200, 1);
    color: white;
  }
}
</style>