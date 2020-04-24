<template>
  <div class="mine-center">
    <div class="main">
      <!-- <ul class="mclist">
        <li
          class="mcli"
          v-for="(item, index) in mineli"
          :key="index"
          :class="selmcli ==index?'selmcli':''"
          @click="tonav(index,item)"
        >
          <p>{{item}}</p>
        </li>
      </ul>-->
      <div class="contbox">
        <!-- 个人信息 -->
        <div class="minebox" v-show="selmcli==0">
          <div class="changehead">
            <span>更换头像</span>
            <!-- 上传头像 -->
            <div class="uphead">
              <div
                class="mainpic"
                :style="{backgroundImage: 'url(' + require('../assets/about/1-4.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
              ></div>
            </div>
          </div>
          <div class="changename pl">
            <span class="text">昵称</span>
            <div class="right">
              <span class="text">南宏机电</span>
              <!-- <input type="text" placeholder="请输入昵称" v-model="input" /> -->
              <img src="../assets/shop/tr.png" alt />
            </div>
          </div>
          <div class="acct pl">
            <span class="text">账号</span>
            <div class="right">
              <span>123154844</span>
              <!-- <input type="text" placeholder="请输入昵称" v-model="input" /> -->
              <img src="../assets/shop/tr.png" alt />
            </div>
          </div>
          <div class="changesex pl">
            <span class="text">性别</span>
            <div class="right">
              <span>男</span>
              <!-- <input type="text" placeholder="请输入昵称" v-model="input" /> -->
              <img src="../assets/shop/tr.png" alt />
            </div>
          </div>
        </div>
        <!-- 我的地址 -->
        <div class="dressbox" v-show="selmcli==1">
          <p class="dstitle">
            <img src="../assets/shop/return.png" alt />
            收货地址
          </p>
          <div class="dslist" v-if="!isedit">
            <div class="dsinfobox" v-for="(item, index) in dressinfo" :key="index">
              <div class="dsinfo">
                <div class="left">
                  <img src="../assets/shop/dress.png" alt />
                </div>
                <div class="center">
                  <p class="name">
                    {{item.name}}
                    <span>{{item.tel}}</span>
                  </p>
                  <p class="dress">{{item.province}}{{item.city}}{{item.county}}{{item.dress}}</p>
                </div>
                <div class="right">
                  <span class="edit" @click="edit(item)">编辑</span>
                  <span class="delds">删除</span>
                </div>
              </div>
            </div>
          </div>
          <p class="adddressbox" v-if="!isedit">新增收货地址+</p>
          <editdress :edititem="edititem" @close="close" v-if="isedit"></editdress>
        </div>
        <!-- 优惠券 -->
        <div class="integralbox" v-show="selmcli==2">
          <p class="inttitle">
            <img src="../assets/shop/return.png" alt />
            <span class="tochange">优惠券</span>
          </p>
          <ul class="intlist">
            <li class="intli" v-for="(item, index) in intinfo" :key="index">
              <div class="couponinfo curbg">
                <div class="top">
                  <div class="tleft">
                    <p class="tltop">满减券</p>
                    <p class="tlbot">满{{item.aprice}}可使用</p>
                  </div>
                  <p class="cut">
                    <span>￥</span>
                    {{item.num}}
                  </p>
                </div>
                <div class="bot">
                  <p class="brd">积分兑换·超值满减券</p>
                  <p class="time">{{item.starttime}}-{{item.closetime}}</p>
                  <p class="needint" v-show="item.isexchange==false">立即领取</p>
                  <p class="needint" v-show="item.isexchange==true">已领取</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 我的积分 -->
        <div class="integralbox" v-show="selmcli==3">
          <p class="inttitle">
            <span class="tochange">积分兑换</span>
            <span>我的积分：</span>
            <span class="num">2080</span>
          </p>
          <ul class="intlist">
            <li class="intli" v-for="(item, index) in intinfo" :key="index">
              <div class="couponinfo" :class="item.isexchange==false?'curbg':'exchange'">
                <div class="top">
                  <div class="tleft">
                    <p class="tltop">满减券</p>
                    <p class="tlbot">满{{item.aprice}}可使用</p>
                  </div>
                  <p class="cut">
                    <span>￥</span>
                    {{item.num}}
                  </p>
                </div>
                <div class="bot">
                  <p class="brd">积分兑换·超值满减券</p>
                  <p class="time">{{item.starttime}}-{{item.closetime}}</p>
                  <p class="needint" v-show="item.isexchange==false">{{item.need}}积分兑换</p>
                  <p class="needint" v-show="item.isexchange==true">已兑换</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 修改密码 -->
        <div class="pswbox" v-show="selmcli==4">
          <p class="pswtitle">
            <img src="../assets/shop/return.png" alt /> 修改密码
          </p>
          <section>
            <input type="text" placeholder="注册账户手机号" v-model="regtel" />
          </section>
          <section class="code">
            <input type="text" placeholder="请输入验证码" v-model="code" />
            <p>获取验证码</p>
          </section>
          <section>
            <input type="text" placeholder="请输入新密码" v-model="npsw" />
          </section>
          <section>
            <input type="text" placeholder="请再次输入新密码" v-model="qrpsw" />
          </section>
          <p class="send">确定</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import editdress from "../components/editdress";

export default {
  name: "minecenter",
  data() {
    return {
      edititem: "",
      isedit: false,
      selmcli: 0,
      radio: "1",
      input: "",
      detaildress: "", //详细地址
      consignee: "", //收货人姓名
      tel: "", //收货人电话
      regtel: "", //注册账户手机号
      code: "", //验证码
      npsw: "", //新密码
      qrpsw: "", //旧密码
      address: {
        name: "",
        tel: "",
        dress: "",
        province: "",
        city: "",
        county: ""
      },
      mineli: ["个人信息", "我的地址", "我的优惠", "我的积分", "修改密码"],
      dressinfo: [
        {
          name: "张三",
          tel: "12345678901",
          dress:
            "四川省成都市四川省成都市四川省成都市四川省成都市四川省成都市四川省成都市四川省成都市",
          province: "四川省",
          city: "成都市",
          county: "高新区"
        },
        {
          name: "张三",
          tel: "135245444",
          dress: "四川省成都市",
          province: "四川省",
          city: "达州市",
          county: "通川区"
        }
      ],
      intinfo: [
        {
          aprice: "1000.00",
          num: 200,
          starttime: "2019.09.01 00.00",
          closetime: "2019.10.05.23.59",
          need: 1000,
          isexchange: false
        },
        {
          aprice: "1000.00",
          num: 200,
          starttime: "2019.09.01 00.00",
          closetime: "2019.10.05.23.59",
          need: 1000,
          isexchange: false
        },
        {
          aprice: "1000.00",
          num: 400,
          starttime: "2019.09.01 00.00",
          closetime: "2019.10.05.23.59",
          need: 2000,
          isexchange: false
        },
        {
          aprice: "1000.00",
          num: 200,
          starttime: "2019.09.01 00.00",
          closetime: "2019.10.05.23.59",
          need: 1000,
          isexchange: true
        }
      ]
    };
  },
  created() {
    this.selmcli = this.$route.query.tag;
  },
  methods: {
    //   上传头像
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // city
    onSelected(data) {
      this.address.province = data.province.value;
      this.address.city = data.city.value;
      this.address.county = data.area.value;
      console.log(data);
    },
    // 修改地址
    edit(item) {
      console.log(item);
      console.log(this.address);
      setTimeout(() => {
        this.isedit = true;
        this.edititem = item;
      }, 200);
    },
    close(e) {
      this.isedit = e;
      console.log(e, "wwww");
    },
    tonav(index, item) {
      this.selmcli = index;
    }
  },
  components: { VDistpicker, editdress }
};
</script>

<style lang="less" scoped>
.mine-center {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 0 80px 0;
  background: rgba(245, 245, 245, 1);

  input {
    box-sizing: border-box;
    padding: 0 10px;
  }
  .main {
    width: 100%;
    box-sizing: border-box;
    padding: 0 25px;
    // display: flex;
    // justify-content: space-between;
  }
  .mclist {
    width: 112px;
    .mcli {
      cursor: pointer;
      width: 100%;
      height: 85px;
      text-align: center;
      line-height: 85px;
      color: rgba(51, 51, 51, 1);
      font-size: 16px;
    }
    .selmcli {
      background: white;
      color: rgba(45, 135, 202, 1);
    }
  }
  .save {
    box-sizing: border-box;
    padding-top: 30px;
    border-top: 1px solid rgba(204, 204, 204, 1);
    p {
      width: 124px;
      height: 30px;
      background: rgba(36, 130, 200, 1);
      font-size: 12px;
      color: white;
      text-align: center;
      line-height: 30px;
    }
  }
  .contbox {
    background: white;
    width: 100%;
    box-sizing: border-box;
    padding: 27px 25px;
    // 个人信息
    .minebox {
      .changehead {
        display: flex;
        justify-content: space-between;
        span {
          align-self: center;
          font-size: 30px;
          color: rgba(51, 51, 51, 1);
        }
        .uphead {
          align-self: center;
          .mainpic {
            width: 104px;
            height: 104px;
            border-radius: 50%;
            margin-bottom: 15px;
            position: relative;
            right: 12px;
          }
        }
      }
      .pl {
        box-sizing: border-box;
        padding: 40px 0;
        border-top: 1px solid #cccccc;
        color: rgba(51, 51, 51, 1);
        font-size: 30px;
        display: flex;
        justify-content: space-between;
        .right {
          span {
            padding-right: 20px;
          }
        }
      }
      .changename {
        width: 100%;

        input {
          background: chartreuse;
          width: 213px;
          height: 100%;
          border-radius: 5px;
          color: #848484;
        }
      }
    }
    //修改地址
    .dressbox {
      .dstitle {
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding-bottom: 30px;
        border-bottom: 1px solid #cccccc;
        img {
          width: 15px;
          position: relative;
          bottom: 1px;
        }
      }
      // 现有地址
      .dslist {
        // background: pink;
        width: 100%;
        box-sizing: border-box;
        padding: 30px 0;
        .dsinfobox {
          width: 100%;
          .dsinfo {
            width: 100%;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding-bottom: 50px;
            .left {
              align-self: center;
              // background: brown;
              width: 15%;
              img {
                width: 64px;
              }
            }
            .center {
              align-self: center;
              // background: cadetblue;
              width: 65%;
              font-size: 24px;
              color: #333333;
              .name {
                font-size: 30px;
                span {
                  font-size: 24px;
                  color: #8e8e8e;
                }
              }
              .dress {
                box-sizing: border-box;
                padding-top: 10px;
              }
            }
            .right {
              align-self: center;
              width: 20%;
              color: #999999;
              font-size: 24px;
              height: 65px;
              line-height: 65px;
              display: flex;
              justify-content: space-around;
              border-left: 1px solid #cccccc;
            }
          }
        }
      }
      // 新增地址
      .adddressbox {
        width: 100%;
        height: 93px;
        border: 1px solid rgba(210, 210, 210, 1);
        border-radius: 5px;
        color: #999999;
        font-size: 30px;
        text-align: center;
        line-height: 93px;
      }
    }
    // 积分
    .integralbox {
      .inttitle {
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding-bottom: 30px;
        border-bottom: 1px solid #cccccc;
        img {
          width: 15px;
          position: relative;
          bottom: 1px;
        }
        .tochange {
          margin-right: 40px;
          cursor: pointer;
        }
        .num {
          color: rgba(36, 130, 200, 1);
        }
      }
      .intlist {
        box-sizing: border-box;
        padding: 40px 0;
        .intli {
          margin-bottom: 25px;
          width: 100%;
          background: #f9f9f9;
          // background: brown;
          border: 1px solid rgba(236, 236, 236, 1);
          box-shadow: 0px 0px 10px 0px rgba(224, 224, 224, 0.82);
          .curbg {
            width: 100%;
            // height: 375px;
            border-top: 9px solid rgba(36, 130, 200, 1);
            border-radius: 5px;
            .tltop,
            .cut {
              color: rgba(36, 130, 200, 1);
            }
            .needint{
               background: #2482c8;
            }
          }
          .exchange {
            width: 100%;
            // height: 375px;
            border-top: 9px solid rgba(125, 125, 125, 1);
            border-radius: 5px;
            .tltop,
            .cut {
              color: rgba(125, 125, 125, 1);
            }
            .needint {
              background: rgba(125, 125, 125, 1);
            }
          }
          .couponinfo {
            width: 100%;

            .top {
              box-sizing: border-box;
              padding: 38px 30px 0 30px;
              width: 100%;
              height: 176px;
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid rgba(204, 204, 204, 1);
              .tleft {
                .tltop {
                  font-size: 48px;
                }
                .tlbot {
                  font-size: 36px;
                  color: rgba(51, 51, 51, 1);
                  box-sizing: border-box;
                  padding-bottom: 20px;
                }
              }
              .cut {
                font-size: 79px;
                font-weight: bold;
                span {
                  font-size: 41px;
                }
              }
            }
            .bot {
              box-sizing: border-box;
              padding-top: 30px;

              .brd {
                box-sizing: border-box;
                margin-left: 30px;
                width: 50%;
                height: 33px;
                text-align: center;
                border: 1px solid rgba(210, 210, 210, 1);
                border-radius: 9px;
                font-size: 24px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              .time {
                box-sizing: border-box;
                padding: 10px 0 15px 30px;
                font-size: 24px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              .needint {
                width: 100%;
                height: 72px;
                line-height: 72px;
               
                text-align: center;
                font-size: 33px;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
      }
    }
    // 修改密码
    .pswbox {
      width: 100%;
      //
      .pswtitle {
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        box-sizing: border-box;
        padding-bottom: 30px;
        margin-bottom: 40px;
        border-bottom: 1px solid #cccccc;
        img {
          width: 15px;
          position: relative;
          bottom: 1px;
        }
      }
      section {
        width: 100%;
        height: 75px;
        box-sizing: border-box;
        margin: 15px 0;
        position: relative;
        input {
          border-radius: 0;
          width: 100%;
          height: 100%;
          line-height: 75px;
          font-size: 30px;
          border: 1px solid rgba(228, 228, 228, 1);
          &:focus {
            border: 1px solid RGBA(140, 139, 142, 1);
          }
        }
      }
      .code {
        input {
          width: 70%;
          font-size: 30px;
        }
        p {
          position: absolute;
          top: 0;
          right: 0;
          width: 30%;
          height: 75px;
          background: rgba(228, 228, 228, 1);
          border: 1px solid rgba(228, 228, 228, 1);
          font-size: 30px;
          color: rgba(51, 51, 51, 1);
          text-align: center;
          line-height: 75px;
        }
      }
      .send {
        margin-top: 40px;
        width: 100%;
        height: 70px;
        line-height: 70px;
        background: #2482c8;
        color: white;
        text-align: center;
        font-size: 24px;
      }
    }
  }
}
</style>
