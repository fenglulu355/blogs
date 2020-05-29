<template>
  <div class="mine-center">
    <div class="main">
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
              <input type="text" :placeholder="minename" v-model="input" />
              <img src="../assets/shop/tr.png" alt />
            </div>
          </div>
          <div class="acct pl">
            <span class="text">账号</span>
            <div class="right">
              <input type="text" :placeholder="minezh" v-model="input" />
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
          <p class="dstitle" @click="goback">
            <img   src="../assets/shop/return.png" alt />
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
                    {{item.address_name}}
                    <span>{{item.address_phone}}</span>
                  </p>
                  <p
                    class="dress"
                  >{{item.address_province}}{{item.address_city}}{{item.address_area}}{{item.address_info}}</p>
                </div>
                <div class="right">
                  <span class="edit" @click="edit(item)">编辑</span>
                  <span class="delds" @click="deldress(item)">删除</span>
                </div>
              </div>
            </div>
          </div>
          <p class="adddressbox" v-if="!isedit" @click="addadress">新增收货地址+</p>
          <editdress :edititem="edititem" @close="close" v-if="isedit"></editdress>
          <editdress :edititem="edititem" @close="closead" v-if="isadd"></editdress>
        </div>
        <!-- 优惠券 -->
        <div class="integralbox" v-show="selmcli==2">
          <p class="inttitle">
            <img src="../assets/shop/return.png" alt />
            <span class="tochange">优惠券</span>
          </p>
          <ul class="intlist">
            <li class="intli" v-for="(item, index) in mineyhq" :key="index">
              <div class="couponinfo curbg">
                <div class="top">
                  <div class="tleft">
                    <p class="tltop">{{item.title}}</p>
                    <p class="tlbot">{{item.desc}}</p>
                  </div>
                  <p class="cut">
                    <span>￥</span>
                    {{item.price}}
                  </p>
                </div>
                <div class="bot">
                  <p class="brd">积分兑换·超值满减券</p>
                  <p class="time">{{item.start_time}}-{{item.end_time}}</p>

                  <p class="needint">已领取</p>
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
            <span class="num">{{userinfo.points}}</span>
          </p>
          <ul class="intlist">
            <li
              class="intli"
              v-for="(item, index) in intinfo"
              :key="index"
              @click="changePoints(item)"
            >
              <div class="couponinfo curbg">
                <div class="top">
                  <div class="tleft">
                    <p class="tltop">{{item.title}}</p>
                    <p class="tlbot">{{item.desc}}</p>
                  </div>
                  <p class="cut">
                    <span>￥</span>
                    {{item.price}}
                  </p>
                </div>
                <div class="bot">
                  <p class="brd">积分兑换·超值满减券</p>
                  <p class="time">{{item.start_time}}-{{item.end_time}}</p>
                  <p class="needint">{{item.points}}积分兑换</p>
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
            <input type="text" placeholder="注册账户手机号" v-model="minezh" />
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
import { mapState } from "vuex";

export default {
  name: "minecenter",
  inject: ["reload"],
  data() {
    return {
      userinfo: [],
      minezh: "",
      minename: "",
      edititem: "",
      isedit: false,
      isadd: false,
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
      dressinfo: [],
      curdress: [],
      mineyhq: [],
      curdressid: "",
      intinfo: [],
      points: ""
    };
  },
  created() {
    this.selmcli = this.$route.query.tag;
    this.requstmine();
    if (this.selmcli == 1) {
      this.requstaddress(this.userid);
    } else if (this.selmcli == 2) {
      this.getyhq();
    } else if (this.selmcli == 3) {
      this.requstyhq();
    }
  },
  computed: {
    ...mapState(["userid"])
  },
  methods: {
    requstmine() {
      this.$axios
        .post("/index/user/userInfo", { userId: this.userid })
        .then(res => {
          this.userinfo = res.data.data;
          if (res.data.data.user_name) {
            this.minename = res.data.data.user_name;
          } else {
            this.minename = res.data.data.user_nickname;
          }
          this.minezh = res.data.data.user_phone;
          console.log(res);
        });
    },
    requstaddress(userId) {
      this.$axios.post("/index/user/address", { userId: userId }).then(res => {
        this.dressinfo = res.data.data;
        this.curdress = this.dressinfo[0];
        this.curdressid = this.dressinfo[0].address_id;
      });
    },
    deldress() {
      this.$axios
        .post("/index/user/delAddress", { aid: this.curdressid })
        .then(res => {
          if (res.data.data.code == 1) {
            this.$toast.success(" 删除成功");
          } else {
            this.$toast.error("删除失败");
          }
          this.reload();
          console.log(res);
        });
    },
    addadress() {
      setTimeout(() => {
        this.isadd = true;
        this.edititem = this.curdress;
      }, 200);
    },
    // 修改地址
    edit(item) {
      setTimeout(() => {
        this.isedit = true;
        this.isadd = false;
        this.edititem = item;
      }, 200);
    },
    close(e, info) {
      this.isedit = e;
      // 修改地址
      this.$axios
        .post("/index/user/editaddress", {
          aid: this.curdressid,
          userId: this.userid,
          address_name: info.name,
          address_phone: info.tel,
          address_province: info.province,
          address_city: info.city,
          address_area: info.county,
          address_info: info.addressDetail
        })
        .then(res => {
          // console.log(res);
          this.reload();
        });
      console.log(info, "wwww");
    },
    closead(e, info) {
      this.isadd = e;
      console.log(info);

      this.$axios
        .post("/index/user/addaddress", {
          userId: this.userid,
          address_name: info.name,
          address_phone: info.tel,
          address_province: info.province,
          address_city: info.city,
          address_area: info.county,
          address_info: info.addressDetail
        })
        .then(res => {
          // console.log(res);
          this.reload();
        });
      console.log(info, "wwww");
    },
    // 获取优惠券
    getyhq() {
      this.$axios
        .post("/index/coupon/userCoupon", { userId: this.userid })
        .then(res => {
          console.log(res);
          this.mineyhq = res.data.data;
        });
    },
    requstyhq() {
      this.$axios.post("/index/coupon/coupon").then(res => {
        console.log(res);
        this.intinfo = res.data.data;
      });
    },
    changePoints(item) {
      console.log(item);
      if (
        this.userinfo.points > item.points ||
        this.userinfo.points == item.points
      ) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您有积分" + this.userinfo.points + "确定要兑换此券吗"
          })
          .then(() => {
            // 领取优惠券
            this.$axios
              .post("/index/coupon/addcoupon", {
                userId: this.userid,
                couponId: item.id
              })
              .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  // 请求个人信息更新积分
                  this.requstmine();
                  this.$toast.success("领取成功");
                  this.$forceUpdate();
                } else {
                  this.$toast.fail("领取失败");
                }
              });
          })
          .catch(() => {
            this.$toast.fail("已取消兑换");
          });
      } else {
        this.$toast.fail("对不起！您的积分不足，不能兑换！");
      }
    },
    tonav(index, item) {
      this.selmcli = index;
    },
    goback(){
       this.$router.go(-1)
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
          input {
            width: 213px;
            height: 100%;
            border-radius: 5px;
            color: #848484;
          }
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
            .needint {
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
