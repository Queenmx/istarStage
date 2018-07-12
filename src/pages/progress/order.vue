<template>

    <div class="order">
        <v-header title="借款详情"></v-header>
        <div class="container">
            <div class="order-h wrap">
                <van-row type="flex" justify='space-between'>
                    <van-col span="10" class="status-words">{{flowFlag}}</van-col>
                    <van-col class="textright status-btn" span="10">
                        <van-button v-if="status[flowFlag] == 1">绑卡</van-button>
                        <van-button v-else-if="status[flowFlag] == 3">签约</van-button>
                        <van-button v-else-if="status[flowFlag] == 8">确认用款</van-button>
                        <img v-else-if="status[flowFlag] == 4||status[flowFlag] == 2" class="clock" src="../../assets/images/clock.png">
                        <img v-else-if="status[flowFlag] == 17 || status[flowFlag] == 9" class="clock" src="../../assets/images/warn.png">
                        <img v-else-if="status[flowFlag] == 16" class="clock" src="../../assets/images/gou.png">
                        <img v-else-if="status[flowFlag] == 12" class="clock" src="../../assets/images/payment.png">
                    </van-col>
                </van-row>
            </div>
            <div class="planpart-one" v-show="status[flowFlag] < 10">
                <h4 class="van-hairline--bottom wrap card plan-tit">借款进度</h4>
                <div class="plan card">
                    <van-steps class="plan-tree" direction="vertical" :active="activeValue(status[flowFlag])" active-color="#0074e4">
                        <van-step>
                            <h3>申请借款</h3>
                            <p>你的借款申请需要绑卡，请尽快绑定银行卡。</p>
                        </van-step>
                        <van-step>
                            <h3>待绑卡</h3>
                            <p>你的借款申请需要绑卡，请尽快绑定银行卡。</p>
                        </van-step>
                        <van-step>
                            <h3>审核</h3>
                            <p>{{status[flowFlag]*1==9 ? '你的借款申请未通过，请重新申请。':'你的借款申请正在审核中，请耐心等待。预计24小时之内完成'}}</p>
                        </van-step>
                        <van-step>
                            <h3>签约</h3>
                            <p>你的借款申请需要签约，请尽快签约。</p>
                        </van-step>
                        <van-step>
                            <h3>放款</h3>
                            <p>你借款申请已经提交放款了，请耐心等待。</p>
                        </van-step>
                    </van-steps>
                </div>
            </div>
            <!-- 已结清 -->
            <div class="plan-complete" v-if="status[flowFlag] == 16 || status[flowFlag] == 12">
                <van-collapse v-model="activeNames">
                    <van-collapse-item name="1">
                        <div slot="title">{{productName}}<span class="complete-money inblock">￥{{applyPrice}}元</span></div>     
                        <div class="complete-detail van-hairline--bottom">
                            <van-row type="flex" justify="space-between">
                                <van-col span="10">借款金额</van-col>
                                <van-col span="10" class="textright">￥{{applyPrice}}</van-col>
                            </van-row>
                            <van-row type="flex" justify="space-between">
                                <van-col span="10">借款期限</van-col>
                                <van-col span="10" class="textright">{{applyTerm+applyType[termType]}}</van-col>
                            </van-row>
                            <van-row type="flex" justify="space-between">
                                <van-col span="10">年化率</van-col>
                                <van-col span="10" class="textright">{{productRate}}%</van-col>
                            </van-row>
                            <van-row type="flex" justify="space-between">
                                <van-col span="6">收款银行卡</van-col>
                                <van-col span="18" class="textright">{{ bankNumber}}</van-col>
                            </van-row>
                            <van-row type="flex" justify="space-between">
                                <van-col span="10">借款日期</van-col>
                                <van-col span="10" class="textright">{{applyTime}}</van-col>
                            </van-row>
                            <van-row type="flex" justify="space-between">
                                <van-col span="5">借款单号</van-col>
                                <van-col span="19" class="textright">{{orderNum}}</van-col>
                            </van-row>
                        </div>
                        <h4 class="contract-tit">借款合同</h4>
                        <ul class="contract">
                            <li v-for="(item,index) in contractInfo" :key="index">
                                <span @click="loadUrl(item.fieldValue)">{{item.fieldName}}</span>
                            </li>
                        </ul>
                    </van-collapse-item>
                </van-collapse>
                <split></split> 
                <div class="complete-bill">
                <van-row type="flex" justify="space-between wrap" class="complete-tit">
                    <van-col span="7">账单分期</van-col>
                    <van-col class="textright" span="17">已还{{repaidAmount}}元，未还{{noRepayAmount}}元</van-col>
                </van-row>
                <div class="complete-list">
                    <van-collapse v-model="activeList" accordion>
                        <van-collapse-item v-for="(item,i) in plans" :key="i" :name="i+1">
                            <div slot="title">
                                <input v-if="item.periodStatus !== 0" type="checkbox" :value="i" :id="'plansCheckbox' + i"  name="plansCheckbox" :checked="item.periodStatus !== 0" :disabled="item.periodStatus !==0"/>
                                <input v-else type="checkbox" name="plansCheckbox" class="checkItem" :id="'plansCheckbox' + i"  :value="i" v-model="selectArr"/>
                                <label v-if="item.periodStatus === 0" :for="'plansCheckbox' + i" class="label" :class="item.periodStatus | planStatusStyle" v-text="i + 1" @click="checked(i,$event)">
                                </label>
                                <label v-else :for="'plansCheckbox' + i" class="label" :class="item.periodStatus | planStatusStyle" v-text="i + 1">
                                </label>
                                <span :class="item.periodStatus | planStatusStyle">{{ item.noRepayAmount | formatMoney('元') }}</span>
                                <span class="complete-money inblock">{{item.dueTime|Timeformate}} {{item.periodStatus|planStatus}}</span>
                            </div>
                            <div class="hideinfo">
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">本金</van-col>
                                    <van-col span="10" class="textright">{{item.capitalAmount | formatMoney('元')}}</van-col>
                                </van-row>
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">利息</van-col>
                                    <van-col span="10" class="textright">{{item.interestAmount| formatMoney('元')}}</van-col>
                                </van-row>
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">逾期</van-col>
                                    <van-col span="10" class="textright">{{item.overdueAmount| formatMoney('元')}}</van-col>
                                </van-row>
                                <van-row type="flex" justify="space-between">
                                    <van-col span="10">管理费</van-col>
                                    <van-col span="10" class="textright">{{item.manageAmount| formatMoney('元')}}</van-col>
                                </van-row>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                </div>
            </div>
            </div>
            <split></split> 
            <div class="card" v-if="status[flowFlag] != 16 && status[flowFlag] != 12">
                <van-cell-group>
                    <van-cell title="申请金额" :value="'￥'+applyPrice" />
                    <van-cell title="借款期限" :value="applyTerm+applyType[termType]" />
                    <van-cell title="产品利率" :value="productRate +'%'" />
                    <van-cell title="收款银行卡" :value="bankName + bankNumber" v-if="status[flowFlag] != 1" />
                    <van-cell title="申请时间" :value="applyTime" />
                    <van-cell title="订单编号" :value="orderNum" />
                </van-cell-group>
            </div>
        </div>
        <div class="footer" v-if="status[flowFlag] == 12">
            <van-row type="flex" justify="space-between">
                <van-col span="14">
                    <input type="checkbox" name="checkboxAll" id="checkboxAll" value="all" />
                    <label for="checkboxAll" class="label" @click="checkboxAll($event)"></label>
                    <span>已选<span class="failed">{{ plansTotal | formatMoney('元') }}</span></span>
                </van-col>
                <van-col span="10" class="payment-atonce">
                    <button>立即还款</button>
                </van-col>
            </van-row>
        </div>
    </div>    
</template>
<script>
import { repaymentDetail } from "@/util/axios.js";
import { formateTime, stringHidePart } from "@/util/util.js";
export default {
  data() {
    return {
      orderId: this.$route.query.orderId,
      selectArr: [],
      applyType: {
        1: "天",
        2: "月"
      },
      status: {
        提交申请: "0",
        待绑卡: "1",
        审核中: "2",
        待签约: "3",
        待确认: "8",
        待放款: "4",
        待还款: "12",
        逾期: "14",
        已结清: "16",
        审核拒绝: "9",
        贷款取消: "17"
      },
      active: 1,
      activeList: "",
      productName: "",
      applyPrice: "0.00",
      productType: "H5",
      applyTerm: 465,
      termType: 1,
      channelNum: "li2",
      payType: 0,
      applyTime: 456454,
      orderNum: "on",
      bankName: "测试",
      bankNumber: "110",
      productRate: 11,
      flowFlag: "已结清",
      repaidAmount: "0.00",
      noRepayAmount: "0.00",
      activeNames: [],
      contractInfo: [],
      plans: []
    };
  },
  computed: {
    plansTotal() {
      let total = 0;
      for (let i = 0; i < this.selectArr.length; i++) {
        total += this.plans[this.selectArr[i]].noRepayAmount;
      }
      return total;
    }
  },
  filters: {
    planStatus: function(status) {
      return status === 0 ? "未还" : status === 1 ? "进行中" : "已还款";
    },
    planStatusStyle: function(status) {
      return status !== 2 ? "failed" : "success";
    },
    Timeformate(val) {
      let date = new Date(val * 1000);
      return val ? formateTime(date, "yyyy-MM-dd") : "----/--/--";
    },
    formatMoney: function(value, fmt) {
      return "￥" + value.toFixed(2) + fmt;
    }
  },
  mounted: function() {
    this.init();
  },
  methods: {
    activeValue(flag) {
      if (flag == 9) {
        return 2;
      } else if (flag == 8) {
        return 3;
      } else {
        return flag * 1;
      }
    },
    loadUrl(path) {
      console.log(path);
      window.location.href = path;
    },
    onClickMiniBtn() {
      this.$toast("点击图标");
    },
    onClickBigBtn() {
      this.$toast("点击按钮");
    },
    checked(maxIndex, e) {
      let minIndex = this.getMinIndex();
      let checkbox = document.getElementById("checkboxAll");
      this.select(minIndex, maxIndex, e);
      if (e.target.control.className == "checkItem") {
        if (e.target.control.checked) maxIndex -= 1;
        maxIndex == this.plans.length - 1
          ? (checkbox.checked = true)
          : (checkbox.checked = false);
      }
    },
    select(minIndex, maxIndex, e) {
      this.selectArr = [];
      for (let i = minIndex; i <= maxIndex; i++) {
        this.selectArr.push(i);
      }
    },
    checkboxAll(e) {
      !e.target.control.checked
        ? this.checked(this.plans.length - 1, e)
        : this.getInitIndex();
    },
    getMinIndex() {
      for (let i in this.plans) {
        if (this.plans[i].periodStatus === 1) return parseInt(i);
      }
    },
    getInitIndex() {
      this.selectArr = [];
      for (let i in this.plans) {
        if (this.plans[i].periodStatus === 1) this.selectArr.push(parseInt(i));
      }
    },
    checkboxAllStatus(index) {
      let result = this.plans.filter(function(item) {
        return item.periodStatus !== 2;
      });
      let checkbox = document.getElementById("checkboxAll");
      result.length == this.selectArr.length
        ? (checkbox.checked = true)
        : (checkbox.checked = false);
    },
    async init() {
      let data = {
        orderId: this.orderId
      };
      let res = await repaymentDetail(data);
      console.log(res);
      if (res.code == 200) {
        this.flowFlag = res.data.repayOrderDetail.flowFlag;
        this.productName = res.data.repayOrderDetail.productName;
        this.applyPrice = res.data.repayOrderDetail.auditedAmount.toFixed(2);
        this.productType = res.data.repayOrderDetail.productType;
        this.applyTerm = res.data.repayOrderDetail.applyTerm;
        this.termType = res.data.repayOrderDetail.termType;
        this.channelNum = res.data.repayOrderDetail.channelNum;
        this.payType = res.data.repayOrderDetail.payType;
        this.applyTime = formateTime(
          new Date(res.data.repayOrderDetail.applyTime * 1000),
          "yyyy-MM-dd"
        );
        this.orderNum = res.data.repayOrderDetail.orderNum;
        this.bankName = res.data.repayOrderDetail.bankName;
        let bankNum = res.data.repayOrderDetail.bankNumber;
        bankNum ? (this.bankNumber = stringHidePart(bankNum)) : "----";
        this.plans = res.data.plans;
        this.contractInfo = res.data.contractInfo;
        let repaidmoney = res.data.repayOrderDetail.repaidAmount;
        repaidmoney ? (this.repaidAmount = repaidmoney.toFixed(2)) : "0.00";
        let mopaidmoney = res.data.repayOrderDetail.noRepaidAmount;
        mopaidmoney ? (this.noRepayAmount = mopaidmoney.toFixed(2)) : "0.00";
        this.getInitIndex();
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.order {
  .order-h {
    background: $blue;
    line-height: rem(120px);
    color: #fff;
    margin-top: -1px;
    .clock {
      width: rem(76px);
      height: rem(76px);
      vertical-align: middle;
    }
  }
  .status-words {
    font-size: rem(40px);
    padding-left: rem(30px);
  }
  .status-btn {
    button {
      border-radius: rem(55px);
      color: $blue;
      letter-spacing: rem(2px);
      height: rem(70px);
      line-height: rem(70px);
      font-size: rem(30px);
      padding-left: rem(40px);
      padding-right: rem(40px);
    }
  }
  .plan-tit {
    line-height: rem(100px);
  }
  .van-step {
    p {
      color: $lightGrey;
      padding-top: rem(20px);
      display: none;
    }
  }
  .van-step--vertical .van-icon-checked {
    font-size: rem(30px);
    left: rem(-41px);
    z-index: 9;
    background: #fff;
  }
  .van-step--vertical:not(:last-child)::after {
    border: none;
  }
  .van-step--finish {
    h3 {
      color: $blue;
      font-size: rem(28px);
    }
    .van-step__circle {
      background-color: $blue;
    }
    .van-step__line {
      background-color: $blue;
    }
  }
  .van-step--process {
    .van-step__line {
      background-color: $blue;
    }
    p {
      display: block;
    }
  }
  .complete-money {
    float: right;
  }
  .complete-tit {
    background: #fff;
    line-height: rem(120px);
  }
  .complete-detail {
    line-height: rem(80px);
  }
  .contract-tit {
    padding: rem(20px) 0;
  }
  .contract {
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      line-height: rem(70px);
      color: $blue;
    }
  }
  .billcheck {
    // opacity: 0;
  }
  .billcheck:checked + .circle {
    background: $blue;
  }
  .hideinfo {
    line-height: rem(55px);
    width: 87%;
    margin-left: rem(60px);
  }

  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked + .label {
    background-color: #00cf7a;
    color: #fff;
    border-color: #00cf7a;
  }
  input[type="checkbox"]:checked + label.success {
    color: #fff;
    border-color: #ccc;
    background: #ccc;
  }
  .label {
    display: inline-block;
    margin-right: rem(10px);
    border: 1px $blue solid;
    border-radius: 100%;
    width: rem(40px);
    height: rem(40px);
    color: $blue;
    vertical-align: middle;
    text-align: center;
  }
  span.failed {
    color: $orange;
  }
  span.success {
    color: #686868;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: rem(30px);
    line-height: rem(100px);
    background: #fff;
    padding-left: rem(30px);
    .payment-atonce {
      button {
        background-color: $blue;
        width: 100%;
        border: none;
        color: #fff;
      }
    }
  }
}
</style>


