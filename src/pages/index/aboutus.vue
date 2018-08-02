<template>
    <div class="about">
        <v-header :title="title"></v-header>
        <div class="container">
           <p>芜湖市国泰小额贷款有限公司(简称“芜湖国泰”)是一家集信用
风险评估、信用数据整合、小微金融等服务为主营业务的创新型
金融综合服务机构。2016年1月在上海成立,管理总部位于深圳
市兆邦基金融大厦。
芜湖国泰致力于与银行、保险、基金信托等金融机构展开合
作,为小微企业、个体工商户以及中低收入人群提供专业、高
效、优质的小微金融服务。
秉承“诚信、责任、专业、创新、服务、共享“的核心理念,成为
小微金融行业的生力军,引领金融市场信用体系建设的发展,构
建人人诚信社会,让金融服务惠达万家。</p>
          
        </div>
        
    </div>
</template>
<script>
import { setItem } from "@/util/util.js";
export default {
  data() {
    return {
      title: "关于我们"
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.about {
  .container {
    padding-left: rem(35px);
    padding-right: rem(35px);
    margin-top: rem(20px);
    line-height: rem(55px);
    text-indent: rem(60px);
  }
}
</style>

