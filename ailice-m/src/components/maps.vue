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
      <div class="senddress">
        <img class="change" @click="changedress" src="../assets/contact/change.png" alt />
        <div class="inputinfo">
          <div class="start box">
            <img src="../assets/contact/red.png" alt />
            <input
              type="text"
              class="starts"
              :id="startsid"
              :readonly="isreadonly"
              v-model="start"
              placeholder="请输入起点"
            />
          </div>
          <div class="end box">
            <img src="../assets/contact/green.png" alt />
            <input
              type="text"
              :id="endsid"
              class="ends"
              :readonly="!isreadonly"
              v-model="ends"
              placeholder="请输入终点"
            />
          </div>
        </div>
      </div>
      <p class="emit" @click="send">确定</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "bdmap",
  inject: ["reload"],
  data() {
    return {
      isreadonly: false,
      start: "",
      ends: "",
      startsid: "startsid",
      endsid: "endsid",
      bcli: [
        {
          name: "公交",
          icon1: require("../assets/contact/bus.png"),
          icon2: require("../assets/contact/bus-w.png")
        },
        {
          name: "驾车",
          icon1: require("../assets/contact/car.png"),
          icon2: require("../assets/contact/car-w.png")
        }
      ],
      infos: [],
      bcindex: 0,
      lat: "",
      lng: "",
      addr: "",
      phone: "",
      name: "",
      startlat: "",
      startlng: "",
      city: ""
    };
  },
  methods: {
    changebcindex(index) {
      this.bcindex = index;
    },
    send() {
      if (this.start) {
        if (this.bcindex == 0) {
          this.bus();
        } else {
          this.car();
        }
      } else {
        this.$dialog
          .alert({
            title: "提示",
            message: "您未选择出发地，请选择"
          })
          .then(() => {
            // on close
          });
      }
    },
    jxstart() {
      this.$nextTick(function() {
        var th = this;
        // 创建Map实例
        var map = new BMap.Map("allmap"); // 创建Map实例
        // 初始化地图,设置中心点坐标，
        var point = new window.BMap.Point(th.lng, th.lat); // 创建点坐标，汉得公司的经纬度坐标
        // console.log(th.lng, th.lat);
        map.centerAndZoom(point, 14);
        // 添加跳动标注
        var marker = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

        map.enableScrollWheelZoom();
        var ac = new BMap.Autocomplete({
          // 建立一个自动完成的对象
          input: "startsid",
          location: map
        });
        var myValue;
        ac.addEventListener("onconfirm", function(e) {
          // 鼠标点击下拉列表后的事件
          var _value = e.item.value; //获取点击的条目
          myValue =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business; //地址拼接赋给一个变量
          th.start = myValue; //将地址赋给data中的city
          // console.log(th.city)
          setPlace();
        });
        // console.log(ac.pc.input)
        function setPlace() {
          map.clearOverlays(); // 清除地图上所有覆盖物
          function myFun() {
            th.userlocation = local.getResults().getPoi(0).point; // 获取第一个智能搜索的结果
            map.centerAndZoom(th.userlocation, 18);
            map.addOverlay(new BMap.Marker(th.userlocation)); // 添加标注
            th.startlat = th.userlocation.lat;
            th.startlng = th.userlocation.lng;
            // 经度
            // console.log(th.userlocation.lng);
            // 纬度
            // console.log(th.userlocation.lat);
          }
          var local = new BMap.LocalSearch(map, {
            // 智能搜索
            onSearchComplete: myFun
          });
          local.search(myValue);
          // 测试输出坐标（指的是输入框最后确定地点的经纬度）
          map.addEventListener("click", function(e) {
            // 经度
            // console.log(th.userlocation.lng);
            // 纬度
            // console.log(th.userlocation.lat);
          });
        }
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("成都"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      });
    },
    bus() {
      var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(this.lng, this.lat), 11);
      var p1 = new BMap.Point(this.startlng, this.startlat);
      var p2 = new BMap.Point(this.lng, this.lat);
      var transit = new BMap.TransitRoute(map, {
        renderOptions: { map: map }
      });
      transit.search(p1, p2);

      var a =
        `http://api.map.baidu.com/direction?origin=latlng:` +
        this.startlat +
        `,` +
        this.startlng +
        `|name:我的位置&destination=` +
        this.addr +
        `&mode=driving&region=成都&output=html`;
      var b = this.addr;
      setTimeout(() => {
        this.$dialog
          .confirm({
            title: "提示",
            message:
              `跳转至百度地图，获取导航到` + `  ` + b + `  ` + `的更多路线`
          })
          .then(() => {
            window.location.href = a;
          })
          .catch(() => {
            // on cancel
          });
      }, 2000);
    },
    car() {
      // console.log(this.startlng, this.startlat, "a");
      var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(this.lng, this.lat), 11);
      var p1 = new BMap.Point(this.startlng, this.startlat);
      var p2 = new BMap.Point(this.lng, this.lat);

      var driving = new BMap.DrivingRoute(map, {
        renderOptions: { map: map, autoViewport: true }
      });
      driving.search(p1, p2);

      var a =
        `http://api.map.baidu.com/direction?origin=latlng:` +
        this.startlat +
        `,` +
        this.startlng +
        `|name:我的位置&destination=` +
        this.addr +
        `&mode=driving&region=成都&output=html`;
      var b = this.addr;
      setTimeout(() => {
        this.$dialog
          .confirm({
            title: "提示",
            message:
              `跳转至百度地图，获取导航到` + `  ` + b + `  ` + `的更多路线`
          })
          .then(() => {
            window.location.href = a;
          })
          .catch(() => {
            // on cancel
          });
      }, 2000);
    },
    changedress() {
      this.isreadonly = !this.isreadonly;
      let a = this.start,
        b = this.startsid;
      this.startsid = this.endsid;
      this.endsid = b;
      this.start = this.ends;
      this.ends = a;
    }
  },
  mounted() {
    this.$axios.post("/index/api/web_config").then(res => {
      this.name = res.data.data.name;
      this.phone = res.data.data.phone;
      this.addr = res.data.data.address;
      this.ends = this.addr;
      this.lat = res.data.data.jwd.lat;
      this.lng = res.data.data.jwd.lng;
      // this.map();
      this.jxstart();
    });
  }
};
</script>
<style  lang='less'>
#maps {
  width: 100%;
  .mapinfo {
    box-sizing: border-box;
    padding-top: 46px;
    position: relative;
    .bus-car {
      width: 100%;
      .bcli {
        cursor: pointer;
        display: inline-block;
        width: 49.5%;
        height: 71px;
        background: rgba(249, 249, 249, 1);
        border: 1px solid rgba(249, 249, 249, 1);
        text-align: center;
        font-size: 30px;
        line-height: 71px;
        img {
          height: 40px;
          width: auto;
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
      width: 100%;
      height: 182px;
      border: 1px solid rgba(50, 149, 43, 1);
      box-sizing: border-box;
      padding: 5px 17px 5px 21px;
      display: flex;
      justify-content: flex-start;
      .change {
        height: 31px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
      .inputinfo {
        padding-left: 20px;
        width: 90%;
        .start {
          border-bottom: 2px solid rgba(204, 204, 204, 1);
        }
        .box {
          height: 50%;
          line-height: 47px;
          position: relative;
          img {
            width: 18px;
            height: auto;
            position: relative;
            top: 20px;
            left: 2%;
          }
          input {
            position: absolute;
            top: 0;
            left: 10%;
            width: 90%;
            height: 100%;
            &::placeholder {
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
    }
    .emit {
      margin-top: 25px;
      width: 100%;
      height: 70px;
      font-size: 30px;
      background: rgba(50, 149, 43, 1);
      color: white;
      text-align: center;
      line-height: 70px;
    }
  }
}
#bdmap {
  width: 100%;
  height: 569px;
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
