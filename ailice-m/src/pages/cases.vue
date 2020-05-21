<template>
  <div class="cases">
    <tabbar :tabbar="caseinfo"></tabbar>
    <navbar :navbar="casenav" @changenav="casechangenav"></navbar>
    <ul class="caselist">
      <li
        class="pic"
        v-for="(item, index) in caseslide"
        :key="index"
        @click=" todetail(item, index)"
      >
        <div class="pics">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + baseurl+`/public/`+ item.image_url+ ')',
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
import httpUrl from "../api/url";
import moPagination from "../components/pagenation";
import tabbar from "../components/tabbar";
import navbar from "../components/navbar";
export default {
  name: "cases",
  data() {
    return {
      keyword: "",
      getProductClass: [],
      baseurl: "",
      curitem: "",
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      caseinfo: {
        normal: "案例",
        green: "展示",
        img: require("../assets/home/cases.png")
      },
      casenav: [],
      caseslide: []
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.keyword = this.$route.query.keywords;
    if (this.keyword) {
      this.requst(this.keyword);
    } else {
      this.requst();
    }
  },
  methods: {
    requst(keyword) {
      this.$axios.post("/index/api/getProductClass").then(res => {
        this.getProductClass = res.data.data;
        // 获取案例分类名字
        this.casenav = this.getProductClass[0].child;
        // 主要获取默认的第一个classid
        this.curitem = this.getProductClass[0].child[0];
        // 默认请求第一个分类的数据
        this.requstcase(this.curitem.class_id, 1, 6, keyword);
      });
    },
    // 请求案例
    requstcase(id, page, limit, keyword) {
      this.$axios
        .post("/index/api/getCasedList", {
          id: id,
          page: page,
          limit: limit,
          keyword: keyword
        })
        .then(cases => {
          this.caseslide = cases.data.data.data;
          this.count = cases.data.data.total;
          // console.log(this.caseslide);
        });
    },
    casechangenav(item, index) {
      // console.log(item, index);
      // 请求数据
      this.requstcase(item.class_id, 1, 6, this.keyword);
    },
    getList(page) {
      this.requstcase(this.curitem.class_id, page, 6, this.keyword);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    todetail(item, index) {
      this.$router.push({ path: "/detail", query: { id: item.article_id } });
    }
  },
  components: { tabbar, navbar, moPagination }
};
</script>

<style lang="less" scoped>
.cases {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px 70px 25px;

  .caselist {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 45px auto;
    li {
      cursor: pointer;
      box-sizing: border-box;
      display: inline-block;
      margin: 0px 5px;
      width: 48%;
      height: 310px;
      margin-bottom: 25px;
      .mainpic {
        transition: all 0.5s ease;
        width: 100%;
        height: 225px;
      }
      .infos {
        transition: all 0.5s ease;
        margin-top: 25px;
        width: 100%;
        height: 70px;
        background: RGBA(248, 246, 247, 1);
        text-align: center;
        line-height: 70px;
        font-size: 30px;
        color: rgba(102, 102, 102, 1);
        p {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
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