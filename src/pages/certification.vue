<template>
    <div class="setpsd wrap container">
        <v-header title="实名认证"><i slot="left"></i></v-header>
        <split></split>
        <van-cell-group>
            <van-field label="姓名" placeholder="请填写真实姓名"  v-model="name"  />
        </van-cell-group>
        <van-cell-group>
            <van-field label="身份证号" placeholder="请填写身份证号"  v-model="idCard"  />
        </van-cell-group>
        <div class="btnBox">
            <van-button size="large" type="primary">提交</van-button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      idCard: ""
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
