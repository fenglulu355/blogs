<template>
  <div class="shoppingmall">
    <div class="selectbox">
      <curinfo :curinfo="curinfo" @change="tocurinfo"></curinfo>
    </div>
    <div class="goods">
      <ul class="goodslist">
        <li
          class="goodsli"
          v-for="(item, index) in goodsinfo"
          @click="tocommoditydetails(index,item)"
          :key="index"
        >
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +item.pic+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <div class="goodsinfo">
            <p class="name">{{item.name}}</p>
            <div class="price">
              <p class="oldprice">原价￥{{item.oldprice}}</p>
              <p class="nowprice">最低价￥{{item.nowprice}}</p>
            </div>
            <p class="num">
              销量:{{item.sales}}
              <span>/</span>
              库存:{{item.stock}}
            </p>
          </div>
        </li>
      </ul>
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
import curinfo from "../components/curinfo";
import moPagination from "../components/pagenation";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "shoppingcar",
  data() {
    return {
      iscar: false,
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 300, // 总记录数,
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
        {
          pic: require("../assets/news/lb.png"),
          name: "洗衣机",
          oldprice: 1988,
          nowprice: 1588,
          sales: 500,
          stock: 1800
        },
        {
          pic: require("../assets/product/goods1.png"),
          name: "洗衣机",
          oldprice: 1988,
          nowprice: 1588,
          sales: 500,
          stock: 1800
        },
        {
          pic: require("../assets/product/goods1.png"),
          name: "洗衣机",
          oldprice: 1988,
          nowprice: 1588,
          sales: 500,
          stock: 1800
        },
        {
          pic: require("../assets/product/goods1.png"),
          name: "洗衣机",
          oldprice: 1988,
          nowprice: 1588,
          sales: 500,
          stock: 1800
        },
        {
          pic: require("../assets/product/goods1.png"),
          name: "洗衣机",
          oldprice: 1988,
          nowprice: 1588,
          sales: 500,
          stock: 1800
        },
        {
          pic: require("../assets/product/goods1.png"),
          name: "洗衣机",
          oldprice: 1988,
          nowprice: 1588,
          sales: 500,
          stock: 1800
        }
      ],
      value: []
    };
  },
  created() {
    // this.getbanner(false);
    // console.log(this.isbanshow, "isbanshow");
  },
  computed: {
    ...mapState(["isbanshow", "islogin"])
  },
  methods: {
    ...mapMutations(["setbanner"]),
    ...mapActions(["getbanner"]),
    // 分页
    getList(page) {
      // this.requstKind(this.class_id, page);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },
    // 跳转至商品详情
    tocommoditydetails(index, item) {
      console.log(item);
      this.$router.push({ path: "/commoditydetails" });
    },
    // 条件选择
    tocurinfo(mindex, item, e) {
      console.log(mindex, item);
    }
  },
  components: { curinfo, moPagination }
};
</script>

<style lang="less" scoped>
.shoppingmall {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px;
  .selectbox {
    width: 100%;
    box-sizing: border-box;
    padding-top: 20px;
  }
  .goods {
    .goodslist {
      box-sizing: border-box;
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .goodsli {
        width: 49%;
        height: 492px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(236, 236, 236, 1);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 23px 20px 0 20px;
        margin-bottom: 15px;
        .mainpic {
          width: 254px;
          height: 253px;
          margin: 0 auto;
        }
        .goodsinfo {
          width: 100%;
          color: rgba(51, 51, 51, 1);
          text-align: left;
          box-sizing: border-box;
          padding-top: 33px;
          position: relative;
          .name {
            font-size: 30px;
            color: #333333;
            font-weight: lighter;
          }
          .price {
            box-sizing: border-box;
            padding-top: 25px;
            .oldprice {
              font-size: 20px;
              color: #666666;
              text-decoration: line-through;
            }
            .nowprice {
              color: #333333;
              font-size: 30px;
            }
          }
          .num {
            box-sizing: border-box;
            padding-top: 5px;
            color: #999999;
            font-size: 20px;
          }
        }
      }
    }
  }
  .pagenation {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 50px 0;
  }
}
</style>