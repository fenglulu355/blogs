<template>
  <div>
    <section class="mcpage">
      <p class="title">
        <span>最新学习</span>
      </p>
      <div class="mc">
        <ul class="mclist">
          <li class="mcli" v-for="(item, index) in res" :key="index">
            <el-timeline>
              <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                  <div class="img">
                    <img :src="item.pic" alt />
                  </div>
                  <div class="mcinfos">
                    <p class="name">{{item.name}}</p>
                    <p class="teacher">{{item.teacher}}</p>
                    <p class="replay">立即观看</p>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "mycourse",
  data() {
    return {
      res: [
        {
          pic: require("../assets/search1.png"),
          name: "动态网站开发",
          school: "成都大学",
          teacher: "李雷"
        },
        {
          pic: require("../assets/search2.png"),
          name: "动态网站开发",
          school: "成都大学",
          teacher: "李雷"
        },
        {
          pic: require("../assets/search3.png"),
          name: "动态网站开发",
          school: "成都大学",
          teacher: "李雷"
        }
      ]
    };
  }
};
</script>
<style lang="less">
.mcpage {
  padding-top: 30px;
  .title {
    padding: 0 0 20px 30px;
    border-bottom: 1px solid lightgray;
    text-align: left;
    font-size: 22px;
    color: #4700b8;
    line-height: 40px;
    cursor: pointer;
    span {
      display: inline-block;
      width: 90px;
      &::after {
        display: block;
        content: "";
        margin: 0 auto;
        width: 35px;
        height: 2px;
        background: #4700b8;
      }
    }
  }
  .mc {
    height: 820px;
  }
  .mclist {
    height: 700px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 10px;
      height: 20px;
    }
    &::-webkit-scrollbar-thumb:vertical {
      border-radius: 15px;
      background: #d8c3fa;
    }
    padding: 20px 0 20px 50px;
    .el-timeline-item {
      width: 700px;
      .el-card__body {
        display: grid;
        grid-template-columns: 200px 1fr;
      }
    }
    .mcli {
      width: 100%;
      .img {
        width: 200px;
        img {
          width: 100%;
        }
      }
      .mcinfos {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 15px;
        color: grey;
        .replay {
          font-size: 12px;
          cursor: pointer;
          color: #4700b8;
        }
      }
    }
  }
}
</style>
