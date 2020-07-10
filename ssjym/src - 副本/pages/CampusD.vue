<template>
  <div class="campusd">
    <div class="box">
      <h2>{{campusd.title}}</h2>
      <div class="font" v-html="campusd.content"></div>
      <div class="bottom">
        <a v-if="campusdA" class="up" @click="front(campusdA.id)">上一页</a>
        <a v-if="campusdB" class="down" @click="after(campusdB.id)">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
// import unit from '../unit.js'
export default {
  data() {
    return {
      campusd: [],
      campusdA: [],
      campusdB: [],
      title1: [],
      title: []
    };
  },
  created() {
    axios
      .post("http://ssjy.public.5151fw.com/index/api/article_show", {
        id: this.$route.params.id
      })
      .then(resp => {
        //console.log(resp)
        this.campusd = resp.data.data[0];
        this.campusdA = resp.data.data[1];
        this.campusdB = resp.data.data[2];
        //console.log(this.campusd)
        this.title1 = this.campusd.title;
        document.title = this.title1 + "四川工业贸易学院";
      });
    this.$ajax.getConfig().then(resp => {
      this.title = resp.data.data.keyword;
      //console.log(this.title1)
    });
  },
  mounted() {
    //   var self=this;
    //   pushHistory()
    //   window.addEventListener('popstate', function(e) {
    //         self.$router.back()
    //   }, false)
    //   function pushHistory() {
    //         var state = {
    //         title: 'title',
    //         url: '#'
    //         }
    //         window.history.pushState(state, 'title', '#')
    //   }
  },
  methods: {
    front(id) {
      let _that = this;
      _that.scrollTop -= 50;
      document.getElementsByClassName("app-mine")[0].scrollTop =
        _that.scrollTop;
      let campusdId = {
        id: id
      };
      axios
        .post("http://ssjy.public.5151fw.com/index/api/article_show", {
          id: id
        })
        .then(resp => {
          //console.log(resp)
          this.campusd = resp.data.data[0];
          this.campusdA = resp.data.data[1];
          this.campusdB = resp.data.data[2];
          this.title1 = this.campusd.title;
          document.title = this.title1 + "-四川工业贸易学院";
          //console.log(this.campusdA)
        });
    },
    after(id) {
      let _that = this;
      _that.scrollTop -= 50;
      document.getElementsByClassName("app-mine")[0].scrollTop =
        _that.scrollTop;

      axios
        .post("http://ssjy.public.5151fw.com/index/api/article_show", {
          id: id
        })
        .then(resp => {
          //console.log(resp)
          this.campusd = resp.data.data[0];
          this.campusdA = resp.data.data[1];
          this.campusdB = resp.data.data[2];
          this.title1 = this.campusd.title;
          document.title = this.title1 + "-四川工业贸易学院";
          //console.log(this.examinationdA)
        });
    }
  },
  destroyed() {
    document.title = "四川工业贸易学院";
  }
};
</script>

<style>
.campusd {
  padding: 20px 0 20px 0;
}
.box {
  padding-top: 20px;
  background: #fff;
  padding: 30px;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
h2 {
  text-align: center;
  margin-bottom: 30px;
}
.up {
  float: left;
  margin-left: 20px;
  text-decoration: underline;
}
.down {
  float: right;
  margin-right: 20px;
  text-decoration: underline;
}
.bottom {
  height: 30px;
}
</style>
<style>
.font p {
  /* font-size: 24px!important; */
  line-height: 1.8 !important;
}
.font p span {
  /* font-size: 24px!important; */
  line-height: 1.8 !important;
}
.font img {
  width: 650px !important;
  text-align: center;
}
</style>
