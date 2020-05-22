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
    <div class="maps" v-show="curindex === 1">
      <ul class="shoplist">
        <li class="shopli" v-for="(item, index) in shopinfo" :key="index">
          <div class="mapbox"></div>
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
  data() {
    return {
      curindex: 0,

      tabtitle: {
        a: "门店",
        b: "展示"
      },
      tabnav: ["门店展示", "门店导航"],
      shopinfo: []
    };
  },

  created() {
    this.requst();
  },
  mounted() {},
  methods: {
    requst() {
      this.$axios.post("/index/api/mdzsList").then(res => {
        this.shopinfo = res.data.data;
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
      background: brown;
      width: 100%;
      height: 437px;
      border-radius: 10px;
    }
  }
}
</style>