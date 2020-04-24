<template>
  <div class="quality">
    <div class="course">
      <p class="title">精品推荐课程</p>
      <p class="text">Quality Course</p>
      <ul class="courselist">
        <li class="courseli" v-for="(item, index) in quality" :key="index">
          <img :src="item.img" />
          <div class="infosbox">
            <div class="infos">
              <p class="name">{{item.title}}</p>
              <p class="people">已有{{item.num}}人学习</p>
            </div>
            <router-link to>
              <button class="btn">立即学习</button>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "quality",
  data() {
    return {
      quality: [
        {
          img: require("../assets/quality1.png"),
          title: "JAVA程序设计",
          num: "451"
        },
        {
          img: require("../assets/quality2.png"),
          title: "JAVA入门必备",
          num: "350"
        },
        { img: require("../assets/quality3.png"), title: "UI设计", num: "401" },
        {
          img: require("../assets/quality4.png"),
          title: "UI网页设计基础",
          num: "300"
        },
        {
          img: require("../assets/quality5.png"),
          title: "WEB网站开发",
          num: "800"
        },
        {
          img: require("../assets/quality6.png"),
          title: "WEB网页设计与开发",
          num: "778"
        }
      ]
    };
  },
  computed: {
    ...mapState(["loginUser"])
  },
  created() {
    let loginUser = this.loginUser;
    this.$axios
      .post("/loginData", {
        verification: this.statuscode,
        courseintroductionType: "精品"
      })
      .then(res => {});
  }
};
</script>

<style lang="less" scoped>
.infosbox {
  .infos {
    width: 100%;
    height: 62px;
    position: absolute;
    bottom: 0;
    text-align: left;
    box-sizing: border-box;
    padding: 10px 20px 0;
    .name {
      width: 100%;
      color: #262626;
      font-size: 16px;
    }
    .people {
      padding-top: 5px;
      font-size: 12px;
      color: #a0a0a0;
    }
  }
  .btn {
    width: 80px;
    height: 25px;
    background: white;
    border: 1px solid #545454;
    border-radius: 12px;
    position: absolute;
    right: 20px;
    bottom: 13px;
    &:hover {
      color: #f7f7f7;
      background: #545454;
    }
  }
}
.course {
  width: 100%;
  text-align: center;
  font-family: 微软雅黑;
  .title {
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
    font-size: 20px;
    margin: 10px auto;
    color: #898989;
  }
  .courselist {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .courseli {
      width: 389px;
      height: 251px;
      margin-bottom: 58px;
      border-radius: 20px;
      transition: all 0.2s linear;
      position: relative;
      &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
      }
    }
  }
}
</style>