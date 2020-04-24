<template>
  <div class="product">
    <!-- <banner></banner> -->
    <div class="productbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <div class="content">
        <curinfo :curinfo="curinfo" @change="tocurinfo"></curinfo>
        <ul class="goodslist">
          <li class="goodsli" v-for="(item, index) in goodsinfo" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +item.pic+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <div class="pagenation">
        <mo-pagination
          :page-index="currentPage"
          :total="count"
          :page-size="pageSize"
          @change="pageChange"
        ></mo-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import tabBar from "../components/tabBar";
import curinfo from "../components/curinfo";
import moPagination from "../components/pagenation";
export default {
  name: "product",
  data() {
    return {
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 300, // 总记录数,
      curindex: 0,
      curinfoindex: 0,
      tabtitle: { a: "产品", b: "中心" },
      tabnav: [],
      curinfo: [
        {
          name: "产品分类",
          info: [
            "冰箱",
            "洗衣机",
            "小家电",
            "空调",
            "中央空调",
            "地暖",
            "净水",
            "新风",
            "电视"
          ]
        },
        { name: "功率", info: ["不限", "1p", "1.5p", "2p", "3p", "5p"] },
        { name: "种类", info: ["不限", "定频", "变频"] },
        { name: "能效", info: ["不限", "一级", "二级", "三级"] },
        { name: "功率", info: ["不限", "1p", "1.5p", "2p", "3p", "5p"] },
        { name: "种类", info: ["不限", "定频", "变频"] },
        { name: "能效", info: ["不限", "一级", "二级", "三级"] }
      ],
      goodsinfo: [
        { pic: require("../assets/news/lb.png"), name: "洗衣机" },
        { pic: require("../assets/product/goods1.png"), name: "洗衣机" },
        { pic: require("../assets/product/goods1.png"), name: "洗衣机" },
        { pic: require("../assets/product/goods1.png"), name: "洗衣机" },
        { pic: require("../assets/product/goods1.png"), name: "洗衣机" },
        { pic: require("../assets/product/goods1.png"), name: "洗衣机" }
      ]
    };
  },
  created() {
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      this.curindex = Number(idx);
    }
  },

  methods: {
    getList(page) {
      // this.requstKind(this.class_id, page);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    tonav(index) {
      //  console.log(index)
      this.curindex = index;
    },
    tocurinfo(mindex, item, e) {
      console.log(mindex, item);
    }
  },

  components: { banner, tabBar, moPagination, curinfo }
};
</script>

<style lang="less" scoped>
.product {
  width: 100%;
  .productbox {
    width: 100%;
    box-sizing: border-box;
    padding: 60px 25px 70px 25px;
    .content {
      margin: 0 auto;
      .goodslist {
        // background: yellow;
        box-sizing: border-box;
        padding-top: 15px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .goodsli {
          cursor: pointer;
          display: inline-block;
          width: 49%;
          height: 350px;
          background: rgba(255, 255, 255, 1);
          border: 2px solid rgba(236, 236, 236, 1);
          border-radius: 10px;
          box-sizing: border-box;
          padding: 43px 0 0 0px;
          margin-bottom: 15px;
          .mainpic {
            transition: all 0.5s ease;
            width: 250px;
            height: 250px;
            margin: 0 auto;
          }
          .name {
            width: 100%;
            font-size: 30px;
            color: #333333;
            // line-height: 55px;
            text-align: center;
          }
        }
      }
    }
  }
}
.pagenation {
  // background: violet;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding-top: 50px;
}
</style>

