<template>
  <div class="product">
    <!-- <banner></banner> -->
    <div class="productbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <div class="content">
        <curinfo
          :curinfo="curinfo"
          :curlist="curlist"
          :morecur="morecur"
          @change="tocurinfo"
          @set="curset"
        ></curinfo>
        <ul class="goodslist">
          <li
            class="goodsli"
            v-for="(item, index) in goodsinfo"
            @click="tocommoditydetails(index,item)"
            :key="index"
          >
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +httpUrl+item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="name">{{item.goods_name}}</p>
          </li>
        </ul>
      </div>
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
    <!-- 登录注册 -->
    <logregs v-if="logreg" @close="close"></logregs>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import tabBar from "../components/tabBar";
import curinfo from "../components/shopcurinfo";
import moPagination from "../components/pagenation";
import logregs from "../components/logreg";
import { mapState, mapActions } from "vuex";

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
      tabtitle: { a: "产品", b: "中心" },
      tabnav: [],
      classid: "",
      curinfo: [],
      arr: [],
      keyword: [],
      goodsinfo: [],
      morecur: [],
      curlist: []
    };
  },
  created() {
    this.requst();
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      this.curindex = Number(idx);
    }
  },
  computed: {
    ...mapState(["islogin", "logreg"])
  },
  methods: {
    ...mapActions(["getlogreg", "gettopath"]),
    requst(classid) {
      this.$axios.post("/index/shop/goodsClass").then(res => {
        this.curinfo = res.data.data;
        this.curlist = res.data.data.slice(0, 3);
        if (this.classid) {
          this.requstclass(this.classid);
          this.requstlist("", this.classid, 1, 6);
        } else {
          this.classid = this.curinfo[0].class_id;
          this.requstclass(this.classid);
          this.requstlist("", this.classid, 1, 6);
        }
      });
    },

    requstclass(classid) {
      this.$axios.post("/index/shop/productAttr", { id: classid }).then(res => {
        this.morecur = res.data.data;
        // 将分类添加进第一组
        let obj = { class_name: "分类" };
        obj.child = this.curinfo;
        this.morecur.unshift(obj);
        // console.log(this.morecur, "a");
      });
    },
    // 获取列表
    requstlist(keyword, id, page, limit) {
      this.$axios
        .post("/index/shop/goodsList", {
          keyword: keyword,
          id: id,
          page: page,
          limit: limit
        })
        .then(res => {
          // console.log(res, "aaaaaa");

          this.goodsinfo = res.data.data.data;
          this.count = res.data.data.total;
          // console.log(this.count, this.goodsinfo, "this.keyword");
        });
    }, // 大分类列表搜索

    tocurinfo(index, item) {
      // console.log(index, item);
      this.curindex = index;
      this.classid = item.class_id;
      this.requstclass(this.classid);
      this.requstlist("", this.classid, 1, 6);
      // this.reloadcur();
    },
    curset(keyword, classid) {
      this.classid = classid;
      this.requstlist(keyword, classid, 1, 6);
      this.$forceUpdate();
    },
    getList(page) {
      this.requstlist("", this.classid, page, 6);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    tonav(index) {
      //  console.log(index)
      this.curindex = index;
    },
    // 去详情
    tocommoditydetails(index, item) {
      if (this.islogin == false) {
        this.$dialog
          .confirm({
            title: "您还未登录，前往登录" //加上标题
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
    },
      close(e) {
      // console.log(e);
      this.getlogreg(e);
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
    box-sizing: border-box;
    padding: 60px 25px 70px 25px;
    .content {
      margin: 0 auto;
      .goodslist {
        // background: yellow;
        box-sizing: border-box;
        padding-top: 15px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .goodsli {
          cursor: pointer;
          display: inline-block;
          width: 49%;
          height: 350px;
          background: rgba(255, 255, 255, 1);
          border: 2px solid rgba(236, 236, 236, 1);
          border-radius: 10px;
          box-sizing: border-box;
          padding: 43px 0 0 0px;
          margin-bottom: 15px;
          .mainpic {
            transition: all 0.5s ease;
            width: 250px;
            height: 250px;
            margin: 0 auto;
          }
          .name {
            width: 100%;
            font-size: 30px;
            color: #333333;
            // line-height: 55px;
            text-align: center;
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
</style>

