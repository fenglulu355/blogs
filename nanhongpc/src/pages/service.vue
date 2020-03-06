<template>
  <div class="service">
    <banner></banner>
    <div class="servisebox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav"></tabBar>
      <div class="team serv" v-show="curindex===0">
        <ul class="teamshow">
          <li
            class="ts-left"
            :style="{backgroundImage: 'url(' + require('../assets/ser/onebg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></li>
          <li
            class="ts-right"
            :style="{backgroundImage: 'url(' + require('../assets/ser/onebgs.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          >
            <div class="top">
              <p>以人为本</p>
              <p>以技为魂</p>
              <p>以管理为纽带</p>
            </div>
            <p class="deshed">--------------------------------------</p>
            <div class="bottom">
              <p class="deshed">------</p>
              <p>认真对待每一个用户，带领全体员工共同努</p>
              <p>力，创造南宏更美好的明天。</p>
            </div>
          </li>
        </ul>
        <ul class="teaminfo">
          <li class="teaminfoli" v-for="(item, index) in teaminfo" :key="index">
            <div
              class="pics"
              :style="{backgroundImage: 'url(' + item.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import tabBar from "../components/tabBar";
export default {
  name: "servise",
  data() {
    return {
      curindex: 0,
      tabtitle: {
        a: "服务与",
        b: "支持"
      },
      tabnav: ["团队展示", "服务流程", "安装流程", "工程售后维保", "服务条款"],
      teaminfo: [
        { img: require("../assets/ser/onepp.png"), name: "冯经理" },
        { img: require("../assets/ser/onepp.png"), name: "张经理" },
        { img: require("../assets/ser/onepp.png"), name: "周经理" },
        { img: require("../assets/ser/onepp.png"), name: "李经理" }
      ]
    };
  },
  created() {},
  methods: {
    tonav(index) {
      //  console.log(index)
      this.curindex = index;
    }
  },
  components: { banner, tabBar }
};
</script>

<style lang="less" scoped>
.service {
  width: 100%;
  .servisebox {
    width: 100%;
    border-top: 1px solid rgba(153, 153, 153, 0.3);
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);
    box-sizing: border-box;
    padding: 60px 0 100px 0;
    .serv {
      width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      padding-top: 53px;
    }
    .team {
      .teamshow {
        width: 100%;
        height: 465px;
        display: flex;
        .ts-left {
          width: 758px;
          height: 465px;
        }
        .ts-right {
          width: 441px;
          box-sizing: border-box;
          padding: 64px 0 0 48px;
          .top {
            font-size: 24px;
            color: rgba(62, 145, 223, 1);
            line-height: 45px;
            font-weight: bold;
          }
          .deshed {
            color: rgba(204, 204, 204, 1);
            font-size: 24px;
          }
          .bottom {
            padding-top: 20px;
            color: rgba(153, 153, 153, 1);
            line-height: 35px;
          }
        }
      }
      .teaminfo {
        // background: pink;
        box-sizing: border-box;
        padding-top: 24px;
        width: 100%;
        height: 455px;
        display: flex;
        justify-content: space-between;
        .teaminfoli {
          width: 282px;
          height: 380px;

          .pics {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          .name {
           position: relative;
           top: 10px;
            width: 282px;
            height: 39px;
            text-align: center;
            line-height: 39px;
            background: rgba(236, 236, 236, 1);
            border-radius: 10px;
            font-size: 16px;
            color: rgba(91, 91, 91, 1);
          }
        }
      }
    }
  }
}
</style>