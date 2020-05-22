<template>
  <div class="evaluate" v-if="close">
    <div class="evaluatebox clearFix">
      <p class="title">评价商品</p>
      <div class="eva-left fl padding">
        <div
          class="mainpic"
          :style="{backgroundImage: 'url(' +httpUrl+goodsinfos.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
        <p class="name">{{goodsinfos.name}}</p>
      </div>
      <div class="eva-right fr padding">
        <p class="cur-radio">
          <el-radio-group v-model="radio">
            <el-radio :label="3" @change="change">好评(93%)</el-radio>
            <el-radio :label="2" @change="change">中评(6%)</el-radio>
            <el-radio :label="1" @change="change">差评(1%)</el-radio>
          </el-radio-group>
        </p>
        <textarea name="eva-text" id cols="30" rows="10" placeholder="亲，写点评价吧，你的评价对其他买家有很大帮助的。"></textarea>
        <div class="uploadimg">
          <el-upload
            :action="upload"
            list-type="picture-card"
            :auto-upload="false"
            :limit="4"
            :on-change="onchange"
            :on-exceed="handleExceed "
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <p class="send">
          <span @click="send">发表评价</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "evaluate",
  data() {
    return {
      fileList: [],
      isshow: true,
      upload: "3",
      curradio: null,
      radio: 3,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  props: {
    goodsinfos: {
      type: Object
    },
    close: {
      type: String,
      default: 'false'
    }
  },
  methods: {
    //移除
    handleRemove(file) {
      console.log(file);
    },
    // 查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
    },
    // 下载
    handleDownload(file) {
      console.log(file);
    },
    change(e) {
      console.log(e);
      console.log(this.curradio);
      this.curradio = e;
      console.log(this.curradio);
    },
    handleExceed(files, fileList) {
      console.log(fileList);

      this.$message.warning(`当前限制选择 4 个文件`);
    },
    onchange(files, fileList) {
      console.log(files);
      console.log(fileList);
    },
    send() {
      if (this.curradio == null) {
        // 默认好评
      } else {
      }
       this.$emit("close", false);
    }
  }
};
</script>

<style lang="less" scoped>
.evaluate {
  position: fixed;
  z-index: 111;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  .evaluatebox {
    width: 1000px;
    height: 642px;
    background: rgba(255, 255, 255, 1);
    margin: 130px auto;
    box-sizing: border-box;
    padding: 67px 98px;
    .title {
      box-sizing: border-box;
      padding-bottom: 15px;
      font-size: 20px;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid rgba(228, 228, 228, 1);
    }
    .padding {
      box-sizing: border-box;
      padding-top: 60px;
    }
    .eva-left {
      width: 198px;
      .mainpic {
        width: 198px;
        height: 198px;
        border-radius: 10px;
        border: 1px solid rgba(228, 228, 228, 1);
      }
      .name {
        box-sizing: border-box;
        padding-top: 12px;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
    }
    .eva-right {
      //   background: pink;
      width: 575px;
      textarea {
        width: 575px;
        height: 200px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(236, 236, 236, 1);
        border-radius: 10px;
        resize: none;
        box-sizing: border-box;
        margin-top: 16px;
        padding: 26px 26px;
      }
      .uploadimg {
        box-sizing: border-box;
        padding: 17px 0;
        border-bottom: 1px solid rgba(228, 228, 228, 1);
      }
      .send {
        box-sizing: border-box;
        text-align: right;
        padding-top: 30px;
        span {
          cursor: pointer;
          display: inline-block;
          width: 139px;
          height: 38px;
          background: rgba(235, 0, 40, 1);
          font-size: 12px;
          color: white;
          line-height: 38px;
          text-align: center;
        }
      }
    }
  }
}
</style>