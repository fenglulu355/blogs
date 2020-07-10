<template>
  <div class="statemap">
    <div class="title">
      <p>四川南宏机电工程安装有限公司官网</p>
      <p>站点地图</p>
    </div>

    <ul class="statemap-list">
      <li class="statemap-li" v-for="(item, index) in list" :key="index">
        <a class="topath" :href="httpUrl+item.one.path">{{item.one.name}}</a>

        <ul class="mlist">
          <li class="mli" v-for="(items, index) in item.two" :key="index">
            <a @click="topath(items,index)" class="tomain" :href="httpUrl+item.one.path">{{items}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "statemap",
  inject: ["reload"],
  data() {
    return {
      list: [
        { one: { path: "#/", name: "网站首页" } },
        { one: { path: "#/product", name: "智慧中心" } },
        {
          one: { path: "#/shopshow", name: "门店展示" },
          two: ["门店展示", "门店导航"]
        },
        {
          one: { path: "#/cases", name: "成功案例" },
          two: ["工装项目", "家装项目"]
        },
        {
          one: { path: "#/service", name: "服务与支持" },
          two: ["团队展示", "服务流程", "安装流程", "服务条款", "工程售后维保"]
        },
        {
          one: { path: "#/news", name: "新闻中心" },
          two: ["行业新闻", "公司新闻"]
        },
        {
          one: { path: "#/about", name: "关于我们" },
          two: [
            "公司介绍",
            "社会招聘",
            "销售网络",
            "员工风采",
            "南宏概念",
            "校园招聘",
            "公司架构",
            "联系我们",
            "荣誉资质"
          ]
        },
        { one: { path: "#/shoppingmall", name: "南宏商城" } }
      ]
    };
  },
  methods: {
    topath(items, index) {
      sessionStorage.setItem("mnavindex", index);
      this.reload();
      console.log(items, index);
    }
  }
};
</script>
<style lang="less" scoped>
.statemap {
  background: white;
  position: fixed;
  top: 0;
  z-index: 1111111111111111;
  width: 100%;
  .title {
    width: 100%;
    height: 150px;
    background: #2482c8;
    box-sizing: border-box;
    padding-top: 20px;
    margin-bottom: 50px;
    p {
      text-align: center;
      font-size: 35px;
      color: white;
      line-height: 55px;
    }
  }
  .statemap-list {
    width: 1200px;
    margin: 0 auto;
    .statemap-li {
      // border: 1px solid red;
      box-sizing: border-box;
      padding: 20px 0 0px 0;
      display: grid;
      grid-template-columns: 15% 85%;
      .topath {
        display: inline-block;
        height: 40px;
        text-align: center;
        line-height: 40px;
        width: 120px;
        background: #2482c8;
        color: white;

        &:hover {
          transition: all ease 0.2s;
          box-shadow: 1px 1px 10px #2482c8;
        }
      }
      .mlist {
        width: 100%;
        // background: brown;
        li {
          display: inline-block;
          box-sizing: border-box;
          padding: 0 35px 0 0;
          margin-bottom: 15px;
        }
        .tomain {
          display: inline-block;
          font-size: 14px;
          height: 40px;
          border: 1px solid #2482c8;
          text-align: center;
          line-height: 40px;
          width: 100px;
          border-radius: 5px;
          // background: #2482c8;
          color: #2482c8;
          &:hover {
            // border: none;
            transition: all ease 0.2s;
            box-shadow: 1px 1px 10px #2482c8;
          }
        }
      }
    }
  }
}
</style>