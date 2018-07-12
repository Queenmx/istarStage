<template>
    <div class="success">
        <v-header title="申请结果"></v-header>
        <div class="container">
            <img src="../assets/images/success.png" />
            <span class="hint">操作成功！</span>
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
      type: this.$route.query.type
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.type);
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


