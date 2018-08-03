<template>
    <div class="product">
        <v-header></v-header>
        <div class="bluebox">
        <div class="container wrap">
                <div class="product-card card">
                    <van-row type="flex" justify="space-between" class="baseInfo">
                        <van-col span="10">
                            <h4>借款金额</h4>
                            <div class="flex">
                                <van-cell-group>
                                    <van-field v-model="price"  :placeholder="defultPrice +'元'" @click="isShowMoney=!isShowMoney" icon="edit" disabled @click-icon="isShowMoney=!isShowMoney" />
                                </van-cell-group>
                            </div>
                            <van-popup v-model="isShowMoney" @change="onChange" position="bottom">
                                <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
                            </van-popup>
                        </van-col>
                        <van-col span="10" class="textright">
                            <h4>借款期限</h4>
                            <div class="flex">
                                <van-cell-group>
                                    <van-field class="limit" v-model="deadline" :placeholder="defultTime+type" @click="isShowTime=!isShowTime" icon="edit" disabled @click-icon="isShowTime=!isShowTime" />
                                </van-cell-group>
                            </div>
                            <van-popup v-model="isShowTime" @change="onChange" position="bottom">
                                <van-picker show-toolbar :columns="deadlines" @cancel="onCancel" @confirm="setTime" />
                            </van-popup>
                        </van-col>
                    </van-row>
                    <van-row class="feecount" gutter="15">
                        <van-col span="8">
                            <span>还款金额</span>
                            <span class="fee-num inblock">{{repayAmount}}元</span>
                        </van-col>
                        <van-col span="8" class="center">
                            <span>利息和费用</span>
                            <van-field v-model="totleAmount" icon="question" @click-icon="show=!show" disabled />
                        </van-col>
                        <van-col span="8" class="textright">
                            <span>到账金额</span>
                            <span class="fee-num inblock">{{actualAmount}}元</span>
                        </van-col>
                        <van-dialog v-model="show" title="利息和费用组成">
                            <div class="fee-diaLog">
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">咨询服务费</van-col>
                                    <van-col class="textright" span="10">{{serviceAmount}}元</van-col>
                                </van-row>
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">利息</van-col>
                                    <van-col class="textright" span="10">{{interestAmount}}元</van-col>
                                </van-row>
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">管理费</van-col>
                                    <van-col class="textright" span="10">{{manageAmount}}元</van-col>
                                </van-row>
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">总共</van-col>
                                    <van-col class="textright" span="10">{{totleAmount}}</van-col>
                                </van-row>
                            </div>
                        </van-dialog>
                    </van-row>
                    <router-link class="pro-detail" to="/index/productdetail">产品详情</router-link>
                </div>
                <split></split>
                <div class="application card">
                    <h3 class="cardtitle van-hairline--bottom"><span>申请材料</span></h3>
                    <van-row type="flex" class="material-list van-hairline--bottom" justify="space-between" v-for="(item,index) in material" :key="index" ref="list" >
                        <van-cell @click="toDetail(index)" :title="urlName[index].title" :class="item==1?'green':'blue'" is-link :value="item==1?'已认证': item==2?'重新认证':'去认证'" v-if="item != -1" />
                    </van-row>
                </div>
                <split></split>
                <van-button type="primary" bottom-action @click="creditVerify" :disabled="disabled">立即借款</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { baseInfo, datum, getUrl, calcu, orderApply } from "@/util/axios.js";
import { setItem, getItem, delItem } from "@/util/util.js";
export default {
  data() {
    return {
      columns: ["1000", "2000", "3000", "4000", "200000"],
      deadlines: ["6", "12"],
      isShowMoney: false,
      isShowTime: false,
      price: "",
      deadline: "",
      defultPrice: getItem("price"),
      defultTime: getItem("deadline"),
      termType: {
        1: "天",
        2: "月"
      },
      type: "",
      repayAmount: "0.00",
      actualAmount: "0.00",
      totleAmount: "0.00",
      serviceAmount: "0.00",
      interestAmount: "0.00",
      manageAmount: "0.00",
      show: false,
      urlName: {
        certAuth: { title: "身份认证", index: 0 },
        applyInfo: { title: "申请信息", index: 1 },
        otherInfo: { title: "其他信息", index: 2 },
        humanRelation: { title: "人际关系", index: 3 },
        creditAuth: { title: "信用认证", index: 4 }
      },
      material: {},
      productId: "",
      disabled: false,
      activeMaterial: "",
      certLiving: true,
      orderNum: ""
    };
  },
  mounted() {
    this.isApprove();
  },
  methods: {
    async isApprove() {
      let res = await datum();
      console.log(res);
      if (res.code == 200) {
        this.material = res.data.infoList;
        let priceMin = res.data.proInfo.priceMin;
        this.priceMax = res.data.proInfo.priceMax;
        if (!this.defultPrice) {
          this.defultPrice = res.data.proInfo.priceMax;
        } else {
          this.defultPrice = getItem("price");
          this.price = getItem("price") + "元";
        }
        let priceIncrement = res.data.proInfo.priceIncrement;
        let arr = [];
        for (let i = priceMin; i <= this.priceMax; i += priceIncrement) {
          arr.push(i);
        }
        arr.reverse();
        for (let key in this.material) {
          if (this.material[key] != 1 && this.material[key] != -1) {
            this.activeMaterial = key;
            break;
          }
        }
        this.columns = arr;
        let typeValue = res.data.proInfo.termType;
        this.type = this.termType[typeValue];
        this.deadlines = res.data.proInfo.productTerm.split(",");
        if (!this.defultTime) {
          this.defultTime = this.deadlines[this.deadlines.length - 1];
        } else {
          this.defultTime = getItem("deadline");
          this.deadline = getItem("deadline").toString() + this.type;
        }

        this.productId = res.data.proInfo.productId;
        this.certLiving = res.data.proInfo.certLiving;
        let defultData = {
          price: this.defultPrice.toString(),
          term: this.defultTime,
          type: this.type === "天" ? 1 : 2
        };
        this.counter(defultData);
      }
    },
    async counter(data) {
      let res = await calcu(data);
      console.log(data);
      console.log(res);
      if (res.code == 200) {
        this.actualAmount = res.data.actual_amount.toFixed(2);
        this.interestAmount = res.data.interest_amount.toFixed(2);
        this.manageAmount = res.data.manage_amount.toFixed(2);
        this.repayAmount = res.data.repay_amount.toFixed(2);
        this.serviceAmount = res.data.service_amount.toFixed(2);
        this.totleAmount = res.data.totle_amount.toFixed(2) + "元";
      }
    },
    onConfirm(value, index) {
      this.price = value + "元";
      setItem("price", value);
      let data = {
        price: value.toString(),
        term: this.dealine
          ? this.dealine.replace(/[^0-9]/gi, "").toString()
          : this.defultTime,
        type: this.type === "天" ? 1 : 2
      };
      this.counter(data);
      this.isShowMoney = false;
    },
    onCancel() {
      this.isShowMoney = false;
      this.isShowTime = false;
    },
    onChange(index) {
      console.log(index);
    },
    setTime(value, index) {
      this.deadline = value + this.type;
      setItem("deadline", value);
      let data = {
        price: this.price
          ? this.price.replace(/[^0-9]/gi, "").toString()
          : this.priceMax.toString(),
        term: value.toString(),
        type: this.type === "天" ? 1 : 2
      };
      this.counter(data);
      this.isShowTime = false;
    },
    DiaLog(action, done) {
      if (action === "confirm") {
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    toDetail(url) {
      if (this.activeMaterial) {
        let activeIndex = this.urlName[this.activeMaterial].index;
        let index = this.urlName[url].index;
        if (activeIndex < index) {
          this.$toast("请按顺序认证");
          return;
        }
      }
      let urlName = ["creditAuth", "otherInfo"];
      console.log(urlName.indexOf(url));
      if (urlName.indexOf(url) >= 0) {
        this.$router.push({
          path: "/application/" + url,
          query: { productId: this.productId }
        });
      } else if (url == "certAuth") {
        this.$router.push({
          path: "/application/" + url,
          query: { certLiving: this.certLiving }
        });
      } else {
        this.$router.push({
          path: "/application/" + url
        });
      }
    },
    async applyBtn() {
      //   this.disabled = true;
      let data = {
        price: this.price
          ? this.price.replace(/[^0-9]/gi, "").toString()
          : this.priceMax.toString(),
        term: this.deadline
          ? this.deadline.replace(/[^0-9]/gi, "")
          : this.defultTime,
        type: this.type === "天" ? 1 : 2
      };
      console.log(data);
      let res = await orderApply(data);
      console.log(res);
      if (res.code == 200) {
        this.orderNum = res.data;
        delItem("price");
        delItem("deadline");
        this.disabled = false;
        // this.$router.push({ path: "/success" });
        this.toPath(
          1,
          escape("http://h5.xinyzx.com:82/istarStage/#/success?type=1")
        );
      } else {
        this.disabled = true;
        this.$toast(res.msg);
      }
    },
    async toPath(type, url) {
      let data = {
        orderNum: this.orderNum,
        type: type,
        returnUrl: url
      };
      console.log(data);
      let res = await getUrl(data);
      console.log(res);
      if (res.code == 200) {
        location.href = res.data;
      }
    },
    creditVerify() {
      for (let i in this.material) {
        if (this.material[i] == 0) {
          this.$toast(this.urlName[i].title + "未认证");
          return;
        } else if (this.material[i] == 2) {
          this.$toast(this.urlName[i].title + "需重新认证");
          return;
        }
      }
      this.applyBtn();
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.product {
  .bluebox {
    background: $blue;
    height: rem(300px);
  }
  .product-card {
    margin-top: rem(20px);
    box-shadow: 0px 2px rem(24px) 0px rgba(0, 116, 228, 0.04);
    h4 {
      padding: rem(60px) 0 rem(20px);
    }
    .van-cell-group {
      background: none;
      color: #fff;
    }
    .van-hairline--top-bottom::after {
      border: none;
    }
    .baseInfo {
      .van-cell {
        background: none;
        color: #fff;
        float: right;
        padding: 0;
        input {
          background: none;
          color: $orange;
          font-size: rem(50px);
          &::placeholder {
            color: $orange;
          }
        }
      }
      .limit {
        width: 60%;
        // padding-top: rem(15px);
        // input {
        //   color: $black;
        //   font-size: rem(30px);
        //   padding-top: rem(10px);
        //   &::placeholder {
        //     color: $black;
        //   }
        // }
      }
    }

    .van-field__clear,
    .van-field__icon {
      color: $blue;
    }
    .feecount {
      padding: rem(60px) 0 rem(20px);
      .van-cell {
        padding: 10px 0;
        // width: 90%;
        input {
          color: #ffc300;
          text-align: center;
          font-size: rem(30px);
        }
      }
      .center {
        text-align: center;
      }
    }
    .fee-num {
      padding-top: rem(21px);
      color: #ffc300;
    }
    .van-dialog__header {
      padding: rem(40px) 0;
      border-bottom: 1px solid $bdcolor;
      color: $blue;
    }
    .fee-diaLog {
      padding: rem(25px) rem(60px);
      line-height: rem(55px);
    }
    .pro-detail {
      display: block;
      text-align: center;
      padding-bottom: rem(20px);
      color: $grey;
      text-decoration: underline;
    }
    .van-dialog__confirm,
    .van-dialog__confirm:active {
      color: $blue;
    }
  }
  .application {
    .material-list {
      line-height: rem(100px);
    }
    .icon-arrow {
      vertical-align: middle;
      padding-left: rem(10px);
    }
    .blue {
      .van-cell__value {
        span {
          color: $blue;
        }
      }
    }
    .green {
      .van-cell__value {
        span {
          color: #00cf7a;
        }
      }
    }
    .list {
      width: 100%;
    }
  }
  .van-button--primary {
    border: none;
  }
}
</style>
