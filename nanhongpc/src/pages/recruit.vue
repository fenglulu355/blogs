<template>
  <div class="detail">
    <!-- 根据路由传参判断显示校园还是社会招聘 -->
    <p class="title" v-if="isrecruit">校园招聘</p>
    <p class="title" v-if="iscase">工装项目</p>
    <p class="title" v-if="isserv">安装流程</p>
    <p class="title" v-if="isnews">公司新闻</p>
    <div class="cont">
      <!-- recruit -->
      <div class="recruit" v-if="isrecruit">
        <p class="zwname">国际贸易专员</p>
        <p class="time">更新时间：2019-02-26</p>
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' +require('../assets/about/7-1.png') + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <p class="num text">招聘人数：3人</p>
        <p class="department text">招聘部门：营销部</p>
        <p class="address text">工作地点：泸州市</p>
        <p class="pubtime text">发布时间：2019-07-01</p>
        <p class="intro text">工作职责：</p>
        <p class="intro text">
          1、本科及以上学历，国际贸易类、经济类等相关专业毕业；
          2、男性，有英语读写能力、有工作经验者优先。
        </p>
        <p class="zg text">任职资格：</p>
        <p class="zg text">1、收付汇管理、国际贸易合同签订、信用证的开立、协调报关运输、基本业务谈判。 简历投递至：20008345@</p>
      </div>
      <div class="case" v-if="iscase">
        <p class="name">项目名称</p>
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' +require('../assets/case/case2.png') + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <div class="caseinfo">
          <p class="time text">
            <span>【工程日期】</span>
            <!-- {{item.time}} -->
            8年
          </p>
          <p class="area text">
            <span>【项目面积】</span>56775
            <!-- {{item.area}} -->
          </p>
          <p class="type text">
            <span>【使用机型】</span>567567
            <!-- {{item.type}} -->
          </p>
          <p class="inro text">
            <span>【项目简介】</span>678867
            <!-- {{item.type}} -->
          </p>
        </div>
      </div>
      <div class="serv" v-if="isserv"></div>
      <div class="case" v-if="isnews">
        <p class="name">“燃爆三月 火力全开”活动，优惠不断，特价多</p>
        <p class="time">更新时间：2019-02-26</p>
        <div
          class="caseinfo"
        >内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
      iscase: false,
      isrecruit: false,
      isserv: false,
      isnews: false
    };
  },
  created() {
    let kind = this.$route.query.kind;
    if (kind == "case") {
      this.iscase = true;
    } else if (kind == "serv") {
      this.isserv = true;
    } else if (kind == "recruit") {
      this.isrecruit = true;
    } else if (kind == "news") {
      this.isnews = true;
    }
    console.log(kind);
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  box-sizing: border-box;
  padding: 60px 0 90px 0;
  border-top: 1px solid rgba(236, 236, 236, 1);
  border-bottom: 1px solid rgba(236, 236, 236, 1);
  color: rgba(51, 51, 51, 1);
  .title {
    width: 1200px;
    margin: 0 auto;
    height: 40px;
    background: rgba(236, 236, 236, 1);
    border: 1px solid rgba(236, 236, 236, 1);
    border-radius: 10px;
    font-size: 18px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 20px;
  }
  .cont {
    width: 1200px;
    margin: 0 auto;
    height: 1017px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 45px 30px;
    // zp
    .recruit {
      .zwname {
        font-size: 29px;
        font-weight: bold;
      }
      .time {
        font-size: 12px;
        line-height: 50px;
        color: rgba(204, 204, 204, 1);
        box-sizing: border-box;
        padding-bottom: 20px;
      }
      .mainpic {
        width: 560px;
        height: 220px;
        border-radius: 10px;
      }
      .num {
        box-sizing: border-box;
        padding-top: 50px;
      }
      .text {
        font-size: 16px;
        line-height: 35px;
        color: rgba(102, 102, 102, 1);
      }
      .intro,
      .zg {
        // css保留空格和换行符
        white-space: pre-line;
      }
    }
    // case
    .case {
      width: 100%;
      .name {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding-bottom: 32px;
      }
      .mainpic {
        width: 100%;
        height: 635px;
      }
      .caseinfo {
        box-sizing: border-box;
        padding-top: 32px;
        .text {
          font-size: 16px;
          color: rgba(204, 204, 204, 1);
          line-height: 30px;
          span {
            color: rgba(51, 51, 51, 1);
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>