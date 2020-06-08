<template>
  <div class="evaluate" v-if="close">
    <div class="evaluatebox">
      <p class="title">
        评价商品
        <span>
          <img @click="closeeva" src="../assets/navgation/log-x.png" alt />
        </span>
      </p>
      <div class="content clearFix">
        <div class="eva-left fl padding">
          <div
            class="mainpic"
            :style="{backgroundImage: 'url(' +httpUrl+goodsinfos.order_img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></div>
          <p class="name">{{goodsinfos.order_name}}</p>
          <p class="type">总价：￥{{goodsinfos.order_price}}</p>
        </div>
        <div class="eva-right fr padding">
          <el-radio-group v-model="radio">
            <el-radio :label="3">好评</el-radio>
            <el-radio :label="2">中评</el-radio>
            <el-radio :label="1">差评</el-radio>
          </el-radio-group>
          <textarea
            name="eva-text"
            @blur="regtext(something)"
            cols="30"
            rows="10"
            v-model="something"
            placeholder="亲，写点评价吧，你的评价对其他买家有很大帮助的。"
          ></textarea>
          <div class="uploadimg">
            <van-uploader
              v-model="fileList"
              :before-delete="beforedelete"
              :after-read="afterRead"
              multiple
              :max-count="2"
            />
            <!-- <el-upload
              :action="httpUrl+`/index/api/uploadPet`"
              list-type="picture-card"
              :limit="2"
              ref="upload"
              accept="image/jpeg, image/png"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove"
              :on-success="onsuccess"
              :on-exceed="handleExceed "
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>-->
          </div>
          <p class="send">
            <span @click="send()">发表评价</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "evaluate",
  data() {
    return {
      evaindex: [],
      fileList: [],
      something: "",
      isshow: true,
      upload: "3",
      curradio: null,
      radio: 3,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      headimg: ["", ""],
      aindex: 0,
      delimg: ""
    };
  },
  props: {
    goodsinfos: {
      type: Object
    },
    close: {
      type: String,
      default: "false"
    }
  },
  computed: {
    ...mapState(["userid"])
  },
  methods: {
    changeevali(indexs, index, item, items, e) {
      this.evaindex[index] = indexs;
      this.$forceUpdate();
      console.log(this.evaindex[index], "indexs");
    },
    //移除

    beforedelete(detail, index) {
      this.headimg[index.index] = "";

      return true;
    },
    afterRead(file) {
      file.status = "success";
      file.message = "上传成功";
      let data = new FormData();
      data.append("file", file.file);
      this.$axios.post("/index/api/uploadPet", data).then(res => {
        console.log(res);
        if (this.headimg[0] == "") {
          this.headimg[0] = res.data;
        } else if ((this.headimg[1] = res.data)) {
          this.headimg[1] = res.data;
        }
        console.log(this.headimg);
      });
    },
    handleRemove(file, fileList) {
      console.log(file);

      this.$forceUpdate();
      this.delimg = file.response;
      console.log(this.delimg);
      console.log(this.headimg);
      for (let i = 0; i < this.headimg.length; i++) {
        if (this.delimg == this.headimg[i]) {
          this.headimg.splice(1, i);
          console.log(i);
        }
      }
      console.log(this.headimg);
    },
    // 查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
    },
    // 下载
    beforeAvatarUpload(file, fileList) {
      return this.$confirm(`确定上传 ${file.name}？`);
    },
    beforeRemove(file, fileList) {
      console.log(this.headimg);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    change(e) {
      this.curradio = e;
      console.log(this.curradio);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 2 个文件`);
    },
    onsuccess(res, fileList) {
      console.log(res);

      if (this.headimg[0] == "") {
        this.headimg[0] = res;
      } else if (this.headimg[1] == "") {
        this.headimg[1] = res;
      }
      console.log(fileList);
    },

    send() {
      this.$confirm("是否立即上传评价?", "提示", {
        confirmButtonText: "立即上传",
        cancelButtonText: "还没写完",
        type: "warning"
      })
        .then(() => {
          let img = this.headimg.join(","),
            goodsid = [];
          console.log(this.something, img, this.radio);

          for (
            let i = 0, length = this.goodsinfos.goods.length;
            i < length;
            i++
          ) {
            goodsid.push(this.goodsinfos.goods[i].oe_goods_id);
          }
          goodsid = goodsid.join(",");
          console.log(goodsid);
          this.$axios
            .post("/index/user/commentList", {
              userId: this.userid,
              goods_id: goodsid,
              order_id: this.goodsinfos.oderid,
              star: this.radio,
              content: this.something,
              image: img
            })
            .then(res => {
              console.log(res);
              if ((res.data.code = 200)) {
                this.$message({
                  type: "success",
                  message: "评价成功!"
                });
                setTimeout(() => {
                  this.$emit("close", false);
                }, 500);
              } else {
                this.$message.error("提交失败");
                setTimeout(() => {
                  this.$emit("close", false);
                }, 500);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消评价"
          });
        });
    },
    closeeva() {
      this.$emit("close", false);
    },
    regtext(text) {
      let regwords = text.replace(/<\/?[^>]*>/g, "");
      this.something = regwords;
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
    height: 702px;
    background: rgba(255, 255, 255, 1);
    margin: 130px auto;
    box-sizing: border-box;
    padding: 67px 98px;
    position: relative;
    .title {
      box-sizing: border-box;
      padding-bottom: 15px;
      font-size: 20px;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid rgba(228, 228, 228, 1);
      img {
        cursor: pointer;
        position: absolute;
        right: 30px;
        top: 30px;
      }
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
      .evalist {
        width: 100%;
        height: 20px;
        display: flex;
        .evali {
          cursor: pointer;
          box-sizing: border-box;
          padding: 0 10px;
          display: flex;
          .style {
            box-sizing: border-box;
            margin: 0 5px;
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
            position: relative;
            top: 6px;
          }
          .sel {
            background: #2680ca;
          }
        }
      }
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
        img {
          width: 100%;
          height: 100%;
        }
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