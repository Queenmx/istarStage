<template>
    <div class="quesDetail">
        <v-header :title="title"></v-header>
        <div class="container card">
           <h4>申请借款</h4>
            <p>第一步：下载星分期APP注册登录 <br>第二步：填写个人信息，上传身份证件，信用认证信息 <br>第三步：提交认证，等待审核结果<br> 第四步：审核通过，签约合同放款。</p>
        </div>
        
    </div>
</template>
<script>
import { setItem } from "@/util/util.js";
export default {
  data() {
    return {
      title: "问题详情"
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.quesDetail {
  .container {
    text-align: center;
    padding-left: rem(35px);
    padding-right: rem(35px);
    h4 {
      height: rem(100px);
      line-height: rem(100px);
    }
    p {
      text-align: justify;
      padding: rem(40px) 0;
    }
  }
}
</style>

