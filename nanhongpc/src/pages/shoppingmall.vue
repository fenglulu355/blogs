<template>
  <div class="shoppingmall">
    <banner></banner>
    <div class="selectbox">
      <ul class="seleclist">
        <li class="selecli" v-for="(item, index) in select" :key="index">
          <el-select v-model="value[index]" :placeholder="item">
            <el-option
              v-for="(item, mindex)  in options"
              :key="mindex"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
      </ul>
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
            <p class="price">
              <span class="oldprice">原价￥{{item.oldprice}}</span>
              <span class="nowprice">最低价￥{{item.nowprice}}</span>
            </p>
            <p class="num">
              销量:{{item.sales}}
              <span>/</span>
              库存:{{item.stock}}
            </p>
          </div>
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
</template>
<script>
import banner from "../components/homebanner";
import moPagination from "../components/pagenation";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "shoppingcar",
  data() {
    return {
      iscar: false,
      // 分页
      pageSize: 24, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 300, // 总记录数,
      select: [
        "产品分类",
        "产品价格",
        "匹数",
        "产品分类",
        "产品价格",
        "匹数",
        "产品类型",
        "能效等级",
        "变频/定频",
        "用户优选",
        "冷暖类型",
        "产品特色"
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
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
    }
  },
  components: { banner, moPagination }
};
</script>

<style lang="less" scoped>
.shoppingmall {
  width: 100%;
  .selectbox {
    width: 100%;
    // height: 60px;
    background: rgba(245, 245, 245, 1);
    // text-align: center;
    .seleclist {
      width: 1200px;
      // height: 60px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .selecli {
        width: 145px;
      }
    }
  }
  .goods {
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
        height: 495px;
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
        .goodsinfo {
          height: 150px;
          width: 100%;
          color: rgba(51, 51, 51, 1);
          text-align: center;
          box-sizing: border-box;
          padding-top: 26px;
          line-height: 30px;
          position: relative;
          .price {
            .oldprice {
              color: rgba(102, 102, 102, 1);
              text-decoration: line-through;
            }
            span {
              margin: 0 10px;
            }
          }
          .num {
            position: absolute;
            bottom: 0;
            right: 15px;
            color: rgba(153, 153, 153, 1);
            font-size: 14px;
          }
        }
        &:hover {
          border: 1px solid rgba(153, 153, 153, 1);
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
<style>
.el-input__inner {
  border: none !important;
  height: 60px !important;;
  padding: 0 0 !important;;
  background: rgba(245, 245, 245, 1) !important;
  border-radius: 0 !important;;
}
.el-input__inner {
  color: rgba(36, 130, 200, 1) !important;;
}
.el-input__inner::placeholder {
  color: rgba(51, 51, 51, 0.8) !important;;
}
.el-select-dropdown__item.selected {
  color: rgba(36, 130, 200, 1) !important;;
  font-weight: 400 !important;;
}
.el-select-dropdown__item:hover {
  color: rgba(36, 130, 200, 1);
}
</style>