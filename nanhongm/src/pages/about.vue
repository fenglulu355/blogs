<template>
  <div class="about">
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
              :style="{backgroundImage: 'url(' + item+ ')',
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
          <p class="text">【核心价值观】诚信、创新、共创、共享</p>
          <p class="text">【公司使命】让客户满意！让员工幸福！</p>
          <p class="text">【公司愿景】致力成为川渝地区行业标杆</p>
          <p class="text">【南宏理念】南宏人以人为本，以技为魂，以管理为纽带，认真对待每一个用户，带领全体员工共同努力，创造南宏更美好的明天。</p>
        </div>
      </div>
      <!-- 员工风采 -->
      <div class="staffshow pub" v-show="curindex == 2">
        <ul class="stafflist">
          <li class="staffli" v-for="(item, index) in ygfc" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' + item.bg+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div class="infos">
              <p class="text">旅游时光</p>
              <p class="des">{{item.shopname}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 荣誉 -->
      <div class="Honor pub" v-show="curindex == 3">
        <div class="top">
          <p class="title">十数年来，我们获得了各种专业资质与荣誉</p>
          <p class="des">公司自成立以来，秉承“以创新求发展，以质量求生存，以诚信待客户”的企业精神，实行“质量第一，服务至上”的经营理念，南宏人从未停止过拼搏进取与努力奋斗。</p>
        </div>
        <ul class="honorlist">
          <li class="honorli" v-for="(item, index) in honor" :key="index">
            <div class="honorbox" v-if="index === 1 ||index === 3">
              <div class="honorinfo">
                <div class="text">
                  <p class="year">
                    {{item.year}}
                    <img src="../assets/about/honorr.png" alt />
                  </p>
                  <p class="intro">{{item.des}}</p>
                </div>
              </div>
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + item.img+ ')',
                  backgroundSize:'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition:'center'
                    }"
              ></div>
            </div>
            <div class="honorbox" v-else>
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + item.img+ ')',
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
                  <p class="intro">{{item.des}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="pics">
          <img src="../assets/about/01.png" alt />
          <img src="../assets/about/02.png" alt />
          <img src="../assets/about/03.png" alt />
        </div>
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
      <div class="socia pub" v-show="curindex == 6">
        <ul class="szlist recruitment">
          <li class="newsli" v-for="(item, index) in lb" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +item.img + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div class="ins-info">
              <p class="title">{{item.title}}</p>
              <p class="time">{{item.time}}</p>
              <p class="intro">{{item.intro}}</p>
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
      <div class="school pub" v-show="curindex == 7">
        <ul class="szlist recruitment">
          <li class="newsli" v-for="(item, index) in lb" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +item.img + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div class="ins-info">
              <p class="title">{{item.title}}</p>
              <p class="time">{{item.time}}</p>
              <p class="intro">{{item.intro}}</p>
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
      <!-- 联系我们 -->
      <div class="contact pub" v-show="curindex == 8">
        <div class="contactbox">
          <div
            class="warrper"
            :style="{backgroundImage: 'url(' + require('../assets/about/8-1.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          >
            <h1>四川南宏机电工程安装有限公司</h1>
            <p class="totel">
              立即拨打：
              <span>0830-6027777</span>
            </p>
          </div>
          <div class="telbox text">
            <p>联系人：李经理，陈经理</p>
            <p>
              销售热线：
              <span>0830-6027777</span>,
              <span>18181878760</span>,
              <span>18090855133</span>
            </p>
            <p>
              售后热线：
              <span>0830-3380333</span>,
              <span>13320783392</span>
            </p>
          </div>
          <div class="address text">
            <p>总公司地址：四川省泸州市佳乐世纪城（金融中心）7号楼1301号</p>
            <p>
              联系电话：
              <span>0830-6027777</span>
            </p>
          </div>
          <div class="branch text">
            <p>分公司地址：四川省宜宾市临港新天地互联网产业基地513号</p>
            <p>
              联系电话：
              <span>0830-6027777</span>
            </p>
            <p>
              传真：
              <span>0830-6027777</span>
            </p>
            <p>
              Q Q：
              <span>2073376722</span>
            </p>
            <p>
              邮箱：
              <span>20008345@qq.com</span>
            </p>
          </div>
          <div class="map"></div>
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
      pageSize: 24, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 300, // 总记录数,
      curindex: 0,
      shopshowinfo: [],
      tabtitle: {
        a: "关于",
        b: "我们"
      },
      tabnav: [
        "公司介绍",
        "南宏理念",
        "员工风采",
        "荣誉资质",
        "销售网络",
        "公司架构",
        "社会招聘",
        "校园招聘",
        "联系我们"
      ],
      cpshowli: [
        require("../assets/about/1-1.png"),
        require("../assets/about/1-2.png")
      ],
      ygfc: [
        {
          bg: require("../assets/about/3-1.png"),
          sbg: require("../assets/about/1-1.png"),
          shopname:
            "一个人的旅游，是孤独；两个人的旅游，是甜蜜；一群人的旅游，是温馨。共同奋斗，共同游历，繁华世界掠眼而过，留下的是我们那令人难忘的回忆。——2018年12月1日稻城亚丁"
        },
        {
          bg: require("../assets/about/1-2.png"),
          sbg: require("../assets/about/1-2.png"),
          shopname:
            "er共同游历，繁华世界掠眼而过，留下的是我们那令人难忘的回忆。——2018年12月1日稻城亚丁"
        }
      ],
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
      lb: [
        {
          img: require("../assets/about/7-1.png"),
          title: "国际贸易专员",
          time: "2010.8.03",
          intro:
            " 岗位职责：1、本科及以上学历，国际贸易类、经济类等相关专业毕业；2、男性，有英语读写能力、有工作经验者优先。"
        },
        {
          img: require("../assets/about/7-1.png"),
          title: "国际贸易专员",
          time: "2010.8.03",
          intro:
            " 岗位职责：1、本科及以上学历，国际贸易类、经济类等相关专业毕业；2、男性，有英语读写能力、有工作经验者优先。"
        },
        {
          img: require("../assets/about/7-1.png"),
          title: "国际贸易专员",
          time: "2010.8.03",
          intro:
            " 岗位职责：1、本科及以上学历，国际贸易类、经济类等相关专业毕业；2、男性，有英语读写能力、有工作经验者优先。"
        }
      ],
      honor: [
        {
          img: require("../assets/about/honor1.png"),
          year: "2018",
          left: true,
          des: "品牌315诚信企业联盟单位"
        },
        {
          img: require("../assets/about/honor2.png"),
          year: "2018",
          left: true,
          des: "消费者点赞的诚信企业"
        },
        {
          img: require("../assets/about/honor1.png"),
          year: "2017",
          left: true,
          des: "品牌315诚信企业联盟单位"
        },
        {
          img: require("../assets/about/honor2.png"),
          year: "2015",
          left: true,
          des: "品牌315诚信企业联盟单位"
        },
        {
          img: require("../assets/about/honor1.png"),
          year: "2015",
          left: true,
          des: "品牌315诚信企业联盟单位"
        }
      ],
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
      }
    };
  },
  created() {
    this.shopshowinfo = this.ygfc[0];
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      if (idx == 1) {
        this.curindex = 6;
      }
      if (idx == 2) {
        this.curindex = 4;
      }
      if (idx == 4) {
        this.curindex = 1;
      }
      if (idx == 5) {
        this.curindex = 7;
      }
      if (idx == 8) {
        this.curindex = 3;
      }
    }
  },
  methods: {
    // 分页
    getList(page) {
      // this.requstKind(this.class_id, page);
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
        query: { id: index, kind: "recruit" }
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
    box-sizing: border-box;
    padding: 40px 0 70px 0;
    .pub {
      box-sizing: border-box;
      padding: 53px 25px 0 25px;
    }
    // 公司简介
    .cpintro {
      .topimg {
        width: 100%;
        height: 470px;
      }
      .cpinfo {
        box-sizing: border-box;
        padding: 48px 0;
        .title {
          font-size: 36px;
          color: rgba(79, 129, 189, 1);
        }
        .bold {
          box-sizing: border-box;
          padding: 10px 0;
          font-size: 24px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
        }
        .text {
          // css保留空格和换行符
          white-space: pre-line;
          color: rgba(51, 51, 51, 1);
          font-size: 16px;
          line-height: 35px;
        }
      }
      .cpshow {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .cpshowli {
          width: 49%;
          .mainpic {
            width: 100%;
            height: 217px;
          }
        }
      }
    }
    // 理念
    .ideabox {
      .mainpic {
        width: 100%;
        height: 312px;
      }
      .culture {
        background: rgba(238, 238, 238, 1);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 38px 40px;
        margin-top: 25px;
        color: #333333;
        h1 {
          font-size: 36px;
        }
        .english {
          font-size: 18px;
          font-weight: lighter;
          line-height: 48px;
        }
        .text {
          font-size: 30px;
          line-height: 50px;
          color: #666666;
        }
      }
    }
    // 风采
    .staffshow {
      width: 100%;
      .stafflist {
        width: 100%;
        .staffli {
          width: 100%;
          margin-bottom: 25px;
          .mainpic {
            width: 100%;
            height: 437px;
            border-radius: 10px;
          }
          .infos {
            width: 100%;
            height: 261px;
            background: rgba(245, 245, 245, 1);
            border-radius: 10px;
            color: #333333;
            box-sizing: border-box;
            padding: 30px 15px;
            .text {
              font-size: 30px;
              font-weight: bold;
            }
            .des {
              padding-top: 10px;
              font-size: 24px;
              line-height: 40px;
            }
          }
        }
      }
    }

    // 荣誉
    .Honor {
      width: 100%;
      .top {
        width: 100%;
        text-align: center;
        .title {
          color: #2482c8;
          font-size: 30px;
          font-weight: bold;
        }
        .des {
          padding-top: 10px;
          color: #666666;
          font-size: 24px;
          line-height: 35px;
        }
      }
      .honorlist {
        width: 100%;
        box-sizing: border-box;
        padding-top: 25px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .honorli {
          width: 100%;
          height: 256px;
          margin-bottom: 25px;
          .honorbox {
            display: flex;
            justify-content: space-between;
            .mainpic {
              width: 49%;
              height: 256px;
              background: RGBA(54, 105, 165, 1);
              box-sizing: border-box;
              padding: 5px 5px;
            }
            .honorinfo {
              width: 49%;
              height: 256px;
              background: rgba(236, 236, 236, 1);
              color: rgba(102, 102, 102, 1);
              text-align: center;
              .text {
                box-sizing: border-box;
                padding-top: 68px;
                .year {
                  font-family: Impact;
                  font-size: 42px;
                }
                .intro {
                  width: 45%;
                  font-size: 24px;
                  line-height: 35px;
                  margin: 0 auto;
                }
              }
            }
          }
        }
      }
      .pics {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
    // 销售网络
    .sale {
      .topmainpic {
        width: 100%;
        height: 480px;
      }
    }
    // 架构
    .framework {
      width: 100%;
      .mainpic {
        width: 100%;
        height: 480px;
      }
    }
    // 社招校招
    .recruitment {
      width: 100%;
      .newsli {
        width: 100%;
        border-bottom: 1px solid rgba(204, 204, 204, 1);
        display: flex;
        justify-content: flex-start;
        .mainpic {
          margin: 30px 0;
          width: 50%;
          height: 225px;
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
        }
        .ins-info {
          width: 50%;
          box-sizing: border-box;
          padding: 30px 0 0 30px;
          .title {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 30px;
            color: rgba(51, 51, 51, 1);
            line-height: 45px;
          }
          .time {
            font-size: 14px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 45px;
          }
          .intro {
            font-size: 24px;
            color: #5b5b5b;
            line-height: 30px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3; //需要控制的文本行数
            overflow: hidden;
          }
          .more {
            width: 174px;
            height: 41px;
            border: 1px solid rgba(153, 153, 153, 1);
            border-radius: 10px;
            text-align: center;
            font-size: 20px;
            font-weight: 300;
            color: rgba(153, 153, 153, 1);
            line-height: 41px;
            margin-top: 15px;
            // &:active {
            //   border: 1px solid rgba(62, 145, 223, 1);
            //   color: rgba(62, 145, 223, 1);
            // }
          }
        }
        &:last-child {
          border: none;
          padding-bottom: 30px;
        }
      }
    }
    // 联系我们
    .contact {
      background: rgba(255, 255, 255, 1);
      .contactbox {
        width: 100%;
        box-sizing: border-box;
        padding: 35px 0px;
        line-height: 30px;
        color: rgba(51, 51, 51, 1);

        .warrper {
          width: 100%;
          height: 152px;
          position: relative;
          box-sizing: border-box;
          margin-bottom: 55px;
          h1 {
            font-size: 36px;
            text-align: center;
            color: rgba(62, 145, 223, 1);
            position: relative;
            top: 20px;
            right: 25px;
          }
          .totel {
            position: absolute;
            bottom: 25px;
            left: 5%;
            font-size: 37px;
            font-weight: bold;
            color: #ffffff;
            span {
              font-family: Impact;
              position: relative;
              top: 5px;
              font-size: 49px;
              color: white;
              font-weight: 400;
            }
          }
        }
        .text {
          border-bottom: 1px solid #ececec;
          font-size: 30px;
          line-height: 45px;
          color: #333333;
          box-sizing: border-box;
          padding: 30px 0;
          span{
            letter-spacing: 1px;
          }
        }
        .branch {
          box-sizing: border-box;
          margin-bottom: 32px;
        }
        .map {
          width: 100%;
          height: 396px;
          background: palevioletred;
        }
      }
    }
  }
}
</style>