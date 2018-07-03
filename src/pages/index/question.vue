<template>
    <div class="my">
        <v-header :title="title"></v-header>
        <div>
           <section>
              <router-link class="wrap flex item" v-for="(item,index) in moreInfo" :key="index" :to="item.url">
                  <span class="rest title black">{{item.title}}</span>
                  <i class="icon-right"></i>     
              </router-link>
          </section>
        </div>
        
    </div>
</template>
<script>
import {  setItem } from "@/util/util.js";
export default {
  data() {
    return {
      title:'常见问题',
      moreInfo: [
        { title: "如何申请借款", url: "/index/quesDetail" },
        { title: "如何还款", url: "" },
       
        
      ],
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
.my {
  padding-top: rem(95px);
  background: #f8f8f8;
  box-sizing: border-box;
  .item {
    height: rem(144px);
    font-size: rem(32px);
    // border-bottom: rem(1px) solid $bdcolor;
    background: #fff;   
    .black {
      color: #464646;
    }
  }

  .icon-right {
    @include icon(20px,38px);
    background-image: url("../../assets/images/right.png");
  }

}
</style>

