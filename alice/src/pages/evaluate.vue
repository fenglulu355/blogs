<template>
  <div class="evaluate">
    <banner></banner>
    <div class="casebox common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/eva/01.png" alt />
        </p>
        <p class="title">
          <span class="white">客户</span>
          <span class="span">评价</span>
        </p>
        <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIQUE LANDSCAPE</p>
      </div>
      <div class="caseinfo">
        <ul class="warpper">
          <li
            class="pic"
            v-for="(item, index) in caseslide"
            :key="index"
            @click="todetail(item,index)"
          >
            <div class="pics">
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
            </div>
            <div class="hover">
              <p class="title">{{item.article_title}}</p>
              <p class="time">{{item.created_time}}</p>
              <p class="content" v-html="item.article_content"></p>
            </div>
          </li>
        </ul>
      </div>
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
import banner from "../components/banner";
import moPagination from "../components/pagenation";
import httpUrl from "../api/url";
export default {
  name: "evaluate",
  data() {
    return {
      getProductClass: [],
      baseurl: "",
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      caseli: [],
      caseindex: 0,
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
        this.curitem = this.getProductClass[3];
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
    changecaseindex(index) {
      this.caseindex = index;
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
      // console.log( item)
      this.$router.push({
        path: "/evadetails",
        query: { id: item.article_id }
      });
    }
  },
  components: { banner, moPagination }
};
</script>

<style lang="less" scoped>
.common {
  box-sizing: border-box;
  padding-top: 50px;
  .topbox {
    box-sizing: border-box;
    padding-bottom: 35px;
    text-align: center;
    .icon {
      img {
        width: 50px;
      }
    }
    .pic {
      box-sizing: border-box;
      padding: 10px 0;
    }
    .title {
      font-size: 26px;
      .white {
        color: rgba(51, 51, 51, 1);
        position: relative;
        &::before {
          content: "";
          width: 40px;
          height: 1px;
          background: rgba(153, 153, 153, 1);
          position: absolute;
          top: 50%;
          left: -60px;
        }
      }
      .span {
        color: rgba(50, 149, 43, 1);
        position: relative;
        &::before {
          content: "";
          width: 40px;
          height: 1px;
          background: rgba(153, 153, 153, 1);
          position: absolute;
          top: 50%;
          right: -60px;
        }
      }
    }
    .text {
      box-sizing: border-box;
      padding-top: 22px;
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
    }
  }
  .more {
    box-sizing: border-box;
    padding: 50px 0;
    .tomore {
      cursor: pointer;
      text-align: center;
      margin: 0px auto;
      width: 160px;
      height: 40px;
      border: 1px solid rgba(50, 149, 43, 1);
      color: rgba(50, 149, 43, 1);
      font-size: 16px;
      line-height: 40px;
    }
  }
}
.evaluate {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 80px;
  .caseinfo {
    box-sizing: border-box;
    // padding-top: 40px;
    margin: 0px auto;
    position: relative;
    width: 1200px;
    .warpper {
      width: 1200px;
      margin: 0px auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      li {
        cursor: pointer;
        box-sizing: border-box;
        width: 385px;
        height: 340px;
        margin: 10px 0 40px 0;
        position: relative;
        .mainpic {
          transition: all 0.5s ease;
          width: 100%;
          height: 151px;
        }
        .infos {
          width: 385px;
          height: 189px;
          background: RGBA(251, 248, 249, 1);
          box-sizing: border-box;
          padding: 0 16px 35px 16px;
          .title {
            color: rgba(50, 149, 43, 1);
            font-size: 18px;
            font-weight: bold;
            box-sizing: border-box;
            padding: 33px 0 10px 0;
          }
          .time {
            color: rgba(153, 153, 153, 1);
            font-size: 14px;
          }
          .content {
            margin-top: 23px;
            color: rgba(51, 51, 51, 1);
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
            line-height: 25px;
          }
        }
        .hover {
          width: 385px;
          height: 340px;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.7);
          box-sizing: border-box;
          padding: 65px 27px 0 27px;
          text-align: center;
          opacity: 0;
          .title {
            color: white;
            font-size: 18px;
            font-weight: bold;
            box-sizing: border-box;
            padding: 0px 0 13px 0;
          }
          .time {
            color: rgba(153, 153, 153, 1);
            font-size: 14px;
          }
          .content {
            margin-top: 33px;
            color: white;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            word-break: break-all;
            line-height: 25px;
          }
        }
        &:hover {
          .mainpic {
            transition: all 0.6s ease;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
          .hover {
            transition: all 0.5s ease;
            opacity: 1;
          }
        }
      }
    }
  }
  .mo-paging {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 40px 0 70px 0;
  }
}
</style>