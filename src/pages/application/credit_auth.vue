<template>
    <div class="credit-auth">
        <v-header title="信用认证">
            <!-- <i slot="left"><van-icon name="arrow-left" @click='index'/></i> -->
        </v-header>
        <van-pull-refresh v-model="loading" @refresh="onRefresh" :loading-text="loadtext">
        <div class="container">
            <img class="banner" src="../../assets/images/credit.png" />
            <split></split>
            <h3 class="cardtitle van-hairline--bottom wrap"><span>基础认证</span></h3>
            <ul class="wrap card">
                <li class="credit" v-for="(item,index) in baseAuth" :key="index">
                    <div @click="bindEvent(item.fieldName,item.fieldValue)">
                        <img class="verifi-class" :src="require('../../assets/images/'+item.fieldName+'.png')" />
                        <span>{{credit[item.fieldName]}}</span>
                        <img class="verifi-sign" :src="imgSrc(item.remark)">
                    </div>
                </li>
            </ul> 
            <split></split>
            <div v-show="moreAuth">
                <h3 class="cardtitle van-hairline--bottom wrap" ><span>更多认证</span></h3>
                <ul class="wrap card">
                    <li class="credit" v-for="(item,index) in moreAuth" :key="index">
                        <div @click="bindEvent(item.fieldName,item.fieldValue)">
                            <img class="verifi-class" :src="require('../../assets/images/'+item.fieldName+'.png')" />
                            <span>{{credit[item.fieldName]}}</span>
                            <img class="verifi-sign" :src="imgSrc(item.remark)">
                        </div>
                    </li>
                </ul>
            </div>
            
            
        </div>
        </van-pull-refresh>
        <van-button bottom-action type="primary" @click="creditBtn">提交</van-button>
    </div>
</template>
<script>
import { getAuthUrl, creditAuth, creditConfirm } from "@/util/axios.js";
export default {
  data() {
    return {
      credit: {
        credit_phone: "手机运营商认证",
        credit_card: "信用卡邮箱认证",
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
      productId: this.$route.query.productId,
      loadtext: "加载中",
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    bindLink(url) {
      this.$router.push({ path: url });
    },
    imgSrc(flag) {
      if (flag == 0) {
        return require("../../assets/images/unverified.png");
      } else if (flag == 1) {
        return require("../../assets/images/verified.png");
      } else {
        return require("../../assets/images/sandclock.png");
      }
    },
    index() {
      this.$router.push({ path: "/index/product" });
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
        location.href = res.data;
      } else {
        this.$toast(res.msg);
      }
    },
    async init() {
      let data = {
        productId: this.productId,
        type: "auth"
      };
      let res = await creditAuth(data);
      console.log(res);
      if (res.code == 200) {
        this.baseAuth = res.data.baseAuth;
        this.moreAuth = res.data.moreAuth;
      }
    },
    async creditBtn() {
      let res = await creditConfirm();
      console.log(res);
      if (res.code == 200) {
        this.index();
      } else {
        this.$toast("你还有未完成的认证，请先完成认证");
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.loading = false;
      }, 500);
      this.init();
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
      position: relative;
      .verifi-class {
        display: block;
        width: rem(110px);
        height: rem(110px);
        margin: 0 auto rem(30px);
      }
      span {
        font-size: rem(24px);
        color: $lightGrey;
      }
      .verifi-sign {
        position: absolute;
        top: rem(60px);
        right: rem(40px);
        width: rem(40px);
        height: rem(40px);
      }
    }
  }
  .van-button--primary {
    border: none;
  }
  .van-pull-refresh {
    overflow: visible;
  }
}
</style>
