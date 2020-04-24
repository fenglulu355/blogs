<template>
  <div class="carousels">
    <div
      v-if="slides"
      class="top"
      :style="{backgroundImage: 'url(' +  baseurl + `/public/` + slides.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
    >
      <div class="warpper">
        <div class="slide">
          <img src="../assets/home/lbtext.png" alt />
        </div>
        <h1>
          花园私人定制
          <span>尊享舒适生活</span>
        </h1>

        <p class="text">PRIVATE CUSTOM GARDEN ENJOY COMFORTABLE LIFE</p>
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
      slides: "",
      mark: 0,
      timer: null,
      viocetimer: null,
      msg: ""
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.requst();
  },
  mounted() {
    this.move();
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/getBanner", { type: 3 }).then(res => {
        this.slides = res.data.data.banner[0];
        this.msg = res.data.data.notice;
        // console.log(res.data.data);
      });
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
    }
  }
};
</script>

<style lang='less' scoped>
.carousels {
  width: 100%;
  height: 620px;
  position: relative;
  .top {
    height: 550px;
    .warpper {
      position: absolute;
      top: 250px;
      left: 20%;
      z-index: 10;
      color: white;
      .slide {
        position: relative;
        top: 0px;
        left: -30px;
      }
      h1 {
        font-size: 40px;
        span {
          font-weight: 400;
        }
      }
      .text {
        padding-top: 24px;
      }
    }
  }
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
</style>