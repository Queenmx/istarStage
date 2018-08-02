<template>
    <div class="my">
        <v-header :title="title"></v-header>
        <router-link class="wrap" v-for="(item,index) in moreInfo" :key="index" :to="item.url">
            <van-cell-group>
                <van-cell :title="item.title" is-link  />
            </van-cell-group>     
        </router-link>
        <div class="apply">
              <van-button size="large" type="primary" @click="exit">退出登录</van-button>
          </div>
        <p class="telphone">客服电话：400-066-5655</p>
    </div>
</template>
<script>
import { setItem, delItem } from "@/util/util.js";
export default {
  data() {
    return {
      title: "个人中心",
      moreInfo: [
        { title: "安全设置", url: "/index/setting" },
        { title: "常见问题", url: "/index/question" },
        // { title: "分享好友", url: "" },
        { title: "意见反馈", url: "/index/opinion" },
        { title: "关于我们", url: "/index/aboutus" }
        // { title: "当前版本", url: "" },
      ]
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$router.push({ path: "/" });
    },
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
.my {
  padding-top: rem(95px);
  box-sizing: border-box;
  .telphone {
    color: #767676;
    font-size: rem(28px);
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: rem(64px);
  }
  .apply {
    margin-top: rem(160px);
  }
  a {
    padding: 0;
  }
}
</style>

