<template>
  <div>
    <p>q</p>
    <p>q</p>

    <p>q</p>
    <p>q</p>
    <p>q</p>
    <p>q</p>
    <p>q</p>
    <p>q</p>
    <!-- <el-card>
      <ul class="list-style-none title-list">
        <li
          v-for="item in titleList"
          :key="item"
          v-bind:class="{'active':item.active}"
          @click="activeItem(item)"
        >{{item.name}}</li>
      </ul>
    </el-card> -->
  </div>
</template>
  
<script>
export default {
  name: "approval-list",
  data() {
    return {
    
      titleList: [
        { id: 1, name: "Property", active: true },
        { id: 2, name: "Tower" },
        { id: 3, name: "Unit" },
        { id: 4, name: "Listing" },
        { id: 5, name: "Agent" }
      ]
    };
  },
  created() {
  // this.$router.replace(
  //   {
  //     path:'/searchs',
  //        query:{search:this.$route.query.search}
  //   }
  // )
  }
  // methods: {
  //   activeItem(_item) {
  //     this.titleList.forEach(item => {
  //       item.active = false;
  //     });
  //     _item.active = true;
  //     console.log(this.titleList);
  //     this.$forceUpdate();
  //   }
  // }
};
</script>
  
<style scoped>
ul.title-list {
  display: flex;
}

ul.title-list > li {
  padding: 20px 0px;
  margin: 0px 20px;
}

.active {
  border-bottom: 2px solid #ff0000;
  color: #ff0000;
}
</style>