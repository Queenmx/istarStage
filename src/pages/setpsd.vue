<template>
    <div class="setpsd wrap container">
        <v-header title="设置密码"></v-header>
        <split></split>
        <van-cell-group>
            <van-field  type="password" placeholder="请输入密码（密码为6-16位，字母+数字组合）"  v-model="psd" />
        </van-cell-group>
        <van-cell-group>
            <van-field  type="password" placeholder="请再次输入密码"  v-model="repsd" />
        </van-cell-group>
        <div class="btnBox">
            <van-button size="large" type="primary">确定</van-button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      psd: "",
      repsd: ""
    };
  }
};
</script>
<style lang="scss">
@import "../assets/style/common.scss";
@import "../assets/style/style.scss";
.setpsd .van-cell {
  padding: rem(30px) rem(15px);
}
</style>
