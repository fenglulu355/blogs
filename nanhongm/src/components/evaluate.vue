<template>
  <div class="evaluate" v-if="close">
    <div class="evaluatebox clearFix">
      <p class="title">
        <img src="../assets/shop/return.png" alt /> 评价商品
      </p>
      <ul class="goodslist">
        <li class="goodsli" v-for="(item, index) in goodsinfos.orderlist" :key="index">
          <div class="goodsinfo">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +item.img+ ')',
                     backgroundSize:'cover',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition:'center'
                    }"
            ></div>
            <div class="infos">
              <p class="des">{{item.des}}</p>
              <p class="num">
                <span>￥{{item.apprice}}</span>
                <span>×{{item.num}}</span>
              </p>
              <img src="../assets/shop/tb.png" alt />
              <p class="color">
                <span>颜色：{{item.color}}</span>
                <span>规格{{item.type}}</span>
              </p>
            </div>
          </div>
          <ul class="evalist">
            <li
              class="evali"
              v-for="(items, indexs) in item.eva"
              :key="indexs"
              @click="changeevali(indexs,index,item,items,$event,)"
              :class="{'sel':evaindex[index]===indexs}"
              :data-index="index"
              :data-indexs="indexs"
            >{{items.title}}</li>
          </ul>
          <div class="ipteva">
            <textarea placeholder="亲，写点评价吧，你的评价对其他买家有很大帮助的。"></textarea>
          </div>
          <div class="uploadimg">
            <van-uploader v-model="fileList[index]" multiple :max-count="2" />
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
      evaindex: [],
      // evaindex: new Array(this.goodsinfos.length).fill(0),
      fileList: [],
      evali: ["好评", "中评", "差评"]
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
  created() {
    for (let index = 0; index < this.goodsinfos.orderlist.length; index++) {
      this.evaindex[index] = 0;
    }
  },
  methods: {
    changeevali(indexs, index, item, items, e) {
      console.log(indexs, "indexs");
      console.log(index, "index");
      console.log(e, "e");
      this.evaindex[index] = indexs;
      this.$forceUpdate();
    },
    send() {
      // if (this.curradio == null) {
      //   // 默认好评
      // } else {
      // }
      console.log(this.fileList);

      this.$emit("close", false);
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
            width: 20%;
            height: 107px;
          }
          .infos {
            width: 78%;
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