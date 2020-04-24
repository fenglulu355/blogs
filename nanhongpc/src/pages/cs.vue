<template>
  <div class="selectbox">
    <div class="content">
      <div class="warpper" v-for="(item, index) in selectlist" :key="index">
        <select name :id="item.id">
          <option :value="items" v-for="(items, index) in item.option" :key="index">{{items}}</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "selectbox",
  data() {
    return {
      selectlist: [
        { selects: "匹数", option: ["1.5", "2", "2.5"], id: 1 },
        { selects: "价格", option: ["0-200", "200-1000", "1000-2000"], id: 2 },
        { selects: "产品分类", option: ["彩电", "空调", "洗衣机"], id: 3 },
        { selects: "产品类型", option: ["节能", "智能", "落地"], id: 4 },
        { selects: "匹数", option: ["1.5", "2", "2.5"], id: 5 },
        { selects: "匹数", option: ["1.5", "2", "2.5"], id: 1 },
        { selects: "价格", option: ["0-200", "200-1000", "1000-2000"], id: 2 },
        { selects: "产品分类", option: ["彩电", "空调", "洗衣机"], id: 3 },
        { selects: "产品类型", option: ["节能", "智能", "落地"], id: 4 }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.selectbox {
  width: 100%;
  background: rgba(245, 245, 245, 1);
  .content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .warpper {
      width: 145px;
      select {
        width: 100%;
        height: 60px;
        appearance: none;
        border: none;
        outline: none;
        background: rgba(245, 245, 245, 1);
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        line-height: 60px;
      }
      option {
        background: white;
        &:hover {
          background: rgba(236, 236, 236, 1);
        }
      }
    }
  }
}
</style>