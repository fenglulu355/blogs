<template>
  <div class="select">
   <!-- <div class="wrapper" @click.stop="isShow = !isShow">
      <Icon type="arrow-down-b" class="icon"></Icon>
      <input type="text" readonly :value="inputVal" placeholder="请选择菜单">
      <ul class="options" v-show="isShow" v-disappear="foldOptions">
        <li v-for="(item, index) in options" :key="index" @click.stop="select(item.name)">{{item.name}}</li>
      </ul>
    </div>  -->

    <div style="marginTop: 200px; display: flex;">
      <Select @selected="getSelect"></Select>
      <Select @selected="getSelect"></Select>
    </div>
  </div>
</template>

<script>
import Select from './Select'
export default {
  name: 'HelloWorld',
  data () {
    return {
      options: [
        {
          name: '西红柿炒鸡蛋',
          code: '1000'
        },
        {
          name: '回锅肉',
          code: '1001'
        },
        {
          name: '大椒抱鸡蛋',
          code: '1002'
        },
        {
          name: '鱼香肉丝',
          code: '1003'
        }
      ],
      inputVal: '',
      isShow: false
    }
  },
  methods: {
    select(name) {
      this.inputVal = name
      this.isShow = false
    },
    foldOptions() {
      this.isShow = false
    },
    getSelect(val) {
      console.log(val)
    }
  },
  directives: {
    disappear: {
      bind: function(el, binding) {
        function documentHandler(e) {
          if (el.contains(e.target)) return false
          if (binding.expression) {
            binding.value()
          }
        }
        document.addEventListener('click', documentHandler)
        el.clickOutside = documentHandler
      },
      unbind: function(el, binding) {
        document.removeEventListener('click', el.clickOutside)
        delete el.clickOutside
      }
    }
  },
  components: {
    Select
  }
}
</script>

<style scoped>
ul,li{
  list-style: none;
}
.select{
  position: relative;
  padding-left: 100px;
}
.wrapper{
  position: relative;
  width: 200px;
  height: 30px;
  border: 1px solid #dddee1;
  border-radius: 3px;
  cursor: pointer;
}
.icon{
  position: absolute;
  top: 50%; right: 8px;
  transform: translateY(-50%);
}
.wrapper > .options{
  width: 100%;
}
.wrapper > input{
  padding-left: 10px;
  width: 85%;
  height: 100%;
  font-size: 14px;
  border: none;
  cursor: pointer;
}
.wrapper > input:focus{
  outline: none;
}
.options{
  position: absolute;
  left: 0; top: 125%;
  width: 100%;
  padding: 5px 0;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0 0 4px #ddd;
  overflow: auto;
}
.options > li{
  padding: 5px 10px;
  cursor: pointer;
  white-space: nowrap;
}
.options > li:hover{
  background-color: #f3f3f3;
}
</style>
