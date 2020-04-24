<template>
  <div class="business">
    <tabbar :tabbar="caseinfo"></tabbar>
    <ul class="caselist">
      <li
        class="pic"
        v-for="(item, index) in caseslide"
        @click="todetail(item, index)"
        :key="index"
      >
        <div class="pics">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +baseurl+`/public/`+ item.image_url+  ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
          ></div>

          <div class="infos">
            <p class="name">{{item.article_title}}</p>
          </div>
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
</template>


<script>
import moPagination from "../components/pagenation";
import tabbar from "../components/tabbar";
import httpUrl from "../api/url";
export default {
  name: "business",
  data() {
    return {
      isvedio: false,
      getProductClass: [],
      baseurl: "",
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      caseinfo: {
        normal: "业务",
        green: "范围",
        img: require("../assets/tabbar/business.png")
      },

      caseslide: [],
      businessdetail: [],
      previd: "",
      nextid: "",
      prevtitle: "",
      nexttitle: "",
      curitem: []
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.requst();
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/getProductClass").then(res => {
        this.getProductClass = res.data.data;
      //  / console.log(this.getProductClass);
        // 主要获取默认的第一个classid
        this.curitem = this.getProductClass[2];
        // console.log(this.curitem, "curitem");
        // 默认请求第一个分类的数据
        this.requstcase(this.curitem.class_id, 1, 6);
      });
    },
    // 请求案例
    requstcase(id, page, limit) {
      this.$axios
        .post("/index/api/getProductList", { id: id, page: page, limit: limit })
        .then(cases => {
          this.caseslide = cases.data.data.data;
          this.count = cases.data.data.total.length;
        // /  console.log(cases);
        });
    },
    getList(page) {
      this.requstcase(this.curitem.class_id, page, 6);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },
    todetail(item, index) {
      this.$router.push({ path: "/businessdetail", query: { id: item.article_id } });
    }
  },
  components: { tabbar, moPagination }
};
</script>

<style lang="less" scoped>
.business {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px 70px 25px;

  .caselist {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0px auto;
    li {
      cursor: pointer;
      box-sizing: border-box;
      display: inline-block;
      margin: 0px 5px;
      width: 48%;
      height: 310px;
      margin-bottom: 55px;
      .mainpic {
        width: 100%;
        height: 225px;
        position: relative;
        img {
          width: 89px;
          height: auto;
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .infos {
        margin-top: 25px;
        width: 100%;
        height: 70px;
        background: RGBA(248, 246, 247, 1);
        text-align: center;
        line-height: 70px;
        font-size: 30px;
        color: rgba(102, 102, 102, 1);
      }
      &:active .infos {
        background: rgba(50, 149, 43, 1);
        .name {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>

