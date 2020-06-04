<template>
  <div class="morecur">
    <ul class="list">
      <li v-for="(item, i) in mcurs" :key="i">
        第{{i}}行：
        <div>
          <p
            v-for="(items, j) in item"
            :key="j"
            :class="{'cur':arr[i].indexOf(items) != -1}"
            @click="cur(i,j,items)"
          >{{items}}</p>
        </div>
      </li>
    </ul>
    <h4>选中：{{curinfo}}</h4>
  </div>
</template>
<script>
export default {
  name: "morecur",
  data() {
    return {
      arr: [],
      iscur: false,
      curinfo: ""
    };
  },
  props: {
    mcurs: {
      type: Array,
      default: {}
    }
  },
  watch: {
    mcurs: {
      handler(newVal) {
        console.log(newVal, "p");
        for (let i = 0, length = newVal.length; i < length; i++) {
          this.arr[i] = [];
        }
        console.log(this.arr);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    cur(i, j, items) {
      if (this.arr[i].indexOf(items) == -1) {
        this.arr[i].push(items);
      } else {
        this.arr[i].splice(this.arr[i].indexOf(items), 1);
      }
      this.curinfo = this.encodeArray2D(this.arr);

      this.$forceUpdate();
    },
    encodeArray2D(obj) {
      var array = [];
      for (var i = 0; i < obj.length; i++) {
        array[i] = obj[i].join("|");
      }
      return array.join(",");
    }
  }
};
</script>
<style lang="" scoped>
div {
  box-sizing: border-box;
  padding: 10px 0;
}
p {
  display: inline-block;
  margin-left: 10px;
  border: 1px solid darkcyan;
  color: darkcyan;
  width: 60px;
  text-align: center;
  line-height: 40px;
}
.cur {
  background: darkcyan;
  color: white;
}
</style>