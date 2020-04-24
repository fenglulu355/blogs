<template>
  <div class="playing">
    <!-- <div class="banner">
      <img :src="infos.banner" alt />
    </div>-->
    <div class="pages">
      <div class="top-info">
        <p class="title">{{playvideo.videoChapter}}</p>
        <p class="des">{{playvideo.videoIntroduce}}</p>
      </div>
      <div class="playbox">
        <video
          id="videoshow"
          @playing="saveTime"
          @pause="stopVideoTime = true"
          :src="httpUrl+playvideo.videoSite"
          controls
        ></video>
      </div>
      <div class="teacherbox">
        <img src="../assets/play-teacher.png" alt />
        <ul class="infos">
          <li class="title">
            <p
              class="title"
            >{{chapter.courseintroductionType}}：{{chapter.courseintroductionTeacher}}</p>
          </li>
          <li class="des infoli">
            <p class="text">教师简介</p>
            <p class="info">{{teacher.teacherInfo}}</p>
          </li>
          <li class="featuer infoli">
            <p class="text">教师特点</p>
            <p class="info">{{teacher.teacherCharacteristics}}</p>
          </li>
        </ul>
      </div>
      <div class="recom">
        <p class="title">其他章节</p>
        <ul class="recomlist">
          <li
            class="recomli"
            v-for="(item, index) in video"
            :key="index"
            @click="handleplay(item)"
          >{{item.videoChapter}}</li>
        </ul>
      </div>
      <div class="review">
        <p class="title">评论</p>
        <div class="reviewbox">
          <ul class="reviewlist">
            <li class="reviewli" v-for="(item, index) in info" :key="index">
              <img :src="item.head" alt />
              <p class="name">{{item.user}}：</p>
              <p class="cont">{{item.cont}}</p>
              <p class="time">{{item.time}}</p>
            </li>
          </ul>
        </div>
      </div>
      <form action>
        <div class="reply">
          <div class="pic">
            <img src="../assets/play-pl1.png" alt />
          </div>

          <div class="ipt">
            <input type="text" placeholder="发表评论" />
          </div>
          <div class="button">
            <div class="sure btn">
              <button type="button">确认</button>
            </div>
            <div class="reset btn">
              <button type="reset">取消</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import { mapState } from "vuex";
export default {
  name: "playing",

  data() {
    return {
      info: [
        {
          user: "一只小猪",
          head: require("../assets/play-pl1.png"),
          cont: "老师讲得很清楚,，很奈斯",
          time: "2019-05-06"
        },
        {
          user: "四只小猪",
          head: require("../assets/play-pl2.png"),
          cont: "知识点挺清楚的",
          time: "2019-03-06"
        },
        {
          user: "两只小猪",
          head: require("../assets/play-pl3.png"),
          cont: "老师讲得很清楚",
          time: "2018-12-08"
        },
        {
          user: "三只小猪",
          head: require("../assets/play-pl4.png"),
          cont: "老师讲得很清楚",
          time: "2018-07-11"
        },
        {
          user: "五只小猪",
          head: require("../assets/play-pl1.png"),
          cont: "很不错，知识点很清楚，老师也很幽默诙谐",
          time: "2018-05-06"
        },
        {
          user: "六只小猪",
          head: require("../assets/play-pl1.png"),
          cont: "还行",
          time: "2017-05-06"
        }
      ],
      stopVideoTime: false,
      currentTime: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      infos: [],
      playvideo: ""
    };
  },
  computed: {
    ...mapState(["chapter", "video", "httpUrl", "teacher"])
  },
  created() {
    let video = this.video;
    this.loadVideo();
  },
  methods: {
    // 未购买试看
    saveTime() {
      let videoshow = document.getElementById("videoshow");
      this.stopVideoTime = false;
      let timer = setInterval(() => {
        this.currentTime = Math.floor(videoshow.currentTime);
        let stopVideoTime = this.stopVideoTime;
        if (stopVideoTime) {
          clearInterval(timer);
        }
        if (this.buyCode == 230) {
          return;
        } else {
          if (this.currentTime >= 30) {
            videoshow.pause();
            videoshow.currentTime = 30;
            clearInterval(timer);
            alert("购买后学习全部视频");
          }
        }
      }, 1000);
    },

    handleplay(item) {
      this.playvideo = "";
      this.playvideo = item;
    },
    //加载选中视频
    loadVideo() {
      let videoCoding = this.$route.query.videoCoding;
      let reg = new RegExp(videoCoding, "gi");
      let res = this.video.filter(data => reg.test(JSON.stringify(data)));
      this.playvideo = res[0];
    }
  }
};
</script>



 <style lang="less" scoped>
.pages {
  font-family: 微软雅黑;
  padding-bottom: 30px;
}
.top-info {
  padding-top: 50px;
  .title {
    font-size: 30px;
  }
  .des {
    padding: 5px 0 35px;
    font-size: 14px;
    color: gray;
    letter-spacing: 1px;
  }
}
.playbox {
  width: 1200px;
  height: 600px;
  position: relative;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .mask {
    background: linear-gradient(
      rgba(164, 127, 238, 0.8),
      rgba(164, 127, 238, 0)
    );
    position: absolute;
    top: 0;
    right: -180px;
    width: 200px;
    height: 500px;
    transition: all 0.5s linear;
    overflow-y: scroll;
    list-style-type: decimal;
    li {
      width: 100%;
      height: 70px;
      line-height: 70px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 17px;
      text-align: center;
      &:hover {
        font-size: 21px;
      }
    }
    &:hover {
      right: 0;
    }
  }
}
.teacherbox {
  background: #7a52cb;
  height: 240px;
  margin-top: 15px;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 20% 70%;
  padding: 20px;
  color: white;
  .info {
    line-height: 23px;
    width: 70%;
  }
  .infos {
    letter-spacing: 1px;
    .title {
      font-size: 28px;

      font-weight: bold;
      margin: 20px 0;
    }
    .infoli {
      margin-bottom: 15px;
      .text {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
  }
}
.recom {
  padding-top: 20px;
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 30px;
  }
  .recomlist {
    border: 1px solid gray;
    padding: 16px 0 16px 100px;
    border-radius: 12px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-around;
    .recomli {
      cursor: pointer;
      font-size: 23px;
      line-height: 60px;
      list-style: disc;
      list-style-position: inside;

      // transition: all 0.5s linear;
      &:hover {
        font-weight: bold;
        color: #7a52cb;
      }
    }
  }
}
.review {
  width: 100%;
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 30px;
  }
  .reviewbox {
    width: 100%;
    background: #eeeeee;
    box-sizing: border-box;
    padding: 32px 32px;
    .reviewlist {
      .reviewli {
        padding: 10px 0;
        border-bottom: 1px solid #d2d2d2;
        display: grid;
        grid-template-columns: 80px 80px 1fr 120px;
        position: relative;
        .name,
        .cont {
          padding-top: 25px;
        }
        .time {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
      }
    }
    .page {
      text-align: center;
      padding-top: 30px;
    }
  }
}
.reply {
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  background: #a47fee;
  height: 165px;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 120px 1fr 120px;
  padding-top: 40px;
  .pic {
    text-align: center;
  }
  input {
    width: 100%;
    height: 100px;
  }
  .button {
    height: 100px;

    text-align: center;
    button {
      background: #763ee5;
      width: 90px;
      height: 45px;
      color: white;
      font-size: 20px;
    }
    .reset > button {
      margin-top: 10px;
      background: #eeeeee;
      color: #a47fee;
    }
  }
}
</style>