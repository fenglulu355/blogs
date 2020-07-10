<template>
  <div class="content">
    <div class="conten-item" v-for="(item, index) in infos" :key="index">
      <p class="title">{{item.title}}</p>
      <p class="text">{{item.text}}</p>
      <div class="box">
        <section class="item det" v-for="(items, index) in item.pic" :key="index">
          <img class="home-pic show" :src="items[0]" alt />
          <img class="home-pic sel" :src="items[1]" alt />
        </section>
        <div class="des">
          <section v-for="(items, icon) in item.icon" :key="icon">
            <img :src="items[0]" alt />
            <div class="text">
              <p>{{items[1]}}</p>
              <p>{{items[2]}}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeclass",
  data() {
    return {
      infos: {
        html: {
          title: "HTML5 课程",
          text: "html5 course",
          pic: [
            [require("../assets/html1.png"), require("../assets/html1.png")],
            [
              require("../assets/home/image1.jpg"),
              require("../assets/home/image01.jpg")
            ],
            [
              require("../assets/home/image2.jpg"),
              require("../assets/home/image02.jpg")
            ]
          ],
          icon: [
            [
              require("../assets/html4.png"),
              "课程介绍",
              "让您更加了解这门课程"
            ],
            [
              require("../assets/html4.png"),
              "开班时间",
              "让您更加了解开班时间，提前规划学习时间"
            ],
            [
              require("../assets/html4.png"),
              "课程大纲",
              "让您更加了解课程内容，方便规划学习"
            ],
            [
              require("../assets/html4.png"),
              "优惠活动",
              "优惠活动，减免学费，学习大礼等您来抢"
            ]
          ]
        },
        java: {
          title: "JAVA + 大数据 课程",
          text: "JAVA course",
          pic: [
            [
              require("../assets/home/image3.jpg"),
              require("../assets/home/image03.jpg")
            ],
            [
              require("../assets/home/image4.jpg"),
              require("../assets/home/image04.jpg")
            ],
            [require("../assets/java3.png"), require("../assets/java3.png")]
          ],
          icon: [
            [
              require("../assets/java4.png"),
              "课程介绍",
              "让您更加了解这门课程"
            ],
            [
              require("../assets/java5.png"),
              "开班时间",
              "让您更加了解开班时间，提前规划学习时间"
            ],
            [
              require("../assets/java6.png"),
              "课程大纲",
              "让您更加了解课程内容，方便规划学习"
            ],
            [
              require("../assets/java7.png"),
              "优惠活动",
              "优惠活动，减免学费，学习大礼等您来抢"
            ]
          ]
        },
        ui: {
          title: "UI 课程",
          text: "UI course",
          pic: [
            [require("../assets/ui1.png"), require("../assets/ui1.png")],
            [
              require("../assets/home/image5.jpg"),
              require("../assets/home/image05.jpg")
            ],
            [
              require("../assets/home/image6.jpg"),
              require("../assets/home/image06.jpg")
            ]
          ],
          icon: [
            [require("../assets/ui4.png"), "课程介绍", "让您更加了解这门课程"],
            [
              require("../assets/ui5.png"),
              "开班时间",
              "让您更加了解开班时间，提前规划学习时间"
            ],
            [
              require("../assets/ui6.png"),
              "课程大纲",
              "让您更加了解课程内容，方便规划学习"
            ],
            [
              require("../assets/ui7.png"),
              "优惠活动",
              "优惠活动，减免学费，学习大礼等您来抢"
            ]
          ]
        }
      }
    };
  }
};
</script>

<style lang="less" scoped>
.conten-item {
  width: 100%;
  padding-top: 90px;
  font-family: 微软雅黑;
  .title {
    text-align: center;
    color: #000000;
    font-size: 30px;
    &::after {
      content: "";
      display: block;
      margin: 10px auto;
      width: 18px;
      height: 3px;
      background: #626262;
    }
  }
  .text {
    text-align: center;
    font-size: 20px;
    margin: 10px auto;
    color: #898989;
  }

  .box {
    margin-top: 10px;
    display: grid;
    grid-template: ~" 200px 284px /repeat(3, 1fr)";
    grid-gap: 15px;
    .item:nth-child(1) {
      grid-row: ~" 1/3";
      .btn {
        display: none;
      }
    }
    .det {
      .show {
        display: block;
      }
      .sel {
        display: none;
      }
      &:hover {
        cursor: pointer;
        .show {
          display: none;
        }
        .sel {
          display: block;
        }
      }
    }

    .des {
      grid-row: ~" 2/3";
      grid-column: ~" 2/4";
      display: grid;
      grid-template: ~" repeat(2, 1fr) /repeat(2, 1fr)";
      align-items: center;
      section {
        padding-left: 25px;
        display: flex;
        .text {
          width: 100%;
          text-align: left;
          margin-left: 12px;
          p:nth-child(1) {
            color: #3d3b3b;
            font-size: 18px;
            margin-bottom: 10px;
          }
          p:nth-child(2) {
            font-size: 14px;
          }
        }
      }
    }
  }
}
.conten-item:nth-child(2) {
  .item:nth-child(1) {
    grid-row: ~" 1/2";
  }
  .item:nth-child(3) {
    grid-row: ~" 1/3";
    .btn {
      // display: none;
    }
  }
  .des {
    grid-column: ~"1/3";
  }
}
</style>