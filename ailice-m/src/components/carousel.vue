<template>
  <div class="content" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-show">
      <div class="slide-img">
        <div class="pic">
          <transition-group name="slide-trans">
            <img v-if="isShow" :src=" baseurl + `/public/` +slides[nowIndex]" :key="nowIndex" />
          </transition-group>
          <transition-group name="slide-trans-old">
            <img v-if="!isShow" :src=" baseurl + `/public/` +slides[nowIndex]" :key="nowIndex" />
          </transition-group>
        </div>
      </div>
    </div>
    <div class="pre-btn btn" @click="goto(preIndex)">
      <div
        class="mainpic"
        :style="{backgroundImage: 'url(' + require('../assets/left.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
    </div>
    <div class="next-btn btn" @click="goto(nextIndex)">
      <div
        class="mainpic"
        :style="{backgroundImage: 'url(' + require('../assets/right.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
    </div>
    <!-- <ul class="slide-page">
      <li
        v-for="(item, index) in slides"
        :key="index"
        :class="{on: index === nowIndex}"
        @click="goto(index)"
      ></li>
    </ul>-->
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
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
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
      //   console.log("runInv");

      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, 2000);
    },
    clearInv() {
      //   console.log("clearInv");
      clearInterval(this.invId);
    }
  },
  mounted() {
    this.runInv();
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
    width: 70%;
    margin: 0 auto;
    box-sizing: border-box;
    height: 346px;
    overflow: hidden;
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