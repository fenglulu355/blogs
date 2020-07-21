<template>
  <div class="appreciate">
    <tabbar :tabbar="caseinfo"></tabbar>
    <navbar :navbar="casenav" @changenav="casechangenav"></navbar>
    <ul class="caselist">
      <li class="pic" v-for="(item, index) in caseslide" :key="index">
        <div class="pics" v-if="item" @click="playvideo(item,index)">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +baseurl+`/public/`+ item.image_url+ ')',
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
          >
            <img src="../assets/play.png" alt />
          </div>

          <div class="infos">
            <p class="name">{{item.article_title}}</p>
          </div>
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

    <div class="videobox" :style="{'height':clientHeight+`px`}" v-show="isvedio">
      <div class="main" :style="{'height':clientHeight+`px`}">
        <img src="../assets/close.png" alt class="close" @click="closevideo" />
        <video
          :style="{'height':clientHeight+`px`,'width':clientWidth+`px`}"
          ref="video"
          controls
          v-show="isvedio"
          :src="baseurl+`/public/`+videos.video_url"
        ></video>
      </div>
    </div>
  </div>
</template>


<script>
import moPagination from "../components/pagenation";
import tabbar from "../components/tabbar";
import navbar from "../components/navbar";
import httpUrl from "../api/url";
export default {
  name: "appreciate",
  data() {
    return {
      isvedio: false,
      getProductClass: [],
      baseurl: "",
      clientHeight: "",
      height: "",
      // 分页
      pageSize: 6, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      caseinfo: {
        normal: "视频",
        green: "赏析",
        img: require("../assets/tabbar/appreciate.png")
      },
      casenav: [],
      palyvideos: [],
      caseslide: [],
      videos: [],
      clientWidth: null,
      keyword: ""
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;

    if (this.$route.query.keywords) {
      this.keyword = this.$route.query.keywords;
      this.requst(this.keyword);
    } else {
      this.requst(this.keyword);
    }
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    this.clientWidth = document.body.clientWidth;
    this.height = Number(this.clientHeight) - 200;
    // console.log(this.height);
    // console.log(this.clientWidth);
  },
  methods: {
    requst(keyword) {
      this.$axios.post("/index/api/getProductClass").then(res => {
        this.getProductClass = res.data.data[1];
        // console.log(this.getProductClass, "this.getProductClass");
        // // 获取案例分类名字
        this.casenav = this.getProductClass.child;
        // console.log(this.casenav, "this.caseli");
        // 主要获取默认的第一个classid
        this.curitem = this.getProductClass.child[0];
        // console.log(this.curitem, "this.curitem");
        // // 默认请求第一个分类的数据
        this.requstvideo(this.curitem.class_id, 1, 6, keyword);
      });
    },
    requstvideo(id, page, limit, keyword) {
      this.$axios
        .post("/index/api/getVideoList", {
          id: id,
          page: page,
          limit: limit,
          keyword: keyword
        })
        .then(res => {
          this.caseslide = res.data.data.data;
          this.count = res.data.data.total;
          // console.log(this.caseslide, "video");
        });
    },

    playvideo(item, index) {
      this.isvedio = true;
      this.palyvideos = item;
      // console.log(this.palyvideos, "aaaa");
      this.requstvideodetail(this.palyvideos.article_id);
      setTimeout(() => {
        this.isvedio = true;
      }, 200);
    },
    // 请求视频详情
    requstvideodetail(id) {
      this.$axios.post("/index/api/videoShow", { id: id }).then(res => {
        this.videos = res.data.data;
        this.previd = res.data.data.prov;
        this.nextid = res.data.data.next;
        // this.requstprev();
        // this.requstnext();
        // this.$refs.video.src = res.data.data.video_url
        // console.log(res, "videos");
      });
    },

    casechangenav(item, index) {
      // console.log(item, index);
      this.currentPage = 1;
      // 请求数据
      this.requstvideo(item.class_id, 1, 8, this.keyword);
    },
    getList(page) {
      this.requstvideo(this.curitem.class_id, page, 6, this.keyword);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },

    closevideo() {
      this.isvedio = false;
    }
  },
  components: { tabbar, navbar, moPagination }
};
</script>

<style lang="less" scoped>
.appreciate {
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px 70px 25px;

  .caselist {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 45px auto;
    li {
      cursor: pointer;
      box-sizing: border-box;
      display: inline-block;
      margin: 0px 5px;
      width: 48%;
      height: 310px;
      margin-bottom: 25px;
      .mainpic {
        width: 100%;
        height: 225px;
        position: relative;
        img {
          width: 89px;
          height: auto;
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .infos {
        margin-top: 25px;
        width: 100%;
        height: 70px;
        background: RGBA(248, 246, 247, 1);
        text-align: center;
        line-height: 70px;
        font-size: 30px;
        color: rgba(102, 102, 102, 1);
      }
      &:active .infos {
        background: rgba(50, 149, 43, 1);
        .name {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .videobox {
    width: 100%;
    height: 100%;
    background: RGBA(0, 0, 0, 0.8);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11111111;
    .main {
      background: white;
      width: 100%;
      position: relative;
      .close {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 1;
      }
      // video{
      //   margin: 90px auto;
      // }
    }
  }
}
</style>

