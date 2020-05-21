<template>
  <div class="carousels">
    <!-- <transition-group tag="ul" class="clearfix slide" name="image"> -->
    <div
      v-if="slides[0]"
      class="box"
      :style="{backgroundImage: 'url(' +slides[0].image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
    >
      <li v-for="(image,index) in slides" :key="index" v-show="index===mark">
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' + baseurl + `/public/` + image.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
      </li>
    </div>

    <!-- </transition-group> -->
    <div class="bullet" @mouseenter="stopmove" @mouseleave="play">
      <div
        class="curbox"
        v-for="(item,index) in slides"
        :key="index"
        :class="{'active':index===mark}"
        @mouseenter="change(index)"
      >
        <p class="name">{{item.banner_title}}</p>
        <p class="eng">{{item.banner_href}}</p>
      </div>
    </div>
    <div class="vioce">
      <div class="viocebox clearFix">
        <div class="viocepic fl">
          <img src="../assets/home/voice.png" alt />
          <span>最新公告：</span>
        </div>
        <div class="wrap">
          <!-- // 外框，固定宽度 -->
          <div id="box">
            <!-- // 内部滚动框 -->
            <div id="marquee">{{msg}}</div>
            <!-- //展示的文字 -->
            <div id="copy"></div>
            <!-- // 文字副本，为了实现无缝滚动 -->
          </div>
          <div id="node">{{msg}}</div>
          <!-- //为了获取text实际宽度 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrl from "../api/url";
export default {
  name: "image-slider",
  data() {
    return {
      baseurl: "",
      mark: 0,
      timer: null,
      viocetimer: null,
      msg: "",

      slides: []
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.requst();
    this.play();
  },
  mounted() {
    this.move();
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/getBanner", { type: 1 }).then(res => {
        this.slides = res.data.data.banner;
        this.msg = res.data.data.notice;
          // console.log(res.data.data);
      });
    },
    change(i) {
      setTimeout(() => {
        this.mark = i;
      }, 200);
    },
    autoPlay() {
      this.mark++;
      if (this.mark === 3) {
        this.mark = 0;
        return;
      }
    },
    move() {
      // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
      let width = document.getElementById("node").getBoundingClientRect().width;
      let box = document.getElementById("box");
      let copy = document.getElementById("copy");
      copy.innerText = this.msg; // 文字副本填充
      let distance = 0; // 位移距离
      //设置位移
      setInterval(function() {
        distance = distance - 1;
        // 如果位移超过文字宽度，则回到起点
        if (-distance >= width) {
          distance = 1000;
        }
        box.style.transform = "translateX(" + distance + "px)";
      }, 20);
    },
    //鼠标悬停时停止移动
    stopmove() {
      clearInterval(this.timer);
    },

    play() {
      this.timer = setInterval(this.autoPlay, 3000);
    }
  }
};
</script>

<style lang='less' scoped>
.carousels {
  width: 100%;
  height: 1030px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.slide {
  width: 100%;
  height: 960px;
}
li {
  position: absolute;
  width: 100%;
  height: 960px;
  .mainpic {
    width: 100%;
    height: 960px;
  }
}
.bullet {
  width: 100%;
  position: absolute;
  top: 660px;
  left: 20%;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
}
.curbox {
  cursor: pointer;

  width: 160px;
  height: 78px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  padding: 20px 0 0 15px;
  margin-left: 10px;
  text-align: left;
  line-height: 25px;
  .eng {
    font-family: Arial;
    font-size: 12px;
  }
}

.active {
  transition: color 0.2s linear;
  width: 160px;
  height: 80px;
  background: rgba(255, 255, 255, 0.8);
  border: 3px solid rgba(50, 149, 43, 1);
  color: rgba(50, 149, 43, 1);
  .name {
    font-weight: bold;
  }
  .eng {
    color: rgba(153, 153, 153, 1);
  }
}

.image-enter-active {
  transform: translateX(0);
  transition: all 1s ease;
}

.image-leave-active {
  transform: translateX(-100%);
  transition: all 1s ease;
}
.vioce {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  line-height: 70px;
  background: RGBA(251, 248, 251, 1);
  .viocebox {
    width: 1200px;
    margin: 0 auto;
    .wrap {
      overflow: hidden;
    }
    // 移动框宽度设置
    #box {
      width: 80000%;
    }
    // 文字一行显示
    #box div {
      float: left;
    }
    // 设置前后间隔
    #marquee {
      margin: 0 16px 0 0;
    }
    // 获取宽度的节点，隐藏掉
    #node {
      position: absolute;
      z-index: -999;
      top: -999999px;
    }
  }
}
.image-enter {
  transform: translateX(100%);
}

.image-leave {
  transform: translateX(0);
}
</style>