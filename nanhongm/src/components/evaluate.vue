<template>
  <div class="evaluate" v-if="close">
    <div class="evaluatebox clearFix">
      <p class="title">
        <img src="../assets/shop/return.png" alt /> 评价商品
      </p>
      <ul class="goodslist">
        <li class="goodsli">
          <div class="goodsinfo">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +httpUrl+goodsinfos.order_img+ ')',
                     backgroundSize:'cover',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition:'center'
                    }"
            ></div>
            <div class="infos">
              <p class="des">{{goodsinfos.order_name}}</p>
              <p class="num">
                <span>￥{{goodsinfos.order_price}}</span>
              </p>
              <img src="../assets/shop/tb.png" alt />
              <p class="color">
                <!-- <span>规格{{goodsinfos.oe_format_name}}</span> -->
              </p>
            </div>
          </div>
          <ul class="evalist">
            <li
              class="evali"
              v-for="(items, indexs) in goodsinfos.eva"
              :key="indexs"
              @click="changeevali(indexs,items,$event,)"
              :class="{'sel':evaindex==indexs}"
              :data-indexs="indexs"
            >{{items.title}}</li>
          </ul>
          <div class="ipteva">
            <textarea
              @blur="regtext(something)"
              placeholder="亲，写点评价吧，你的评价对其他买家有很大帮助的。"
              v-model="something"
            ></textarea>
          </div>
          <div class="uploadimg">
            <van-uploader
              v-model="fileList"
              :before-delete="beforedelete"
              :after-read="afterRead"
              multiple
              :max-count="2"
            />
          </div>
        </li>
      </ul>
      <p class="send" @click="send">发表评价</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "evaluate",
  data() {
    return {
      something: "",
      evaindex: 0,
      // evaindex: new Array(this.goodsinfos.length).fill(0),
      fileList: [],
      headimg: ["", ""],
      radio: 3
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
  created() {},
  methods: {
    changeevali(indexs, items, e) {
      this.evaindex = indexs;
      this.radio = items.num;
      // console.log(this.radio);

      this.$forceUpdate();
    },
    beforedelete(detail, index) {
      console.log(index.index);
      this.headimg[index.index] = "";
      console.log(this.headimg);
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
    regtext(text) {
      let regwords = text.replace(/<\/?[^>]*>/g, "");
      this.something = regwords;
    },
    send() {
      console.log(this.radio);

      this.$dialog
        .confirm({
          title: "提示",
          message: "是否立即评价"
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
              goods_id: this.goodsinfos.oe_goods_id,
              order_id: this.goodsinfos.oderid,
              star: this.radio,
              content: this.something,
              image: img
            })
            .then(res => {
              console.log(res);
              if ((res.data.code = 200)) {
                this.$toast.success("评价成功!");
                setTimeout(() => {
                  this.$emit("close", false);
                }, 500);
              } else {
                this.$toast.fail("提交失败");
                setTimeout(() => {
                  this.$emit("close", false);
                }, 500);
              }
            });
        })
        .catch(() => {
          this.$toast.fail("取消评价");
        });

      console.log(this.headimg, this.evaindex, this.something);

      // this.$emit("close", false);
    }
  }
};
</script>

<style lang="less" scoped>
.evaluate {
  width: 100%;
  height: 100%;
  .evaluatebox {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    margin: 50px auto;
    box-sizing: border-box;
    padding: 30px 25px;
    .title {
      box-sizing: border-box;
      padding-bottom: 15px;
      font-size: 30px;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid rgba(228, 228, 228, 1);
      img {
        width: 15px;
        padding-right: 10px;
        position: relative;
        bottom: 1px;
      }
    }
    .goodslist {
      width: 100%;
      .goodsli {
        width: 100%;
        padding: 30px 0;
        border-bottom: 1px solid #cccccc;
        &:last-child {
          border: none;
        }
        .goodsinfo {
          width: 100%;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding-bottom: 35px;
          border-bottom: 1px solid #cccccc;
          .mainpic {
            width: 30%;
            height: 178px;
          }
          .infos {
            width: 65%;
            .des {
              width: 100%;
              line-height: 35px;
            }
            .num {
              box-sizing: border-box;
              padding: 10px 0 30px 0;
              width: 100%;
              display: flex;
              justify-content: space-between;
            }
            .color {
              box-sizing: border-box;
              padding-top: 10px;
            }
          }
        }
        .evalist {
          box-sizing: border-box;
          padding-top: 50px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .evali {
            width: 31%;
            height: 55px;
            text-align: center;
            line-height: 55px;
            color: #333333;
            font-size: 23px;
            border: 1px solid rgba(210, 210, 210, 1);
          }
          .sel {
            border: 1px solid #2482c8;
            background: #2482c8;
            color: white;
          }
        }
        .ipteva {
          // background: brown;
          box-sizing: border-box;
          margin: 25px 0;
          width: 100%;
          height: 280px;

          textarea {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 10px 10px;
            border: 1px solid rgba(236, 236, 236, 1);
            border-radius: 10px;
            resize: none;
            &::placeholder {
              color: #999999;
              font-size: 20px;
            }
          }
        }
      }
    }
    .send {
      width: 100%;
      height: 70px;
      color: white;
      background: #eb0028;
      font-size: 24px;
      text-align: center;
      line-height: 70px;
    }
  }
}
</style>