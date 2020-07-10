<template>
  <div class="paid">
    <ul class="paid-nav">
      <li class="paid-li">内容</li>
      <li class="paid-li">价格</li>
      <li class="paid-li">购买日期</li>
    </ul>
    <ul class="paid-infos">
      <li class="paid-infos-li" v-for="(item, index) in infos" :key="index">
        <div class="des">
          <div class="pic">
            <img :src="item.pic" alt />
          </div>
          <div class="des-text">
            <p class="name">{{item.name}}</p>
            <p class="kind">{{item.kind}}</p>
            <p class="school">{{item.school}}</p>
            <p class="teacher">{{item.teacher}}</p>
          </div>
        </div>
        <p class="price">{{item.price}}</p>
        <p class="time">{{item.time}}</p>
      </li>
    </ul>
  </div>
</template>
<style lang="less">
.paid {
  padding-top: 30px;
  .paid-nav {
    display: grid;
    grid-template-columns: 1fr 150px 150px;
    align-items: self-end;
    .paid-li {
      font-size: 18px;
    }
  }
  .paid-infos {
    color: grey;
    height: 700px;
    padding-left: 20px;
    .paid-infos-li {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 150px 150px;
      align-items: center;
      .des {
        border-radius: 12px;
        display: flex;
        font-size: 15px;

        .pic {
          width: 220px;
          img {
            width: 100%;
          }
        }
        .des-text {
          width: 370px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          align-items: center;
          justify-items: center;
        }
      }
    }
  }
}
</style>
<script>
export default {
  name: "paid",
  data() {
    return {
      infos: [
        {
          pic: require("../assets/setting/uimage_04.png"),
          name: "动态网站开发",
          school: "成都大学",
          teacher: "李雷",
          kind: "初级",
          price: "164561",
          kind: "初级阶段",
          time: "2019-11-20"
        },
        {
          pic: require("../assets/setting/jimage_04.png"),
          name: "动态网站开发",
          school: "成都大学",
          teacher: "李雷",
          kind: "初级",
          price: "164561",
          kind: "初级阶段",
          time: "2019-11-20"
        },
        {
          pic: require("../assets/setting/jimage_06.png"),
          name: "动态网站开发",
          school: "成都大学",
          kind: "初级",
          teacher: "李雷",
          price: "164561",
          kind: "初级阶段",
          time: "2019-11-20"
        },
        {
          pic: require("../assets/setting/jimage_05.png"),
          name: "动态网站开发",
          school: "成都大学",
          kind: "初级",
          teacher: "李雷",
          price: "164561",
          kind: "初级阶段",
          time: "2019-11-20"
        }
      ]
    };
  }
};
</script>