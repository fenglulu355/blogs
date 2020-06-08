<template>
  <div class="statemap">
    <ul >
      <li v-for="(item, index) in list" :key="index">
        <router-link :to="item.one">{{item.name}}</router-link>
        
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "statemap",
  data() {
    return {
      list: [
        { one: "/", name: "网站首页" },
        { one: "/product", name: "智慧中心" },
        { one: "/shopshow", name: "门店展示",two:[{}] },
        { one: "/cases", name: "成功案例" },
        { one: "/service", name: "服务与支持" },
        { one: "/news", name: "新闻中心" },
        { one: "/about", name: "关于我们" },
        { one: "/shoppingmall", name: "南宏商城" }
      ]
    };
  }
};
</script>