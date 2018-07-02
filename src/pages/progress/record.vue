<template>
    <div class="record">
        <v-header title="借款记录"></v-header>
        <split></split>
        <div class="container">
            <ul class="card wrap record-ul">
                <li class="van-hairline--bottom" v-for="(item,index) in product" :key="index">
                    <van-row>
                        <van-col span="4">
                            <img class="pro-icon" src="../../assets/images/payments.png" />
                        </van-col>
                        <van-col span="10">
                            <p class="name">{{item.name}}</p>
                            <span class="time">{{item.time}}</span>
                        </van-col>
                        <van-col class="textright" span="10">
                            <p :class="{status,'green':item.status=='3','orange':item.status =='2','red':item.status=='4'}">{{status[item.status]}}</p>
                            <span class="money">￥{{item.value}}</span>
                        </van-col>
                    </van-row>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      status: {
        0: "审核中",
        1: "待放款",
        2: "待还款",
        3: "已结清",
        4: "逾期"
      },
      product: [
        {
          name: "星分期",
          time: "2018-05-28",
          status: "0",
          value: "6000.00"
        },
        {
          name: "星分期",
          time: "2018-05-28",
          status: "1",
          value: "6000.00"
        },
        {
          name: "星分期",
          time: "2018-05-28",
          status: "2",
          value: "6000.00"
        },
        {
          name: "星分期",
          time: "2018-05-28",
          status: "3",
          value: "6000.00"
        },
        {
          name: "星分期",
          time: "2018-05-28",
          status: "4",
          value: "6000.00"
        }
      ]
    };
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


