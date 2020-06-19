<template>
  <div class="charge">
    <mt-navbar class="page-part" v-model="seselected">
      <mt-tab-item id="1">收费明细</mt-tab-item>
      <mt-tab-item id="2">助学政策</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="seselected">
      <mt-tab-container-item id="1">
        <div class="examination-teachers">
          <!-- <div class="examination-teachers-top">
                    <span></span>
                    <p>{{this.detailed.name}}</p>
          </div>-->
          <div class="examination-teachers-bottom" v-html="this.detailed.content"></div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="examination-teachers">
          <!-- <div class="examination-teachers-top">
                    <span></span>
                    <p>{{this.policy.name}}</p>
          </div>-->
          <div class="examination-teachers-bottom" v-html="this.policy.content"></div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
// import unit from "../unit.js";
export default {
  name: "page-navbar",
  data() {
    return {
      seselected: "1",
      detailed: [],
      policy: []
    };
  },
  created() {
    // this.$ajax.getIndex()
    // .then(resp=>{
    //     console.log(resp)
    //         this.detailed = resp.data.data.splice(20,1)[0]
    //         this.policy = resp.data.data.splice(20,1)[0]
    // })
    let detailedid = {
      id: 24
    };
    let policyid = {
      id: 25
    };
    axios
      .post(
        "http://ssjy.public.5151fw.com/index/api/category_show",
        qs.stringify(detailedid)
      )
      .then(resp => {
        this.detailed = resp.data.data;
      });
    axios
      .post(
        "http://ssjy.public.5151fw.com/index/api/category_show",
        qs.stringify(policyid)
      )
      .then(resp => {
        this.policy = resp.data.data;
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
  }
};
</script>

<style scoped>
.charge {
  margin-top: 20px;
}
.examination {
  margin-top: 20px;
}
.examination-teachers {
  background: #fff;
  margin-bottom: 20px;
}
.examination-teachers-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.examination-teachers-top span {
  margin-top: 20px;
  display: block;
  width: 3px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.examination-teachers-top p:nth-child(2) {
  float: left;
  font-size: 26px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.examination-teachers-bottom {
  min-height: 500px;
  padding: 20px 30px;
}
</style>
<style>
table {
  width: 690px !important;
  height: 500px !important;
  font-size: 24px !important;
  line-height: 2 !important;
}
table span {
  /* font-size: 24px!important; */
  line-height: 2 !important;
}
.examination-teachers-bottom p span {
  /* font-size: 24px!important; */
  line-height: 1.5 !important;
}
.examination-teachers-bottom img {
  width: 650px !important;
}
</style>
