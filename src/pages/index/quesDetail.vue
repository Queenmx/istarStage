<template>
    <div class="quesDetail">
        <v-header :title="title"></v-header>
        <div class="container">
           <h4>如何还款</h4>
            <p>万融汇上的产品目前均由第三方资方进行发布（代理），申请贷款需要经过第三方资方的电话审核或者相关资方的网页服务和数据审核。</p>
        </div>
        
    </div>
</template>
<script>
import {  setItem } from "@/util/util.js";
export default {
  data() {
    return {
      title:'问题详情',
      
    };
  },
  mounted() {
    
  },
  methods: {
   
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.quesDetail {
  padding-top: rem(50px);
  
  .container{
    text-align: center;
    padding-left: rem(35px);
    padding-right: rem(35px);
    h4{
      height:rem(100px);
      line-height:rem(100px);
    }
    p{text-align: justify;}
  }
  
}
</style>

