<template>
    <div class="record">
        <v-header title="借款记录"></v-header>
        <split></split>
        <div class="container">
            <ul class="card wrap record-ul">
                <li class="van-hairline--bottom" v-for="(item,index) in product" :key="index" @click="Detail(item)">
                    <van-row>
                        <van-col span="4">
                            <img class="pro-icon" src="../../assets/images/payments.png" />
                        </van-col>
                        <van-col span="10">
                            <p class="name">{{item.productName}}</p>
                            <span class="time">{{item.applyTime | Timeformate}}</span>
                        </van-col>
                        <van-col class="textright" span="10">
                            <p :class="{status,'green':status[item.flowFlag]=='16','orange':status[item.flowFlag] =='12','red':status[item.flowFlag]=='14'}">{{item.flowFlag}}</p>
                            <span class="money">{{item.applyPrice |moneyFormat}}</span>
                        </van-col>
                    </van-row>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { loanRecord } from "@/util/axios.js";
import { formateTime } from "@/util/util.js";
export default {
  data() {
    return {
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
      product: []
    };
  },
  filters: {
    Timeformate(val) {
      let date = new Date(val * 1000);
      return val ? formateTime(date, "yyyy-MM-dd") : "----/--/--";
    },
    moneyFormat(value) {
      let money = 0;
      value ? (money = value.toFixed(2)) : "";
      return "￥" + money;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let res = await loanRecord();
      console.log(res);
      if (res.code == 200) {
        this.product = res.data;
      }
    },
    Detail(item) {
      this.$router.push({
        path: "/progress/order",
        query: { orderId: item.orderId }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.record {
  .pro-icon {
    width: rem(73px);
    height: rem(73px);
  }
  .record-ul {
    li {
      padding-top: rem(40px);
      padding-bottom: rem(40px);
    }
    .name,
    .money {
      color: $lightBlack;
    }
    .time {
      color: $fontGrey;
      font-size: rem(24px);
    }
    .money {
      font-size: rem(24px);
    }
    .status {
      color: $blue;
    }
    .green {
      color: #00cf7a;
    }
    .orange {
      color: $orange;
    }
    .red {
      color: $red;
    }
  }
}
</style>


