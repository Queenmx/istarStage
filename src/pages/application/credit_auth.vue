<template>
    <div class="credit-auth">
        <v-header title="信用认证"></v-header>
        <div class="container">
            <img class="banner" src="../../assets/images/credit.png" />
            <split></split>
            <h3 class="cardtitle van-hairline--bottom wrap"><span>基础认证</span></h3>
            <ul class="wrap card">
                <li class="credit" v-for="(item,index) in baseAuth" :key="index">
                    <div @click="bindEvent(item.fieldName,item.fieldValue)">
                        <img :src="require('../../assets/images/'+item.fieldName+'.png')" />
                        <span>{{credit[item.fieldName]}}</span>
                    </div>
                </li>
            </ul> 
            <split></split>
            <h3 class="cardtitle van-hairline--bottom wrap"><span>更多认证</span></h3>
            <ul class="wrap card">
                <li class="credit" v-for="(item,index) in moreAuth" :key="index">
                    <div @click="bindEvent(item.fieldName,item.fieldValue)">
                        <img :src="require('../../assets/images/'+item.fieldName+'.png')" />
                        <span>{{credit[item.fieldName]}}</span>
                    </div>
                </li>
            </ul>
            <van-button type="primary" bottom-action>提交</van-button>
        </div>
    </div>
</template>
<script>
import { proDetail, getAuthUrl } from "@/util/axios.js";
export default {
  data() {
    return {
      credit: {
        credit_phone: "手机运营商认证",
        credit_card: "信用卡认证",
        credit_bank: "网银认证",
        credit_jd: "京东认证",
        credit_taobao: "淘宝认证",
        credit_weixin: "微信认证",
        credit_fund: "公积金认证",
        credit_zmxy: "芝麻信用认证",
        credit_asset: "资产认证"
      },
      baseAuth: [],
      moreAuth: [],
      productId: this.$route.query.productId
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    bindLink(url) {
      this.$router.push({ path: url });
    },
    async bindEvent(flag, authType) {
      let data = {
        type: flag,
        authType: authType
      };
      console.log(data);
      let res = await getAuthUrl(data);
      if (res.code === 200) {
        console.log(res);
        // location.href = res.data;
      } else {
        this.$toast(res.msg);
      }
    },
    async init() {
      let data = {
        productId: this.productId,
        type: "auth"
      };
      let res = await proDetail(data);
      console.log(res);
      if (res.code == 200) {
        this.baseAuth = res.data.baseAuth;
        this.moreAuth = res.data.moreAuth;
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.credit-auth {
  .banner {
    width: 100%;
    margin-top: -1px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-top: rem(60px);
    .credit {
      flex-wrap: wrap;
      width: rem(223px);
      height: rem(230px);
      text-align: center;
      img {
        display: block;
        width: rem(110px);
        height: rem(110px);
        margin: 0 auto rem(30px);
      }
      span {
        font-size: rem(24px);
        color: $lightGrey;
      }
    }
  }
  .van-button--primary {
    border: none;
  }
}
</style>
