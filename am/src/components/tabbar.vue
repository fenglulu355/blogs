<template>
  <div class="tabbar">
    <div
      class="icon"
      :style="{backgroundImage: 'url(' + require('../assets/tabbar/icon.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
    ></div>
    <!-- <div
      class="eng"
      :style="{backgroundImage: 'url(' + tabbar.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
    ></div>-->
    <img   class="eng" :src="tabbar.img" alt />
    <p class="title">
      <span class="normal">{{tabbar.normal}}</span>
      <span class="green">{{tabbar.green}}</span>
    </p>
    <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIOUE LANDSCAPE</p>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    tabbar: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped>
.tabbar {
  width: 100%;
  box-sizing: border-box;
  padding: 40px 0;
  text-align: center;
  .icon {
    width: 69px;
    height: 69px;
    margin: 0 auto;
  }
  .eng {
    width: auto;
    height: 40px;
    margin: 10px auto;
  }
  .title {
    color: rgba(51, 51, 51, 1);
    font-size: 40px;
  }
  .normal {
    position: relative;
    &::before {
      content: "";
      width: 53px;
      height: 1px;
      background: rgba(153, 153, 153, 1);
      position: absolute;
      top: 50%;
      left: -70px;
    }
  }

  .green {
    color: rgba(50, 149, 43, 1);
    position: relative;
    &::after {
      content: "";
      width: 53px;
      height: 1px;
      background: rgba(153, 153, 153, 1);
      position: absolute;
      top: 50%;
      right: -70px;
    }
  }
  .text {
    box-sizing: border-box;
    padding-top: 30px;
    color: rgba(153, 153, 153, 1);
    font-size: 16px;
  }
}
</style>