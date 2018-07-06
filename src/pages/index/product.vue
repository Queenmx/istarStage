<template>
    <div class="product">
        <v-header></v-header>
        <div class="bluebox">
        <div class="container wrap">
                <div class="product-card card">
                    <van-row type="flex" justify="space-between" class="baseInfo">
                        <van-col span="12">
                            <h4>借款金额</h4>
                            <div class="flex">
                                <van-cell-group>
                                    <van-field v-model="value"  placeholder="2000元" @click="isShowMoney=!isShowMoney" icon="edit" @click-icon="isShowMoney=!isShowMoney" />
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
                                    <van-field class="limit" v-model="dealine" placeholder="6月" @click="isShowTime=!isShowTime" icon="edit" @click-icon="isShowTime=!isShowTime" />
                                </van-cell-group>
                            </div>
                            <van-popup v-model="isShowTime" @change="onChange" position="bottom">
                                <van-picker show-toolbar :columns="deadline" @cancel="onCancel" @confirm="setTime" />
                            </van-popup>
                        </van-col>
                    </van-row>
                    <van-row class="feecount" gutter="15">
                        <van-col span="8">
                            <span>还款金额</span>
                            <span class="fee-num inblock">{{currentmoney}}</span>
                        </van-col>
                        <van-col span="8" class="center">
                            <span>利息和费用</span>
                            <van-field v-model="interest" icon="question" @click-icon="show=!show" />
                        </van-col>
                        <van-col span="8" class="textright">
                            <span>到账金额</span>
                            <span class="fee-num inblock">{{currentmoney}}</span>
                        </van-col>
                        <van-dialog v-model="show" title="利息和费用组成">
                            <div class="fee-diaLog">
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">咨询服务费</van-col>
                                    <van-col class="textright" span="10">1350元</van-col>
                                </van-row>
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">利息</van-col>
                                    <van-col class="textright" span="10">2025元</van-col>
                                </van-row>
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">管理费</van-col>
                                    <van-col class="textright" span="10">2025元</van-col>
                                </van-row>
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">总共</van-col>
                                    <van-col class="textright" span="10">5400元</van-col>
                                </van-row>
                            </div>
                        </van-dialog>
                    </van-row>
                    <router-link class="pro-detail" to="/index/productdetail">产品详情</router-link>
                </div>
                <split></split>
                <div class="application card">
                    <h3 class="cardtitle van-hairline--bottom"><span>申请材料</span></h3>
                    <van-row type="flex" class="material-list van-hairline--bottom" justify="space-between" v-for="(item,index) in material" :key="index" >
                        <van-cell @click="toDetail(item.name)" :title="urlName[item.name]" :class="item.status==1?'green':'blue'" is-link :value="item.status==1?'已认证':'去认证'" />
                    </van-row>
                </div>
                <split></split>
                <van-button type="primary" bottom-action>立即借款</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { datum } from "@/util/axios.js";

export default {
  data() {
    return {
      columns: ["1000", "2000", "3000", "4000", "200000"],
      deadline: ["6", "12"],
      isShowMoney: false,
      isShowTime: false,
      value: "",
      dealine: "",
      type: "月",
      currentmoney: "25000.00元",
      interest: "5000.00元",
      show: false,
      urlName: {
        cert_auth: "身份认证",
        apply_info: "申请信息",
        other_info: "其他信息",
        human_relation: "人际关系",
        credit_auth: "信用认证"
      },
      material: [
        { name: "cert_auth", status: "1" },
        { name: "apply_info", status: "1" },
        { name: "other_info", status: "0" },
        { name: "human_relation", status: "1" },
        { name: "credit_auth", status: "0" }
      ]
    };
  },
  mounted() {
    // this.isApprove();
  },
  methods: {
    async isApprove(){
      let res=await datum();
      if(res.code==200){
        this.material=res.data;
      }
    },
    onConfirm(value, index) {
      this.value = value + "元";
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
      this.dealine = value + this.type;
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
      this.$router.push({ path: "/application/" + url });
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
          font-size: rem(60px);
          &::placeholder {
            color: $orange;
          }
        }
      }
      .limit {
        width: 45%;
        padding-top: rem(15px);
        input {
          color: $black;
          font-size: rem(30px);
          padding-top: rem(10px);
          &::placeholder {
            color: $black;
          }
        }
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
          font-size: rem(30px);
        }
      }
      .center {
        text-align: center;
      }
    }
    .fee-num {
      padding-top: rem(15px);
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
  .van-button--primary{
    border:none;
  }
}
</style>
