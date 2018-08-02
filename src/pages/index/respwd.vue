<template>
    <div class="change-pwd">
        <v-header :title="title"></v-header>
        <form action="" onsubmit="return false">
          <van-cell-group>
              <van-field label="旧密码" v-model.trim="oldPwd" :type="isSeeOld?'text':'password'" placeholder="请填写原密码" :icon="isSeeOld?'password-view':'password-not-view'" @click-icon="isSeeOld=!isSeeOld" />
              <van-field label="新密码" v-model.trim="newPwd" :type="isSeeNew?'text':'password'" placeholder="请填写新密码" :icon="isSeeNew?'password-view':'password-not-view'" @click-icon="isSeeNew=!isSeeNew" />
              <van-field label="新密码" v-model.trim="resNewPwd" :type="isAgain?'text':'password'" placeholder="请再次填写新密码" :icon="isAgain?'password-view':'password-not-view'" @click-icon="isAgain=!isAgain" />
          </van-cell-group>
          <div class="apply">
              <van-button size="large" type="primary" class="btn" @click="updatePwd">提交</van-button>
          </div>
      </form>       
    </div>
</template>
<script>
import { setItem, delItem, getItem } from "@/util/util.js";
import { updatePwd } from "@/util/axios";
export default {
  data() {
    return {
      title: "修改登录密码",
      userInfo: getItem("userInfo"),
      oldPwd: "",
      newPwd: "",
      resNewPwd: "",
      isSeeOld: false,
      isSeeNew: false,
      isAgain: false
    };
  },
  mounted() {},
  methods: {
    async updatePwd() {
      var that = this;
      let data = {
        cusPassword: this.oldPwd,
        newPwd: this.newPwd
      };
      if (this.oldPwd.trim() === "") {
        this.$toast("请输入旧密码");
      } else if (this.newPwd.trim() === "") {
        this.$toast("请输入新密码");
      } else if (this.newPwd != this.resNewPwd) {
        this.$toast("新密码输入不一致");
      } else {
        let res = await updatePwd(data);
        if (res.code == 200) {
          this.$toast(res.msg);
          setTimeout(function() {
            that.$router.push({ path: "/index/personcenter" });
          }, 2000);
        } else {
          this.$toast(res.msg);
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.change-pwd {
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

