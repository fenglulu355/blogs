<template>
  <div class="mine-center">
    <p class="titles">个人中心</p>
    <div class="main">
      <ul class="mclist">
        <li
          class="mcli"
          v-for="(item, index) in mineli"
          :key="index"
          :class="selmcli ==index?'selmcli':''"
          @click="tonav(index,item)"
        >
          <p>{{item}}</p>
        </li>
      </ul>
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
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
              >
                <el-button size="small" type="primary">上传头像</el-button>
              </el-upload>
            </div>
          </div>
          <div class="changename pl">
            <span class="text">昵称</span>
            <input type="text" placeholder="请输入昵称" v-model="input" />
            <!-- <el-input placeholder="请输入内容" v-model="input" clearable></el-input> -->
          </div>
          <div class="acct pl">
            <span class="text">账号</span>
            <span>123154844</span>
          </div>
          <div class="changesex pl">
            <span class="text">性别</span>
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
          </div>
          <!-- 保存设置 -->
          <div class="save">
            <p>保存设置</p>
          </div>
        </div>
        <!-- 我的地址 -->
        <div class="dressbox" v-show="selmcli==1">
          <p class="dstitle">收货地址</p>
          <div class="dslist">
            <el-radio-group v-model="radio">
              <el-radio :label="index" v-for="(item, index) in dressinfo" :key="index">
                <div class="dsinfobox">
                  <div class="dsinfo">
                    <p class="name">{{item.name}}</p>
                    <p class="tel">{{item.tel}}</p>
                    <p class="dress">{{item.province}}{{item.city}}{{item.county}}{{item.dress}}</p>
                    <p class="edit" @click="edit(item)">编辑</p>
                    <p class="delds">删除</p>
                  </div>
                </div>
              </el-radio>
            </el-radio-group>
          </div>
          <div class="adddress">
            <p class="adtitle">新增收货地址</p>
            <section class="ds">
              <span class="text">地址信息：</span>
              <v-distpicker province="四川省" city="成都市" area="武侯区" @selected="onSelected"></v-distpicker>
            </section>
            <section>
              <span class="text">详细地址：</span>
              <input
                class="dds"
                type="text"
                placeholder="请输入如道路、门牌号、小区、楼栋号、单元等信息"
                v-model="detaildress"
              />
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
          </div>
          <!-- 保存设置 -->
          <div class="save">
            <p>保存设置</p>
          </div>
        </div>
        <!-- 优惠券 -->
        <div class="integralbox" v-show="selmcli==2">
          <p class="inttitle">
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
          <p class="pswtitle">修改密码</p>
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
          <!-- 保存设置 -->
          <div class="save">
            <p>保存设置</p>
          </div>
        </div>
      </div>
    </div>
    <editdress :edititem="edititem" @close="close" v-if="isedit"></editdress>
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
  .titles {
    width: 1200px;
    margin: 0 auto;
    color: rgba(51, 51, 51, 1);
    font-size: 20px;
    box-sizing: border-box;
    padding-bottom: 30px;
  }
  input {
    box-sizing: border-box;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 5px;
    padding-left: 10px;
    &::placeholder {
      color: rgba(204, 204, 204, 1);
    }
  }
  .main {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
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
    width: 1088px;
    box-sizing: border-box;
    padding: 36px 72px 49px 53px;
    // 个人信息
    .minebox {
      .changehead {
        display: flex;
        justify-content: flex-start;
        span {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          box-sizing: border-box;
          padding-right: 56px;
        }
        .uphead {
          box-sizing: border-box;
          padding-bottom: 20px;
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
        padding: 30px 0 40px 25px;
        color: rgba(51, 51, 51, 1);
        font-size: 14px;
        .text {
          box-sizing: border-box;
          padding-right: 50px;
        }
      }
      .changename {
        input {
          border: 1px solid rgba(204, 204, 204, 1);
          width: 213px;
          height: 30px;
          border-radius: 5px;
        }
      }
    }
    //修改地址
    .dressbox {
      .dstitle {
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
      }
      // 现有地址
      .dslist {
        // background: pink;
        width: 100%;
        box-sizing: border-box;
        padding: 34px 0 0 0px;
        .el-radio {
          width: 100%;
          box-sizing: border-box;
          padding: 20px 0;
          border-top: 1px solid rgba(204, 204, 204, 1);
        }
        .dsinfobox {
          width: 100%;
          display: inline-block;
          .dsinfo {
            width: 100%;
            display: grid;
            grid-template-columns: 10% 10% 64% 8% 8%;
            text-align: center;
            line-height: 30px;
            .dress {
              // background: orchid;
              width: 100%;
              white-space: pre-wrap;
              box-sizing: border-box;
              padding: 0 20px;
            }
          }
        }
      }
      // 新增地址
      .adddress {
        border-top: 1px solid rgba(204, 204, 204, 1);
        box-sizing: border-box;
        padding: 42px 0;
        .adtitle {
          color: rgba(51, 51, 51, 1);
          font-size: 16px;
          box-sizing: border-box;
          padding-bottom: 14px;
        }
        section {
          // background: rosybrown;
          box-sizing: border-box;
          padding-left: 24px;
          margin-top: 30px;
          display: grid;
          grid-template-columns: 15% 48%;
          .text {
            display: inline-block;
            width: 130px;
            text-align: right;
            position: relative;
            top: 8px;
          }
          input {
            line-height: 40px;
              &:focus {
            border: 1px solid RGBA(140, 139, 142, 1);
          }
            
          }
        }
        .ds {
          grid-template-columns: 15% 70%;
        }
        .tel {
          grid-template-columns: 15% 15% 33%;
          .border {
            font-size: 14px;
            border: 1px solid #dcdfe6;
            width: 90%;
            border-radius: 4px;
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }
    // 积分
    .integralbox {
      .inttitle {
        color: rgba(51, 51, 51, 1);
        font-size: 16px;
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
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        .intli {
          .curbg {
            width: 308px;
            height: 208px;
            background: url("../assets/mine/blue.png");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            .tltop,
            .cut {
              color: rgba(36, 130, 200, 1);
            }
          }
          .exchange {
            width: 308px;
            height: 208px;
            background: url("../assets/mine/gary.png");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            .tltop,
            .cut {
              color: rgba(125, 125, 125, 1);
            }
          }
          .couponinfo {
            width: 308px;
            height: 208px;
            box-sizing: border-box;
            padding: 34px 24px;
            .top {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid rgba(204, 204, 204, 1);
              .tleft {
                .tltop {
                  font-size: 25px;
                }
                .tlbot {
                  font-size: 16px;
                  color: rgba(51, 51, 51, 1);
                  box-sizing: border-box;
                  padding-bottom: 20px;
                }
              }
              .cut {
                font-size: 41px;
                font-family: Arial;
                font-weight: bold;
                span {
                  font-size: 22px;
                }
              }
            }
            .bot {
              box-sizing: border-box;
              padding-top: 13px;
              .brd {
                width: 129px;
                height: 17px;
                text-align: center;
                border: 1px solid rgba(210, 210, 210, 1);
                border-radius: 9px;
                font-size: 12px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              .time {
                box-sizing: border-box;
                padding: 4px 0 9px 0;
                font-size: 12px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              .needint {
                cursor: pointer;
                text-align: center;
                font-size: 16px;
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
      .save {
        box-sizing: border-box;
        // padding: 27px 0;
        margin-top: 50px;
      }
      //
      .pswtitle {
        color: rgba(102, 102, 102, 1);
        font-size: 16px;
        box-sizing: border-box;
        padding-bottom: 17px;
        margin-bottom: 50px;
        border-bottom: 1px solid rgba(204, 204, 204, 1);
      }
      section {
        width: 300px;
        height: 40px;
        box-sizing: border-box;
        margin: 10px 0;
        position: relative;
        input {
          border-radius: 0;
          width: 100%;
          height: 100%;
          line-height: 40px;
          &:focus {
            border: 1px solid RGBA(140, 139, 142, 1);
          }
        }
      }
      .code {
        input {
          width: 201px;
        }
        p {
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
          width: 97px;
          height: 38px;
          background: rgba(228, 228, 228, 1);
          border: 1px solid rgba(228, 228, 228, 1);
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          text-align: center;
          line-height: 38px;
        }
      }
    }
  }
}
</style>
