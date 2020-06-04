<template>
  <div class="home">
    <ul class="list">
      <li v-for="(item, index) in list" :key="index">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      list: [{ path: "/morecur", name: "多选" }]
    };
  }
};
</script>