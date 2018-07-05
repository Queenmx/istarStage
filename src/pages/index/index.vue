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
                    <span class="money">{{money}}</span>
                    <p class="tips">借1000，每天利息低至1元，具体以显示为准</p>
                    <div class="apply">
                        <van-button size="large" type="primary" :disabled="orderStatus!= 1" @click="apply">立即申请</van-button>
                    </div>
                </div>
                <split></split>
                <router-link to="/verify" v-if="orderStatus>= 3">
                <van-row class="order-progress whitebg" type="flex" justify="space-between">
                    <van-col class="pro-name" span="10">
                        <h2>{{productName}}</h2>
                        <span>￥{{auditedAmount}}</span>
                    </van-col>
                    <van-col class="orderstatus textright" span="10">{{unable[orderStatus]}}</van-col>
                </van-row>
                </router-link>
                <split></split>
                <router-link to="/progress/order" v-if="orderStatus== 4">
                <van-row class="order-progress whitebg" type="flex" justify="space-between" @click="toDetail">
                    <van-col class="pro-name" span="18">
                        <h2>还款计划</h2>
                        <span>{{time}} | 应还金额 {{loanamount}}</span>
                    </van-col>
                    <van-col class="orderstatus textright" span="6">{{orderStatus}}</van-col>
                </van-row>
                </router-link>
                <split></split>
                <router-link to="/progress/record">
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
import { HomeStatus, baseInfo,isNewMsg } from "@/util/axios.js";
import { formateTime, setItem } from "@/util/util.js";


export default {
  data() {
    return {
      money: "",
      productName: "",
      auditedAmount: "",
      unable: {
        3: "待签约",
        4: "待还款"
      },
      orderStatus: 3,
      time: new Date(),
      images: [
        require("../../assets/images/t1.jpg"),
        require("../../assets/images/t2.jpg"),
        require("../../assets/images/t3.jpg"),
        require("../../assets/images/t4.jpg")
      ],

      hasNews:false
    };
  },

  mounted() {
    // this.formateDate();
    this.init();
    this.isNewMsg();
  },
  methods: {
    init() {
      this.baseinfo();
      this.getInfo();
    },
    async getInfo() {
      let res = await HomeStatus();
      console.log(res);
      if (res.code === 200) {
        this.productName = res.data.info.productName;
        this.auditedAmount = res.data.info.auditedAmount;
        // this.orderStatus = res.data.unAble;
      }
    },
    async baseinfo() {
      let res = await baseInfo();
      console.log(res);
      if (res.code === 200) {
        this.money = res.data.priceMax;
      }
    },
    apply() {
      this.$router.push({ path: "/index/product" });
    },
    formateDate() {
      this.time = formateTime(this.time, "yyyy-MM-dd");
    },
    toDetail() {
      this.$router.push({ path: "/progress" });
    },
    //去往个人中心
    personcenter() {
      this.$router.push({ path: "/index/personcenter" });
    },
    message(){
       this.$router.push({ path: "/index/message" });
    },
    async isNewMsg(){
      let res=await isNewMsg();
      if(res.code==200){
        this.hasNews=res.data;
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
    height: rem(400px);
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
  .msg{position: relative;}
  .redmark{
    width:rem(15px);
    height:rem(15px);
    background:#FF0000;
    border-radius:50%;
    display: inline-block;
    position:absolute;
    right: rem(1px);
  }
}
</style>

