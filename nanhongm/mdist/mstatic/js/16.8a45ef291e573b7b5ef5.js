webpackJsonp([16],{"J5/u":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("4B0c"),n=e("/QkN"),s=e("hm3b"),o={name:"product",data:function(){return{pageSize:6,currentPage:1,count:1,curindex:0,tabtitle:{a:"成功",b:"案例"},tabnav:["工程项目","家装项目"],goodsinfo:[]}},created:function(){this.requst(0,1,6);var t=sessionStorage.getItem("mnavindex");this.curindex=t?Number(t):0},methods:{requst:function(t,a,e){var i=this;this.$axios.post("/index/api/cgalList",{type:t,page:a,limit:e}).then(function(t){console.log(t,"res"),i.goodsinfo=t.data.data.data,i.count=t.data.data.total})},getList:function(t){this.requst(this.curindex,t,6)},pageChange:function(t){this.currentPage=t,this.getList(t)},tonav:function(t){console.log(t),this.curindex=t,this.requst(this.curindex,1,6)},toCaseDetail:function(t,a){document.body.scrollTop=document.documentElement.scrollTop=0,this.$router.push({path:"/detail",query:{id:a.id,kind:"case"}})}},components:{tabBar:i.a,moPagination:s.a,curinfo:n.a}},c={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"product"},[e("div",{staticClass:"productbox"},[e("tabBar",{attrs:{tabinfo:t.tabtitle,tabnav:t.tabnav,curi:t.curindex},on:{change:t.tonav}}),t._v(" "),e("div",{staticClass:"content"},[e("ul",{staticClass:"goodslist"},t._l(t.goodsinfo,function(a,i){return e("li",{key:i,staticClass:"goodsli",on:{click:function(e){return t.toCaseDetail(i,a)}}},[e("div",{staticClass:"mainpic",style:{backgroundImage:"url("+t.httpUrl+a.image_url+")",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}),t._v(" "),e("div",{staticClass:"caseinfo"},[e("p",{staticClass:"name"},[t._v(t._s(a.title))]),t._v(" "),e("p",{staticClass:"time text"},[t._v("工程日期："+t._s(a.riqi)+"年")]),t._v(" "),e("p",{staticClass:"area text"},[t._v("项目面积："+t._s(a.mj))]),t._v(" "),e("p",{staticClass:"type text"},[t._v("使用机型："+t._s(a.syjx))])])])}),0),t._v(" "),e("div",{staticClass:"pagenation"},[e("mo-pagination",{attrs:{"page-index":t.currentPage,total:t.count,"page-size":t.pageSize},on:{change:t.pageChange}})],1)])],1)])},staticRenderFns:[]};var r=e("VU/8")(o,c,!1,function(t){e("SYT9")},"data-v-600650c3",null);a.default=r.exports},SYT9:function(t,a){}});
//# sourceMappingURL=16.8a45ef291e573b7b5ef5.js.map