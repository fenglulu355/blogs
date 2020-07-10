<template>
  <div class="select selection">
    <div class="inner" v-clickOut="test">
      <div class="inputWrapper" @click="showOptions = !showOptions">
        <input type="text" readonly placeholder="请选择车辆类型" :value="selected" />
        <!-- 此处可以自定义图片 -->
        <!-- <span class="iconfont icon-zhankaishangxia">↓</span> -->
      </div>
      <ul class="options" v-show="showOptions">
        <li v-for="(item, index) in options" :key="index" @click="choose(item)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      showOptions: false
    };
  },
  props: {
    options: {
      type: Object
    }
  },
  methods: {
    choose(name) {
      this.showOptions = false;
      if (name !== this.selected) {
        this.selected = name;
        this.$emit("selected", name);
      }
    },
    outsideDirec() {
      this.showOptions = false;
    },
    test() {
      this.showOptions = false;
    }
    // example2() {
    //   return "xxx";
    // }
  },
  directives: {
    clickOut: {
      bind: function(el, binding) {
        function handler(e) {
          if (el.contains(e.target)) return false;
          if (binding.expression) {
            binding.value();
          }
        }
        el.handler = handler;
        document.addEventListener("click", el.handler);
      },
      unbind: function(el) {
        document.removeEventListener("click", el.handler);
      }
    }
  }
};
</script>


<style  scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.ul,
ol,
li {
  list-style: none;
}
.inner {
  /* background: firebrick; */
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
.inner > .options {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 120%;
  z-index: 2;
  box-sizing: border-box;
  padding: 0px 15px;
  background-color: #fff;
  /* border: 1px solid #ddd; */
  box-shadow: 0 0 4px #ddd;
  border-radius: 3px;
  height: 300px;
  overflow-y: scroll;
}
/* 隐藏滚动条 */
.options::-webkit-scrollbar {
  display: none;
}
.inner > .options > li {
  color: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #ddd;
  height: 60px;
  line-height: 60px;

  text-align: left;
  /* background: brown; */
  cursor: pointer;
}
.inner > .options :last-child {
  border: none;
}
.inner > .options :hover {
  background-color: #eee;
}
.inner .inputWrapper {
  width: 100%;
  height: 100%;
}
.inner .inputWrapper > input {
  /* background: brown; */
  position: relative;
  top: 15px;
  width: 85%;
  height: 100%;
  padding: 0 30px;
  border: none;
  cursor: pointer;

  outline: none;
}
</style>
