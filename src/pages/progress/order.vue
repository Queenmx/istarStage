<template>
    <div class="order">
        <v-header title="借款详情"></v-header>
        <div class="container">
            <div class="order-h wrap">
                <van-row type="flex" justify='space-between'>
                    <van-col span="10">待绑卡</van-col>
                    <van-col class="textright" span="10">
                        <van-button>绑卡</van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.order {
  .order-h {
    background: $blue;
    color: #fff;
  }
}
</style>


