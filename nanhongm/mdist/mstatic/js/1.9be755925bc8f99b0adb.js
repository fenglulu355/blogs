webpackJsonp([1],{KBJM:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("Dd8w"),a=e.n(i),o=e("NYxO"),n={name:"commoditydetails",data:function(){return{styleindex:0,color:[],type:0,detevas:!1,detevanum:0,goodsinfo:[],eva:[],filter:[],class_id:"",fids:[]}},updated:function(){for(var t=document.getElementById("infos-cont").getElementsByTagName("img"),s=0;s<t.length;s++)t[s].style.width="100%",t[s].style.height="100%"},computed:a()({},Object(o.d)(["searchinfo"])),created:function(){console.log(this.searchinfo),document.body.scrollTop=document.documentElement.scrollTop=0,this.goodsinfo=this.searchinfo,this.shopshowinfo=this.goodsinfo.image_url,this.color=this.goodsinfo.attr.split(",")},methods:{deteva:function(t){this.detevas=!this.detevas,this.detevanum=t,console.log(t)}}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"commoditydetails"},[e("div",{staticClass:"goodsshow"},[e("div",{staticClass:"swiperbox"},[e("img",{staticClass:"mainpic",attrs:{src:t.httpUrl+t.goodsinfo.image_url,alt:""}})]),t._v(" "),e("div",{staticClass:"gs-right"},[e("p",{staticClass:"name"},[t._v(t._s(t.goodsinfo.article_title))]),t._v(" "),e("div",{staticClass:"typebox select"},[e("p",{staticClass:"text"},[t._v("规格")]),t._v(" "),e("div",{staticClass:"selectbox"},t._l(t.color,function(s,i){return e("div",{key:i,staticClass:"selection"},[e("section",{staticClass:"section"},[e("span",{staticClass:"span"}),t._v(" "),e("span",{staticClass:"type"},[t._v(t._s(s))])])])}),0)])])]),t._v(" "),e("div",{staticClass:"det-eva"},[e("div",{staticClass:"title"},[e("p",{staticClass:"text",class:0==t.detevas?"deteva":"",on:{click:function(s){return t.deteva(0)}}},[t._v("产品详情")])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0==t.detevanum,expression:"detevanum==0"}],staticClass:"det detevabox"},[e("div",{staticClass:"detinfos scorll",attrs:{id:"infos-cont"},domProps:{innerHTML:t._s(t.goodsinfo.article_contents)}})])])])},staticRenderFns:[]};var d=e("VU/8")(n,c,!1,function(t){e("kMZ6")},"data-v-2ed6a0de",null);s.default=d.exports},kMZ6:function(t,s){}});
//# sourceMappingURL=1.9be755925bc8f99b0adb.js.map