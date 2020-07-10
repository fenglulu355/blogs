<template>
  <div class="product">
    <!-- <banner></banner> -->
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
      count: 1, // 总记录数,
      curindex: 0,
      curinfoindex: 0,
      tabtitle: { a: "成功", b: "案例" },
      tabnav: [{ class_name: "工程项目" }, { class_name: "家装项目" }],
      goodsinfo: []
    };
  },
  created() {
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
      this.requst(0, 1, 6);
    } else {
      this.curindex = Number(idx);
      this.requst(this.curindex, 1, 6);
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 600;
  },
  methods: {
    requst(type, page, limit) {
      this.$axios
        .post("/index/api/cgalList", { type: type, page: page, limit: limit })
        .then(res => {
          // console.log(res, "res");
          this.goodsinfo = res.data.data.data;
          this.count = res.data.data.total;
        });
    },
    getList(page) {
      this.requst(this.curindex, page, 6);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },
    tonav(index) {
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
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .goodsli {
          cursor: pointer;
          display: inline-block;
          width: 380px;
          height: 438px;
          box-sizing: border-box;
          margin-bottom: 50px;
          .mainpic {
            transition: all 0.5s ease;
            width: 380px;
            height: 283px;
            border-radius: 10px;
          }
          .caseinfo {
            box-sizing: border-box;
            margin-top: 10px;
            padding: 22px 0 0 27px;
            width: 380px;
            height: 145px;
            background: rgba(236, 236, 236, 1);
            border-radius: 10px;
            font-size: 16px;
            color: rgba(91, 91, 91, 1);
            line-height: 28px;
            .name {
              font-size: 18px;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
            }
            .text {
              font-size: 16px;
            }
          }
          &:hover .caseinfo {
            transition: background-color 0.5s ease;
            background: rgba(36, 130, 200, 1);
            color: white;
            .name {
              color: white;
            }
          }
        }
      }
    }
  }
  .mo-paging {
    width: 100%;
    text-align: center;
  }
}
</style>