<template>
  <div class="product" v-loading.fullscreen.lock="fullscreenLoading">
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
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "product",
  provide() {
    return {
      reloadcur: this.reloadcur
    };
  },
  data() {
    return {
      fullscreenLoading: false,
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      iscurinfo: true,
      curindex: 0,
      tabtitle: { a: "智慧", b: "中心" },
      tabnav: [],
      classid: "",
      curinfo: [],
      arr: [],
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
    border-top: 1px solid rgba(153, 153, 153, 0.3);
    // border-bottom: 1px solid rgba(153, 153, 153, 0.3);
    box-sizing: border-box;
    padding: 60px 0 100px 0;
    .content {
      width: 1200px;
      margin: 0 auto;
      .goodslist {
        box-sizing: border-box;
        padding-top: 50px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
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
            transition: all 0.3s ease;
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

<style lang="" >
.el-checkbox-button {
  cursor: pointer;
  box-sizing: border-box;
  padding: 5px 15px;
}
.el-checkbox-button__inner {
  border: none;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  background: rgba(36, 130, 200, 1);
  color: white;
}

.distpicker-address-wrapper select {
  font-size: 14px;
}
</style>
