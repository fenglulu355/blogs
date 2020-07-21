<template>
  <div class="evaluate">
    <tabbar :tabbar="caseinfo"></tabbar>
    <ul class="caselist">
      <li
        class="pic"
        v-for="(item, index) in caseslide"
        @click=" todetail(item, index)"
        :key="index"
      >
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' +baseurl+`/public/`+ item.image_url+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
        ></div>
        <div class="infos">
          <p class="title">{{item.article_title}}</p>
          <p class="time">{{item.created_time}}</p>
          <p class="content" v-html="item.article_content"></p>
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
  name: "evaluate",
  data() {
    return {
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      caseinfo: {
        normal: "客户",
        green: "评价",
        img: require("../assets/tabbar/evaluate.png")
      },
      caseslide: []
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
        // console.log(this.getProductClass);
        // 主要获取默认的第一个classid
        this.curitem = this.getProductClass[2];
        // console.log(this.curitem);
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
          // console.log(cases);
        });
    },
    getList(page) {
        this.requstcase(this.curitem.class_id, page, 6);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    todetail(item, index) {
      this.$router.push({ path: "/evadetail", query: { id: item.article_id } });
    }
  },
  components: { tabbar, moPagination }
};
</script>

<style lang="less" scoped>
.evaluate {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px 70px 25px;

  .caselist {
    width: 100%;
    margin: 45px auto;
    border-bottom: 1px solid rgba(204, 204, 204, 1);
    li {
      cursor: pointer;
      box-sizing: border-box;
      display: inline-block;
      border-top: 1px solid rgba(204, 204, 204, 1);
      width: 100%;
      height: 245px;
      padding-top: 38px;
      display: flex;
      justify-content: flex-start;
      .mainpic {
        width: 244px;
        height: 170px;
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
        width: calc(100% - 250px);
        box-sizing: border-box;
        padding-left: 25px;
        .name {
          font-size: 32px;
          color: rgba(50, 149, 43, 1);
          font-weight: bold;
        }
        .time {
          font-size: 24px;
          color: rgba(153, 153, 153, 1);
          padding-top: 20px;
        }
        .content {
          padding-top: 10px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }
      &:active {
        background: rgba(50, 149, 43, 1);
        .name,
        .time,
        .content {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>

