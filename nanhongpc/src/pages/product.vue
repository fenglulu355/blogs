<template>
  <div class="product">
    <banner></banner>
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
        <!-- 分页 -->
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
      tabnav: [
        "冰箱",
        "洗衣机",
        "小家电",
        "空调",
        "中央空调",
        "地暖",
        "净水",
        "新风",
        "电视"
      ],
      curinfo: [
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
  created() {},
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
    border-top: 1px solid rgba(153, 153, 153, 0.3);
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);
    box-sizing: border-box;
    padding: 60px 0 100px 0;
    .content {
      width: 1200px;
      margin: 0 auto;
      .goodslist {
        box-sizing: border-box;
        padding-top: 50px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .goodsli {
          cursor: pointer;
          display: inline-block;
          width: 390px;
          height: 398px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(236, 236, 236, 1);
          border-radius: 10px;
          box-sizing: border-box;
          padding: 50px 0 0 0px;
          margin-bottom: 15px;
          .mainpic {
            width: 288px;
            height: 288px;
            margin: 0 auto;
          }
          .name {
            width: 100%;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
            line-height: 55px;
            text-align: center;
          }
          &:hover {
            border: 1px solid rgba(153, 153, 153, 1);
          }
        }
      }
    }
  }
   .mo-paging {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding-top: 53px;
  }
}
</style>