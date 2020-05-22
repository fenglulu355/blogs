<template>
  <div class="shoppingmall">
    <!-- <banner></banner> -->
    <div class="selectbox">
      <ul class="seleclist">
        <!-- 产品分类 -->
        <li class="selecli">
          <el-select v-model="proclassname" collapse-tags placeholder="产品分类" @change="getproclass">
            <el-option
              v-for="(item,index) in proclass"
              :key="index"
              :label="item.class_name"
              :value="item.class_name"
            ></el-option>
          </el-select>
        </li>
        <!-- 其它选项 -->
        <li class="selecli" v-for="(item, index) in proattr" :key="index">
          <!-- <selection :options="item.child" @selected="toproattr" :placeholder="item.class_name"></selection> -->
          <el-select
            v-model="value[index]"
            multiple
            collapse-tags
            :placeholder="item.class_name"
            @change="changeai"
          >
            <el-option v-for="(item,i) in item.child" :key="i" :label="item" :value="item"></el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <div class="goods">
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
          <div class="goodsinfo">
            <p class="name">{{item.goods_name}}</p>
            <p class="price">
              <span class="oldprice">原价￥{{item.platform_price}}</span>
              <span class="nowprice">最低价￥{{item.goods_price}}</span>
            </p>
            <p class="num">
              销量:{{item.goods_discount}}
              <span>/</span>
              库存:{{item.goods_number}}
            </p>
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
    <!-- 登录注册 -->
    <logregs v-if="logreg" @close="close"></logregs>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import moPagination from "../components/pagenation";
import selection from "../components/select";
import logregs from "../components/logreg";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "shoppingcar",
  name: "product",
  provide() {
    return {
      reloadcur: this.reloadcur
    };
  },
  data() {
    return {
      islogreg: false,
      iscar: false,
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      iscurinfo: true, //刷新
      proclass: [],
      proattr: [],
      class_id: null,
      goodsinfo: [],
      value: [],
      proclassname: []
    };
  },
  created() {
    this.requst();
  },
  computed: {
    ...mapState(["islogin", "logreg"])
  },
  methods: {
    ...mapActions(["getlogreg", "gettopath"]),
    requst(classid) {
      this.$axios.post("/index/shop/goodsClass").then(res => {
        this.proclass = res.data.data;
        this.class_id = this.proclass[0].class_id;
        this.requstattr(this.class_id);
        this.requstlist("", this.class_id, 1, 6);
        console.log(this.proclass, "  this.select");
        // let tavnav = JSON.stringify(this.tabnav);
        // sessionStorage.setItem("tabnav", tavnav);
        // if (this.classid) {
        //   this.requstclass(this.classid);
        //   this.requstlist("", this.classid, 1, 6);
        // } else {
        //   this.classid = this.tabnav[0].class_id;
        //   this.requstclass(this.classid);
        //   this.requstlist("", this.classid, 1, 6);
        // }
      });
    },
    // 分类属性
    requstattr(id) {
      this.$axios
        .post("/index/shop/productAttr", {
          id: id
        })
        .then(res => {
          this.proattr = res.data.data;

          console.log(this.proattr, "   this.proattr ");
        });
    },
    // 产品列表
    requstlist(keyword, id, page, limit) {
      this.$axios
        .post("/index/shop/goodsList", {
          keyword: keyword,
          id: id,
          page: page,
          limit: limit
        })
        .then(res => {
          console.log(res, "pro");
          this.goodsinfo = res.data.data.data;
          this.count = res.data.data.total;
        });
    },
    // 切换产品分类
    getproclass() {
      let id = null;
      for (let i = 0, len = this.proclass.length; i < len; i++) {
        if (this.proclass[i].class_name == this.proclassname) {
          id = this.proclass[i].class_id;
        }
      }
      this.class_id = id;
      this.requstlist("", this.class_id, 1, 6);
      this.requstattr(this.class_id);
      this.value = []; //清空条件
    },
    // //切换属性
    changeai() {
      let b = this.encodeArray2D(this.value);
      console.log(b);
      this.requstlist(b, this.classid, 1, 6);
    },
    // 处理搜索条件
    encodeArray2D(obj) {
      var array = [];
      for (var i = 0; i < obj.length; i++) {
        array[i] = obj[i].join("|");
      }
      return array.join(",");
    },
    // 分页
    getList(page) {
      this.requstlist("", this.class_id, page, 6);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },
    // 跳转至商品详情
    tocommoditydetails(index, item) {
      if (this.islogin == false) {
        this.$confirm("您还未登录，前往登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
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
  components: { banner, moPagination, selection, logregs }
};
</script>

<style lang="less" scoped>
.shoppingmall {
  width: 100%;
  // position: relative;
  .selectbox {
    width: 100%;
    // height: 60px;
    background: rgba(245, 245, 245, 1);
    // text-align: center;
    .seleclist {
      width: 1200px;
      // height: 60px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .selecli {
        width: 145px;
      }
    }
  }
  .goods {
    width: 1200px;
    margin: 0 auto;
    .goodslist {
      box-sizing: border-box;
      padding-top: 50px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 14px;
      .goodsli {
        cursor: pointer;
        display: inline-block;
        width: 390px;
        height: 495px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(236, 236, 236, 1);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 50px 0 0 0px;
        .mainpic {
          transition: all 0.5s ease;
          width: 288px;
          height: 288px;
          margin: 0 auto;
        }
        .goodsinfo {
          height: 150px;
          width: 100%;
          color: rgba(51, 51, 51, 1);
          text-align: center;
          box-sizing: border-box;
          padding-top: 26px;
          line-height: 30px;
          position: relative;
          .price {
            .oldprice {
              color: rgba(102, 102, 102, 1);
              text-decoration: line-through;
            }
            span {
              margin: 0 10px;
            }
          }
          .num {
            position: absolute;
            bottom: 0;
            right: 15px;
            color: rgba(153, 153, 153, 1);
            font-size: 14px;
          }
        }
        &:hover {
          border: 1px solid rgba(153, 153, 153, 1);
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
<style>
.el-input__inner {
  border: none !important;
  height: 60px !important;
  padding: 0 0 !important;
  background: rgba(245, 245, 245, 1) !important;
  border-radius: 0 !important;
}
.el-input__inner {
  color: rgba(36, 130, 200, 1) !important;
}
.el-input__inner::placeholder {
  color: rgba(51, 51, 51, 0.8) !important;
}
.el-select-dropdown__item.selected {
  color: rgba(36, 130, 200, 1) !important;
  font-weight: 400 !important;
}
.el-select-dropdown__item:hover {
  color: rgba(36, 130, 200, 1);
}
</style>