<template>
  <div class="curinfo">
    <ul class="cilist">
      <li class="cili" v-for="(item, i) in curinfo" :key="i">
        <span>{{item.name}}：</span>

        <el-checkbox-button
          v-for="(items, mindex) in item.info"
          :label="item.info"
          :key="mindex"
          @change="tocurinfo(mindex,item,$event)"
        >{{items}}</el-checkbox-button>
      </li>
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
    curinfo: {
      type: Array,
      default: {}
    },
    curinfoindex: {
      type: Number,
      default: null
    }
  },
  methods: {
    tocurinfo(mindex,item, e) {
    //   this.curinfoindex = mindex;
      this.$emit("change", mindex,item);
    }
  }
};
</script>
<style lang="less" scoped>
.curinfo {
  width: 100%;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 23px 23px;
  .cilist {
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
    .cili {
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      &:last-child{
          border: none;
      }
      .mcili {
        cursor: pointer;
        line-height: 45px;
        box-sizing: border-box;
        margin-right: 20px;
        padding: 5px 20px;
      }
      .curinfosel {
        background: rgba(36, 130, 200, 1);
        color: white;
      }
    }
  }
}
</style>