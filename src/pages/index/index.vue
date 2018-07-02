<template>
    <div class="index">
        <v-header>
            <i slot="left"><van-icon name="contact" /></i>
            <i slot="right"><van-icon name="chat" /></i>
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
                        <van-button size="large" type="primary" @click="apply">立即申请</van-button>
                    </div>
                </div>
                <split></split>
                <router-link to="/verify">
                <van-row class="order-progress whitebg" type="flex" justify="space-between">
                    <van-col class="pro-name" span="10">
                        <h2>星分期</h2>
                        <span>￥{{loanamount}}</span>
                    </van-col>
                    <van-col class="orderstatus textright" span="10">{{orderStatus}}</van-col>
                </van-row>
                </router-link>
                <split></split>
                <router-link to="/progress/order">
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
import { formateTime, setItem } from "@/util/util.js";
export default {
  data() {
    return {
      money: "20000",
      loanamount: "20000.00",
      orderStatus: "待签约",
      time: new Date(),
      images: [
        require("../../assets/images/t1.jpg"),
        require("../../assets/images/t2.jpg"),
        require("../../assets/images/t3.jpg"),
        require("../../assets/images/t4.jpg")
      ]
    };
  },
  mounted() {
    this.formateDate();
  },
  methods: {
    apply() {
      this.$router.push({ path: "/index/product" });
    },
    formateDate() {
      this.time = formateTime(this.time, "yyyy-MM-dd");
    },
    toDetail() {
      this.$router.push({ path: "/progress" });
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
}
</style>

