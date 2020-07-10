<template>
  <div class="product">
    <!-- <banner></banner> -->
    <div class="productbox">
      <div class="content">
        <ul class="goodslist">
          <li
            class="goodsli"
            v-for="(item, index) in goodsinfo"
            :key="index"
            @click="topro(item,index)"
          >
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +httpUrl+item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="name" v-if="item.article_title">{{item.article_title}}</p>
            <p class="name" v-else>{{item.goods_name}}</p>
            <p class="price" v-if="item.goods_price">
              <span>{{item.platform_price}}</span>
              /
              {{item.goods_price}}
            </p>
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
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "product",
  data() {
    return {
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      curinfo: [],
      keyword: [],
      goodsinfo: [],
      keyword: "",
      froms: ""
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.froms = this.$route.query.from;
    if (this.froms == "shop") {
      this.requstshop(this.keyword, 6, 1, "", "");
    } else {
      this.requst(this.keyword, 6, 1, "", "");
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 600;
  },
  computed: {
    ...mapState(["islogin", "logreg"])
  },
  methods: {
    ...mapMutations(["setsearchinfo"]),
    ...mapActions(["getlogreg", "gettopath"]),
    // 获取分类id、
    requst(keyword, limit, page, keywords) {
      this.$axios
        .post("/index/api/productList", {
          sreach: keyword,
          limit: limit,
          page: page,
          keyword: keywords,
          id: ""
        })
        .then(res => {
          console.log(res);
          this.fullscreenLoading = true;
          if (this.goodsinfo) {
            this.fullscreenLoading = false;
          }
          this.goodsinfo = res.data.data.data;
          this.count = res.data.data.total;
        });
    },
    requstshop(keyword, limit, page, keywords) {
      this.$axios
        .post("/index/shop/goodsList", {
          sreach: keyword,
          limit: limit,
          page: page,
          keyword: keywords,
          id: ""
        })
        .then(res => {
          console.log(res);
          this.fullscreenLoading = true;
          if (this.goodsinfo) {
            this.fullscreenLoading = false;
          }
          this.goodsinfo = res.data.data.data;
          this.count = res.data.data.total;
        });
    },
    getList(page) {
      if (this.froms == "shop") {
        this.requstshop(this.keyword, 6, page);
      } else {
        this.requst(this.keyword, 6, page);
      }
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },

    topro(item, index) {
      if (this.froms == "shop") {
        if (this.islogin == false) {
          this.$confirm("您还未登录，前往登录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              // 存入状态
              this.gettopath("/commoditydetails?class_id=" + item.goods_id);
              this.getlogreg(true);
            })
            .catch(() => {
              this.islogreg = false;
            });
        } else {
          this.$router.push({
            path: "/commoditydetails",
            query: { class_id: item.goods_id }
          });
        }
      } else {
        console.log(item);
        this.setsearchinfo(item);
        this.$router.push({
          path: "/prodetails"
        });
      }
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
          //   height: 350px;
          background: rgba(255, 255, 255, 1);
          border: 2px solid rgba(236, 236, 236, 1);
          border-radius: 10px;
          box-sizing: border-box;
          padding: 43px 0px 0px 0px;
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
          .price {
            // background: blueviolet;
            color: #333333;
            box-sizing: border-box;
            width: 250px;
            margin: 10px auto;
            span {
              text-decoration: line-through;
            }
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

