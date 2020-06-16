<template>
  <div class="product" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- <banner></banner> -->
    <div class="productbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <div class="content">
        <curinfo :curinfo="curinfo" @change="tocurinfo" v-if="iscurinfo"></curinfo>
        <ul class="goodslist">
          <li class="goodsli" v-for="(item, index) in goodsinfo" :key="index">
            <!-- @click="topro(item,index)" -->
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +httpUrl+item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="name">{{item.article_title}}</p>
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
      goodsinfo: []
    };
  },
  created() {
    this.classid = this.$route.query.classid;
    this.requst();
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      this.curindex = Number(idx);
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 600;
  },
  methods: {
    // 获取分类id、
    requst(classid) {
      this.$axios.post("/index/api/productClass").then(res => {
        this.tabnav = res.data.data;
        let tavnav = JSON.stringify(this.tabnav);
        sessionStorage.setItem("tabnav", tavnav);
        if (this.classid) {
          this.requstclass(this.classid);
          this.requstlist("", this.classid, 1, 6);
        } else {
          this.classid = this.tabnav[0].class_id;
          this.requstclass(this.classid);
          this.requstlist("", this.classid, 1, 6);
        }
      });
    },
    // 获取种类分类
    requstclass(classid) {
      this.$axios.post("/index/api/productAttr", { id: classid }).then(res => {
        this.curinfo = res.data.data;
        for (let i = 0; i < this.curinfo.length; i++) {
          this.arr.push([]);
        }
      });
    },
    // 获取列表
    requstlist(keyword, id, page, limit) {
      this.$axios
        .post("/index/api/productList", {
          keyword: keyword,
          id: id,
          page: page,
          limit: limit
        })
        .then(res => {
          this.fullscreenLoading = true;
          if (this.goodsinfo) {
            this.fullscreenLoading = false;
          }
          this.goodsinfo = res.data.data.data;
          this.count = res.data.data.total;

          console.log(this.count, this.goodsinfo, "this.keyword");
        });
    }, // 大分类列表搜索
    tonav(index, item) {
      this.curindex = index;
      this.classid = item.class_id;
      this.requstclass(this.classid);
      this.requstlist("", this.classid, 1, 6);
      this.reloadcur();
    },
    getList(page) {
      // this.requstKind(this.class_id, page);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },

    tocurinfo(mindex, index, item, items, e) {
      if (this.arr[index].indexOf(items) == -1) {
        this.arr[index].push(items);
      } else {
        this.arr[index].splice(this.arr[index].indexOf(items), 1);
      }
      let b = this.encodeArray2D(this.arr);
      this.requstlist(b, this.classid, 1, 6);
      console.log(b, "a");
    },
    encodeArray2D(obj) {
      var array = [];
      for (var i = 0; i < obj.length; i++) {
        array[i] = obj[i].join("|");
      }
      return array.join(",");
    },
    reloadcur() {
      let self = this;
      self.iscurinfo = false;
      self.$nextTick(function() {
        self.iscurinfo = true;
      });
    },
    topro(item, index) {
      console.log(item);
      this.$router.push({
        path: "/prodetails",
        query: { classid: item.class_id, id: item.article_id }
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
