<template>
    <div class="setting">
        <v-header :title="title"></v-header>
        <div>
           <section>
             <div class="wrap flex item">
                  <span class="rest title black">账户</span>
                  <span class="phonenum">{{userInfo.phone}}</span>     
              </div>
              <router-link class="wrap flex item" v-for="(item,index) in moreInfo" :key="index" :to="item.url">
                  <span class="rest title black">{{item.title}}</span>
                  <i class="icon-right"></i>     
              </router-link>
          </section>
          <div class="apply">
              <van-button size="large" type="primary" @click="exit">退出登录</van-button>
          </div>
        </div>        
    </div>
</template>
<script>
import {  setItem,delItem,getItem } from "@/util/util.js";
export default {
  data() {
    return {
      title:'安全设置',
      userInfo: getItem("userInfo"),
      moreInfo: [
        { title: "修改登录密码", url: "/index/respwd" },
        { title: "更改手机号码", url: "/index/changetel" },
        
        
      ],
    };
  },
  mounted() {
    
  },
  methods: {
   exit(){
      // delItem("userInfo");
      this.$router.push({ path: "/login" });
   }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.setting {
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
    .phonenum{color:#2680e6;}
  }

  .icon-right {
    @include icon(20px,38px);
    background-image: url("../../assets/images/right.png");
  }
  .apply{
    margin-top:rem(160px);
    // .van-button--primary{
    //   background:#0074e4;
    //   border:none;
    // }
  }
}
</style>

