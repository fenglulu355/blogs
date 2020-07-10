<template>
  <div class="about">
    <!-- <banner></banner> -->
    <div class="aboutbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <!-- 公司简介 -->
      <div class="cpintro pub" v-show="curindex == 0">
        <div
          class="topimg"
          :style="{backgroundImage: 'url(' + require('../assets/about/top.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <div class="cpinfo">
          <p class="title">南宏—致力于成为川渝地区行业标杆！</p>
          <p
            class="bold"
          >四川南宏机电工程安装有限公司成立于2003年，现有员工300余人，是一家致力于提供家用空调、中央空调、采暖、新风、全屋净水处理、智能家居等产品的销售、设计、安装及维护保养于一体化服务的综合性企业。</p>
          <p class="text">
            公司是美的家用空调、美的中央空调泸州及宜宾区域总代理；同时也是约克、开利、特灵、麦克维尔、大金中央空调等国际品牌核心经销商。目前已拥有9家自营旗舰店及体验店，300余家渠道分销商，拥有独立完善的售后服务机构。
            公司具有建筑机电安装工程专业承包贰级资质证书、通风清洗资质证书、ISO管理体系认证证书，拥有一套完善的工程管理体系，至今已承接1000万级以上大型工程10余项，100万级以上工程200余项，总承接工程量高达6000余项，涵盖办公、学校、医院、酒店、机场、厂房、餐饮、娱乐等领域。
            公司拥有专业的销售、售后服务人员100余人，工程项目遍布川渝、云、贵地区；拥有项目管理、设计、招投标人员0余人，专业安装技师100余人，确保了每个项目设计方案更优、成本控制更精、项目管理更细、安装质量更高。从销售到施工再到竣工的每一个环节，我们都以一流的标准、一流的品质，一流的信誉，在行业界赢得了良好的口碑。
            公司秉承“诚信、创新、共创、共享”的企业文化，以诚信为基石，搭建与客户合作的桥梁；以创新为动力，推动企业的发展；以共创、共享为理念，让员工幸福！让客户满意！
          </p>
        </div>
        <ul class="cpshow">
          <li class="cpshowli" v-for="(item, index) in cpshowli" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +httpUrl+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
          </li>
        </ul>
      </div>
      <!-- 南宏理念 -->
      <div class="ideabox pub" v-show="curindex == 1">
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' + require('../assets/about/2-1.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <div class="culture">
          <h1>我们的南宏 我们的企业文化</h1>
          <p class="english">OUR NANHONG OUR CORPORATE CULTURE</p>
          <p class="text">
            <span>【核心价值观】诚信、创新、共创、共享</span>
            <span>【公司使命】让客户满意！让员工幸福！</span>
          </p>
          <p class="text">【公司愿景】致力成为川渝地区行业标杆</p>
          <p class="text">【南宏理念】南宏人以人为本，以技为魂，以管理为纽带，认真对待每一个用户，带领全体员工共同努力，创造南宏更美好的明天。</p>
        </div>
      </div>
      <!-- 员工风采 -->
      <div class="staffshow pub" v-show="curindex == 2">
        <!-- swiper1 -->
        <div class="galler-top" ref="swiperTop">
          <div class="slide">
            <div class="showbox">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' +httpUrl+ shopshowinfo.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              >
                <!-- <img :src="shopshowinfo.bg" alt /> -->
              </div>
              <p class="text">{{shopshowinfo.title}}</p>
            </div>
          </div>
        </div>
        <!-- swiper2 Thumbs -->
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
          <swiper-slide class="slide" v-for="(item, index) in ygfc" :key="index">
            <div class="showbox" @click="swiper(index,item)" :data-id="index">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' +httpUrl+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>
              <p class="hovertext">旅游时光</p>
            </div>
          </swiper-slide>
        </swiper>
        <div
          class="swiper-button-next swiper-button-white"
          @click="tonext"
          slot="button-next"
          :style="{backgroundImage: 'url(' + require('../assets/shopshow/right.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <div
          class="swiper-button-prev swiper-button-white"
          @click="toprev"
          slot="button-prev"
          :style="{backgroundImage: 'url(' + require('../assets/shopshow/left.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
      </div>
      <!-- 荣誉 -->
      <div class="Honor pub" v-show="curindex == 3">
        <ul class="honorlist">
          <li class="honorli" v-for="(item, index) in honor" :key="index">
            <div class="honorbox" v-if="index === 2 ||index === 3">
              <div class="honorinfo">
                <div class="text">
                  <p class="year">
                    {{item.year}}
                    <img src="../assets/about/honorr.png" alt />
                  </p>
                  <p class="intro">{{item.title}}</p>
                </div>
              </div>
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' +httpUrl+ item.image_url+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>
            </div>
            <div class="honorbox" v-else>
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' +httpUrl+ item.image_url+  ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>
              <div class="honorinfo">
                <div class="text">
                  <p class="year">
                    <img src="../assets/about/honorl.png" alt />
                    {{item.year}}
                  </p>
                  <p class="intro">{{item.title}}</p>
                </div>
              </div>
            </div>
          </li>
          <li
            class="last-honorli"
            :style="{backgroundImage: 'url(' + require('../assets/about/honorbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          >
            <p class="title">十数年来，我们获得了各种专业资质与荣誉</p>
            <p
              class="text"
            >公司自成立以来，秉承“以创新求发展，以质量求生存，以诚信待客户”的企业精神，实行“质量第一，服务至上”的经营理念，南宏人从未停止过拼搏进取与努力奋斗。</p>
          </li>
        </ul>
        <div
          class="honorpic"
          :style="{backgroundImage: 'url(' + require('../assets/about/honorbot.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
      </div>
      <!-- 销售网络 -->
      <div class="sale pub" v-show="curindex == 4">
        <div
          class="topmainpic"
          :style="{backgroundImage: 'url(' + require('../assets/about/5-1.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <div class="saleinfo">
          <p class="title">分公司概况/BRANCH PROFILE</p>
          <ul class="branchlist">
            <li class="branchli" v-for="(item, index) in branchlist" :key="index">
              <div class="pic">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' + item.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
              </div>

              <div class="branchinfo">
                <p class="name">{{item.name}}</p>
                <p class="icon">
                  <img src="../assets/about/5-2.png" alt />
                </p>
                <p class="address text">地址：{{item.address}}</p>
                <p class="tel text">电话：{{item.tel}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 公司架构 -->
      <div class="framework pub" v-show="curindex == 5">
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' + require('../assets/about/6-1.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
      </div>
      <!-- 社招 -->
      <div class="socia pub" v-show="curindex == 6 || curindex == 7">
        <ul class="szlist recruitment">
          <li class="newsli" v-for="(item, index) in lb" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +require('../assets/about/7-1.png') + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div class="ins-info">
              <p class="title">{{item.title}}</p>
              <p class="time">{{item.created_time}}</p>
              <p class="intro">{{item.desc}}</p>
              <p class="more" @click="torecruit(index,item)">我要应聘</p>
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
      <!-- 校招 -->
      <!-- 联系我们 -->
      <div class="contact pub" v-show="curindex == 8">
        <div class="contactbox" v-html="lxwm">
          <!-- <h1>四川南宏机电工程安装有限公司</h1>
          <div class="warrper">
            <div class="telinfo">
              <p class="contacts">联系人：李经理，陈经理</p>
              <p class="tel">
                销售热线：0830-6027777，18181878760，18090855133
                <span class="slant">/</span> 售后热线：0830-3380333，13320783392
              </p>
            </div>
            <p class="totel">
              <img src="../assets/about/8-1.png" alt />
              <span>0830-6027777</span>
            </p>
          </div>

          <p class="address text">
            总公司地址：四川省泸州市佳乐世纪城（金融中心）7号楼1301号
            <span class="slant">/</span> 联系电话：0830-6027777
          </p>
          <p class="branch text">
            分公司地址：四川省宜宾市临港新天地互联网产业基地513号
            <span class="slant">/</span> 联系电话：0830-3581585
            <span class="slant">/</span> 传真：0830-2571485
            <span class="slant">/</span> Q Q：2073376722
            <span class="slant">/</span> 邮箱：20008345@qq.com
          </p>
          <div class="map"></div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import tabBar from "../components/tabBar";
import moPagination from "../components/pagenation";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "about",
  data() {
    return {
      // 分页
      pageSize: 3, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      curindex: 0,
      shopshowinfo: [],
      tabtitle: {
        a: "关于",
        b: "我们"
      },
      tabnav: [
        { class_name: "公司介绍" },
        { class_name: "南宏理念" },
        { class_name: "员工风采" },
        { class_name: "荣誉资质" },
        { class_name: "销售网络" },
        { class_name: "公司架构" },
        { class_name: "社会招聘" },
        { class_name: "校园招聘" },
        { class_name: "联系我们" }
      ],
      cpshowli: [],
      ygfc: [],
      branchlist: [
        {
          img: require("../assets/about/3-1.png"),
          name: "分公司名称分公司名称分公司名称",
          address: "分公司名称分公司名称分公司名称",
          tel: "000-000000"
        },
        {
          img: require("../assets/about/3-1.png"),
          name: "分公司名称分公司名称分公司名称",
          address: "分公司名称分公司名称分公司名称",
          tel: "000-000000"
        },
        {
          img: require("../assets/about/3-1.png"),
          name: "分公司名称分公司名称分公司名称",
          address: "分公司名称分公司名称分公司名称",
          tel: "000-000000"
        }
      ],
      lb: [],
      honor: [],
      swiperOptionThumbs: {
        // loop:true,
        spaceBetween: 10,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        slidesPerView: 4,
        watchSlidesVisibility: true /*避免出现bug*/,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      lxwm: [],
      zptype: 0
    };
  },
  created() {
    this.requst();
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      if (idx == 1) {
        this.curindex = 6;
        this.requstzp(0, 1, 3);
        // console.log(6);
      }
      if (idx == 2) {
        this.curindex = 4;
      }
      if (idx == 3) {
        this.curindex = 2;
      }
      if (idx == 4) {
        this.curindex = 1;
      }
      if (idx == 5) {
        this.curindex = 7;
        this.requstzp(1, 1, 3);
        // console.log(7);
      }
      if (idx == 6) {
        this.curindex = 5;

        // console.log(7);
      }
      if (idx == 7) {
        this.curindex = 8;

        // console.log(7);
      }
      if (idx == 8) {
        this.curindex = 3;
      }
      if (idx == 10) {
        this.curindex = 8;
      }
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 600;
  },
  methods: {
    requst(id) {
      this.$axios.post("/index/api/about", { id: id }).then(res => {
        this.cpshowli = res.data.data.child;
        this.ygfc = res.data.data.team;
        this.shopshowinfo = this.ygfc[0];
        this.honor = res.data.data.honor;
        this.lxwm = res.data.data.lxwm.content;
        // console.log(this.shopshowinfo);
        // console.log(res.data, "rrr");
      });
    },
    // 分页
    getList(page) {
      this.requstzp(this.zptype, page, 3);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },
    tonav(index) {
      //  console.log(index)
      this.curindex = index;
      if (index == 6) {
        this.zptype = 0;
        this.requstzp(0, 1, 3);
      }
      if (index == 7) {
        this.zptype = 1;
        this.requstzp(1, 1, 3);
      }
    },
    requstzp(type, page, limit) {
      this.$axios
        .post("/index/api/jobList", { type: type, page: page, limit: limit })
        .then(res => {
          this.lb = res.data.data.data;
          this.count = res.data.data.total;
          // console.log(res.data.data, "a");
        });
    },
    swiper(index, item) {
      this.shopshowinfo = item;
    },
    toprev() {},
    tonext() {},
    // 跳转至招聘详情
    torecruit(index, item) {
      // 到时候根据社招校招分类传参
      console.log(item);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.$router.push({
        path: "/detail",
        query: { id: item.id, kind: "recruit" }
      });
    }
  },

  components: { banner, tabBar, moPagination, swiper, swiperSlide }
};
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  .aboutbox {
    width: 100%;
    border-top: 1px solid rgba(153, 153, 153, 0.3);
    // border-bottom: 1px solid rgba(153, 153, 153, 0.3);
    box-sizing: border-box;
    padding: 60px 0 100px 0;
    .pub {
      width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      padding-top: 53px;
    }
    .mo-paging {
      width: 100%;
      // background: pink;
      text-align: center;
      box-sizing: border-box;
      padding-top: 53px;
    }
    // 公司简介
    .cpintro {
      .topimg {
        width: 100%;
        height: 497px;
      }
      .cpinfo {
        box-sizing: border-box;
        padding-top: 54px;
        .title {
          font-size: 24px;
          color: rgba(79, 129, 189, 1);
        }
        .bold {
          box-sizing: border-box;
          padding: 15px 0;
          font-size: 16px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
        }
        .text {
          // css保留空格和换行符
          white-space: pre-line;
          color: rgba(51, 51, 51, 1);
          font-size: 16px;
          line-height: 48px;
        }
      }
      .cpshow {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .cpshowli {
          display: inline-block;
          .mainpic {
            width: 292px;
            height: 184px;
          }
        }
      }
    }
    // 理念
    .ideabox {
      .mainpic {
        width: 100%;
        height: 395px;
      }
      .culture {
        width: 1200px;
        height: 250px;
        background: rgba(238, 238, 238, 1);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 38px 40px;
        margin-top: 10px;
        color: rgba(51, 51, 51, 1);
        h1 {
          font-size: 24px;
        }
        .english {
          font-weight: lighter;
          line-height: 48px;
        }
        .text {
          font-size: 16px;
          line-height: 35px;
          span {
            margin-right: 30px;
          }
        }
      }
    }
    // 风采
    .staffshow {
      position: relative;
      .swiper-button-white {
        width: 44px;
        position: absolute;
        top: 835px;
        height: 164px !important;
      }
      .swiper-button-prev {
        left: 0;
      }
      .swiper-button-next {
        right: 0;
      }
      .galler-top {
        height: 750px;
        width: 100%;
        .slide {
          width: 100%;
          height: 750px;
          .showbox {
            width: 100%;
            height: 100%;
            position: relative;
            .mainpic {
              width: 100%;
              height: 100%;
            }
            .text {
              position: absolute;
              bottom: 0;
              width: 1200px;
              height: 100px;
              background: rgba(0, 0, 0, 0.3);
              border-radius: 0px 0px 10px 10px;
              font-size: 18px;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              box-sizing: border-box;
              padding: 30px 40px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }
          }
        }
      }
      .gallery-thumbs {
        // background: olive;
        width: 1100px;
        height: 165px !important;
        position: relative;
        top: 10px;
      }
      .gallery-thumbs .swiper-slide {
        width: 230px;
        height: 164px;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        .mainpic {
          border-radius: 10px;
        }
        .showbox {
          width: 100%;
          height: 100%;
          .mainpic {
            width: 100%;
            height: 100%;
          }
          .hovertext {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            font-size: 18px;
            text-align: center;
            line-height: 164px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            display: none;
          }
          &:hover .hovertext {
            display: block;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.3) !important;
          }
        }
      }
      // .gallery-thumbs .swiper-slide-active {
      //   opacity: 1;
      // }
    }

    // 荣誉
    .Honor {
      width: 100%;
      .honorlist {
        width: 1200px;
        margin: 0 auto;
        height: 670px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 8px;
        .honorli {
          height: 218px;
          .honorbox {
            display: flex;
            justify-content: space-between;
            .mainpic {
              width: 294px;
              height: 218px;
              background: RGBA(54, 105, 165, 1);
              box-sizing: border-box;
              padding: 5px 5px;
            }
            .honorinfo {
              width: 294px;
              height: 218px;
              background: rgba(236, 236, 236, 1);
              color: rgba(102, 102, 102, 1);
              text-align: center;
              .text {
                box-sizing: border-box;
                padding-top: 68px;
                .year {
                  font-family: Impact;
                  font-size: 36px;
                }
                .intro {
                  width: 50%;
                  font-size: 18px;
                  line-height: 30px;
                  margin: 0 auto;
                }
              }
            }
          }
        }
        .last-honorli {
          width: 596px;
          height: 218px;
          box-sizing: border-box;
          padding: 58px 123px 45px 31px;
          color: rgba(102, 102, 102, 1);
          .title {
            font-size: 20px;
            font-weight: bold;
            line-height: 55px;
          }
        }
      }
      .honorpic {
        width: 1200px;
        margin: 34px auto;
        height: 541px;
      }
    }
    // 销售网络
    .sale {
      .topmainpic {
        width: 100%;
        height: 821px;
      }
      .saleinfo {
        width: 100%;
        box-sizing: border-box;
        padding-top: 76px;
        .title {
          font-size: 28px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 65px;
        }
        .branchlist {
          width: 100%;
          // background: pink;

          .branchli {
            cursor: pointer;
            border: 1px solid rgba(36, 130, 200, 0);
            border-radius: 10px;
            width: 100%;
            height: 185px;
            display: flex;
            justify-content: flex-start;
            box-sizing: border-box;
            margin-top: 10px;
            &:hover {
              border: 1px solid rgba(36, 130, 200, 1);
            }
            .pic {
              box-sizing: border-box;
              padding: 10px;
              .mainpic {
                width: 475px;
                height: 165px;
                border-radius: 10px;
              }
            }

            .branchinfo {
              box-sizing: border-box;
              padding: 38px 0 30px 46px;

              .name {
                color: rgba(51, 51, 51, 1);
                font-size: 30px;
              }
              .icon {
                line-height: 40px;
              }
              .text {
                color: rgba(91, 91, 91, 1);
                font-size: 18px;
              }
            }
          }
        }
      }
    }
    // 架构
    .framework {
      .mainpic {
        width: 1198px;
        height: 706px;
      }
    }
    // 社招校招
    .recruitment {
      width: 100%;
      .newsli {
        width: 100%;
        height: 300px;
        border-bottom: 1px solid rgba(204, 204, 204, 1);
        display: flex;
        justify-content: flex-start;

        .mainpic {
          margin-top: 30px;
          width: 343px;
          height: 240px;
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
        }
        .ins-info {
          cursor: pointer;
          width: 570px;
          box-sizing: border-box;
          padding: 30px 0 0 47px;
          .title {
            width: 510px;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 24px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 45px;
            // &:hover {
            //   color: rgba(36, 130, 200, 1);
            // }
          }
          .time {
            font-size: 14px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 45px;
          }
          .intro {
            height: 80px;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
            line-height: 27px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3; //需要控制的文本行数
            overflow: hidden;
          }
          .more {
            width: 133px;
            height: 31px;
            text-align: center;
            border: 1px solid rgba(153, 153, 153, 1);
            border-radius: 5px;
            font-size: 14px;
            font-weight: 300;
            color: rgba(153, 153, 153, 1);
            line-height: 31px;
            margin-top: 30px;
            // &:hover {
            //   border: 1px solid rgba(62, 145, 223, 1);
            //   color: rgba(62, 145, 223, 1);
            // }
          }
        }
        &:hover {
          .title, .intro {
            transition: color 0.2s ease;
            color: rgba(36, 130, 200, 1);
          }

          .more {
            transition: color 0.2s ease;
            border: 1px solid rgba(36, 130, 200, 1);
            background: rgba(36, 130, 200, 1);
            color: white;
          }
        }
      }
    }
    // 联系我们
    .contact {
      background: rgba(255, 255, 255, 1);

      .contactbox {
        box-sizing: border-box;
        padding: 35px 35px;
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 10px;
        line-height: 30px;
        color: rgba(51, 51, 51, 1);
        h1 {
          font-size: 22px;
          color: rgba(62, 145, 223, 1);
        }
        .warrper {
          border-bottom: 1px solid rgba(238, 238, 238, 1);
          font-size: 14px;
          box-sizing: border-box;
          padding: 15px 0;
          position: relative;
          .totel {
            position: absolute;
            bottom: 0;
            right: 0;
            span {
              font-family: Impact;
              position: absolute;
              right: 110px;
              bottom: 10px;
              font-size: 33px;
              color: white;
              font-weight: 400;
            }
          }
        }
        .text {
          border-bottom: 1px solid rgba(238, 238, 238, 1);
          font-size: 14px;
          line-height: 50px;
        }
        .slant {
          margin: 0 9px;
        }
        .branch {
          box-sizing: border-box;
          margin-bottom: 32px;
        }
        .map {
          width: 100%;
          height: 636px;
          background: palevioletred;
        }
      }
    }
  }
}
</style>