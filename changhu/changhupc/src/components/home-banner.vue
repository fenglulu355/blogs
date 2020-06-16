<template>
  <div class="home-banner">
    <div class="warpper">
      <el-carousel class="h-carousel" >
        <el-carousel-item v-for="(item, index) in slides" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + baseurl+`/public/`+item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </el-carousel-item>
      </el-carousel>
      <div class="guide">
        <ul class="guidelist">
          <li
            class="guideli"
            @click="toProduct(item,index)"
            v-for="(item, index) in guidelist"
            :key="index"
          >
            <div class="icon">
              <img class="showimg" :src="item.src" alt />
              <img class="hoverimg" :src="item.src1" alt />
            </div>
            <div class="name">{{item.name}}</div>
            <div class="desc">{{item.des}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrl from "../utils/url";
export default {
  name: "homebanner",
  data() {
    return {
      baseurl: "",
      guideclass: null,
      guideimg: false,
      inv: 3000,
      nowIndex: 0,
      isShow: true,
      slides: [],
      guidelist: [
        {
          value: "17",
          productClass: "1",
          src: require("../assets/home/homebanner/icon-1-02.png"),
          src1: require("../assets/home/homebanner/icon-1-01.png"),
          name: "湿地水景",
          des: "水生生物与水生植物相互构成的动态平衡系统。"
        },
        {
          value: "29",
          productClass: "4",
          src: require("../assets/home/homebanner/icon-2-01.png"),
          src1: require("../assets/home/homebanner/icon-2-02.png"),
          name: "花境花海",
          des: "是一种植物多样化景观搭配的生态产物"
        },
        {
          value: "27",
          productClass: "3",
          src: require("../assets/home/homebanner/icon-3-01.png"),
          src1: require("../assets/home/homebanner/icon-3-02.png"),
          name: "彩叶观赏草",
          des: "色彩柔和且着色均匀，色彩效果丰富"
        },
        {
          value: "21",
          productClass: "2",
          src: require("../assets/home/homebanner/icon-4-01.png"),
          src1: require("../assets/home/homebanner/icon-4-02.png"),
          name: "水生态修复",
          des: "色彩柔和且着色均匀，色彩效果丰富"
        },
        {
          value: "31",
          productClass: "6",
          src: require("../assets/home/homebanner/icon-5-01.png"),
          src1: require("../assets/home/homebanner/icon-5-02.png"),
          name: "深水浮岛",
          des: "色彩柔和且着色均匀，色彩效果丰富"
        },
        {
          value: "30",
          productClass: "5",
          src: require("../assets/home/homebanner/icon-6-01.png"),
          src1: require("../assets/home/homebanner/icon-6-02.png"),
          name: "市政景观",
          des: "色彩柔和且着色均匀，色彩效果丰富"
        }
      ]
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.requstBanner();
  },
  computed: {
    prevIndex() {
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
    // 跳转至产品页
    toProduct(item, index) {
      // 存储头部列表下标
      sessionStorage.setItem("curindex", 1);
      // 存储产品分类下标
      sessionStorage.setItem("productClass", item.productClass);
      // 带分类id跳转至产品页面
      let id = item.value;
      this.$router.push({
        path: "/product",
        query: { id: id }
      });
      // 回到初始位置
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // 刷新页面
      this.$router.go(0);
    },
    requstBanner() {
      this.$axios.post("/index/api/getBanner").then(res => {
        for (let index = 0; index < res.data.data.length; index++) {
          if (res.data.data[index].banner_type_id == 1) {
            this.slides.push(res.data.data[index]);
          }
        }
        console.log(this.slides, "a");
      });
    },
    goto(index) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
      }, 10);
    },
    runInv() {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
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
// .slide-trans-enter-active {
//   transition: all 0.5s linear;
// }
// .slide-trans-enter {
//   transform: translateX(900px);
// }
// .slide-trans-old-leave-active {
//   transition: all 0.5s ease-in-out;
//   transform: translateX(-900px);
// }
.home-banner {
  width: 100%;
  height: 960px;
  position: relative;
  .warpper {
    width: 100%;
    height: 960px;

    .mainpic {
      width: 100%;
      height: 100%;
    }

    // 引导
    .guide {
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 260px;
      position: absolute;
      bottom: 0;
      z-index: 2;
      .guidelist {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        justify-items: center;
        .guideli {
          display: inline-block;
          text-align: center;
          width: 100%;
          height: 100%;
          // color: #888888;
          color: white;
          box-sizing: border-box;
          .icon {
            padding-top: 45px;
            position: relative;
            .hoverimg {
              display: none;
            }
          }
          .name {
            padding: 30px 0;
            font-size: 18px;
            font-weight: 400;
          }
          .desc {
            //   background: pink;
            width: 130px;
            margin: 0 auto;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 20px;
          }
          &:hover {
            cursor: pointer;
            color: white;
            .showimg {
              display: none;
            }
            .hoverimg {
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>