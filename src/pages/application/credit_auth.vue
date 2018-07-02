<template>
    <div class="credit-auth">
        <v-header title="信用认证"></v-header>
        <div class="container">
            <img class="banner" src="../../assets/images/credit.png" />
            <split></split>
            <h3 class="cardtitle van-hairline--bottom wrap"><span>基础认证</span></h3>
            <ul class="wrap card">
                <li class="credit" v-for="(item,index) in creditList.baseAuth" :key="index">
                    <div @click="bindEvent(item.name)">
                        <img :src="require('../../assets/images/'+item.name+'.png')" />
                        <span>{{credit[item.name]}}</span>
                    </div>
                </li>
            </ul> 
            <split></split>
            <h3 class="cardtitle van-hairline--bottom wrap"><span>更多认证</span></h3>
            <ul class="wrap card">
                <li class="credit" v-for="(item,index) in creditList.moreAuth" :key="index">
                    <div @click="bindEvent(item.name)">
                        <img :src="require('../../assets/images/'+item.name+'.png')" />
                        <span>{{credit[item.name]}}</span>
                    </div>
                </li>
            </ul>
            <van-button type="primary" bottom-action>提交</van-button>
        </div>
    </div>
</template>
<script>
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
      creditList: {
        baseAuth: [
          {
            name: "credit_phone",
            field_value: "tianji"
          },
          {
            name: "credit_card",
            field_value: "tianji"
          },
          {
            name: "credit_bank",
            field_value: "tianji"
          }
        ],
        moreAuth: [
          {
            name: "credit_jd",
            field_value: "tianji"
          },
          {
            name: "credit_taobao",
            field_value: "tianji"
          },
          {
            name: "credit_fund",
            field_value: "tianji"
          },
          {
            name: "credit_asset",
            field_value: "tianji"
          }
        ]
      }
    };
  },
  methods: {
    bindLink(url) {
      this.$router.push({ path: url });
    },
    bindEvent(flag) {
      console.log(flag);
      if (flag === "credit_phone") {
        this.bindLink("/application/1");
      } else if (flag === "credit_card") {
        this.bindLink("/application/2");
      } else if (flag === "credit_bank") {
        this.bindLink("/application/3");
      } else if (flag === "credit_jd") {
        this.bindLink("/application/4");
      } else if (flag === "credit_taobao") {
        this.bindLink("/application/5");
      } else if (flag === "credit_weixin") {
        this.bindLink("/application/6");
      } else if (flag === "credit_fund") {
        this.bindLink("/application/7");
      } else if (flag === "credit_zmxy") {
        this.bindLink("/application/8");
      } else if (flag === "credit_asset") {
        this.bindLink("/application/assetsPage");
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
}
</style>
