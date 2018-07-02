<template>
    <div class="order">
        <v-header title="借款详情"></v-header>
        <div class="container">
            <div class="order-h wrap">
                <van-row type="flex" justify='space-between'>
                    <van-col span="10" class="status-words">{{flowFlag}}</van-col>
                    <van-col class="textright status-btn" span="10">
                        <van-button v-show="status[flowFlag] == 1">绑卡</van-button>
                        <van-button v-show="status[flowFlag] == 3">签约</van-button>
                        <img class="clock" src="../../assets/images/clock.png">
                    </van-col>
                </van-row>
            </div>
            <h4 class="van-hairline--bottom wrap card plan-tit">借款进度</h4>
            <div class="plan card">
                <van-steps class="plan-tree" direction="vertical" :active="status[flowFlag]*1" active-color="#0074e4">
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
                        <p>你的借款申请正在审核中，请耐心等待。预计24小时之内完成</p>
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
            <split></split> 
            <div class="card">
                <van-cell-group>
                    <van-cell title="申请金额" :value="'￥'+applyPrice" />
                    <van-cell title="借款期限" :value="applyTerm+applyType[termType]" />
                    <van-cell title="产品利率" :value="productRate +'%'" />
                    <van-cell title="还款方式" :value="payType " />
                    <van-cell title="收款银行卡" :value="bankName + bankNumber" />
                    <van-cell title="申请时间" :value="applyTime" />
                    <van-cell title="订单编号" :value="orderNum" />
                </van-cell-group>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
  data() {
    return {
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
        贷款成功: "15",
        审核拒绝: "16",
        贷款取消: "17"
      },
      active: 1,
      applyPrice: 46646,
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
      flowFlag: "待放款",
      title: {
        applyPrice: "申请金额",
        applyTerm: "申请期限",
        productRate: "产品利率",
        payType: "还款方式",
        bankName: "收款银行",
        applyTime: "申请时间",
        orderNum: "订单编号"
      }
    };
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
}
</style>


