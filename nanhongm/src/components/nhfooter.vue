<template>
  <div class="nhfooter">
    <div class="top">
      <div
        class="logo"
        :style="{backgroundImage: 'url(' + require('../assets/footer/logo.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
      <div class="telbox clearFix">
        <div class="left fl">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + require('../assets/footer/tel.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <p class="text">联系电话</p>
        </div>
        <div class="right fr">
          <p>0830-6027777</p>
          <p>18181878760</p>
        </div>
      </div>
    </div>
    <div class="infobox">
      <div class="infos">
        <p class="text">联系人：李经理，陈经理</p>
        <p class="text">销售热线：0830-6027777，18181878760，18090855133</p>
        <p class="text">售后热线：0830-3380333，13320783392</p>
        <p class="text">总公司地址：四川省泸州市佳乐世纪城（金融中心）7号楼1301号</p>
        <p class="text">联系电话：0830-6027777</p>
      </div>
      <div class="btinfos">
        <div class="bt-left">
          <p class="text">分公司地址：四川省宜宾市临港新天地互联网产业基地513号</p>
          <p class="text">联系电话：0830-3581585</p>
          <p class="text">传真：0830-2571485</p>
          <p class="text">Q Q：2073376722</p>
          <p class="text">邮箱：20008345@qq.com</p>
        </div>
        <div class="bt-right">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + require('../assets/footer/ewm.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <p>关注南宏更多资讯</p>
          <p class="sys">【扫一扫】</p>
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
    this.requst()
  },
  methods: {
    tonav(index) {
      this.curindex = index;
      sessionStorage.setItem("navindex", index);
      this.reload();
    },
    requst(){
    this.$axios.post('/index/api/home').then(res=>{
      // console.log(res);
      
    })
    }
  }
};
</script>

<style lang="less" scoped>
.nhfooter {
  width: 100%;
  background: #f5f5f5;
  .top {
    box-sizing: border-box;
    padding: 20px 0 40px 0;
    .logo {
      width: 317px;
      height: 82px;
      margin: 34px auto;
    }
    .telbox {
      width: 400px;
      height: 95px;
      border: 1px solid rgba(153, 153, 153, 1);
      border-radius: 5px;
      margin: 0 auto;
      color: #999999;
      box-sizing: border-box;
      padding: 15px 20px 0 25px;
      .left {
        // background: violet;
        width: 120px;
        text-align: center;
        .mainpic {
          margin: 0 auto;
          width: 53px;
          height: 42px;
        }
      }
      .right {
        font-size: 30px;
        font-weight: bold;
        position: relative;
        bottom: 5px;
      }
    }
  }
  .infobox {
    width: calc(100% - 50px);
    margin: 0 auto;
    border-top: 1px solid #999999;
    color: #999999;
    font-size: 24px;
    box-sizing: border-box;
    padding: 35px 0;
    .infos {
      line-height: 45px;
    }
    .btinfos {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .bt-left {
        width: 48%;
        line-height: 45px;
      }
      .bt-right {
        width: 48%;
        height: 264px;
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 5px;
        box-sizing: border-box;
        padding: 18px 18px;
        display: flex;
        justify-content: space-between;
        .mainpic {
          width: 206px;
          height: 206px;
        }
        p {
          writing-mode: vertical-lr;
          font-size: 24px;
          position: relative;
          top: 8px;
        }
        .sys {
        position: relative;
        top: 40px;
        }
      }
    }
  }
}
</style>