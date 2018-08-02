<template>
    <div class="quesDetail">
        <v-header :title="title"></v-header>
        <div class="container card">
           <h4>如何还款</h4>
            <p>自动还款：您在还款日之前足额存入绑定的银行卡，合作银行将按时自动扣划。<br/>手动还款：可通过银行卡进行手动还款，具体操作请登录App还款界面。 </p>
        </div>
        
    </div>
</template>
<script>
import { setItem } from "@/util/util.js";
export default {
  data() {
    return {
      title: "如何还款"
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
  padding-top: rem(95px);
  .container {
    text-align: center;
    padding-bottom: rem(35px);
    padding-left: rem(35px);
    padding-right: rem(35px);
    h4 {
      height: rem(100px);
      line-height: rem(100px);
    }
    p {
      text-align: justify;
    }
  }
}
</style>

