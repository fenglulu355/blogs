<template>
  <div>
    <div class="titles" v-if="titles.type==0">
      <p class="title">{{titles.title}}</p>
      <p class="ename">
        <span>{{titles.ename}}</span>
      </p>
    </div>
    <div class="titless" v-if="titles.type==1">
      <p class="title">{{titles.title}}</p>
      <p class="ename">{{titles.ename}}</p>
    </div>
    <div class="titlesss" v-if="titles.type==2">
      <p class="title">{{titles.title}}</p>
      <p class="ename">
        <span>{{titles.ename}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "titles",
  props: {
    titles: {
      type: Object
    }
  }
};
</script>
<style lang="less" scoped>
.titles {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0 40px 0;
  text-align: center;
  .title {
    color: #5aa4ae;
    font-size: 28px;
    font-weight: bold;
  }
  .ename {
    span {
      font-size: 14px;
      box-sizing: border-box;
      padding: 10px 0;
      border-bottom: 1px solid #f5d02c;
    }
  }
}
.titless {
  border-left: 1px solid #f5d02c;
  box-sizing: border-box;
  padding-left: 8px;
  margin: 20px 0;
  .title {
    font-size: 28px;
    font-weight: bold;
  }
  .ename {
    color: #636363;
    font-size: 14px;
    box-sizing: border-box;
    padding: 10px 0;
  }
}
.titlesss {
  background: black;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0 40px 0;
  text-align: center;
  .title {
    color: white;
    font-size: 28px;
    font-weight: bold;
    box-sizing: border-box;
    padding-bottom: 10px;
  }
  .ename {
    span {
      color: white;
      font-size: 14px;
      box-sizing: border-box;
      padding: 10px 0;
      border-bottom: 1px solid #f5d02c;
    }
  }
}
</style>