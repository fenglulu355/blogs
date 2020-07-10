<template>
  <div class="morecur">
    <mcur :mcurs="list"></mcur>
  </div>
</template>
<script>
import mcur from "./morecur";
export default {
  name: "morecurs",
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

  methods: {},
  components: { mcur }
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