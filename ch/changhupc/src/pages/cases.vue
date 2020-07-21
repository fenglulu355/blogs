<template>
  <div
    class="case lazypic"
    :style="{backgroundImage: 'url(' + require('../assets/mainbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
  >
    <div class="bg">
      <div
        class="topbg lazypic"
        :style="{backgroundImage: 'url(' + require('../assets/case/casebanner.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
      <div
        class="ctbg lazypic"
        :style="{backgroundImage: 'url(' + require('../assets/home/btbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
      <!-- <div class="btbg"></div> -->
    </div>
    <div class="content">
      <div class="cont-left">
        <div class="icon" id="proicon">
          <transition name="trans-pro">
            <img v-if="trans" src="../assets/home/homecase/homecase.png" alt />
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
                  class="mainpic lazypic"
                  @click="todetail(item)"
                  v-lazy:background-image="baseurl+`/public/`+item.image_url "
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
                  v-lazy:background-image="baseurl+`/public/`+prolistb[0].image_url"
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
                  v-lazy:background-image="baseurl+`/public/`+prolistb[1].image_url"
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
                  v-lazy:background-image="baseurl+`/public/`+prolistb[2].image_url"
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
                  v-lazy:background-image="baseurl+`/public/`+prolistb[3].image_url"
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
                  v-lazy:background-image="baseurl+`/public/`+prolistc[0].image_url"
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
                  v-lazy:background-image="baseurl+`/public/`+prolistc[1].image_url"
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
                  v-lazy:background-image="baseurl+`/public/`+prolistc[2].image_url"
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
                  v-lazy:background-image="baseurl+`/public/`+prolistc[3].image_url"
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
        <div class="btbt probox">
          <transition name="btarra">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistd[0]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistd[0])"
                  v-lazy:background-image="baseurl+`/public/`+prolistd[0].image_url"
                ></div>
                <p class="title">{{prolistd[0].article_title}}</p>
                <div class="todetail" @click="todetail(prolistd[0])">
                  <span>{{prolistd[0].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="btarrb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistd[1]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistd[1])"
                  v-lazy:background-image="baseurl+`/public/`+prolistd[1].image_url"
                ></div>
                <p class="title">{{prolistd[1].article_title}}</p>
                <div class="todetail" @click="todetail(prolistd[1])">
                  <span>{{prolistd[1].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="btarrc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistd[2]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistd[2])"
                  v-lazy:background-image="baseurl+`/public/`+prolistd[2].image_url"
                ></div>
                <p class="title">{{prolistd[2].article_title}}</p>
                <div class="todetail" @click="todetail(prolistd[2])">
                  <span>{{prolistd[2].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="btarrd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistd[3]">
                <div
                  class="mainpic lazypic"
                  @click="todetail(prolistd[3])"
                  v-lazy:background-image="baseurl+`/public/`+prolistd[3].image_url"
                ></div>
                <p class="title">{{prolistd[3].article_title}}</p>
                <div class="todetail" @click="todetail(prolistd[3])">
                  <span>{{prolistd[3].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
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
        <!-- 推荐 -->
        <div class="othercase">
          <div class="other-pic">
            <transition name="recom-pic">
              <img v-if="transa" src="../assets/case/bt.png" alt />
            </transition>
          </div>
          <div class="btbt probox">
            <transition name="recoma">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recoma[0]">
                  <div
                    class="mainpic lazypic"
                    @click="todetail(recoma[0])"
                    v-lazy:background-image="baseurl+`/public/`+recoma[0].image_url"
                  ></div>
                  <p class="title">{{recoma[0].article_title}}</p>
                  <div class="todetail" @click="todetail(recoma[0])">
                    <span>{{recoma[0].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomb">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recoma[1]">
                  <div
                    class="mainpic lazypic"
                    @click="todetail(recoma[1])"
                    v-lazy:background-image="baseurl+`/public/`+recoma[1].image_url"
                  ></div>
                  <p class="title">{{recoma[1].article_title}}</p>
                  <div class="todetail" @click="todetail(recoma[1])">
                    <span>{{recoma[1].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomc">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recoma[2]">
                  <div
                    class="mainpic lazypic"
                    @click="todetail(recoma[2])"
                    v-lazy:background-image="baseurl+`/public/`+recoma[2].image_url"
                  ></div>
                  <p class="title">{{recoma[2].article_title}}</p>
                  <div class="todetail" @click="todetail(recoma[2])">
                    <span>{{recoma[2].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomd">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recoma[3]">
                  <div
                    class="mainpic lazypic"
                    @click="todetail(recoma[3])"
                    v-lazy:background-image="baseurl+`/public/`+recoma[3].image_url"
                  ></div>
                  <p class="title">{{recoma[3].article_title}}</p>
                  <div class="todetail" @click="todetail(recoma[3])">
                    <span>{{recoma[3].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="btbt probox">
            <transition name="recomsa">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recomb[0]">
                  <div
                    class="mainpic lazypic"
                    @click="todetail(recomb[0])"
                    v-lazy:background-image="baseurl+`/public/`+recomb[0].image_url"
                  ></div>
                  <p class="title">{{recomb[0].article_title}}</p>
                  <div class="todetail" @click="todetail(recomb[0])">
                    <span>{{recomb[0].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomsb">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recomb[1]">
                  <div
                    class="mainpic lazypic"
                    @click="todetail(recomb[1])"
                    v-lazy:background-image="baseurl+`/public/`+recomb[1].image_url"
                  ></div>
                  <p class="title">{{recomb[1].article_title}}</p>
                  <div class="todetail" @click="todetail(recomb[1])">
                    <span>{{recomb[1].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomsc">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recomb[2]">
                  <div
                    class="mainpic lazypic"
                    @click="todetail(recomb[2])"
                    v-lazy:background-image="baseurl+`/public/`+recomb[2].image_url"
                  ></div>
                  <p class="title">{{recomb[2].article_title}}</p>
                  <div class="todetail" @click="todetail(recomb[2])">
                    <span>{{recomb[2].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomsd">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recomb[3]">
                  <div
                    class="mainpic lazypic"
                    @click="todetail(recomb[3])"
                    v-lazy:background-image="baseurl+`/public/`+recomb[3].image_url"
                  ></div>
                  <p class="title">{{recomb[3].article_title}}</p>
                  <div class="todetail" @click="todetail(recomb[3])">
                    <span>{{recomb[3].article_title}}</span>
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
    </div>
  </div>
</template>

<script>
import moPagination from "../components/pagenation";
import httpUrl from "../utils/url";
export default {
  name: "case",
  data() {
    return {
      baseurl: "",
      pageSize: 16, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      trans: false,
      transa: false,
      proClass: 0,
      scrolldis: "",
      prolista: [],
      prolistb: [],
      prolistc: [],
      prolistd: [],
      recoma: [],
      recomb: [],
      res: []
    };
  },
  created() {
    // this.requst();
    if (!this.$route.query.id) {
      this.requst();
    } else {
      this.requst(this.$route.query.id);
    }
    this.baseurl = httpUrl.httpUrl;
    if (sessionStorage.getItem("caseproClass")) {
      this.proClass = sessionStorage.getItem("caseproClass");
    } else {
      this.proClass = 0;
    }
  },
  mounted() {
    this.trans = true;
    this.transa = true;
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    todetail(item) {
      let id = item.article_id;
      this.$router.push({
        path: "/detail",
        query: { id: id, kind: "case" }
      });
      // 跳转回到初始位置
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // 刷新页面
      this.$router.go(0);
    },
    // 请求数据
    requst(val) {
      this.$axios.post("/index/api/getProductClass").then(rescase => {
        this.res = rescase.data.data;
        if (!val) {
          this.class_id = this.res[0].class_id;
          this.requstKind(this.class_id, 1);
        } else {
          this.class_id = val;
          this.requstKind(this.class_id, 1);
        }
        // this.requstPoint(this.res[1].class_id, 1);
      });
    },
    requstKind(val, page) {
      this.$axios
        .post("/index/api/getCaseList", {
          cid: val,
          limit: 16,
          page: page
        })
        .then(res => {
          // console.log(res.data.data)
          this.count = res.data.data.total.length;
          this.prolista = res.data.data.data.slice(0, 4);
          this.prolistb = res.data.data.data.slice(4, 8);
          this.prolistc = res.data.data.data.slice(8, 12);
          this.prolistd = res.data.data.data.slice(12, 16);
          this.recoma = res.data.data.best.slice(0, 4);
          this.recomb = res.data.data.best.slice(4, 8);
        });
    },
    handleScroll: function() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrolldis = scrollTop;
      if (this.scrolldis >= 550) {
        this.transa = true;
      }
    },
    getList(page) {
      this.requstKind(this.class_id, page);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },
    toNav(item, index) {
      this.currentPage = 0;
      sessionStorage.setItem("caseproClass", index);
      this.class_id = item.class_id;
      // console.log(this.class_id);
      this.requstKind(this.class_id);
      // 刷新页面
      // this.$router.go(0);
      this.proClass = sessionStorage.getItem("caseproClass");
      // console.log(index);
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
  transform: translateY(0px);
}
// 第二排
.centera-enter-active {
  transition: all 0.5s ease-in-out;
}
.centerb-enter-active {
  transition: all 1s ease-in-out;
}
.centerc-enter-active {
  transition: all 1.5s ease-in-out;
}
.centerd-enter-active {
  transition: all 2s ease-in-out;
}
.centera-enter,
.centerb-enter,
.centerc-enter,
.centerd-enter {
  transform: translateY(30px);
}
// 第三排
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
// 第四排
.btarra-enter-active {
  transition: all 4.5s ease-in-out;
}
.btarrb-enter-active {
  transition: all 5s ease-in-out;
}
.btarrc-enter-active {
  transition: all 5.5s ease-in-out;
}
.btarrd-enter-active {
  transition: all 6s ease-in-out;
}

.btarra-enter,
.btarrb-enter,
.btarrc-enter,
.btarrd-enter {
  transform: translateY(50px);
}

//推荐图片
.recom-pic-enter-active {
  transition: all 2s ease-in-out;
}
.recom-pic-enter {
  transform: translateX(-100px);
}
//推荐 第一排
.recoma-enter-active {
  transition: all 1.5s ease-in-out;
}
.recomb-enter-active {
  transition: all 2s ease-in-out;
}
.recomc-enter-active {
  transition: all 2.5s ease-in-out;
}
.recomd-enter-active {
  transition: all 3s ease-in-out;
}

.recoma-enter,
.recomb-enter,
.recomc-enter,
.recomd-enter {
  transform: translateY(40px);
}
//推荐  第二排
.recomsa-enter-active {
  transition: all 3s ease-in-out;
}
.recomsb-enter-active {
  transition: all 3.5s ease-in-out;
}
.recomsc-enter-active {
  transition: all 4s ease-in-out;
}
.recomsd-enter-active {
  transition: all 4.5s ease-in-out;
}

.recomsa-enter,
.recomsb-enter,
.recomsc-enter,
.recomsd-enter {
  transform: translateY(60px);
}

.case {
  // background: orange;
  width: 100%;
  min-width: 1200px;
  // height: 2055px;
  position: relative;
  .bg {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 0;
    .topbg {
      width: 100%;
      height: 360px;
    }
    .ctbg {
      width: 100%;
      // height: 870px;
    }
    .btbg {
      width: 100%;
      // height: 825px;
    }
  }
  .content {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 100px;
    display: flex;
    justify-content: space-between;
    .cont-left {
      box-sizing: border-box;
      width: 20%;
      padding: 160px 0 0 7px;
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
      width: 80%;
      height: 100%;
      margin: 315px 0 0 0;
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
          display: grid;
          grid-template-columns: repeat(4, 4fr);
          grid-gap: 20px;
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: space-between;
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
        margin-bottom: 20px;
        display: grid;
        grid-template-columns: repeat(4, 4fr);
        grid-gap: 20px;
        .prolist {
          width: 100%;
          height: 100%;
          .proli {
            width: 100%;
          }
        }
      }
      .othercase {
        .other-pic {
          margin-bottom: 40px;
          cursor: pointer;
        }
      }
    }
  }
  .pagenation {
    box-sizing: border-box;
    padding: 90px 0 0 0;
  }
}
</style>