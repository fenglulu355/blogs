<template>
  <div class="curinfo">
    <ul class="cilist">
      <!--  -->
      <li class="cili" v-for="(item, i) in curinfo" :key="i">
        <span>{{item.class_name}}：</span>
        <!-- <el-checkbox-group v-model="curinfo"> -->
          <el-checkbox-button
            v-for="(items, mindex) in item.child"
            :key="mindex"
            @change="tocurinfo(mindex,i,items,item,$event)"
          >{{items}}</el-checkbox-button>
        <!-- </el-checkbox-group> -->
      </li>
      <!-- -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {
      truelabel: [],
      arr: []
      // curindex: 0
    };
  },
  created() {
    // console.log(this.curinfo);
  },
  props: {
    curinfo: {
      type: Array,
      default: {}
    }
  },
  mounted() {
    // console.log(this.curinfo);
  },
  methods: {
    tocurinfo(mindex, index, items, item, e) {
      this.$emit("change", mindex, index, item, items, e);
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
  padding: 35px 23px;
  .cilist {
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
    .cili {
      border-bottom: 1px solid rgba(204, 204, 204, 1);
      &:last-child {
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