webpackJsonp([11],{IGAs:function(s,t,i){s.exports=i.p+"mstatic/img/case2.be366c5.png"},"Qu1+":function(s,t,i){s.exports=i.p+"mstatic/img/7-1.522ec1a.png"},Xjiq:function(s,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e={name:"detail",data:function(){return{iscase:!1,isrecruit:!1,isserv:!1,isnews:!1,newsinfo:[],caseinfo:[],servinfo:[],zpinfo:[]}},created:function(){var s=this.$route.query.kind,t=this.$route.query.id;"case"==s?(this.requstcase(t),this.iscase=!0):"serv"==s?(this.requstserv(t),this.isserv=!0):"recruit"==s?(this.requstzp(t),this.isrecruit=!0):"news"==s&&(this.requstnews(t),this.isnews=!0),console.log(s)},methods:{requstnews:function(s){var t=this;this.$axios.post("/index/api/newsDetail",{id:s}).then(function(s){t.newsinfo=s.data.data,console.log(t.newsinfo,"this.newsinfo")})},requstcase:function(s){var t=this;this.$axios.post("/index/api/cgalDetail",{id:s}).then(function(s){t.caseinfo=s.data.data,console.log(t.caseinfo,"this.newsinfo")})},requstserv:function(s){var t=this;this.$axios.post("/index/api/azlcDetail",{id:s}).then(function(s){t.servinfo=s.data.data,console.log(t.servinfo,"this.servinfo")})},requstzp:function(s){var t=this;this.$axios.post("/index/api/jobDetail",{id:s}).then(function(s){t.zpinfo=s.data.data,console.log(t.zpinfo,"this.servinfo")})}}},a={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"detail"},[s.isrecruit?e("p",{staticClass:"title"},[s._v("校园招聘")]):s._e(),s._v(" "),s.iscase?e("p",{staticClass:"title"},[s._v("工装项目")]):s._e(),s._v(" "),s.isserv?e("p",{staticClass:"title"},[s._v("安装流程")]):s._e(),s._v(" "),s.isnews?e("p",{staticClass:"title"},[s._v("公司新闻")]):s._e(),s._v(" "),e("div",{staticClass:"cont"},[s.isrecruit?e("div",{staticClass:"recruit"},[e("p",{staticClass:"zwname"},[s._v("国际贸易专员")]),s._v(" "),e("p",{staticClass:"time"},[s._v("更新时间：2019-02-26")]),s._v(" "),e("div",{staticClass:"mainpic",style:{backgroundImage:"url("+i("Qu1+")+")",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}),s._v(" "),e("p",{staticClass:"num text"},[s._v("招聘人数：3人")]),s._v(" "),e("p",{staticClass:"department text"},[s._v("招聘部门：营销部")]),s._v(" "),e("p",{staticClass:"address text"},[s._v("工作地点：泸州市")]),s._v(" "),e("p",{staticClass:"pubtime text"},[s._v("发布时间：2019-07-01")]),s._v(" "),e("p",{staticClass:"intro text"},[s._v("工作职责：")]),s._v(" "),e("p",{staticClass:"intro text"},[s._v("\n        1、本科及以上学历，国际贸易类、经济类等相关专业毕业；\n        2、男性，有英语读写能力、有工作经验者优先。\n      ")]),s._v(" "),e("p",{staticClass:"zg text"},[s._v("任职资格：")]),s._v(" "),e("p",{staticClass:"zg text"},[s._v("1、收付汇管理、国际贸易合同签订、信用证的开立、协调报关运输、基本业务谈判。 简历投递至：20008345@")])]):s._e(),s._v(" "),s.iscase?e("div",{staticClass:"case"},[e("p",{staticClass:"name"},[s._v("项目名称")]),s._v(" "),e("div",{staticClass:"mainpic",style:{backgroundImage:"url("+i("IGAs")+")",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}),s._v(" "),s._m(0)]):s._e(),s._v(" "),s.isserv?e("div",{staticClass:"serv"},[e("p",{staticClass:"name"},[s._v(s._s(s.servinfo.title))]),s._v(" "),e("div",{staticClass:"content",domProps:{innerHTML:s._s(s.servinfo.content)}})]):s._e(),s._v(" "),s.isnews?e("div",{staticClass:"case"},[e("p",{staticClass:"name"},[s._v(s._s(s.newsinfo.title))]),s._v(" "),e("p",{staticClass:"time"},[s._v("更新时间："+s._s(s.newsinfo.created_time))]),s._v(" "),e("div",{staticClass:"caseinfo",domProps:{innerHTML:s._s(s.newsinfo.content)}})]):s._e()])])},staticRenderFns:[function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"caseinfo"},[i("p",{staticClass:"time text"},[i("span",[s._v("【工程日期】")]),s._v(" "),s._v("\n          8年\n        ")]),s._v(" "),i("p",{staticClass:"area text"},[i("span",[s._v("【项目面积】")]),s._v("56775\n          ")]),s._v(" "),i("p",{staticClass:"type text"},[i("span",[s._v("【使用机型】")]),s._v("567567\n          ")]),s._v(" "),i("p",{staticClass:"inro text"},[i("span",[s._v("【项目简介】")]),s._v("678867\n          ")])])}]};var n=i("VU/8")(e,a,!1,function(s){i("oZdQ")},"data-v-b59b57ca",null);t.default=n.exports},oZdQ:function(s,t){}});
//# sourceMappingURL=11.9b1dee99795d42730e70.js.map