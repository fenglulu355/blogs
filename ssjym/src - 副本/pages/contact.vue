<template>
  <div class="contact">
    <mt-navbar class="page-part" v-model="seselected">
      <mt-tab-item id="1">联系方式</mt-tab-item>
      <mt-tab-item id="2">乘车路线</mt-tab-item>
      <mt-tab-item id="3">学校位置</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="seselected">
      <mt-tab-container-item id="1">
        <div class="contact-teachers">
          <!-- <div class="contact-teachers-top">
                    <span></span>
                    <p>{{this.contact.name}}</p>
          </div>-->
          <div class="contact-teachers-bottom" v-html="this.contact.content"></div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="contact-teachers">
          <!-- <div class="contact-teachers-top">
                    <span></span>
                    <p>{{this.route.name}}</p>
          </div>-->
          <div class="contact-teachers-bottom" v-html="this.route.content"></div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="contact-teachers">
          <!-- <div class="contact-teachers-top">
                    <span></span>
                    <p>{{this.position.name}}</p>
          </div>-->
          <div id="position" class="contact-teachers-bottom1">
            <baidu-map class="map" :center="center" :zoom="zoom">
              <!-- <bm-marker :position="{lng:104.126829,lat:30.7089}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker> -->
            </baidu-map>
            <p class="button" @click="tomap">现在就去</p>
          </div>
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
      contact: [],
      route: [],
      position: [],
      center: { lng: 104.1194, lat: 30.7134 },
      zoom: 16
    };
  },
  created() {
    this.$ajax.getIndex().then(resp => {
      this.position = resp.data.data.splice(17, 1)[0];
    });

    this.$axios
      .post("http://ssjy.public.5151fw.com/index/api/category_show", {
        id: 21
      })
      .then(resp => {
        // console.log(resp);
        this.contact = resp.data.data;
      });
    this.$axios
      .post("http://ssjy.public.5151fw.com/index/api/category_show", {
        id: 22
      })
      .then(resp => {
        // console.log(resp);
        this.route = resp.data.data;
      });
  },
  mounted() {
    let id = this.$route.params.id;
    this.seselected = id.toString()
    // var self=this;
    // pushHistory()
    // window.addEventListener('popstate', function(e) {
    //     self.$router.back()
    // }, false)

    // function pushHistory() {
    //     var state = {
    //     title: 'title',
    //     url: '#'
    //     }
    //     window.history.pushState(state, 'title', '#')
    // }
  },
  methods: {
    tomap() {
      window.location.href =
        "https://map.baidu.com/mobile/webapp/place/linesearch/foo=bar/from=place&end=word%3D%25E5%259B%259B%25E5%25B7%259D%25E7%259C%2581%25E5%25B7%25A5%25E4%25B8%259A%25E8%25B4%25B8%25E6%2598%2593%25E5%25AD%25A6%25E6%25A0%25A1%26point%3D11591471.71%252C3572989.16%26uid%3Ddffd464294367fb33c9a5e64%26navi_x%3D11591432.633%26navi_y%3D3573098.53691&tab=line";
    }
  }
};
</script>

<style scoped>
.contact {
  margin-top: 20px;
}
.contact {
  margin-top: 20px;
}
.contact-teachers {
  background: #fff;
  margin-bottom: 20px;
}
.contact-teachers-top {
  height: 80px;
  border-bottom: 1px solid #9f2020;
}
.contact-teachers-top span {
  margin-top: 20px;
  display: block;
  width: 3px;
  height: 30px;
  background: #9f2020;
  float: left;
  margin-left: 30px;
}
.contact-teachers-top p:nth-child(2) {
  float: left;
  font-size: 26px;
  font-weight: 400;
  line-height: 70px;
  margin-left: 15px;
}
.contact-teachers-bottom {
  font-size: 18px !important;
  min-height: 500px;
  padding: 20px 30px;
}
.contact-teachers-bottom span {
  line-height: 2;
}
#position {
  padding: 0;
  padding-bottom: 1px;
}
.map {
  height: 500px;
}
.button {
  display: block;
  margin: 30px auto;
  width: 300px;
  height: 80px;
  background: #9f2020;
  color: #fff;
  font-size: 30px;
  line-height: 80px;
  text-align: center;
  border-radius: 15px;
}
</style>
<style>
.contact-teachers-bottom span {
  font-size: 32px !important;
  line-height: 1.5 !important;
}
.contact-teachers-bottom img {
  width: 650px !important;
}
</style>
