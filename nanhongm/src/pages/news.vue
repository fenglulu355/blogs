<template>
  <div class="news">
    <div class="newsbox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <!-- 行业新闻 -->
      <div class="hynews nbox" v-show="curindex == 0">
        <ul class="newslist">
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
import tabBar from "../components/tabBar";
import moPagination from "../components/pagenation";
export default {
  name: "news",
  data() {
    return {
      // 分页
      pageSize: 24, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 300, // 总记录数,
      curindex: 0,
      tabtitle: { a: "新闻", b: "中心" },
      tabnav: ["行业新闻", "企业新闻"],
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
      ]
    };
  },
  created() {
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      this.curindex = Number(idx);
    }
  },
  methods: {
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
  components: { tabBar, moPagination }
};
</script>

<style lang="less" scoped>
.news {
  width: 100%;
}
.nbox {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px;
}
.newsbox {
  box-sizing: border-box;
  padding: 40px 0 70px 0;
  .newslist {
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
        cursor: pointer;
        width: 50%;
        box-sizing: border-box;
        padding: 30px 29px;
        .title {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 30px;
          color: #333333;
          line-height: 45px;
        }
        .time {
          font-size: 16px;
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
          text-align: center;
          border: 1px solid rgba(153, 153, 153, 1);
          border-radius: 10px;
          font-size: 20px;
          font-weight: 300;
          color: #999999;
          line-height: 41px;
          margin-top: 15px;
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