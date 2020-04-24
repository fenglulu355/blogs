<template>
  <div class="nhfooter">
    <div class="footmain">
      <div class="footer-left">
        <div class="logo">
          <img src="../assets/footer/logo.png" alt />
        </div>
        <div class="ewm">
          <img src="../assets/footer/ewm.png" alt />
          <p>
            <span class="focus">关注南宏更多资讯</span>
            <span class="sys">【扫一扫】</span>
          </p>
        </div>
      </div>
      <div class="footer-center">
        <ul class="navlist">
          <li class="navli" v-for="(item, index) in navlist" :key="index" @click="tonav(index)">
            <router-link :class="curindex ==index?'sel':''" :to="item.path">{{item.name}}</router-link>
          </li>
        </ul>
        <div class="footinfo">
          <div class="telbox">
            <span>联系人：</span>
            <span>李经理，陈经理</span>
            <span class="slant">/</span>
            <span>销售热线：</span>
            <span>0830-6027777，18181878760，18090855133</span>
            <span class="slant">/</span>
            <span>售后热线：</span>
            <span>0830-3380333，13320783392</span>
          </div>
          <div class="dressbox">
            <span>总公司地址：</span>
            <span>总公司地址：四川省泸州市佳乐世纪城（金融中心）7号楼1301号</span>
            <span class="slant">/</span>
            <span>联系电话：</span>
            <span>0830-6027777</span>
            <span class="slant">/</span>
            <span>分公司地址：</span>
            <span>四川省宜宾市临港新天地互联网产业基地513号</span>
            <span class="slant">/</span>
            <span>联系电话：</span>
            <span>0830-3581585</span>
          </div>
          <div class="email">
            <span>传真：</span>
            <span>0830-2571485</span>
            <span class="slant">/</span>
            <span>Q Q：</span>
            <span>2073376722</span>
            <span class="slant">/</span>
            <span>邮箱：</span>
            <span>20008345@qq.com</span>
          </div>
        </div>
      </div>
      <div class="footer-right">
        <div class="icon">
          <img src="../assets/footer/tel.png" alt />
          <p>联系电话</p>
        </div>
        <div class="num">
          <p>0830-6027777</p>
          <p>18181878760</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nhfooter",
  inject: ["reload"],
  data() {
    return {
      curindex: 0,
      navlist: [
        { path: "/", name: "网站首页" },
        { path: "/product", name: "产品中心" },
        { path: "/shopshow", name: "门店展示" },
        { path: "/cases", name: "成功案例" },
        { path: "/service", name: "服务与支持" },
        { path: "/news", name: "新闻中心" },
        { path: "/about", name: "关于我们" },
        { path: "/shoppingmall", name: "南宏商城" }
      ]
    };
  },
  created() {
    let navindex = sessionStorage.getItem("navindex");
    if (navindex) {
      this.curindex = navindex;
    } else {
      this.curindex = 0;
    }
  },
  methods: {
    tonav(index) {
      this.curindex = index;
      sessionStorage.setItem("navindex", index);
      this.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.nhfooter {
  width: 100%;
  .footmain {
    // background: pink;
    display: grid;
    grid-template-columns: 18% 63% 1fr;
    .footer-left {
      // background: olive;;
      width: 100%;
      box-sizing: border-box;
      padding: 44px 10px 0px 40px;
      .logo {
        box-sizing: border-box;
        padding-bottom: 19px;
      }
      .ewm {
        width: 159px;
        height: 122px;
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        img {
          box-sizing: border-box;
          padding: 9px 9px;
        }
        p {
          writing-mode: vertical-lr;

          color: rgba(153, 153, 153, 1);
        }
        .focus {
          font-size: 10px;
          position: relative;
          top: 12px;
          right: 8px;
        }
        .sys {
          font-size: 14px;
          position: relative;
          top: 25px;
          right: 5px;
        }
      }
    }
    .footer-center {
      // background: pink;
      width: 100%;
      .navlist {
        box-sizing: border-box;
        padding: 61px 0 31px 0;
        .navli {
          display: inline-block;
          a {
            font-size: 13px;
            color: rgba(51, 51, 51, 1);
            margin-right: 40px;
          }
        }
        .sel {
          font-weight: bold;
        }
      }
      .footinfo {
        border-top: 1px solid rgba(153, 153, 153, 0.3);
        box-sizing: border-box;
        padding: 18px 0 30px 0;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
        .slant {
          margin: 0 5px;
        }
      }
    }
    .footer-right {
      box-sizing: border-box;
      width: 224px;
      height: 52px;
      margin: 90px auto;
      border: 1px solid rgba(153, 153, 153, 1);
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
      align-content: center;

      .icon {
        width: 50px;
        font-size: 10px;
        text-align: center;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
        box-sizing: border-box;
        padding-top: 10px;
      }
      .num {
        width: 126px;
        height: 35px;
        font-size: 17px;
        font-weight: bold;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
        box-sizing: border-box;
        padding-top: 10px;
      }
    }
  }
}
</style>