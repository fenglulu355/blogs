<template>
  <div class="setting">
    <div class="banner">
      <img src="../assets/setting-banner.png" alt />
    </div>
    <div class="cont pages">
      <div class="infos">
        <div class="left">
          <div class="myhead">
            <img src="../assets/mine/image_15.png" alt />
            <p class="name">幽默的程序员</p>
          </div>
          <ul class="left-list">
            <li
              v-for="(item, index) in nav"
              :key="index"
              :class="{active:num==index}"
              @click="getNum({item,index})"
            >
              <img class="icon" :src="item.iconsbefor" alt />
              {{item.title}}
            </li>
          </ul>
        </div>
        <div class="right">
          <component :is="curpage"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import mycourse from "../components/mycourse.vue";
import wishlist from "../components/wishlist.vue";
import mine from "../components/setting-mine.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "setting",
  data() {
    return {
      curpage: mycourse,
      condition: false,
      num: 0,
      userinfo: [],
      nav: [
        {
          title: "我的课程",
          iconsbefor: require("../assets/mine/image_05.png"),
          iconsafter: require("../assets/mine/image_06.png"),
          page: "mycourse"
        },
        {
          title: "心愿单",
          iconsbefor: require("../assets/mine/image_07.png"),
          page: "wishlist"
        },
        {
          title: "个人中心",
          iconsbefor: require("../assets/mine/image_08.png"),
          page: "mine"
        },
        {
          title: "我的消息",
          iconsbefor: require("../assets/mine/image_10.png"),
          page: "mine"
        },
        {
          title: "我的直播",
          iconsbefor: require("../assets/mine/image_12.png"),
          page: "mine"
        }
      ]
    };
  },
  components: { mycourse, wishlist, mine },
  computed: {
    ...mapState(["loginUser", "info"])
  },
  created() {
    this.requst();
  },
  methods: {
    ...mapMutations(["SET_USER_INFOS"]),
    getNum({ item, index }) {
      this.num = index;
      this.curpage = item.page;
      if (this.num == 3 || this.num == 4) {
        alert("此页面正在开发中。。。。。。");
      }
    },
    requst() {
      let loginUser = this.loginUser[0];
      this.$axios
        .post("/accessToPersonalInformation", {
          verification: loginUser,
          courseintroductionType: ""
        })
        .then(res => {
          this.userinfo = res.data.data;
          this.SET_USER_INFOS(this.userinfo);
        });
    }
  }
};
</script>

<style lang="less" >
.setting {
  background: #f8f7f7;
  width: 100%;
  min-width: 1200px;
  .banner {
    width: 100%;
  }
}
.infos {
  box-sizing: border-box;
  position: relative;
  width: 1200px;
  .left {
    box-shadow: 0px 1px 5px #888888;
    width: 300px;
    height: 880px;
    text-align: center;
    padding-top: 40px;
    .myhead {
      .name {
        padding-top: 15px;
        font-size: 25px;
        color: #4700b8;
      }
    }
    .left-list {
      padding-top: 30px;
      li {
        height: 120px;
        line-height: 90px;
        font-size: 22px;
        color: #2e2e2e;

        .icon {
          opacity: 0;
        }
        &:hover {
          color: #4700b8;
        }
      }
      .active {
        color: #4700b8;
        .icon {
          opacity: 1;
        }
        &::after {
          display: block;
          margin: 0 auto;
          content: "";
          width: 180px;
          height: 1px;
          background: #4700b8;
        }
      }
    }
  }
  .right {
    width: 900px;
    position: absolute;
    top: 0px;
    left: 305px;
  }
}
</style>