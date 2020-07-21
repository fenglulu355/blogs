<template>
  <div class="contact">
    <div class="bg">
      <div
        class="topbg"
        :style="{backgroundImage: 'url(' + require('../assets/contact/bg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
      <!-- <div
        class="btbg"
        :style="{backgroundImage: 'url(' + require('../assets/home/btbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>-->
    </div>
    <div
      class="content"
      :style="{backgroundImage: 'url(' + require('../assets/home/btbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
    >
      <div class="conttop">
        <transition name="lfbg">
          <div v-if="trans" class="lfbg backg">
            <img src="../assets/contact/contact.png" alt />
          </div>
        </transition>
      </div>
      <div class="contmain">
        <transition name="map">
          <div v-if="trans" class="map">
            <ul v-if="trans" class="maplist">
              <li class="mapli" v-for="(item, index) in mapinfos" :key="index">
                <div class="mapbox">
                  <bdmap v-if="item.jwd" :item="item"></bdmap>
                </div>
                <div class="mapinfos">
                  <p class="location">{{item.article_address}}</p>
                  <div class="phone">
                    <span>微信号：{{item.article_wx}}</span>
                    <span>邮件：{{item.article_email}}</span>
                    <span>{{item.article_name}}：{{item.article_tel}}</span>
                    <span>办公室电话：{{item.article_phone}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import bdmap from "../components/bdmap";
export default {
  name: "about",
  data() {
    return {
      transa: false,
      trans: false,
      mapinfos: []
    };
  },
  mounted() {
    this.trans = true;
    this.transa = true;
  },
  created() {
    this.requst();
  },
  methods: {
    requst() {
      this.$axios.post("/index/api/getBaseList").then(res => {
        this.mapinfos = res.data.data;
      });
    }
  },
  components: { bdmap }
};
</script>
<style lang="less" scoped>
// 左边
.lfbg-enter-active,
.map-enter-active,
.des-enter-active {
  transition: all 1.5s ease-in-out;
}
.lfbg-enter {
  transform: translateX(-100px);
}
.map-enter {
  transform: translatex(150px);
}
.des-enter {
  transform: translateY(50px);
}
.contact {
  width: 100%;
  min-width: 1200px;
  position: relative;
  .bg {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 0;
    .topbg {
      width: 100%;
      height: 360px;
    }
    .btbg {
      width: 100%;
      // height: 820px;
    }
  }
  .content {
    width: 100%;
    min-height: 820px;
    .conttop {
      width: 100%;
      height: 360px;
      position: relative;
      .lfbg {
        position: absolute;
        top: 210px;
        left: 2%;
      }
    }
    .contmain {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 145px 40px 70px 40px;
      .map {
        width: 100%;
        background: #111111;
        min-height: 605px;
        box-sizing: border-box;
        padding: 40px 40px;
        .maplist {
          width: 100%;
          border: 1px dashed #999999;
          font-size: 0;
          border-bottom: none;
          border-right: none;
          .mapli {
            display: inline-block;
            box-sizing: border-box;
            width: calc(100% / 3);
            height: 505px;
            border-right: 1px dashed #999999;
            border-bottom: 1px dashed #999999;
            padding: 38px;
            font-size: 16px;
            .mapbox {
              width: 100%;
              height: 320px;
              background: #82c41c;
            }
            .mapinfos {
              p {
                width: 100%;
                font-size: 16px;
                color: white;
                margin: 10px 0 20px 0;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
              }
              .phone {
                font-size: 14px;
                color: #bbbbbb;
                display: flex;
                flex-wrap: wrap;
                span {
                  width: 48%;
                  margin-top: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>