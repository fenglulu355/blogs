<template>
  <div class="select selection">
    <div class="inner" v-clickOut="test">
      <div
        class="inputWrapper"
        @click="showOptions = !showOptions"
        :class="showOptions==true?'sel':'unsel'"
      >
        <input
          type="text"
          :class="showOptions==true?'sel':'unsel'"
          readonly
          :placeholder="placeholder"
          :value="selected"
        />
        <span>﹀</span>
        <!-- 此处可以自定义图片 -->
        <!-- <span class="iconfont icon-zhankaishangxia">↓</span> -->
      </div>
      <ul class="options" v-show="showOptions">
        <li
          v-for="(item, index) in options"
          :key="index"
          :class="isbule==index?'iscur':'uncur'"
          @click="choose(item,index)"
        >
          <span v-if="item.class_name">{{item.class_name}}</span>
          <span v-else>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      showOptions: false,
      isbule: 0
    };
  },
  props: {
    options: {
      type: Array
    },
    placeholder: {
      type: String
    }
  },

  methods: {
    choose(name, index) {
      this.isbule = index;
      // console.log(this.isbule);
      this.showOptions = false;
      if (name !== this.selected) {
        name.class_name
          ? (this.selected = name.class_name)
          : (this.selected = name);
        this.$emit("selected", name,index);
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
  background: rgba(245, 245, 245, 1);
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.inner > .options {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 80%;
  z-index: 2;
  color: #333333;
  background: #fff;
  border: 1px solid rgba(153, 153, 153, 1);
  border-radius: 10px;
  overflow: hidden;
}
/* 隐藏滚动条 */
.options::-webkit-scrollbar {
  display: none;
}
.inner > .options > li {
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding-left: 24px;
  cursor: pointer;
}
.inner > .options :last-child {
  border: none;
}
.inner > .options :last-child:hover {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.inner > .options :hover {
  background: rgba(236, 236, 236, 1);
}
.iscur {
  background: rgba(236, 236, 236, 1);
}
.uncur {
  background: white;
}
.inner .inputWrapper {
  width: 100%;
  height: 60px;
  text-align: center;
  display: flex;
}
.inner .inputWrapper span {
  align-self: center;
  cursor: pointer;
  position: relative;
  top: 2px;
}
.inner .inputWrapper > input {
  box-sizing: border-box;
  position: relative;
  padding-right: 10px;
  width: 60%;
  height: 100%;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  text-align: right;
}
.inner .inputWrapper > input::placeholder {
  font-size: 16px;
  text-align: right;
}
.sel {
  background: #2482c8;
  color: white;
}

.sel::placeholder {
  color: white;
}
.unsel {
  background: rgba(245, 245, 245, 1);
  color: #333333;
}
</style>
