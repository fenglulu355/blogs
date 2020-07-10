<template>
  <div class="kfooter">
    <div class="left">
      <div class="footer">
        <p class="title">
          <img src="../assets/name.png" alt />
        </p>
        <p class="text">四川垦诺国际贸易有限公司</p>
        <p class="text">
          成都市高新区天府大道北段1700号
          环球中心S2区501-506
        </p>
      </div>
      <div class="footer">
        <p class="title">联系我们</p>
        <p class="text">广告合作：kennuoguoji1@163.com</p>
        <p class="text">商务合作：kennuoguoji2@163.com</p>
        <p class="text">代理招募：kennuoguoji3@163.com</p>
      </div>
    </div>
    <div class="right">
      <div class="footer">
        <p class="title">
          <!-- <img src="../assets/name.png" alt /> -->
        </p>
        <p class="text">销售合作：kennuoguoji4@163.com</p>
        <p class="text">联系电话：028-85226972</p>
        <p class="time">周一至周五 上午9:00-12:00；下午13:30-18:30</p>
      </div>
      <div class="footer">
        <img class="ewm" src="../assets/ewm.png" alt />
        <p class="title">关注我们</p>
        <p class="text">
          <img src="../assets/wx.png" alt />微信：垦诺国际
        </p>
        <p class="text">
          <img src="../assets/wb.png" alt />微博：垦诺国际
        </p>
        <p class="text">
          <img src="../assets/email.png" alt />邮箱：postmaster@kennuo.net
        </p>
      </div>
    </div>
    <p class="copyright">{{infos.foot_content}}</p>
  </div>
</template>
<script>
export default {
  name: "kfooter",
  data() {
    return {
      infos: ""
    };
  },
  created() {
    this.requst();
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/web_config").then(res => {
        this.infos = res.data.data;
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.copyright {
  box-sizing: border-box;
  padding-top: 20px;
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
}
.kfooter {
  background: black;
  color: #bdbdbd;
  box-sizing: border-box;
  padding: 3% 5%;
  .left {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .right {
    box-sizing: border-box;
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .footer {
    width: 90%;
    // background: brown;
    box-sizing: border-box;
    margin-top: 20px;
    position: relative;
    .title {
      img {
        width: 150px;
      }
      font-size: 15px;
      color: #5f5f5f;
    }
    .time {
      width: 80%;
      font-size: 15px;
    }
    .text {
      box-sizing: border-box;
      padding-top: 20px;
      line-height: 35px;
      font-size: 17px;
      img {
        width: 30px;
        padding-right: 5px;
      }
    }
    .ewm {
      width: 30%;
      position: absolute;
      right: 0;
    }
  }
}
</style>