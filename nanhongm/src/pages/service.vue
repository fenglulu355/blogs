<template>
  <div class="service">
    <div class="servisebox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <!-- 服务与支持 -->
      <div class="repair serv" v-show="curindex===0">
        <div class="repic">
          <div class="telinfo">
            <p class="text">销售、售后及配送集于一体的综合企业</p>
            <h1>全心全意为顾客服务</h1>
            <p class="tel">服务热线：18181878760</p>
            <div class="totel">
              <img src="../assets/ser/tel.png" alt />
              <span>立即咨询</span>
            </div>
          </div>
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + require('../assets/ser/show.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </div>
        <div class="reinfo">
          <p>售后服务</p>
          <section>
            一、售前
            （1）如客户需要，按客户的特殊要求，协助设计所需产品。（2）热情接待客户，迅速处理来电、来函、传真及其他咨询。
            （3）免费帮助客户培训操作、维护技术人员、帮助他们能熟练掌握技术。
            二、售中
            （1）严格按照合同技术要求及国家有关标准组织生产，保质保量，准时在约定地点交货。
            （2）当客户选型错误、订单数量不足或其他情况要求提前供货时，我公司优先安排生产，努力满足客户要求。
            三、售后
            （1）实行售后服务到位制度，即接到用户通知后，服务人员及时到位服务。（三年保修）
            （2）产品在交付前是损坏、短缺等质量问题，概有我们公司负责。
            （3）质量保质期内（2个月）存在或发生是质量问题，经双方确认后，的确是我公司责任，我们公司负责妥善处理，合理费用概由我们公司承担。
            （4）双方确认是用户责任造成的质量问题，我们公司也将协助解决，力争满足用户的合理要求。
            （5）用户设计变更，产品规格、型号数量有所变动，我们公司将积极配合，努力满足客户要求；如用户所订购是产品超过实际需要或因设计变更，原订购产品不能继续使用，我们公司部将积极配合用户做好售后处理工作，减轻用户负担。
            （6）用户在使用过程中，需要提供技术指导，我们公司将及时派出专业技术人员提供服务。
            （7)我们公司建立用户档案，在质量保证期结束后，我们公司仍将于用户联系沟通，追求尽善尽美，满足用户需要。
            （8）对非本公司制造质量造成的现场服务，我们公司将根据实际发生的差旅等费用，酌情向客户收取技术服务费。
            （9）对非本公司制造质量问题造成的损坏或质保期外的损坏，我们公司提供有偿维修服务。
            为了方便用户质量投诉，我们公司电话24小时开通。
          </section>
        </div>
      </div>
      <!-- 团队 -->
      <div class="team serv" v-show="curindex===1">
        <ul
          class="teamshow"
          :style="{backgroundImage: 'url(' + require('../assets/ser/teambg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        >
          <li class="ts-left"></li>
          <li class="ts-right">
            <div class="top">
              <p>以人为本，以技为魂，以管理为纽带</p>
            </div>
            <p class="deshed">-----------------------</p>
            <div class="bottom">
              <p>认真对待每一个用户，带领全体员工共同努力，创造南宏更美好的明天。</p>
            </div>
          </li>
        </ul>
        <ul class="teaminfo">
          <li class="teaminfoli" v-for="(item, index) in teaminfo" :key="index">
            <div
              class="pics"
              :style="{backgroundImage: 'url(' + item.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="name">
              <span>{{item.name}}</span>
              <span>{{item.job}}</span>
            </p>
          </li>
        </ul>
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
      <!-- 服务流程 -->
      <div class="process serv" v-show="curindex===2">
        <div class="protop">
          <p class="title">一站式专业服务流程</p>
          <ul class="toplist">
            <li class="topli" v-for="(item, index) in fwlca" :key="index">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + item.img+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
              ></div>
              <p class="text">{{item.text}}</p>
            </li>
          </ul>
        </div>
        <div class="profw">
          <p class="title">专业的安装服务</p>
          <p
            class="text"
          >南宏机电公司专业安装团队秉承“精品工程，专业耕耘”的服务原则，制定出一套完整的施工规则，严格安装国家相关规定的施工准则安装作业，交付使用，方能达到你想要的满意程度。</p>
          <ul class="botlist">
            <li class="botli" v-for="(item, index) in fwlcb" :key="index">
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
      </div>
      <!-- 安装流程 -->
      <div class="install serv" v-show="curindex===3">
        <ul class="ins-list">
          <li class="ins-li" v-for="(item, index) in insli" :key="index">
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
              <p class="intro">
                <span>简介：{{item.intro}}</span>
                <span>小区：{{item.xq}}</span>
              </p>
              <p class="intro">房间类型：{{item.home}}</p>
              <p class="area">面积：{{item.area}}</p>
              <p class="more">查看详情+</p>
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
      <!-- 售后 -->
      <div class="repair serv" v-show="curindex===4">
        <div class="repic">
          <div class="telinfo">
            <p class="text">销售、售后及配送集于一体的综合企业</p>
            <h1>全心全意为顾客服务</h1>
            <p class="tel">服务热线：18181878760</p>
            <div class="totel">
              <img src="../assets/ser/tel.png" alt />
              <span>立即咨询</span>
            </div>
          </div>
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + require('../assets/ser/SH.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
        </div>
        <div class="reinfo">
          <p>工程售后维保</p>
          <section>
            一、工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
          </section>
        </div>
      </div>
      <!-- 条款 -->
      <div class="clause serv" v-show="curindex===5">
        <p class="title">服务条款</p>
        <p class="time">更新时间：2019-02-26 21:56:24</p>
        <div class="clauseinfo">
          <section>
            项目名称: 合同来源:
            合同编号: 材料名称：
            买卖合同（通用版本） 买受人： （以下简称甲方） 出卖人： （以下简称乙方）
            甲、乙双方在自愿的基础上经充分协商，依照《中华人民共和国合同法》及其他有关法律法规的规定，订立本合同。
            第1条 货物的名称、品种、规格、质量和验收
            1、货物的具体的名称、品种、规格型号、数量、厂家、价款以本合同书附件1所列为准。
            2、货物的质量、技术标准：货物的质量满足国家或相关行业的强制性质量标准；并具有国家认可机构出具的与每批货物相对应有效期限内的有效质量检验合格报告，无强制性标准的应以样品或双方约定的标准为准（包括图纸、样品等），如标准间存在冲突，按严格的标准执行。图纸及样品必须经双方签认并妥善封存。
            第二条 货物的数量、计价方法
            1、货物的数量：实际需要的货物品种、规格、数量由甲方按单个工程项目分批提供订货清单，订货清单须由甲方授权代表签字有效。乙方须按订货清单供货。
            2、计价方法：按验收合格的数量乘以相应货物结算单价据实结算。
            3、乙方送货到指定地点后，由甲方两名仓管、两名保安和工地主管以抽检的方式对货物的规格型号、数量和质量进行初验且签收确认。
            4、乙方在交货前应向甲方提供货物相对应有效期限内的产品合格证（原件）、国家认可机构出具的产品质量检验报告（需加盖厂家公章）、产品质量说明书（或产品质量认证证书）等文件。
            5、乙方同意甲方可聘请有资质的检测机构对货物随机抽样进行产品质量检验。质量检验合格，检验费用由甲方承担；质量检验不合格，检验费用由乙方承担。
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import tabBar from "../components/tabBar";
import moPagination from "../components/pagenation";
export default {
  name: "servise",
  data() {
    return {
      // 分页
      pageSize: 24, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 300, // 总记录数,
      curindex: null,
      tabtitle: {
        a: "服务与",
        b: "支持"
      },
      tabnav: [
        "服务支持",
        "团队展示",
        "服务流程",
        "安装流程",
        "工程售后维保",
        "服务条款"
      ],
      fwlca: [
        { img: require("../assets/ser/az.png"), text: "安装" },
        { img: require("../assets/ser/ts.png"), text: "调试" },
        { img: require("../assets/ser/ys.png"), text: "验收" }
      ],
      fwlcb: [
        require("../assets/ser/lc1.png"),
        require("../assets/ser/lc2.png"),
        require("../assets/ser/lc3.png")
      ],
      teaminfo: [
        {
          img: require("../assets/ser/onepp.png"),
          name: "冯经理",
          job: "项目经理"
        },
        {
          img: require("../assets/ser/onepp.png"),
          name: "张经理",
          job: "项目经理"
        },
        {
          img: require("../assets/ser/onepp.png"),
          name: "周经理",
          job: "项目经理"
        },
        {
          img: require("../assets/ser/onepp.png"),
          name: "李经理",
          job: "项目经理"
        }
      ],
      insli: [
        {
          img: require("../assets/shopshow/bg.png"),
          title: "中央空调安装全过程记录",
          time: "2010.8.03",
          intro: "舒服舒服大撒大声地",
          xq: "红盛花园",
          home: "三室两厅",
          area: "100㎡"
        },
        {
          img: require("../assets/shopshow/bg.png"),
          title: "中央空调安装全过程记录",
          time: "2010.8.03",
          intro: "舒服舒服大撒大声地",
          xq: "香榭名苑",
          home: "三室两厅",
          area: "100㎡"
        },
        {
          img: require("../assets/shopshow/bg.png"),
          title: "中央空调安装全过程记录",
          time: "2010.8.03",
          intro: "舒服舒服大撒大声地",
          xq: "清溪南街",
          home: "三室两厅",
          area: "100㎡"
        }
      ]
    };
  },
  created() {
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      idx == 3 ? (this.curindex = 4) : (this.curindex = Number(idx));
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
    }
  },

  components: { banner, tabBar, moPagination }
};
</script>

<style lang="less" scoped>
.service {
  width: 100%;
  .servisebox {
    width: 100%;
    border-top: 1px solid rgba(153, 153, 153, 0.3);
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);
    box-sizing: border-box;
    padding: 60px 0 70px 0;
    .serv {
      box-sizing: border-box;
      padding: 42px 25px 0 25px;
    }
    .pagenation {
      // background: violet;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      padding-top: 50px;
    }
    //1团队
    .team {
      .teamshow {
        width: 100%;
        height: 270px;
        display: flex;
        .ts-left {
          width: 55%;
          height: 270px;
        }
        .ts-right {
          width: 45%;
          box-sizing: border-box;
          padding: 34px 10px 0 0px;
          .top {
            font-size: 30px;
            color: rgba(62, 145, 223, 1);
            line-height: 40px;
            font-weight: bold;
          }
          .deshed {
            color: rgba(204, 204, 204, 1);
            font-size: 24px;
          }
          .bottom {
            padding-top: 10px;
            color: #999999;
            font-size: 24px;
            line-height: 35px;
          }
        }
      }
      .teaminfo {
        box-sizing: border-box;
        padding-top: 24px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .teaminfoli {
          width: 49%;

          margin-bottom: 25px;
          .pics {
            width: 100%;
            height: 463px;
            border-radius: 10px;
          }
          .name {
            margin-top: 10px;
            width: 100%;
            height: 48px;
            text-align: center;
            line-height: 48px;
            background: rgba(236, 236, 236, 1);
            border-radius: 10px;
            font-size: 24px;
            color: #5b5b5b;
            font-weight: 300;
            span {
              margin: 0 5px;
            }
          }
        }
      }
    }
    // 2服务流程
    .process {
      width: 100%;
      .protop {
        text-align: center;
        .title {
          font-size: 36px;
          color: #333333;
          padding-bottom: 40px;
        }
        .toplist {
          display: flex;
          justify-content: space-between;
          .topli {
            width: 211px;
            height: 211px;
            position: relative;
            .mainpic {
              width: 100%;
              height: 100%;
            }
            .text {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 137px;
              height: 42px;
              background: rgba(36, 130, 200, 1);
              border-radius: 21px;
              color: white;
              text-align: center;
              line-height: 42px;
            }
          }
        }
      }
      .profw {
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        line-height: 35px;
        // font-weight:400;
        box-sizing: border-box;
        padding-top: 50px;
        .title {
          font-size: 36px;
          color: #333333;
          font-weight: bold;
        }
        .text {
          font-size: 30px;
          color: #333333;
          padding-top: 10px;
          line-height: 45px;
        }
        .botlist {
          width: 100%;
          .botli {
            width: 100%;
            height: 278px;
            margin-top: 30px;
            .mainpic {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    // 3安装流程
    .install {
      // background: pink;
      .ins-list {
        width: 100%;
        .ins-li {
          width: 100%;
          // height: 300px;
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          display: flex;
          justify-content: flex-start;
          .mainpic {
            margin: 40px 0;
            width: 48%;
            height: 225px;
            background: rgba(255, 255, 255, 1);
            border-radius: 10px;
          }
          .ins-info {
            // background: chartreuse;
            width: 50%;
            box-sizing: border-box;
            padding: 40px 0 40px 30px;
            .title {
              width: 100%;
              font-size: 30px;
              color: #333333;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }
            .time,
            .intro,
            .area {
              font-size: 24px;
              font-weight: 400;
              color: #5b5b5b;
              line-height: 35px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }

            .more {
              width: 174px;
              height: 41px;
              border: 1px solid rgba(153, 153, 153, 1);
              border-radius: 10px;
              color: #999999;
              font-size: 20px;
              text-align: center;
              line-height: 41px;
            }
          }
          &:last-child {
            border: none;
            margin-bottom: 20px;
          }
        }
      }
    }
    // 1,3服务与支持
    .repair {
      width: 100%;
      margin: 0 auto;
      .mainpic {
        width: 100%;
        height: 320px;
      }
      .repic {
        width: 100%;
        position: relative;
        .telinfo {
          // background: pink;
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
          padding: 30px 0 0 17px;
          font-weight: 400;
          .text {
            color: rgba(153, 153, 153, 1);
            line-height: 42px;
            font-weight: 400;
            color: #999999;
            font-size: 19px;
          }
          h1 {
            color: rgba(62, 145, 223, 1);
            font-size: 36px;
            padding-top: 40px;
          }
          .tel {
            font-size: 30px;
            color: rgba(51, 51, 51, 1);
            line-height: 42px;
            padding-top: 5px;
          }
          .totel {
            margin-top: 25px;
            width: 227px;
            height: 47px;
            background: rgba(62, 145, 223, 1);
            border: 1px solid rgba(62, 145, 223, 1);
            border-radius: 10px;
            border: 1px solid rgba(62, 145, 223, 1);
            border-radius: 10px;
            text-align: center;
            line-height: 47px;
            color: white;
            img {
              width: 20px;
            }
          }
        }
      }
      .reinfo {
        box-sizing: border-box;
        padding-top: 30px;
        color: rgba(51, 51, 51, 1);
        p {
          font-size: 36px;
          color: #2482c8;
        }
        section {
          line-height: 35px;
          font-size: 16px;
          word-break: break-all;
          // css保留空格和换行符
          white-space: pre-wrap;
          // css保留换行符
          white-space: pre-line;
        }
      }
    }
    //4
    .clause {
      width: 100%;
      color: #333333;
      .title {
        text-align: center;
        font-size: 36px;
      }
      .time {
        font-size: 20px;
        text-align: center;
        box-sizing: border-box;
        padding: 10px 0 20px 0;
      }
      .clauseinfo {
        width: 100%;

        section {
          width: 100%;
          font-size: 24px;
          // css保留空格和换行符

          // css保留空格和换行符
          white-space: pre-wrap;
          // css保留换行符
          white-space: pre-line;
          word-break: break-all;
        }
      }
    }
  }
}
</style>