<template>
  <div class="courriculum">
    <div class="pages">
      <div class="playbox">
        <p class="title">
          在线课程 >
          <span>{{chapter.courseintroductionType}}</span>
          > {{chpterNamea.videoSubject}}
        </p>
        <div class="box">
          <div class="box-left">
            <img src="../assets/allbg.png" alt />
            <img src="../assets/allplay.png" alt class="btn" @click="btn" />
          </div>
          <div class="box-right">
            <p
              class="top-title"
            >【{{chapter.courseintroductionTeacher}}老师】 {{chapter.courseintroductionType}}</p>
            <div class="rate">
              <el-rate v-model="value" disabled score-template="{value}"></el-rate>
            </div>
            <ul class="list">
              <li>
                <p>学习人数</p>
                <p>{{chapter.courseintroductionWatchnumber}}</p>
              </li>
              <li>
                <p>课程分类</p>
                <p>{{chapter.courseintroductionType}}</p>
              </li>
              <li>
                <p>课程难度</p>
                <p>{{chapter.courseintroductionBoutique}}</p>
              </li>
              <li>
                <p>总时长</p>
                <p>{{chapter.courseintroductionTotaltime}}分钟</p>
              </li>
            </ul>

            <div class="btn">
              <p class="price">
                <span>￥{{chapter.courseintroductionPrice}}</span>
              </p>
              <div class="handle">
                <p v-if="code == 230" @click="addShoppingCart">立即购买</p>
                <p v-else @click="play">立即观看</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="des">
        <div class="course item">
          <h2>教程简介</h2>
          <p>【概念简述】{{chapter.courseintroductionSummarize}}}</p>
          <p>【应用场景】{{chapter.courseintroductionSignificance}}</p>
          <p>【其他】{{chapter.courseintroductionApplication}}</p>
        </div>
        <div class="teacher item">
          <h2>讲师信息</h2>
          <div class="pic">
            <!-- <img :src="infos.teacher.head" alt /> -->
            <img src="../assets/all-teacher.png" alt />
          </div>
          <p class="name">{{teacher.teacherName}}老师</p>
          <div class="intru">
            <p class="tit">讲师简介</p>
            <p>{{teacher.teacherCharacteristics}}</p>
          </div>
        </div>
      </div>
      <div class="chapter">
        <p class="title">教程目录</p>
        <ol class="list">
          <li v-for="(item, index) in infos" :key="index" @click="goplay(item,index)">
            <router-link to>{{item.videoChapter}}</router-link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from "util";
import { mapMutations, mapState } from "vuex";
export default {
  name: "courriculum",
  data() {
    return {
      value: 4,
      code: "",
      infos: [],
      chpterNamea: [],
      grade: 2
    };
  },
  mounted() {
    this.grade = this.chapter.courseintroductionGrade;
  },
  computed: {
    ...mapState(["chapter", "loginUser", "shoppingCart", "teacher", "video"])
  },
  created() {
    this.requst();
  },
  methods: {
    ...mapMutations(["SET_VIDEO", "SET_SHOPPING_CART", "SET_TEACHER_INFOS"]),
    addShoppingCart() {
      this.shoppingCart.push(this.chapter.courseintroductionDistinction);
      alert("加入购物车成功");
    },
    requst() {
      let coding = this.$route.query.coding;
      let loginUser = this.loginUser[0];
      let para = {
        statusode: loginUser,
        content: coding,
        parameter: ""
      };

      this.$axios.post("/getASuit", para).then(res => {
        this.infos = res.data.data;
        this.code = res.data.code;
        this.chpterNamea = this.infos[0];
        let a = this.chapter.teacherTables;
        this.SET_TEACHER_INFOS(a);
        this.SET_VIDEO(this.infos);
        // console.log(this.teacher, "22");
      });
    },
    btn() {
      this.play();
    },
    play() {
      let code = this.video[0].videoCoding;
      this.$router.push(`/playing?videoCoding=${code}`);
    },
    goplay(item, index) {
      let videoCoding = item.videoCoding;
      this.$router.push(`/playing?videoCoding=${videoCoding}`);
    }
  }
};
</script>
<style lang="less" scoped>
.playbox {
  padding-top: 35px;
  .title {
    font-size: 22px;
    color: rgb(5, 5, 5);
    letter-spacing: 1px;
    span {
      color: rgb(112, 200, 246);
    }
  }
  .box {
    margin-top: 35px;
    height: 370px;
    width: 100%;
    display: flex;
    .box-left {
      position: relative;
      width: 600px;
      .btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
    }
    .box-right {
      box-sizing: border-box;
      border: 1px solid lightgrey;
      width: 600px;
      padding: 20px 60px 0 70px;
      color: rgb(88, 85, 85);
      .top-title {
        font-size: 30px;
      }
      .rate {
        padding: 30px 0;
      }
      .list {
        display: flex;
        justify-content: space-between;
        li {
          display: inline-block;
          width: 100px;
          height: 50px;
          font-size: 18px;
          p {
            padding-bottom: 20px;
          }
        }
      }
      .btn {
        margin-top: 80px;
        display: grid;
        grid-template-columns: 50% 50%;
        .price {
          font-size: 30px;
          span {
            color: red;
          }
        }
        .handle {
          margin-left: 70px;
          text-align: center;
          border-radius: 20px;
          line-height: 40px;
          width: 140px;
          line-height: 60px;
          height: 60px;
          background: red;
          color: white;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
}
.des {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 900px 285px;
  justify-content: space-between;
  .item {
    background: rgb(245, 247, 245);
    border-radius: 12px;
    padding: 20px;
    color: rgb(88, 85, 85);
    letter-spacing: 1px;
  }
  .course {
    display: grid;
    grid-template-rows: 10% 30% 30% 30%;
    letter-spacing: 2px;
    p {
      line-height: 30px;
    }
  }
  .teacher {
    text-align: center;
    .name,
    .tit {
      font-weight: bold;
      font-size: 18px;
      margin-top: 5px;
    }
    .intru,
    h2 {
      text-align: left;
      margin: 5px 0;
    }
  }
}
.chapter {
  padding-bottom: 80px;
  .title {
    font-size: 30px;
    padding: 15px 0 20px 0;
  }
  .list {
    border-top: 1px solid rgb(210, 210, 210);
    border-bottom: 1px solid rgb(210, 210, 210);
    li {
      list-style: inside;
      list-style-type: decimal;
      padding: 15px;
      font-size: 25px;
      color: rgb(88, 85, 85);
      line-height: 40px;
      border-bottom: 1px solid rgb(210, 210, 210);
      a {
        color: rgb(88, 85, 85);
        &:hover {
          color: blue;
        }
      }
    }
  }
}
</style>
