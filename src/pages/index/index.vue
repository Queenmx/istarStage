<template>
    <div class="index">
        <v-header>
            <i slot="left"><van-icon name="contact" @click='personcenter'/></i>
            <i slot="right" class="msg">
              <van-icon name="chat" @click="message"/>
              <span class="redmark" v-if="hasNews"></span>
            </i>
        </v-header>
        <div class="container">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item,index) in images" :key="index">
                    <img :src="item"/>
                </van-swipe-item>
            </van-swipe>
            <div class="wrap">
                <split></split>
                <div class="main-card whitebg">
                    <h3>借款金额（元）</h3>
                    <span class="money">{{money?money:"00"}}</span>
                    <p class="tips">借1000，每天利息低至1元，具体以显示为准</p>
                    <div class="apply">
                        <van-button size="large" type="primary" :disabled="orderStatus!= 0" @click="apply">{{orderStatus== 0 ?'立即申请':  '申请中'}}</van-button>
                    </div>
                </div>
                <div v-if="orderStatus == 2" @click="toComplete(status[flowFlag])">
                    <split></split>
                    <van-row class="order-progress whitebg" type="flex" justify="space-between">
                        <van-col class="pro-name" span="10">
                            <h2>{{productName?productName :'----'}}</h2>
                            <span>{{auditedAmount | moneyFormat}}</span>
                        </van-col>
                        <van-col class="orderstatus textright" span="10">{{flowFlag}}</van-col>
                    </van-row>
                </div>
                <div v-if="orderStatus== 3" @click="reCode">
                    <split></split>
                    <van-row class="order-progress whitebg" type="flex" justify="space-between" @click="toDetail">
                        <van-col class="pro-name" span="18">
                            <h2>还款计划</h2>
                            <span>{{time}} | 应还金额 {{loanamount}}</span>
                        </van-col>
                        <van-col class="orderstatus textright" span="6">{{flowFlag}}</van-col>
                    </van-row>
                </div>
                <router-link to="/progress/record">
                <split></split>
                    <van-row class="order-progress whitebg" type="flex" justify="space-between">
                        <van-col class="progress-name" span="10">借款记录</van-col>
                        <van-col class="textright arrow" span="10"><van-icon name="arrow"/></van-col>
                    </van-row>
                </router-link>
            </div>
        </div>
        
    </div>
</template>
<script>
import { HomeStatus, isNewMsg, getUrl } from "@/util/axios.js";
import { formateTime, setItem } from "@/util/util.js";
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      money: "",
      productName: "",
      auditedAmount: "",
      unable: "",
      orderStatus: 3,
      flowFlag: "待签约",
      loanamount: "",
      time: new Date(),
      images: [
        require("../../assets/images/banner1.png")
        // require("../../assets/images/t2.jpg"),
        // require("../../assets/images/t3.jpg"),
        // require("../../assets/images/t4.jpg")
      ],
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
      hasNews: false,
      orderId: "",
      orderNum: ""
    };
  },
  filters: {
    moneyFormat(value) {
      let money = 0;
      value ? (money = value.toFixed(2)) : "";
      return "￥" + money;
    }
  },
  mounted() {
    this.init();
    this.isNewMsg();
  },
  methods: {
    init() {
      this.getInfo();
    },
    async getInfo() {
      let res = await HomeStatus();
      console.log(res);
      if (res.code === 200) {
        this.orderStatus = res.data.unAble;
        this.money = res.data.priceMax;
        this.productName = res.data.info.productName;
        this.auditedAmount = res.data.info.auditedAmount;
        this.flowFlag = res.data.info.flowFlag;
        res.data.info.canRepayTime
          ? (this.time = formateTime(
              new Date(res.data.info.canRepayTime),
              "yyyy-MM-dd"
            ))
          : "";
        this.loanamount = res.data.info.periodAmount;
        this.orderId = res.data.info.orderId;
        this.orderNum = res.data.info.orderNum;
      }
    },
    apply() {
      this.$router.push({ path: "/index/product" });
    },
    toDetail() {
      this.$router.push({ path: "/progress" });
    },
    toComplete(flag) {
      console.log(flag);
      let url = "http://h5.xinyzx.com:82/istarStage/#/success";
      if (flag == 1) {
        this.toPath(1, url + "?type=1");
      } else if (flag == 3) {
        this.toPath(2, url + "?type=2");
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
    reCode() {
      this.$router.push({
        path: "/progress/order",
        query: {
          orderId: this.orderId
        }
      });
    },
    //去往个人中心
    personcenter() {
      this.$router.push({ path: "/index/personcenter" });
    },
    message() {
      this.$router.push({ path: "/index/message" });
    },
    async isNewMsg() {
      let res = await isNewMsg();
      if (res.code == 200) {
        this.hasNews = res.data;
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.index {
  .van-swipe {
    height: rem(300px);
    margin-top: -1px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .main-card {
    box-shadow: 0px 2px 24px 0px rgba(0, 116, 228, 0.04);
    h3 {
      font-size: rem(30px);
      color: $lightBlack;
      padding: rem(39px) 0 0 rem(33px);
    }
    .tips {
      text-align: center;
      color: #bbb;
    }
    .money {
      display: block;
      font-size: rem(82px);
      color: $black;
      text-align: center;
      padding: rem(60px) 0 rem(30px);
    }
  }
  .orderstatus {
    color: $blue;
    font-size: rem(28px);
    line-height: rem(110px);
  }
  .apply {
    margin-top: rem(40px);
    button:disabled {
      background-color: $lightGrey;
      border-color: $lightGrey;
    }
  }
  .order-progress {
    font-size: rem(30px);
    color: $lightGrey;
    padding: rem(30px) rem(40px);
  }
  .pro-name {
    h2 {
      padding: 0 0 rem(15px);
    }
    span {
      color: #494949;
    }
  }
  .arrow {
    padding-top: rem(9px);
  }
  .msg {
    position: relative;
  }
  .redmark {
    width: rem(15px);
    height: rem(15px);
    background: #ff0000;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    right: rem(1px);
  }
}
</style>

