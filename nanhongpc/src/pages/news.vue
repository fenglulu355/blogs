<template>
  <div class="news">
    <!-- <banner></banner> -->
    <div class="newsbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <!-- 行业新闻 -->
      <div class="hynews nbox">
        <div class="flash">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' + require('../assets/news/lb.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <el-carousel height="375px">
            <el-carousel-item v-for="(item, index) in lb" :key="index">
              <div class="infos">
                <div class="ins-info">
                  <p class="title">{{item.title}}</p>
                  <p class="time">{{item.created_time}}</p>
                  <p class="intro">{{item.desc}}</p>
                  <p class="more">查看详情+</p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <ul class="newslist">
          <li class="newsli" v-for="(item, index) in newsinfo" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +httpUrl+item.image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div class="ins-info">
              <p class="title">{{item.title}}</p>
              <p class="time">{{item.created_time}}</p>
              <p class="intro">{{item.desc}}</p>
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
    </div>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import tabBar from "../components/tabBar";
import moPagination from "../components/pagenation";
export default {
  name: "news",
  data() {
    return {
      // 分页
      pageSize: 8, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      curindex: 0,
      tabtitle: { a: "新闻", b: "中心" },
      tabnav: [{ class_name: "行业新闻" }, { class_name: "企业新闻" }],
      lb: [
        {
          img: require("../assets/news/lb.png"),
          title: "中央空调安装全安装全安装全安装全安装全安装全过程记录",
          time: "2010.8.03",
          intro:
            "阳春三月，万物复苏，阳春三月物复苏，阳春三月物复苏，阳春三月物复苏，阳春三月，万物复苏阳春三月，万物复苏，，阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，盛夏即将来临，为了避开盛夏涨价，销售、安装高峰，大山坪美的生活馆联袂美的集团8大品类聚焦全屋家电。一站购齐，我们提倡有智者，慧生活……"
        },
        {
          img: require("../assets/news/lb.png"),
          title: "中央空调安装全过程记录",
          time: "2010.8.03",
          intro:
            "阳春三月，万物复阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，苏，盛夏即将来临，为了避开盛夏涨价，销售、安装高峰，大山坪美的生活馆联袂美的集团8大品类聚焦全屋家电。一站购齐，我们提倡有智者，慧生活……"
        },
        {
          img: require("../assets/news/lb.png"),
          title: "中央空调安装全过程记录",
          time: "2010.8.03",
          intro:
            "阳春三月，万物复苏，盛夏即将来临，为了避开盛夏涨价，销售、安装高峰，大山坪美的生活阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，阳春三月，万物复苏，馆联袂美的集团8大品类聚焦全屋家电。一站购齐，我们提倡有智者，慧生活……"
        },
        {
          img: require("../assets/news/lb.png"),
          title: "中央空调安装全过程记录",
          time: "2010.8.03",
          intro:
            "阳春三月，万物复苏，盛夏即将来临，为了避开盛夏涨价，销售、安装高峰，大山坪美的生活馆联袂美的集团8大品类聚焦全屋家电。一站购齐，我们提倡有智者，慧生活……"
        }
      ],
      newsinfo: [],
      curid: 0
    };
  },
  created() {
    this.requst(0, 1, 8);
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
    requst(type, page, limit) {
      this.$axios
        .post("/index/api/newsList", { type: type, page: page, limit: limit })
        .then(res => {
          this.lb = res.data.data.data.splice(0, 3);
          this.newsinfo = res.data.data.data.splice(4, 7);
          this.count = res.data.data.total;
          // console.log(res.data, "rrr");、
        });
    },
    getList(page) {
      this.requst(this.curid, page, 8);
    },
    pageChange(index) {
      this.currentPage = index;
      this.getList(index);
    },
    tonav(index) {
      console.log(index);
      this.curindex = index;
      this.curid = index;
      this.requst(index, 1, 8);
    }
  },
  components: { banner, tabBar, moPagination }
};
</script>

<style lang="less" scoped>
.news {
  width: 100%;
}
.nbox {
  width: 1200px;
  margin: 0 auto;
}
.newsbox {
  border-top: 1px solid rgba(153, 153, 153, 0.3);
  // border-bottom: 1px solid rgba(153, 153, 153, 0.3);
  box-sizing: border-box;
  padding: 60px 0 100px 0;
  .flash {
    box-sizing: border-box;
    padding: 60px 0 30px 0;
    display: flex;
    border-bottom: 1px solid rgba(204, 204, 204, 1);
    .mainpic {
      width: 534px;
      height: 375px;
    }
    .el-carousel {
      width: 666px;
      height: 375px;
      background: rgba(249, 249, 249, 1);
      border-radius: 10px;
      .infos {
        cursor: pointer;
        width: 100%;
        box-sizing: border-box;
        padding: 60px 66px 0 47px;
        .title {
          width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 24px;
          font-weight: bold;
          color: rgba(36, 130, 200, 1);
          line-height: 45px;
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
          border: 1px solid rgba(62, 145, 223, 1);
          border-radius: 5px;
          font-size: 14px;
          font-weight: 300;
          color: rgba(62, 145, 223, 1);
          line-height: 31px;
          margin-top: 30px;
        }
      }
    }
  }
  .newslist {
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
        width: calc(100% - 345px);
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
          &:hover {
            color: rgba(36, 130, 200, 1);
          }
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
          &:hover {
            border: 1px solid rgba(62, 145, 223, 1);
            color: rgba(62, 145, 223, 1);
          }
        }
      }
    }
  }
  .mo-paging {
    width: 100%;
    // background: pink;
    text-align: center;
    box-sizing: border-box;
    padding-top: 53px;
  }
}
</style>