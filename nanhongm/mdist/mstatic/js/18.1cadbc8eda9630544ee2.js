webpackJsonp([18],{"k+nr":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={name:"shopshow",inject:["reload"],provide:function(){return{reload:this.mapreload}},data:function(){return{curindex:0,mapinfo:[],tabtitle:{a:"门店",b:"展示"},tabnav:["门店展示","门店导航"],shopinfo:[],lng:116.404,lat:39.915,zb:[{lng:116.504,lat:39.915},{lng:117.404,lat:39.915},{lng:118.404,lat:39.815},{lng:119.404,lat:39.715},{lng:110.404,lat:39.615},{lng:120.404,lat:39.515}],ismap:!0}},created:function(){this.requst()},mounted:function(){},methods:{mapreload:function(){var t=this;t.ismap=!1,t.$nextTick(function(){t.ismap=!0})},tomap:function(){console.log(this.mapinfo),window.open("http://api.map.baidu.com/geocoder?address="+this.mapinfo.address+"&output=html")},requst:function(){var t=this;this.$axios.post("/index/api/mdzsList").then(function(a){t.shopinfo=a.data.data,console.log(t.shopinfo)})},tonav:function(t){this.curindex=t,console.log("11111")}},components:{tabBar:s("4B0c").a}},i={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"shopshow"},[s("tabBar",{attrs:{tabinfo:t.tabtitle,tabnav:t.tabnav,curi:t.curindex},on:{change:t.tonav}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0===t.curindex,expression:"curindex === 0"}],staticClass:"shops"},[s("ul",{staticClass:"shoplist"},t._l(t.shopinfo,function(a,n){return s("li",{key:n,staticClass:"shopli"},[s("div",{staticClass:"mainpic",style:{backgroundImage:"url("+t.httpUrl+a.image_url+")",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}),t._v(" "),s("div",{staticClass:"infos"},[s("p",{staticClass:"shopname"},[t._v(t._s(a.shopname))]),t._v(" "),s("p",{staticClass:"mainsell"},[t._v("主营产品："+t._s(a.content))]),t._v(" "),s("p",{staticClass:"address"},[t._v("地址："+t._s(a.address))]),t._v(" "),s("p",{staticClass:"tel"},[t._v("电话："+t._s(a.tel))])])])}),0)]),t._v(" "),1===t.curindex?s("div",{staticClass:"maps"},[s("ul",{staticClass:"shoplist"},t._l(t.shopinfo,function(a,n){return s("li",{key:n,staticClass:"shopli"},[t.ismap?s("baidu-map",{staticClass:"mapbox",attrs:{center:{lng:t.lng,lat:t.lat},zoom:15}},[s("bm-navigation",{attrs:{anchor:"BMAP_ANCHOR_TOP_RIGHT"}}),t._v(" "),s("bm-marker",{attrs:{position:{lng:t.lng,lat:t.lat},dragging:!0,animation:"BMAP_ANIMATION_BOUNCE"},on:{click:t.tomap}})],1):t._e(),t._v(" "),s("div",{staticClass:"infos"},[s("p",{staticClass:"shopname"},[t._v(t._s(a.shopname))]),t._v(" "),s("p",{staticClass:"mainsell"},[t._v("主营产品："+t._s(a.content))]),t._v(" "),s("p",{staticClass:"address"},[t._v("地址："+t._s(a.address))]),t._v(" "),s("p",{staticClass:"tel"},[t._v("电话："+t._s(a.tel))])])],1)}),0)]):t._e()],1)},staticRenderFns:[]};var o=s("VU/8")(n,i,!1,function(t){s("yJoe")},"data-v-4d8d8183",null);a.default=o.exports},yJoe:function(t,a){}});
//# sourceMappingURL=18.1cadbc8eda9630544ee2.js.map