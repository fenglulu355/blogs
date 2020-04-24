<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].src">
        <transition-group name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src" :key="nowIndex" />
        </transition-group>
        <transition-group name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src" :key="nowIndex" />
        </transition-group>
      </a>
    </div>
    <div class="pre-btn btn" @click="goto(preIndex)">←</div>
    <div class="next-btn btn" @click="goto(nextIndex)">→</div>
    <ul class="slide-page">
      <li
        v-for="(item, index) in slides"
        :key="index"
        :class="{on: index === nowIndex}"
        @click="goto(index)"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    // slides: {
    //   type: Array,
    //   default: function() {
    //     return [];
    //   }
    // }
  },
  data() {
    return {
      slides: [
        { src: require("../assets/about/bg.png"), title: "01" },
        { src: require("../assets/navagation/bg.png"), title: "01" },
        { src: require("../assets/home/case3.jpg"), title: "01" },
        { src: require("../assets/navagation/bg.png"), title: "01" }
      ],
      isShow: true,
      nowIndex: 0
    };
  },
  computed: {
    preIndex() {
      if (this.nowIndex === 0) {
        return this.slides.length - 1;
      } else {
        return this.nowIndex - 1;
      }
    },
    nextIndex() {
      if (this.nowIndex === this.slides.length - 1) {
        return 0;
      } else {
        return this.nowIndex + 1;
      }
    }
  },
  methods: {
    goto(index) {
      if (index !== this.nowIndex) {
        this.isShow = false;
        setTimeout(() => {
          this.isShow = true;
          this.nowIndex = index;
        }, 10);
      }
    },
    runInv() {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, 2000);
    },
    clearInv() {
      clearInterval(this.invId);
    }
  },
  mounted() {
    this.runInv();
  }
};
</script>

<style lang="less" scoped>
.slide-show {
  position: relative;
  width: calc(100% - 50px);
  margin: 0 auto;
  box-sizing: border-box;
  height: 400px;
  overflow: hidden;
  > .slide-img {
    width: 100%;
    height: 100%;
    > a {
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
  > .btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 50%;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
  > .pre-btn {
    left: 16px;
  }
  > .next-btn {
    right: 16px;
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