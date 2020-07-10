<template>
  <div class="editdress">
    <!-- <div class="editbox">
      <section class="ds">
        <span class="text">地址信息：</span>
        <v-distpicker province="四川省" city="成都市" area="武侯区" @selected="onSelected"></v-distpicker>
      </section>
      <section>
        <span class="text">详细地址：</span>
        <input class="dds" type="text" placeholder="请输入如道路、门牌号、小区、楼栋号、单元等信息" v-model="detaildress" />
      </section>
      <section>
        <span class="text">收货人姓名：</span>
        <input class="consignee" type="text" placeholder="长度不超过25个字符" v-model="consignee" />
      </section>
      <section class="tel">
        <span class="text">手机号码：</span>
        <span class="border">中国大陆 +86</span>
        <input class="telipt" type="text" placeholder="电话号码、手机号码必须填一项" v-model="tel" />
      </section>
      <p class="send" @click="send">确认</p>
    </div>-->
    <van-address-edit
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>
<script>
import areaList from "../assets/mine/area";
import VDistpicker from "v-distpicker";
import { Toast } from "vant";
export default {
  name: "editdresss",
  data() {
    return {
      areaList,
      searchResult: [],
      detaildress: "", //详细地址
      consignee: "", //收货人姓名
      tel: "", //收货人电话
      regtel: "", //注册账户手机号
      code: "", //验证码
      address: { province: "", city: "", county: "" }
    };
  },
  props: {
    edititem: {
      type: Object,
      default: {}
    },
    close: {
      type: String,
      default: "false"
    }
  },
  created() {
    this.detaildress = this.edititem.dress;
    this.consignee = this.edititem.name;
    this.tel = this.edititem.tel;
  },
  methods: {
    
    onSave(content) {
      this.$toast.success("保存成功");
      console.log(content);
      setTimeout(() => {
        this.$emit("close", false, content);
      }, 200);
    },
    onDelete() {
      Toast("delete");
      setTimeout(() => {
        this.$emit("close", false);
      }, 20);
    },
    onChangeDetail(val) {
      this.searchResult = [];
      console.log(val);
    },

    // city
    onSelected(data) {
      this.address.province = data.province.value;
      this.address.city = data.city.value;
      this.address.county = data.area.value;
    },
    send() {}
  },
  components: { VDistpicker }
};
</script>

<style lang="less" scoped>
.editdress {
  width: 100%;
  height: 100%;
  .editbox {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    margin: 130px auto;
    box-sizing: border-box;
    padding: 70px 50px;
    input {
      box-sizing: border-box;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 5px;
      padding-left: 10px;
      &::placeholder {
        color: rgba(204, 204, 204, 1);
      }
    }
    section {
      // background: rosybrown;
      box-sizing: border-box;
      padding-left: 24px;
      margin-top: 30px;
      display: grid;
      grid-template-columns: 15% 70%;
      .text {
        display: inline-block;
        width: 130px;
        text-align: right;
        position: relative;
        top: 8px;
      }
      input {
        line-height: 40px;
      }
    }
    .ds {
      grid-template-columns: 15% 70%;
    }
    .tel {
      grid-template-columns: 15% 15% 55%;
      .border {
        font-size: 14px;
        border: 1px solid #dcdfe6;
        width: 90%;
        border-radius: 4px;
        line-height: 40px;
        text-align: center;
      }
    }
    .send {
      cursor: pointer;
      position: relative;
      top: 40px;
      left: 45%;
      width: 124px;
      height: 30px;
      background: rgba(36, 130, 200, 1);
      text-align: center;
      line-height: 30px;
      color: white;
      font-size: 12px;
    }
  }
}
</style>