<template>
  <div class="morecur">
    <ul class="list">
      <li v-for="(item, i) in list" :key="i">
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
  </div>
</template>
<script>
export default {
  name: "morecur",
  data() {
    return {
      list: [
        [1, 2, 3],
        [4, 5, 6, 7, 8],
        [9, 10, 11, 12]
      ],
      arr: []
    };
  },
  created() {
    for (let i = 0, length = this.list.length; i < length; i++) {
      this.arr[i] = [];
    }
  },
  methods: {
    cur(i, j, items) {
      if (this.arr[i].indexOf(items) == -1) {
        this.arr[i].push(items);
      } else {
        this.arr[i].splice(this.arr[i].indexOf(items), 1);
      }

      this.$forceUpdate();
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