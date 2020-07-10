<template>
  <div class="minnav">
    <div class="btitle">
      <span class="bt" v-for="(item, index) in btitle" :key="index + '1'">{{item}}</span>
    </div>
    <div class="ltitle">
      <span
        class="lt"
        @click.stop="curpath(item,index)"
        v-for="(item, index) in ltitle"
        :key="index"
      >
        <span v-if="item.class_name">{{item.class_name}}</span>
        <span v-else>{{item}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
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
    btitle: {
      type: Array,
      default: {}
    },
    ltitle: {
      type: Array,
      default: {}
    },
    navindex: {
      type: Number,
      default: 0
    },
    path: {
      type: String,
      default: ""
    }
  },
  methods: {
    tonav(index, e) {
      this.curindex = index;
      this.$emit("change", index);
    },
    curpath(item, index) {
      sessionStorage.setItem("navindex", this.navindex);
      if (this.path == "/product") {
        this.$router.push({
          path: this.path,
          query: { classid: item.class_id }
        });
      } else {
        this.$router.push({ path: this.path });
      }

      sessionStorage.setItem("mnavindex", index);
      this.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.minnav {
  position: absolute;
  text-align: left;
  z-index: 1;
  .btitle {
    box-sizing: border-box;
    padding-top: 23px;
    span {
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
      font-weight: bold;
      line-height: 30px;
      // background: pink;
      padding: 0 20px 0 0;
    }
  }
  .ltitle {
    // background: brown;
    cursor: pointer;
    width: 100%;
    height: 90px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    span {
      width: 100%;
      color: rgba(51, 51, 51, 1);
      font-size: 12px;
      line-height: 30px;
      // background: pink;
      padding: 0 10px 0 0;
      &:hover {
        color: #2482c8;
      }
    }
  }
}
</style>