<template>
    <div class="success">
        <v-header title="操作结果"><i slot="left"><van-icon name="arrow-left" @click='index'/></i></v-header>
        <div class="container">
            <img :src="repay_result == 505 ? require('../assets/images/fail.png'):require('../assets/images/success.png')" />
            <span class="hint">{{repay_result == 505 ?'操作失败！' :'操作成功！'}}</span>
        </div>
        <router-link class="btnBox" to="/">
            <van-button size="large" type="primary">返回首页</van-button>
        </router-link>
    </div>    
</template>
<script>
export default {
  data() {
    return {
      step: this.$route.query.step,
      repay_result: this.$route.query.repay_result
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.repay_result);
      console.log(this.step);
    },
    index() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/style/common.scss";
@import "../assets/style/style.scss";
.success {
  text-align: center;
  img {
    width: rem(437px);
    height: rem(456px);
    display: block;
    margin: rem(110px) auto rem(100px);
  }
  .hint {
    font-size: rem(30px);
    color: #767676;
  }
}
</style>


