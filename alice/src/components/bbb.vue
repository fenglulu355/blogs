<template>
  <div class="map" id="maps">
    <div id="bdmap">
      <div id="allmap" ref="allmap"></div>
      <router-view></router-view>
    </div>
    <div class="mapinfo">
      <ul class="bus-car">
        <li
          class="bcli"
          v-for="(item, index) in bcli"
          :key="index"
          :class="bcindex==index?'bccur':''"
          @click="changebcindex(index)"
        >
          <div class="bcbox">
            <img v-show="bcindex!=index" :src="item.icon1" alt />
            <img v-show="bcindex==index" :src="item.icon2" alt />
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
      <div class="senddress clearFix">
        <img class="change fl" src="../assets/contact/ex.png" alt />
        <div class="inputinfo fr">
          <div class="start box">
            <img src="../assets/contact/red.png" alt />
            <input type="text" class="starts" v-model="start" placeholder="请输入起点" />
          </div>
          <div class="end box">
            <img src="../assets/contact/green.png" alt />
            <input type="text" class="ends" v-model="ends" placeholder="请输入终点" />
          </div>
        </div>
      </div>
      <p class="emit">确定</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "bdmap",
  data() {
    return {
      start: "",
      ends: "",
      bcli: [
        {
          name: "公交",
          icon1: require("../assets/contact/bus.png"),
          icon2: require("../assets/contact/busw.png")
        },
        {
          name: "驾车",
          icon1: require("../assets/contact/car.png"),
          icon2: require("../assets/contact/carw.png")
        }
      ],
      infos: [],
      bcindex: 0,
      lat: "",
      lng: "",
      addr: "",
      phone: "",
      name: ""
    };
  },
  methods: {
    map() {
      let map = new window.BMap.Map(this.$refs.allmap); // 创建Map实例
      let point = new window.BMap.Point(this.lng, this.lat);
      map.centerAndZoom(point, 14); // 初始化地图,设置中心点坐标和地图级别
      let marker = new window.BMap.Marker(point);
      map.addOverlay(marker);

      var content = "<table>";
      content = content + "<tr><td class='gs'>成都市文春木业有限公司</td></tr>";
      content =
        content + `<tr><td class='add'> 地址：` + this.addr + `</td></tr>`;
      content =
        content +
        "<tr><td class='tel'>电话：" +
        this.phone +
        "(" +
        this.name +
        ")" +
        "</td></tr>";
      content += "</table>";

      var a =
        `http://api.map.baidu.com/direction?origin=latlng:` +
        this.lat +
        `,` +
        this.lng +
        `|name:我的位置&destination=` +
        this.addr +
        `&mode=driving&region=成都&output=html`;
      var b = this.addr;

      var infowindow = new window.BMap.InfoWindow(content);
      marker.openInfoWindow(infowindow);

      marker.addEventListener("click", function(e) {
        // console.log(e);
        
        this.openInfoWindow(infowindow);
        var r = confirm(`导航到` + `  ` + b + `  ` + `去`);
        if (r == true) {
          window.location.href = a;
        } else {
          return;
        }
      });
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl());
      map.setCurrentCity("成都"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    }
  },
  mounted() {
    this.$axios.post("/index/api/web_config").then(res => {
      this.name = res.data.data.name;
      this.phone = res.data.data.phone;
      this.addr = res.data.data.address;
      this.lat = res.data.data.jwd.lat;
      this.lng = res.data.data.jwd.lng;
      this.map();
    });
  }
};
</script>
<style lang='less'>
#maps {
  width: 100%;
  .mapinfo {
    // background: pink;
    box-sizing: border-box;
    padding-top: 30px;
    position: relative;
    .bus-car {
      .bcli {
        cursor: pointer;
        display: inline-block;
        width: 165px;
        height: 43px;
        background: rgba(249, 249, 249, 1);
        border: 1px solid rgba(249, 249, 249, 1);
        text-align: center;
        font-size: 18px;
        line-height: 43px;
        img {
          position: relative;
          right: 5px;
          bottom: 2px;
        }
      }
      .bccur {
        background: rgba(50, 149, 43, 1);
        color: white;
      }
    }
    .senddress {
      position: relative;
      bottom: 1px;
      left: 1px;
      width: 1068px;
      height: 110px;
      border: 1px solid rgba(50, 149, 43, 1);
      box-sizing: border-box;
      padding: 5px 17px 5px 11px;
      .change {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
      .inputinfo {
        width: 1011px;
        .start {
          border-bottom: 2px solid rgba(204, 204, 204, 1);
        }
        .box {
          height: 47px;
          line-height: 47px;
          position: relative;
          input {
            position: absolute;
            top: 0;
            left: 20px;
            width: 95%;
            height: 100%;
            &::placeholder {
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
    }
    .emit {
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 0px;
      width: 120px;
      height: 110px;
      background: rgba(50, 149, 43, 1);
      color: white;
      text-align: center;
      line-height: 110px;
    }
  }
}
#bdmap {
  height: 609px;
  box-sizing: border-box;
  padding: 20px 18px;
  border: 1px solid rgba(204, 204, 204, 1);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#allmap {
  width: 100%;
  height: 569px;
}
.gs {
  color: #ff9443;
  font-size: 14px;
  font-weight: bold;
}
.add {
  font-size: 12px;
}
.tel {
  font-size: 12px;
}
</style>
