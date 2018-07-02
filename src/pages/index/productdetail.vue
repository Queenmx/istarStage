<template>
    <div class="detail">
        <v-header></v-header>
        <split></split>
        <keep-alive>
            <div class="container wrap">
                <div class="feedetail card">
                    <h4>费用说明</h4>
                    <p>
                        <b>费用说明</b>
                        <span>综合月费率：3％，包括：借款年利率：13．5％、管理费年化13．5％（第一期还款时收取）、咨询服务费年化9％（提现到银行卡中扣除）。该产品12期共360天，每期为30天。</span>
                    </p>
                    <p>
                        <b>举例：借3000元，实际到账：2730元</b>
                        <span>
                            第一期还款：900（本金）＋405（管理费）＋33．75（利息）= 1338．75元<br> 
                            第二、三期还款：900（本金）＋33．75（利息）= 933．75元<br>
                            第四-十二期还款：33．33（本金）＋33．75（利息）= 67．083元
                        </span>
                    </p> 
                </div>
            </div>
            
        </keep-alive>
    </div>
</template>
<style lang="scss">
@import "../../assets/style/common.scss";
.feedetail {
  line-height: rem(60px);
  h4 {
    font-weight: 600;
    line-height: rem(100px);
  }
}
</style>