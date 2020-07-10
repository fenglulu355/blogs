<template>
  <div class="curinfo">
    <ul class="cilist">
      <li
        class="cili"
        @click="changenav(index,item)"
        v-for="(item, index) in curlist"
        :key="index"
        :class="curindex==index?'sel':''"
      >
        <span>{{item.class_name}}</span>
      </li>
      <li class="more" @click="getmore">
        <span>|</span>
        <p :class="{'sel':issel===true}">更多筛选></p>
      </li>
    </ul>

    <div class="moremenu clearFix" v-show="ismenu">
      <div class="menubox clearFix">
        <van-collapse v-model="activeNames" class="fr moremenulist">
          <van-collapse-item
            :title="item.class_name"
            :name="index"
            v-for="(item, index) in this.morecur"
            :key="index"
          >
            <div
              class="mli"
              v-for="(items, indexs) in item.child"
              @click="curitem(index,indexs,items)"
              :key="indexs"
            >
              <p
                v-if="items.class_name"
                :class="{'cur':curitemindex[index]===indexs}"
              >{{items.class_name}}</p>
              <p v-else :class="{'cur':arr[index].indexOf(items) != -1}">{{items}}</p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div class="btnbox fr">
        <p class="cz" @click="reset" :class="{'blue':isbule===true}">重置</p>
        <p class="qr" @click="set" :class="{'blue':isbule===false}">确定</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {
      ismenu: false,
      isbule: false,
      activeNames: [],
      curindex: 0,
      curitemindex: [0],
      showlist: [],
      issel: false,
      morefl: [],
      iscur: false,
      arr: [],
      arrb: [],
      classid: "",
      keyword: "",
      copycurinfo: []
    };
  },
  mounted() {},
  watch: {
    morecur(val) {
      console.log(val);

      if (val.length != 0) {
        console.log(val, "morecur存在");
        for (let index = 0; index < val.length; index++) {
          // this.curitemindex[index] = 0;
          this.activeNames[index] = index;
          this.arr[index] = [];
          this.arrb[index] = [];
        }
      }
    }
  },
  props: {
    morecur: {
      type: Array,
      default: {}
    },
    curinfo: {
      type: Array,
      default: {}
    },
    curlist: {
      type: Array,
      default: {}
    },
    curinfoindex: {
      type: Number,
      default: null
    }
  },
  methods: {
    curitem(index, indexs, items) {
      if (index == 0) {
        this.curitemindex[index] = indexs;
        this.classid = items.class_id;
        this.$emit("change", index, items);
      } else {
        if (this.arr[index].indexOf(items) == -1) {
          this.arr[index].push(items);
        } else {
          this.arr[index].splice(this.arr[index].indexOf(items), 1);
        }
        let b = this.encodeArray2D(this.arr);
        this.keyword = b;
      }
      this.$forceUpdate();

      // console.log(this.keyword, "bbbbbbb");
      // console.log(this.curitemindex[index], "this.curitemindex[index]");
      // console.log(this.arr, "aaarrrrrr");
    },
    encodeArray2D(obj) {
      var array = [];
      for (var i = 0; i < obj.length; i++) {
        array[i] = obj[i].join("|");
      }
      return array.join(",");
    },
    changenav(index, item) {
      this.curindex = index;
      this.issel = false;
      // console.log(item, "this.curindex");
      this.$emit("change", this.curindex, item);
    },
    getmore() {
      this.curindex = 3;
      this.issel = true;
      setTimeout(() => {
        this.ismenu = true;
      }, 500);
    },
    reset() {
      this.isbule = true;
      this.curitemindex = [0];
      this.arr = JSON.parse(JSON.stringify(this.arrb));
      this.$forceUpdate();
      console.log(this.arr);
    },
    set() {
      this.isbule = false;
      if (this.classid == "") {
        this.classid = this.curinfo[0].class_id;
      }
      this.$emit("set", this.keyword, this.classid);
      setTimeout(() => {
        this.ismenu = false;
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.curinfo {
  width: 100%;
  // box-sizing: border-box;
  // padding: 0 25px;
  // position: relative;
  .cilist {
    width: 100%;
    height: 65px;
    background: rgba(245, 245, 245, 1);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    li {
      width: 25%;
      color: #5b5b5b;
      font-size: 30px;
      line-height: 65px;
      text-align: center;
    }
    .sel {
      color: #2482c8;
    }
    .more {
      height: 65px;
      display: flex;
      span {
        font-weight: lighter;
        position: relative;
        font-size: 40px;
        color: #dddddd;
        right: 5px;
      }
    }
  }
  .moremenu {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1111;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    .menubox {
      width: 100%;
      height: 90%;
      overflow-y: scroll;
      .moremenulist {
        width: 80%;
        height: 100%;
        background: white;

        .mli {
          display: inline-block;
          width: 30%;
          height: 80px;
          margin: 0 2% 2% 0;
          p {
            width: 100%;
            height: 80px;
            text-align: center;
            line-height: 80px;
            color: #333333;
            font-size: 24px;
            background: #f5f4f5;
          }
          .cur {
            // border: 1px solid #2482c8;
            background: #2482c8;
            color: white;
          }
        }
      }
    }
    .btnbox {
      width: 80%;
      height: 10%;
      background: white;
      text-align: right;
      font-size: 0;
      box-sizing: border-box;
      padding: 20px 50px 0 0;
      p {
        display: inline-block;
        width: 176px;
        height: 63px;
        font-size: 30px;
        text-align: center;
        line-height: 63px;
        color: white;
        background: rgba(153, 153, 153, 1);
      }
      .cz {
        border-radius: 10px 0px 0px 10px;
      }
      .qr {
        border-radius: 0px 10px 10px 0px;
      }
      .blue {
        background: #2482c8;
      }
    }
  }
}
</style>