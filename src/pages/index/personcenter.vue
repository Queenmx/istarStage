<template>
    <div class="my">
        <!-- <v-header :title="title"></v-header> -->
        <div class="wrap flex header">
          <div class="left">            
            <van-icon name="arrow-left" @click="back"/>            
          </div>
          <div class="rest ellipsis title">{{title}}</div>
          <div class="right"></div>
        </div>
        <div>
           <section>
              <router-link class="wrap flex item" v-for="(item,index) in moreInfo" :key="index" :to="item.url">
                  <span class="rest title black">{{item.title}}</span>
                  <i class="icon-right"></i>     
              </router-link>
              <!-- <div class="wrap flex item" >
                  <span class="rest title black">当前版本</span>
                  <span class="">v1.0</span>     
              </div> -->
          </section>          
        </div>
        <p class="telphone">客服电话：400-066-5655</p>
    </div>
</template>
<script>
import {  setItem } from "@/util/util.js";
export default {
  data() {
    return {
      title:'个人中心',
      moreInfo: [
        { title: "安全设置", url: "/index/setting" },
        { title: "常见问题", url: "/index/question" },
        // { title: "分享好友", url: "" },
        { title: "意见反馈", url: "/index/opinion" },
        { title: "关于我们", url: "/index/aboutus" },
        // { title: "当前版本", url: "" },
        
      ],
    };
  },
  mounted() {
    
  },
  methods: {
   back(){
     this.$router.push({ path: "/"});
   }
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
  .telphone{
    color:#767676;
    font-size:rem(28px);
    text-align:center;
    width: 100%;
    position:absolute;
    bottom:rem(64px);
  }
  .header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: rem(95px);
  text-align: center;
  font-size: rem(36px);
  color: #fff;
  background: $blue;
  z-index: 100;
  .left,
  .right {
    width: rem(110px);
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  //   .left {
  //     padding-left: rem(10px);
  //     padding-right: rem(15px);
  //   }
  //   .right {
  //     padding-left: rem(15px);
  //     padding-right: rem(10px);
  //   }
  .arrow-left {
    font-size: rem(30px);
    color: #fff;
  }
}
}
</style>

