<template>
  <div class="content">
    <div class="slide-show">
     
      <van-swipe :autoplay="3000" indicator-color="#fff">
        <van-swipe-item v-for="(image, index) in slides" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + baseurl + `/public/`+image+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import httpUrl from "../api/url";
export default {
  name: "Carousel",
  data() {
    return {
      baseurl: ""
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
  },
  props: {
    slides: {
      type: Object
    }
  },
  data() {
    return {
      isShow: true,
      nowIndex: 0
    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 346px;
  position: relative;
  .slide-show {
    position: relative;
    width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
    height: 346px;
    overflow: hidden;
    .mainpic {
      width: 100%;
      height: 346px;
    }
    .slide-img {
      width: 70%;
      height: 100%;

      .pic {
        width: 100%;
        height: 100%;
        .slide-trans-enter-active {
          transition: all 0.5s ease;
          transform: translateX(0);
        }
        .slide-trans-old-leave-active {
          transition: all 0.5s ease;
          transform: translateX(-100%);
        }
        .slide-trans-enter {
          transform: translateX(100%);
        }
        .slide-trans-old-leave {
          transform: translateX(0);
        }
        img {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  > .btn {
    background: RGBA(248, 246, 249, 1);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 68px;
    height: 346px;
    line-height: 32px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border: 1px solid #fff;
    .mainpic {
      width: 26px;
      height: 45px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      opacity: 1;
    }
  }
  > .pre-btn {
    left: 0px;
    .mainpic {
      left: 25%;
    }
  }
  > .next-btn {
    right: 0px;
    .mainpic {
      right: 25%;
    }
  }
  > .slide-page {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    height: 8px;
    display: flex;
    opacity: 0.5;
    &:hover {
      opacity: 1;
      height: 12px;
    }
    > li {
      width: 32px;
      height: 100%;
      margin: 0 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      &.on {
        background-color: #ccc;
      }
    }
  }
}
</style>