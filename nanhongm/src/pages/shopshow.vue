<template>
  <div class="shopshow">
    <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
    <div class="shops" v-show="curindex === 0">
      <ul class="shoplist">
        <li class="shopli" v-for="(item, index) in shopinfo" :key="index">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +httpUrl+  item.image_url+')',
                 backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
                }"
          ></div>
          <div class="infos">
            <p class="shopname">{{item.shopname}}</p>
            <p class="mainsell">主营产品：{{item.content}}</p>
            <p class="address">地址：{{item.address}}</p>
            <p class="tel">电话：{{item.tel}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="maps" v-if="curindex === 1">
      <ul class="shoplist" >
        <li class="shopli"  v-for="(item, index) in shopinfo" :key="index">
          <!-- <div class="mapbox"> -->
            <baidu-map  class="mapbox"  v-if="ismap"  :center="{lng: lng, lat: lat}" :zoom="15">
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <bm-marker
                :position="{lng: lng, lat: lat}"
                :dragging="true"
                animation="BMAP_ANIMATION_BOUNCE"
                @click="tomap"
              >
                <!-- <bm-label
                  @click="tomap"
                  :content="mapinfo.title"
                  :labelStyle="{color: 'red', fontSize : '24px' ,padding:'0 15px',textAlign:'center'} "
                  :offset="{width: -35, height: 30}"
                /> -->
              </bm-marker>
            </baidu-map>
          <!-- </div> -->
          <div class="infos">
            <p class="shopname">{{item.shopname}}</p>
            <p class="mainsell">主营产品：{{item.content}}</p>
            <p class="address">地址：{{item.address}}</p>
            <p class="tel">电话：{{item.tel}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import tabBar from "../components/tabBar";

export default {
  name: "shopshow",
  inject: ["reload"],
  provide() {
    return {
      reload: this.mapreload
    };
  },
  data() {
    return {
      curindex: 0,
      mapinfo: [],
      tabtitle: {
        a: "门店",
        b: "展示"
      },
      tabnav: ["门店展示", "门店导航"],
      shopinfo: [],
      lng: 116.404,
      lat: 39.915,
      zb: [
        { lng: 116.504, lat: 39.915 },
        { lng: 117.404, lat: 39.915 },
        { lng: 118.404, lat: 39.815 },
        { lng: 119.404, lat: 39.715 },
        { lng: 110.404, lat: 39.615 },
        { lng: 120.404, lat: 39.515 }
      ],
      ismap: true
    };
  },

  created() {
    this.requst();
  },
  mounted() {},
  methods: {
    mapreload() {
      let self = this;
      self.ismap = false;
      self.$nextTick(function() {
        self.ismap = true;
      });
    },
    tomap() {
      console.log(this.mapinfo);
      window.open(
        `http://api.map.baidu.com/geocoder?address=` +
          this.mapinfo.address +
          `&output=html`
      );
    },
    requst() {
      this.$axios.post("/index/api/mdzsList").then(res => {
        this.shopinfo = res.data.data;

        console.log(this.shopinfo);
      });
    },
    tonav(index) {
      this.curindex = index;
      console.log("11111");
    }
  },

  components: { tabBar }
};
</script>

<style lang="less" scoped>
.shopshow {
  width: 100%;
  height: 100%;
  .infos {
    box-sizing: border-box;
    padding: 28px 15px;
    background: rgba(245, 245, 245, 1);
    border-radius: 10px;
    p {
      color: #333333;
      font-size: 24px;
      line-height: 40px;
    }
    .shopname {
      font-size: 30px;
      font-weight: bold;
    }
  }
  .shops {
    box-sizing: border-box;
    padding: 40px 25px 75px 25px;
    .shoplist {
      width: 100%;
      height: 100%;
      .shopli {
        width: 100%;
        height: 100%;
        padding-top: 25px;
        .mainpic {
          width: 100%;
          height: 437px;
          border-radius: 10px;
        }
      }
    }
  }
  .maps {
    width: 100%;
    box-sizing: border-box;
    padding: 40px 25px 75px 25px;
    .shopli {
      width: 100%;
      height: 100%;
      padding-top: 25px;
    }
    .mapbox {
      // background: brown;
      width: 100%;
      height: 437px;
      border-radius: 10px;
    }
  }
}
</style>