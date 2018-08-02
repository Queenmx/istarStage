<template>
    <div class="change-pwd">
        <v-header :title="title"></v-header>
        <form action="" onsubmit="return false">
          <div class="wrap flex item">
              <span class="title">手机号码</span>
              <div class="rest input-wrap"><input type='tel' v-model="phone" placeholder="请输入新的手机号码"></div>
          </div>
          <div class="wrap flex item">
              <span class="title">验证码</span>
              <div class="rest input-wrap"><input type='text' v-model="sms" placeholder="请输入验证码"></div>
              <van-button slot="button" size="small" type="primary" @click="settime()" class="settime" :disabled="isDisable">{{msg}}</van-button>
          </div>
          
          <div class="apply">
              <van-button size="large" type="primary" class="btn" @click="changetel">提交</van-button>
          </div>
      </form>       
    </div>
</template>
<script>
import { setItem, delItem, getItem } from "@/util/util.js";
import {} from "@/util/axios";
export default {
  data() {
    return {
      title: "修改手机号码",
      userInfo: getItem("userInfo"),
      phone: "",
      sms: "",
      count: "",
      show: true,
      timer: null,
      msg: "发送验证码",
      isDisable: false
    };
  },
  mounted() {},
  methods: {
    changetel() {
      if (!this.phone || !this.sms) {
        this.$toast("请输入手机号或验证码");
      } else {
        this.$toast("你想修改手机号码？？？？还是专一点吧");
      }
    },
    settime() {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phone)) {
        this.$toast("请输入正确的手机号码");
        return false;
      }
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.msg = this.count + "s后重新发送";
            this.isDisable = true;
          } else {
            this.isDisable = false;
            this.msg = "发送验证码";
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.change-pwd {
  padding-top: rem(95px);
  background: #f8f8f8;
  box-sizing: border-box;
  .item {
    height: rem(144px);
    font-size: rem(32px);
    // border-bottom: rem(1px) solid $bdcolor;
    .title {
      // margin-right: rem(93px);
      display: inline-block;
      width: rem(216px);
      color: #686868;
      font-size: rem(30px);
    }
  }
  .btn {
    margin-top: rem(85px);
    font-size: rem(32px);
    color: #fff;
    background: $blue;
  }
  .icon {
    margin-left: rem(15px);
    color: #d8d9dd;
  }
  .input-wrap {
    input {
      width: 100%;
      font-size: rem(32px);
      border: none;
      background: #f8f8f8;
      &::-webkit-input-placeholder {
        color: #bbbbbb;
        font-size: rem(28px);
      }
      &::-moz-placeholder {
        color: #bbbbbb;
        font-size: rem(28px);
      }
      &::-moz-placeholder {
        color: #bbbbbb;
        font-size: rem(28px);
      }
      &::-ms-input-placeholder {
        color: #bbbbbb;
        font-size: rem(28px);
      }
    }
  }
}
</style>

