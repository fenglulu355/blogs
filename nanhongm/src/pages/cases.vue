<template>
  <div class="product">
    <div class="productbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <div class="content">
        <curinfo :curinfo="curinfo" @change="tocurinfo"></curinfo>
        <ul class="goodslist">
          <li
            class="goodsli"
            v-for="(item, index) in goodsinfo"
            :key="index"
            @click="toCaseDetail(index,item)"
          >
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +item.pic+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div class="caseinfo">
              <p class="name">{{item.name}}</p>
              <p class="time text">工程日期：{{item.time}}年</p>
              <p class="area text">项目面积：{{item.area}}</p>
              <p class="type text">使用机型：{{item.type}}</p>
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
      count: 300, // 总记录数,
      curindex: 0,
      curinfoindex: 0,
      tabtitle: { a: "成功", b: "案例" },
      tabnav: ["工程项目", "家装项目"],
      curinfo: [
        { name: "功率", info: ["不限", "1p", "1.5p", "2p", "3p", "5p"] },
        { name: "种类", info: ["不限", "定频", "变频"] },
        { name: "能效", info: ["不限", "一级", "二级", "三级"] },
        {
          name: "面积",
          info: ["不限", "一居", "二居", "三居", "四居", "跃层", "别墅"]
        }
      ],
      goodsinfo: [
        {
          pic: require("../assets/news/lb.png"),
          name: "中央空调多联机中央空调多联机中央空调多联机",
          time: "2017",
          area: "30000",
          type: "中央空调多联机中央空调多联机中央空调多联机"
        },
        {
          pic: require("../assets/case/case1.png"),
          name: "洗衣机",
          time: "2017",
          area: "30000",
          type: "中央空调多联机"
        },
        {
          pic: require("../assets/case/case1.png"),
          name: "洗衣机",
          time: "2017",
          area: "30000",
          type: "中央空调多联机"
        },
        {
          pic: require("../assets/case/case1.png"),
          name: "洗衣机",
          time: "2017",
          area: "30000",
          type: "中央空调多联机"
        },
        {
          pic: require("../assets/case/case1.png"),
          name: "洗衣机",
          time: "2017",
          area: "30000",
          type: "中央空调多联机"
        },
        {
          pic: require("../assets/case/case1.png"),
          name: "洗衣机",
          time: "2017",
          area: "30000",
          type: "中央空调多联机"
        }
      ]
    };
  },
  created() {
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      this.curindex = Number(idx);
    }
  },
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
      console.log(index);
      this.curindex = index;
    },
    tocurinfo(mindex, item, e) {
      console.log(mindex, item);
    },
    toCaseDetail(index, item) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.$router.push({
        path: "/detail",
        query: { id: index, kind: "case" }
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