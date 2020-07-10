<template>
  <div class="content">
    <div class="download">
      <p class="slogan">下载芮米在线学习手机APP2.0版本</p>
      <p class="title">随时随地都学习</p>
      <p class="els">Download Romi Online Learning app</p>
      <div class="box">
        <img src="../assets/phone.png" alt />
        <section>
          <p
            class="des"
          >欢迎下载芮米课程2.0PRO版本，此版本优惠了部分UI细节，深化了颜色显示部分的合理性，芮米认为“在线教育、网络学习”的实质在于信息的传递、学习经验分享记居家产品</p>
          <div class="picitem">
            <img src="../assets/ewm.png" alt />
            <div class="downbox">
              <p>下载2.0PRO版本</p>
              <img src="../assets/iphone.png" alt />
              <img src="../assets/android.png" alt />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "down"
};
</script>

<style lang="less" scoped>
.download {
  margin-top: 90px;
  text-align: center;
  .slogan {
    font-size: 30px;
  }
  .title {
    font-size: 25px;
    margin-top: 15px;
    &::after {
      content: "";
      display: block;
      margin: 10px auto;
      width: 18px;
      height: 3px;
      background: #626262;
    }
  }
  .els {
    font-size: 20px;
    margin: 10px auto;
    color: #898989;
  }
  .box {
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    section {
      margin-left: 65px;
      text-align: left;
      .des {
        width: 100%;
        padding-top: 55px;
        font-size: 17px;
        color: #898989;
        line-height: 30px;
        margin-bottom: 30px;
      }
      .picitem {
        border-top: 1px solid #898989;
        width: 250px;
        padding-top: 30px;
        display: flex;
        justify-content: space-between;

        .downbox {
          width: 130px;
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          img {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>