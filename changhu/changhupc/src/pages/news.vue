<template>
  <div class="product">
    <div class="bg">
      <div
        class="topbg lazypic"
        :style="{backgroundImage: 'url(' + require('../assets/home/tpbanner.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
      <div
        class="ctbg lazypic"
        :style="{backgroundImage: 'url(' + require('../assets/mainbg.png')+ ')',
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
            <img v-if="trans" src="../assets/news/news.png" alt />
          </transition>
        </div>

        <div class="chpoint">
          <transition name="trans-prolfli">
            <div v-if="trans" class="point-cont">
              <div class="pc-top">
                <p class="cname">长湖观点</p>
                <p class="ename">Changhu Guandian</p>
              </div>
              <div class="tpic" v-if="point[0]" @click="todetail(point[0])">
                <div
                  class="mainpic lazypic"
                  v-lazy:background-image=" baseurl+`/public/`+point[0].image_url"
                ></div>
                <p class="title" @click="todetail(point[1])">{{point[1].article_title}}</p>
              </div>
              <div class="bpic" v-if="point[2]" @click="todetail(point[2])">
                <div
                  class="mainpic lazypic"
                  v-lazy:background-image=" baseurl+`/public/`+point[2].image_url"
                ></div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="cont-right">
        <div class="crtop">
          <transition name="trans-rtpro">
            <ul class="prolist" v-if="trans">
              <li class="proli" v-for="(item, index) in prolista" :key="index">
                <div
                  class="mainpic lazypic"
                  @click="todetail(item)"
                  v-lazy:background-image=" baseurl+`/public/`+item.image_url"
                ></div>
                <p class="time">{{item.created_time}}</p>
                <p class="title" @click="todetail(item)">{{item.article_title}}</p>
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
                  v-lazy:background-image=" baseurl+`/public/`+prolistb[0].image_url"
                ></div>
                <p class="time">{{prolistb[0].created_time}}</p>
                <p class="title" @click="todetail(prolistb[0])">{{prolistb[0].article_title}}</p>
              </div>
            </div>
          </transition>
          <transition name="centerb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[1]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistb[1])"
                  v-lazy:background-image=" baseurl+`/public/`+prolistb[1].image_url"
                ></div>
                <p class="time">{{prolistb[1].created_time}}</p>
                <p class="title" @click="todetail(prolistb[1])">{{prolistb[1].article_title}}</p>
              </div>
            </div>
          </transition>
          <transition name="centerc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[2]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistb[2])"
                  v-lazy:background-image=" baseurl+`/public/`+prolistb[2].image_url"
                ></div>
                <p class="time">{{prolistb[2].created_time}}</p>
                <p class="title" @click="todetail(prolistb[2])">{{prolistb[2].article_title}}</p>
              </div>
            </div>
          </transition>
          <transition name="centerd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[3]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistb[3])"
                  v-lazy:background-image=" baseurl+`/public/`+prolistb[3].image_url"
                ></div>
                <p class="time">{{prolistb[3].created_time}}</p>
                <p class="title" @click="todetail(prolistb[3])">{{prolistb[3].article_title}}</p>
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
                  v-lazy:background-image=" baseurl+`/public/`+prolistc[0].image_url"
                ></div>
                <p class="time">{{prolistc[0].created_time}}</p>
                <p class="title" @click="todetail(prolistc[0])">{{prolistc[0].article_title}}</p>
              </div>
            </div>
          </transition>
          <transition name="proarrb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[1]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistc[1])"
                  v-lazy:background-image=" baseurl+`/public/`+prolistc[1].image_url"
                ></div>
                <p class="time">{{prolistc[1].created_time}}</p>
                <p class="title" @click="todetail(prolistc[1])">{{prolistc[1].article_title}}</p>
              </div>
            </div>
          </transition>
          <transition name="proarrc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[2]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistc[2])"
                  v-lazy:background-image=" baseurl+`/public/`+prolistc[2].image_url"
                ></div>
                <p class="time">{{prolistc[2].created_time}}</p>
                <p class="title" @click="todetail(prolistc[2])">{{prolistc[2].article_title}}</p>
              </div>
            </div>
          </transition>
          <transition name="proarrd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[3]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistc[3])"
                  v-lazy:background-image=" baseurl+`/public/`+prolistc[3].image_url"
                ></div>
                <p class="time">{{prolistc[3].created_time}}</p>
                <p class="title" @click="todetail(prolistc[3])">{{prolistc[3].article_title}}</p>
              </div>
            </div>
          </transition>
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
    <!-- <div class="newsbox">
      <div
        class="newslist"
        v-for="(item, index) in res"
        :key="index"
        :class="prolistclass ==index?'sel':''"
      >
        <div class="newslibox" @click="tonews(item,index)">
          <p>{{item.class_name}}</p>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import moPagination from "../components/pagenation";
import httpUrl from "../utils/url";
export default {
  name: "product",
  data() {
    return {
      baseurl: "",
      pronameshow: false,
      pageSize: 12, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      trans: false,
      transa: false,
      proClass: 0,
      prolistclass: 0,
      scrolldis: "",
      navlist: [],
      prolista: [],
      prolistb: [],
      prolistc: [],
      proNameList: [],
      class_id: "",
      pointid: "",
      point: [],
      res: [],
      total: [],
      infos: [],
      hydt: ""
    };
  },
  created() {
    if (!this.$route.query.id) {
      this.requst();
    } else {
      this.requst(this.$route.query.id);
    }

    this.baseurl = httpUrl.httpUrl;
  },
  mounted() {
    this.trans = true;
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    todetail(item) {
      // 回到初始位置
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      let id = item.article_id;
      this.$router.push({
        path: "/newsdetail",
        query: { id: id }
      });
    },
    // 请求数据
    requst(val) {
      this.$axios.post("/index/api/getNewsClass").then(res => {
        this.res = res.data.data;
        if (!val) {
          this.class_id = this.res[0].class_id;
          this.requstKind(this.class_id, 1);
        } else {
          this.class_id = val;
          this.requstKind(this.class_id, 1);
        }
        this.requstPoint(this.res[1].class_id, 1);
      });
    },
    requstPoint(val, page) {
      this.$axios
        .post("/index/api/getNewsList", {
          pid: val,
          limit: 3,
          page: page
        })
        .then(res => {
          this.point = res.data.data.data;
          // console.log(this.point, "requstPoint");
        });
    },
    requstKind(val, page) {
      this.$axios
        .post("/index/api/getNewsList", {
          pid: val,
          limit: 12,
          page: page
        })
        .then(res => {
          this.count = res.data.data.total.length;
          this.prolista = res.data.data.data.slice(0, 4);
          this.prolistb = res.data.data.data.slice(4, 8);
          this.prolistc = res.data.data.data.slice(8, 12);
          this.total = res.data.data.total.reverse();
        });
    },
    handleScroll: function() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrolldis = scrollTop;
      // //   console.log(this.scrolldis);
      // if (this.scrolldis >= 950) {
      //   this.transa = true;
      // }
    },
    getList(page) {
      this.requstKind(this.class_id, page);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    tonews(item, index) {
      this.prolistclass = index;
      this.class_id = item.class_id;
      this.requstKind(this.class_id, 1);
    },
    toNav(item, index) {
      this.proClass = index;
      this.class_id = item.class_id;
      this.requstKind(this.class_id);
      // this.pronameshow = !this.pronameshow
    },
    toproitem(index) {
      this.prolistclass = index;
    }
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  },
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
// 第一排
.trans-rtpro-enter-active {
  transition: all 2s ease-in-out;
}
.trans-rtpro-enter {
  transform: translateX(0px);
}
// 第二排
.centera-enter-active {
  transition: all 1.5s linear;
}
.centerb-enter-active {
  transition: all 2s linear;
}
.centerc-enter-active {
  transition: all 2.5s linear;
}
.centerd-enter-active {
  transition: all 3s linear;
}
.centera-enter,
.centerb-enter,
.centerc-enter,
.centerd-enter {
  transform: translateY(90px);
}
// 第三排
.proarra-enter-active {
  transition: all 3.5s ease-in-out;
}
.proarrb-enter-active {
  transition: all 4s ease-in-out;
}
.proarrc-enter-active {
  transition: all 4.5s ease-in-out;
}
.proarrd-enter-active {
  transition: all 5s ease-in-out;
}

.proarra-enter,
.proarrb-enter,
.proarrc-enter,
.proarrd-enter {
  transform: translateY(90px);
}

.product {
  // background: orange;
  width: 100%;
  min-width: 1200px;
  height: 1406px;
  position: relative;
  .bg {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    z-index: -2;
    .topbg {
      width: 100%;
      height: 360px;
    }
    .ctbg {
      width: 100%;
      height: 1046px;
    }
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .cont-left {
      box-sizing: border-box;
      width: 25%;
      padding: 230px 0 0 7px;
      position: relative;
      // background: pink;
      .icon {
        height: 200px;
        img {
          height: 100%;
        }
      }
      .chpoint {
        border: 10px solid #939393;
        width: 62%;
        height: 630px;
        position: absolute;
        top: 480px;
        left: 16%;
        box-sizing: border-box;
        .point-cont {
          box-sizing: border-box;
          width: 100%;
          height: 500px;
          background: #111111;
          padding: 30px 30px;
          position: absolute;
          top: 60px;
          right: 20%;
          .pc-top {
            position: relative;
            .cname {
              color: #ffffff;
              font-size: 24px;
            }
            .ename {
              font-size: 12px;
              font-size: #666666;
              color: #666666;
              padding-top: 2px;
            }
            &:after {
              content: "";
              height: 2px;
              width: 60px;
              background: #82c41c;
              position: absolute;
              bottom: -10px;
              left: 0;
            }
          }
          .mainpic {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          .tpic {
            cursor: pointer;
            margin-top: 30px;
            width: 100%;
            height: 118px;
            .title {
              cursor: pointer;
              margin-top: 10px;
              font-size: 14px;
              color: #cdcdcd;
            }
          }
          .bpic {
            cursor: pointer;
            box-sizing: border-box;
            margin-top: 50px;
            width: 100%;
            height: 190px;
          }
        }
      }
    }
    .cont-right {
      width: 75%;
      height: 100%;
      margin: 300px 0 0 0;
      padding-right: 20px;
      .proli {
        height: 300px;
        position: relative;
        background: #111111;
        box-sizing: border-box;
        padding: 2% 2% 7% 2%;
        .mainpic {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .time {
          color: #82c41c;
          font-size: 14px;
          box-sizing: border-box;
          padding: 10% 0 5% 0;
        }
        .title {
          cursor: pointer;
          color: #cdcdcd;
          font-size: 14px;
          font-weight: 400;
        }
      }
      .crtop {
        width: 100%;
        margin-bottom: 20px;
        .prolist {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .proli {
            width: 23%;
          }
        }
      }
      .probox {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 1%;
        .prolist {
          width: 23%;
          height: 100%;
          background: #111111;
          .proli {
            width: 100%;
            box-sizing: border-box;
            padding: 9% 9% 30% 9%;
            .time {
              color: #82c41c;
              font-size: 14px;
              box-sizing: border-box;
              padding: 10% 0 5% 0;
            }
            .title {
              cursor: pointer;
              color: #cdcdcd;
              font-size: 14px;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
  .pagenation {
    box-sizing: border-box;
    padding: 90px 0 0 0;
  }
  .newsbox {
    width: 6.5%;
    position: absolute;
    top: 80px;
    right: 5.7%;
    z-index: 1111;
    background: #111111;
    // background: orange;
    color: #ffffff;
    font-size: 14px;
    .newslist {
      width: 100%;
      .newslibox {
        cursor: pointer;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        p {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .sel {
      background: #333333;
    }
  }
}
</style>