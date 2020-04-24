<template>
  <div class="bottom">
    <div class="slogan">
      <p class="left">芮米科技--做受尊敬的培训机构</p>
      <p class="right">
        价值观：
        <span>敬畏 感恩 责任 创新 使命--通过移动互联产品提升人类生活品质</span>
      </p>
    </div>
    <ul class="footerlist">
      <li class="pic footerli">
        <div class="img">
          <img src="../assets/LOGO.png" alt />
        </div>
      </li>
      <li class="courses footerli">
        <p>芮米课程</p>
        <ul class="courseslist chidlist">
          <li>
            <p>JAVA课程</p>
          </li>
          <li>
            <p>UI课程</p>
          </li>
          <li>
            <p>HTML课程</p>
          </li>
          <li>
            <p>PYTHON课程</p>
          </li>
        </ul>
      </li>
      <li class="help footerli">
        <p>帮助中心</p>
        <ul class="helplist chidlist">
          <li>
            <p>常见问题</p>
          </li>
          <li>
            <p>下载问题</p>
          </li>
          <li>
            <p>预定问题</p>
          </li>
          <li>
            <p>突发问题</p>
          </li>
        </ul>
      </li>
      <li class="contact footerli">
        <p>联系我们</p>
        <ul class="contactlist chidlist">
          <li>
            <p>详情留言</p>
          </li>
          <li>
            <p>问题留言</p>
          </li>
          <li>
            <p>投诉检查</p>
          </li>
        </ul>
      </li>
      <li class="join footerli">
        <p>加入我们</p>
        <ul class="joinlist chidlist">
          <li>
            <p>人事招聘</p>
          </li>
          <li>
            <p>管理招聘</p>
          </li>
        </ul>
      </li>
      <li class="iconbox footerli">
        <img src="../assets/ewm.png" alt />
        <img src="../assets/homoicon.png" alt />
      </li>
    </ul>
    <div class="tel">
      <span>地址：四川省成都市高新区天府三街</span>
      <span>联系电话：14700000000 李老师 | 0986484987王老师</span>
    </div>
    <div class="base">
      <p>COPYRIGHT © 2011 ROMI 成都芮米科技有限公司 保留所有版权 蜀ICO备2698598522号</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottom"
};
</script>

<style lang="less" scoped>
.bottom {
  width: 100%;
  min-width: 1200px;
  background: #4700b8;
  font-family: 微软雅黑;
  color: white;
}
.slogan {
  width: 1200px;
  padding: 40px 0 10px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid white;
  .left {
    font-size: 26px;
  }
  .right {
    font-size: 20px;
  }
}
.footerlist {
  width: 1200px;

  margin: 0 auto;
  display: grid;
  grid-template-columns: 20% 16% 16% 16% 16% 16%;
  text-align: center;
  .footerli {
    display: inline-block;
    width: 100%;
    padding-top: 40px;
    .img {
      text-align: left;
      padding-top: 40px;
    }
    .chidlist {
      li {
        font-size: 16px;
        color: white;
        margin-top: 10px;
      }
    }
  }
}
.footerli > p {
  font-size: 20px;
  margin-bottom: 15px;
}
.iconbox {
  text-align: right;
  img:last-child {
    height: 23px;
    margin-top: 28px;
  }
}
.tel {
  margin: 30px auto;
  width: 1200px;
  display: flex;
  justify-content: space-between;
}
.base {
  height: 40px;
  line-height: 40px;
  background: black;
  text-align: center;
  font-size: 12px;
}
</style>