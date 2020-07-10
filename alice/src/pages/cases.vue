<template>
  <div class="cases">
    <banner></banner>
    <div class="casebox common">
      <div class="topbox">
        <p class="icon">
          <img src="../assets/home/icon.png" alt />
        </p>
        <p class="pic">
          <img src="../assets/home/case1.png" alt />
        </p>
        <p class="title">
          <span class="white">案例</span>
          <span class="span">展示</span>
        </p>
        <p class="text">ALICE LANDSCAPE ENGINEERING COMMITTED TO THE CREATION OF BOUTIQUE LANDSCAPE</p>
      </div>
      <ul class="casenav">
        <li
          class="caseli"
          v-for="(item, index) in caseli"
          :key="index"
          :class="caseindex==index?'casecur':''"
          @click="changecaseindex(index,item)"
        >
          <p>{{item.class_name}}</p>
        </li>
      </ul>
      <div class="caseinfo">
        <ul class="warpper">
          <li
            class="pic"
            v-for="(item, index) in caseslide"
            @click="todetail(item,index)"
            :key="index"
          >
            <div class="pics">
              <div class="mainpicbox">
                <div
                  class="mainpic lazypic"
                  v-lazy:background-image="baseurl+`/public/`+item.image_url"
                ></div>
              </div>
              <div class="infos clearFix">
                <p class="name fl">{{item.article_title}}</p>
                <img class="green fr" src="../assets/home/case2.png" alt />
                <img class="white fr" src="../assets/home/case2-1.png" alt />
              </div>
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
  name: "cases",
  data() {
    return {
      getProductClass: [],
      baseurl: "",
      // 分页
      pageSize: 9, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 0, // 总记录数,
      caseli: [],
      caseindex: 0,
      curitem: "",
      caseslide: [],
      keyword: ""
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
        this.caseli = this.getProductClass[0].child;
        // 主要获取默认的第一个classid
        this.curitem = this.getProductClass[0].child[0];
        // 默认请求第一个分类的数据
        this.requstcase(this.curitem.class_id, 1, 9, keyword);
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
          // console.log(this.count);
        });
    },
    // 切换案例
    changecaseindex(index, item) {
      this.caseindex = index;
      // 重新获取当前被选择的
      this.currentPage = 0;
      this.curitem = item;
      this.requstcase(item.class_id, 1, 9, this.keyword);
    },
    getList(page) {
      this.requstcase(this.curitem.class_id, page, 9, this.keyword);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    todetail(item, index) {
      // console.log(item);
      //
      this.$router.push({ path: "/detail", query: { id: item.article_id } });
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
.cases {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 80px;
  .casenav {
    height: 70px;
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    .caseli {
      display: inline-block;
      margin: 0 9px;
      cursor: pointer;
      width: 279px;
      height: 65px;
      border: 1px solid rgba(194, 189, 196, 0.8);
      color: rgba(102, 102, 102, 1);
      font-size: 18px;
      line-height: 65px;
      text-align: center;
      &:hover {
        transition: color 0.5s ease;
        width: 275px;
        height: 60px;
        line-height: 60px;
        border: 3px solid rgba(50, 149, 43, 1);
        color: rgba(50, 149, 43, 1);
        font-weight: bold;
      }
    }
    .casecur {
      width: 275px;
      height: 60px;
      line-height: 60px;
      border: 3px solid rgba(50, 149, 43, 1);
      color: rgba(50, 149, 43, 1);
      font-weight: bold;
    }
  }
  .caseinfo {
    box-sizing: border-box;
    padding-top: 40px;
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
        width: 393px;
        height: 320px;
        margin: 10px 0 40px 0;

        .mainpicbox {
          width: 100%;
          height: 233px;
          overflow: hidden;
          .mainpic {
            width: 100%;
            height: 100%;
            transition: all 0.5s ease;
          }
        }
        .infos {
          margin-top: 10px;
          width: 394px;
          height: 74px;
          background: RGBA(248, 246, 247, 1);
          .name {
            width: 196px;
            text-align: center;
            box-sizing: border-box;
            padding: 10px 0;
            border-top: 1px solid rgba(153, 153, 153, 1);
            border-bottom: 1px solid rgba(153, 153, 153, 1);
            color: rgba(102, 102, 102, 1);
            font-size: 18px;
            font-weight: bold;
            position: relative;
            left: 95px;
            top: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .green {
            display: block;
          }
          .white {
            display: none;
          }
        }
        &:hover {
          .mainpic {
            transform: scale(1.1);
          }
          .infos {
            transition: all 0.5s ease;
            background: rgba(50, 149, 43, 1);
            .name {
              border-top: 1px solid rgba(255, 255, 255, 1);
              border-bottom: 1px solid rgba(255, 255, 255, 1);
              color: rgba(255, 255, 255, 1);
            }
            .green {
              display: none;
            }
            .white {
              display: block;
            }
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