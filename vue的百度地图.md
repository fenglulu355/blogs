```
<template>
  <div id="hmmap">
    <div id="homemap" ref="homemap"></div>
    <router-view name='map'></router-view>
  </div>
</template>
<script>
export default {
  name: "homemap",
  data() {
    return {
      lat: "",
      lng: "",
      addr: "",
      phone:'',
      name:''
    };
  },
  methods: {
    map() {
      let map = new window.BMap.Map(this.$refs.homemap); // 创建Map实例
      let point = new window.BMap.Point(this.lng, this.lat);
      map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
      let marker = new window.BMap.Marker(point);
      map.addOverlay(marker);

      var content = "<table>";
      content = content + "<tr><td class='gs'>成都市文春木业有限公司</td></tr>";
      content =
        content + `<tr><td class='add'> 地址：` + this.addr + `</td></tr>`;
        content = content + "<tr><td class='tel'>电话："+this.phone +'('+this.name+')'+"</td></tr>";
      content += "</table>";
      var infowindow = new window.BMap.InfoWindow(content);
      marker.addEventListener("click", function() {
        this.openInfoWindow(infowindow);
      });
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.OverviewMapControl());
      map.setCurrentCity("成都"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    }
  },
  mounted() {
    this.$axios.post("/index/api/web_config").then(res => {
      this.name=res.data.data.name;
      this.phone=res.data.data.phone;
      this.addr = res.data.data.address;
      this.lat = res.data.data.jwd.lat;
      this.lng = res.data.data.jwd.lng;
      this.map();
    });
  }
};
</script>
<style >
#hmmap {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#homemap {
  height:350px;
  overflow: hidden;
}
.gs {
  color: #cc5522;
  font-size: 14px;
  font-weight: bold;
}
.add {
  font-size: 12px;
}
.tel{
    font-size: 12px;
}
</style>

```

