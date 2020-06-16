<template>
  <div class="home-product">
    <div class="bg">
      <div
        class="topbg lazypic"
        :style="{backgroundImage: 'url(' + require('../assets/home/topbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
      <div
        class="btbg lazypic"
        :style="{backgroundImage: 'url(' + require('../assets/home/btbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
    </div>
    <div class="content">
      <div class="cont-left">
        <div class="icon" id="proicon">
          <transition name="trans-pro">
            <img v-if="trans" src="../assets/home/homeproduct/chcp.png" alt />
          </transition>
        </div>
        <transition name="trans-prolfli">
          <ul class="cllist" v-if="trans">
            <li
              class="clli"
              v-for="(item, index) in res"
              :key="index"
              :class="proClass ==index?'show':''"
            >
              <div class="cllibox" @click="toNav(item,index)">
                <p>{{item.class_name}}</p>
                <div class="arrow">
                  <img src="../assets/home/jt.png" alt />
                </div>
              </div>
            </li>
          </ul>
        </transition>
      </div>
      <div class="cont-right">
        <div class="crtop">
          <transition name="trans-rtpro">
            <ul class="prolist" v-if="trans">
              <li class="proli" v-for="(item, index) in prolista" :key="index">
                <div
                  v-if="item.image_url"
                  class="mainpic lazypic"
                  @click="todetail(item)"
                  v-lazy:background-image="baseurl+`/public/`+item.image_url"
                ></div>
                <p class="title">{{item.article_title}}</p>
                <div class="todetail" @click="todetail(item)">
                  <span>{{item.article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </li>
            </ul>
          </transition>
        </div>
        <div class="crcenter probox">
          <transition name="centera">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[0]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistb[0])"
                  v-lazy:background-image="baseurl+`/public/` + prolistb[0].image_url"
                ></div>
                <p class="title">{{prolistb[0].article_title}}</p>
                <div class="todetail" @click="todetail(prolistb[0])">
                  <span>{{prolistb[0].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="centerb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[1]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistb[1])"
                  v-lazy:background-image="baseurl+`/public/` + prolistb[1].image_url"
                ></div>
                <p class="title">{{prolistb[1].article_title}}</p>
                <div class="todetail" @click="todetail(prolistb[1])">
                  <span>{{prolistb[1].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="centerc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[2]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistb[2])"
                  v-lazy:background-image="baseurl+`/public/`+ prolistb[2].image_url"
                ></div>
                <p class="title">{{prolistb[2].article_title}}</p>
                <div class="todetail" @click="todetail(prolistb[2])">
                  <span>{{prolistb[2].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="centerd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[3]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistb[3])"
                  v-lazy:background-image="baseurl+`/public/`+  prolistb[3].image_url"
                ></div>
                <p class="title">{{prolistb[3].article_title}}</p>
                <div class="todetail" @click="todetail(prolistb[3])">
                  <span>{{prolistb[3].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="ctbt probox">
          <transition name="proarra">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[0]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistc[0])"
                  v-lazy:background-image="baseurl+`/public/` +  prolistc[0].image_url"
                ></div>
                <p class="title">{{prolistc[0].article_title}}</p>
                <div class="todetail" @click="todetail(prolistc[0])">
                  <span>{{prolistc[0].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="proarrb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[1]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistc[1])"
                  v-lazy:background-image="baseurl+`/public/` + prolistc[1].image_url"
                ></div>
                <p class="title">{{prolistc[1].article_title}}</p>
                <div class="todetail" @click="todetail(prolistc[1])">
                  <span>{{prolistc[1].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="proarrc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[2]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistc[2])"
                  v-lazy:background-image="baseurl+`/public/` + prolistc[2].image_url"
                ></div>
                <p class="title">{{prolistc[2].article_title}}</p>
                <div class="todetail" @click="todetail(prolistc[2])">
                  <span>{{prolistc[2].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="proarrd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[3]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistc[3])"
                  v-lazy:background-image="baseurl+`/public/` + prolistc[3].image_url"
                ></div>
                <p class="title">{{prolistc[3].article_title}}</p>
                <div class="todetail" @click="todetail(prolistc[3])">
                  <span>{{prolistc[3].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- 分页 -->

    <div class="more" @click="toproduct">
      <p>查看更多</p>
    </div>
  </div>
</template>

<script>
import moPagination from "../components/pagenation";
import httpUrl from "../utils/url";
export default {
  name: "homeproduct",
  data() {
    return {
      baseurl: "",
      pageSize: 12, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      trans: false,
      proClass: 0,
      navlist: [],
      prolista: [],
      prolistb: [],
      prolistc: [],
      class_id: "",
      res: [],
      infos: []
    };
  },
  created() {
    this.requst();
    this.baseurl = httpUrl.httpUrl;
  },
  methods: {
    todetail(item) {
      // console.log(item);
      let id = item.article_id;

      this.$router.push({
        path: "/detail",
        query: { id: id, kind: "product" }
      });
      // 跳转回到初始位置
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // 刷新页面
      this.$router.go(0);
    },
    toproduct() {
      this.$router.push({ path: "/product", query: { id: this.class_id } });
      sessionStorage.setItem("curindex", 1);
      let leftindex = sessionStorage.getItem("prolfindex");
      sessionStorage.setItem("productClass", leftindex);
      // console.log(leftindex);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // 刷新页面
      this.$router.go(0);
    },
    // 请求数据
    requst() {
      this.$axios.post("/index/api/getProductClass").then(respro => {
        this.res = respro.data.data;
        this.class_id = this.res[0].class_id;
        this.requstKind(this.class_id, 1);
      });
    },
    requstKind(val, page) {
      this.$axios
        .post("/index/api/getProductList", {
          id: val,
          limit: 12,
          page: page
        })
        .then(res => {
          // console.log(res);

          this.count = res.data.data.total.length;
          this.prolista = res.data.data.data.slice(0, 4);
          this.prolistb = res.data.data.data.slice(4, 8);
          this.prolistc = res.data.data.data.slice(8, 12);
        });
    },
    getList(page) {
      this.requstKind(this.class_id, page);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },
    toNav(item, index) {
      this.proClass = index;
      // 存储产品分类下标
      sessionStorage.setItem("prolfindex", index);
      this.class_id = item.class_id;
      this.requstKind(this.class_id);
    }
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    srcoll(val) {
      if (val <= 300) {
        this.trans = false;
      } else {
        this.trans = true;
      }
    }
  },
  props: ["srcoll"],
  components: { moPagination }
};
</script>
<style lang="less" scoped>
// 左边
.trans-pro-enter-active {
  transition: all 1.5s ease-in-out;
}
.trans-prolfli-enter-active {
  transition: all 2s ease-in-out;
}
.trans-pro-enter,
.trans-prolfli-enter {
  transform: translateX(-100px);
}
// 右边
.trans-rtpro-enter-active {
  transition: all 1s linear;
  opacity: 1;
}
.trans-rtpro-enter {
  opacity: 0.5;
}
// 右中
.centera-enter-active {
  transition: all 0.5s linear;
}
.centerb-enter-active {
  transition: all 1s linear;
}
.centerc-enter-active {
  transition: all 1.5s linear;
}
.centerd-enter-active {
  transition: all 2s linear;
}
.centera-enter,
.centerb-enter,
.centerc-enter,
.centerd-enter {
  transform: translateY(30px);
}
// 右下
.proarra-enter-active {
  transition: all 2.5s ease-in-out;
}
.proarrb-enter-active {
  transition: all 3s ease-in-out;
}
.proarrc-enter-active {
  transition: all 3.5s ease-in-out;
}
.proarrd-enter-active {
  transition: all 4s ease-in-out;
}

.proarra-enter,
.proarrb-enter,
.proarrc-enter,
.proarrd-enter {
  transform: translateY(40px);
}
.home-product {
  width: 100%;
  height: 1150px;
  position: relative;

  .bg {
    width: 100%;
    height: 1150px;
    position: absolute;
    top: 0px;
    left: 0;
    z-index: -1;
    .topbg {
      width: 100%;
      height: 280px;
    }
    .btbg {
      width: 100%;
      height: 870px;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    .cont-left {
      box-sizing: border-box;
      width: 20%;
      padding: 68px 0 0 7px;
      text-align: center;
      .icon {
        height: 200px;
        img {
          height: 100%;
        }
      }
      .cllist {
        margin: 30px auto;
        width: 240px;
        border-top: 4px solid #82c41c;
        color: white;
        .clli {
          cursor: pointer;
          margin: 0 auto;
          width: 200px;
          border-bottom: 1px dashed #f5f5f5;
          .cllibox {
            box-sizing: border-box;
            width: 100%;
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            margin: 10px auto;
            padding: 0px 5%;
          }
          &:hover .cllibox {
            background: #82c41c;
          }
        }
        .show {
          .cllibox {
            background: #82c41c;
          }
        }
      }
    }
    .cont-right {
      box-sizing: border-box;
      width: 80%;
      height: 100%;
      margin: 230px 0 0 0;
      padding-right: 20px;
      .proli {
        height: 230px;
        position: relative;
        .mainpic {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .title {
          background: rgba(0, 0, 0, 1);
          opacity: 0.6;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: white;
          font-size: 14px;
        }
        .todetail {
          box-sizing: border-box;
          width: 100%;
          height: 40px;
          background: #82c41c;
          opacity: 0.9;
          position: absolute;
          bottom: 0;
          left: 0;
          color: white;
          font-size: 14px;
          line-height: 40px;
          padding: 0 20px;
          display: none;
        }
        &:hover .title {
          display: none;
        }
        &:hover .todetail {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
        }
      }
      .crtop {
        width: 100%;
        margin-bottom: 20px;
        .prolist {
          width: 100%;
          height: 100%;
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: space-between;
          display: grid;
          grid-template-columns: repeat(4, 4fr);
          grid-gap: 20px;
          .proli {
            width: 100%;
          }
        }
      }
      .probox {
        width: 100%;
        height: 100%;
        // display: flex;
        // justify-content: space-between;
        // flex-wrap: wrap;
        display: grid;
        grid-template-columns: repeat(4, 4fr);
        grid-gap: 20px;
        margin-bottom: 20px;
        .prolist {
          width: 100%;
          height: 100%;
          .proli {
            width: 100%;
          }
        }
      }
    }
  }

  .more {
    cursor: pointer;
    position: absolute;
    bottom: 90px;
    left: 55%;
    background: #82c41c;
    color: #f5f5f5;
    text-align: center;
    width: 100px;
    height: 40px;
    line-height: 40px;
    &:active {
      background: #f5f5f5;
      color: #82c41c;
    }
  }
}
.lazypic {
  background-size: cover;
  background-repeat: no-repeat;
  background-repeat: no-repeat;
}
</style>