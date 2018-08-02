<template>
    <div class="setting">
        <v-header :title="title"></v-header>
        <div>
           <section>
              <van-cell-group >
                  <van-cell title="账户" class="phonenum" :value="userInfo.cusPhone" />
              </van-cell-group>
              
              <router-link class="wrap" v-for="(item,index) in moreInfo" :key="index" :to="item.url">
                  <van-cell-group>
                     <van-cell :title="item.title" is-link />
                  </van-cell-group>    
              </router-link>
          </section>
        </div>        
    </div>
</template>
<script>
import { setItem, getItem } from "@/util/util.js";
export default {
  data() {
    return {
      title: "安全设置",
      userInfo: getItem("userInfo"),
      moreInfo: [
        { title: "修改登录密码", url: "/index/respwd" }
        // { title: "更改手机号码", url: "/index/changetel" },
      ]
    };
  },
  mounted() {},
  methods: {
    exit() {
      delItem("userInfo");
      delItem("api_token");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.setting {
  padding-top: rem(95px);
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
  .phonenum {
    .van-cell__value {
      color: #2680e6;
    }
  }

  .icon-right {
    @include icon(20px, 38px);
    background-image: url("../../assets/images/right.png");
  }

  a {
    padding: 0;
  }
}
</style>
<style lang="scss">
.phonenum {
  .van-cell__value {
    color: #2680e6;
  }
}
</style>


