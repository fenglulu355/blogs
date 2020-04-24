<template>
  <div>
    <ul class="mo-paging">
      <!-- first -->
      <!-- <li
      :class="['paging-item','curpage', 'paging-item&#45;&#45;first', {'paging-item&#45;&#45;disabled' : index === 1}]"
      @click="first"
      >首页</li>-->
      <!-- prev -->
      <li :class="['paging-item','curpage', 'paging-item--prev',]" @click="prev">上一页</li>

      <!-- <li :class="['paging-item', 'paging-item--more']" v-if="showPrevMore">...</li> -->
      <li
        :class="['paging-item', {'paging-item--current' : index === pager}]"
        v-for="pager in pagers"
        :key="pager"
        @click="go(pager)"
      >{{ pager }}</li>
      <!-- <li :class="['paging-item', 'paging-item--more']" v-if="showNextMore">...</li> -->
      <!-- next -->
      <li :class="['paging-item','curpage', 'paging-item--next', ]" @click="next">下一页</li>
      <!-- last -->
      <!-- <li
      :class="['paging-item','curpage', 'paging-item&#45;&#45;last', {'paging-item&#45;&#45;disabled' : index === pages}]"
      @click="last"
      >末页</li>-->
    </ul>
    <p class="text">共{{total}}条 共{{pages}}页</p>
  </div>
</template>
<script>
export default {
  name: "MoPaging",
  // 通过props来接受从父组件传递过来的值
  props: {
    // 页面中的可见页码，其他的以...替代, 必须是奇数
    perPages: {
      type: Number,
      default: 1
    },
    // 当前页码
    pageIndex: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总记录数
    total: {
      type: Number,
      default: 1
    }
  },
  methods: {
    prev() {
      if (this.index > 1) {
        this.go(this.index - 1);
      }
    },
    next() {
      if (this.index < this.pages) {
        this.go(this.index + 1);
      }
    },
    first() {
      if (this.index !== 1) {
        this.go(1);
      }
    },
    last() {
      if (this.index != this.pages) {
        this.go(this.pages);
      }
    },
    go(page) {
      if (this.index !== page) {
        this.index = page;
        // 父组件通过change方法来接受当前的页码
        this.$emit("change", this.index);
      }
    }
  },
  computed: {
    // 计算总页码
    pages() {
      return Math.ceil(this.size / this.limit);
    },

    // 计算页码，当count等变化时自动计算
    pagers() {
      const array = [];
      const perPages = this.perPages;
      const pageCount = this.pages;
      let current = this.index;
      const _offset = (perPages - 1) / 2;
      const offset = {
        start: current - _offset,
        end: current + _offset
      };
      // -1, 3
      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start);
        offset.start = 1;
      }
      if (offset.end > pageCount) {
        offset.start = offset.start - (offset.end - pageCount);
        offset.end = pageCount;
      }
      if (offset.start < 1) offset.start = 1;
      this.showPrevMore = offset.start > 1;
      this.showNextMore = offset.end < pageCount;
      for (let i = offset.start; i <= offset.end; i++) {
        array.push(i);
      }

      return array;
    }
  },
  data() {
    return {
      index: this.pageIndex, // 当前页码
      limit: this.pageSize, // 每页显示条数
      size: this.total || 1, // 总记录数
      showPrevMore: false,
      showNextMore: false
    };
  },
  watch: {
    pageIndex(val) {
      this.index = val || 1;
    },
    pageSize(val) {
      this.limit = val || 10;
    },
    total(val) {
      this.size = val || 1;
    }
  }
};
</script>
<style scoped lang="less">
.mo-paging {
  width: 100%;
  text-align: center;
  display: inline-block;
  padding: 0;
  margin: 0;
  font-size: 0;
  list-style: none;
  user-select: none;
  > .paging-item {
    display: inline-block;
    width: 30%;
    height: 60px;
    font-size: 30px;
    position: relative;
    line-height: 60px;
    text-decoration: none;
    border: 1px solid rgba(50, 149, 43, 1);
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    color: rgba(50, 149, 43, 1);
    margin: 0 5px;
    &:first-child {
      margin-left: 0;
    }
    &:hover {
      border: 1px solid rgba(50, 149, 43, 1);
      background-color: rgba(50, 149, 43, 1);
      color: white;
    }
    &.paging-item--disabled,
    &.paging-item--more {
      // background-color: #fff;
      color: rgba(50, 149, 43, 1);
      border: none;
    }
    /*//禁用*/
    &.paging-item--disabled {
      display: none;
      cursor: not-allowed;
      opacity: 0.5;
    }
    &.paging-item--more,
    &.paging-item--current {
      cursor: default;
    }
    /*//选中*/
    &.paging-item--current {
      background-color: rgba(238, 238, 238, 1);
      color: rgba(51, 51, 51, 1);
      position: relative;
      z-index: 1;
      border-color: rgba(238, 238, 238, 1);
    }
  }
  .curpage {
    border: 1px solid rgba(50, 149, 43, 1);
    color: rgba(50, 149, 43, 1);
  }
}
.text {
  width: 100%;
  text-align: center;
  color: rgba(102, 102, 102, 1);
  font-size: 24px;
  font-weight: 300;
  padding-top: 30px;
}
</style>
