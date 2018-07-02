<template>
    <div class="vertify">
        <v-header title="待确认借款"></v-header>
        <div class="container">
            <div class="vertify-money wrap">
                <van-row type="flex" justify="space-between" class="vertify-tit">
                    <van-col span="18">审核后可借款金额（元）</van-col>
                    <van-col class="textright" span="6">
                        <van-icon name="question" @click="show=!show"/>
                    </van-col>
                </van-row>
                <van-dialog v-model="show" title="利息和费用组成">
                    <div class="fee-diaLog">
                        <van-row type="flex" justify="space-between">
                            <van-col span="10">借款金额</van-col>
                            <van-col class="textright" span="10">2025元</van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col span="10">咨询服务费</van-col>
                            <van-col class="textright" span="10">1350元</van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col span="10">到账金额</van-col>
                            <van-col class="textright" span="10">5400元</van-col>
                        </van-row>
                    </div>
                </van-dialog>
                <p><span class="money">20000.00</span>元</p>
            </div>
            <van-cell-group>
                <van-cell title="借贷期限" value="12个月" />
            </van-cell-group>
            <div class="btnBox">
                <van-button size="large" type="primary" @click="toSign">去签约</van-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    toSign() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/style/common.scss";
@import "../assets/style/style.scss";
.vertify {
  .vertify-money {
    background: $blue;
    margin-top: -1px;
    color: #fff;
    p {
      padding-bottom: rem(65px);
    }
    .fee-diaLog {
      color: #686868;
      padding: rem(25px) rem(60px);
      line-height: rem(55px);
    }
    .van-dialog__header {
      padding: rem(40px) 0;
      border-bottom: 1px solid $bdcolor;
      color: $blue;
    }
    .van-dialog__confirm,
    .van-dialog__confirm:active {
      color: $blue;
    }
  }
  .vertify-tit {
    padding: rem(45px) 0 rem(50px);
  }
  .money {
    font-size: rem(120px);
  }
  .van-cell__title {
    color: #686868;
  }
}
</style>
