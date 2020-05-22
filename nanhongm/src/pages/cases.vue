<template>
  <div class="product">
    <div class="productbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <div class="content">
        <!-- <curinfo :curinfo="curinfo" @change="tocurinfo"></curinfo> -->
        <ul class="goodslist">
          <li
            class="goodsli"
            v-for="(item, index) in goodsinfo"
            :key="index"
            @click="toCaseDetail(index,item)"
          >
            <div
              class="mainpic"
              :style="{backgroundImage: 'url('+httpUrl +item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div class="caseinfo">
              <p class="name">{{item.title}}</p>
              <p class="time text">工程日期：{{item.riqi}}年</p>
              <p class="area text">项目面积：{{item.mj}}</p>
              <p class="type text">使用机型：{{item.syjx}}</p>
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
  </div>
</template>
<script>
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
      count: 1, // 总记录数,
      curindex: 0,
      curinfoindex: 0,
      tabtitle: { a: "成功", b: "案例" },
      tabnav: ["工程项目", "家装项目"],
      goodsinfo: []
    };
  },
  created() {
    this.requst(0, 1, 6);
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      this.curindex = Number(idx);
    }
  },
  methods: {
    requst(type, page, limit) {
      this.$axios
        .post("/index/api/cgalList", { type: type, page: page, limit: limit })
        .then(res => {
          console.log(res, "res");
          this.goodsinfo = res.data.data.data;
          this.count = res.data.data.total;
        });
    },
    getList(page) {
      this.requst(this.curindex, page, 6);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    tonav(index) {
      console.log(index);
      this.curindex = index;
      this.requst(this.curindex, 1, 6);
    },
    // tocurinfo(mindex, item, e) {
    //   console.log(mindex, item);
    // },
    toCaseDetail(index, item) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.$router.push({
        path: "/detail",
        query: { id: item.id, kind: "case" }
      });
    }
  },

  components: { tabBar, moPagination, curinfo }
};
</script>

<style lang="less" scoped>
.product {
  width: 100%;
  .productbox {
    width: 100%;

    .content {
      box-sizing: border-box;
      padding: 40px 25px 70px 25px;
      .goodslist {
        box-sizing: border-box;
        padding-top: 15px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .goodsli {
          display: inline-block;
          width: 49%;
          box-sizing: border-box;
          margin-bottom: 25px;
          .mainpic {
            width: 100%;
            height: 380px;
            border-radius: 10px;
          }
          .caseinfo {
            box-sizing: border-box;
            padding: 22px 0 17px 18px;
            width: 100%;
            background: rgba(236, 236, 236, 1);
            border-radius: 10px;
            font-size: 24px;
            color: #5b5b5b;
            line-height: 35px;
            .name {
              font-size: 30px;
              color: #333333;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }
            .text {
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
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
}
</style>