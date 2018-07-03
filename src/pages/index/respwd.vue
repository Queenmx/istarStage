<template>
    <div class="change-pwd">
        <v-header :title="title"></v-header>
        <form action="" onsubmit="return false">
          <div class="wrap flex item">
              <span class="title">旧密码</span>
              <div class="rest input-wrap"><input :type="isSeeOld?'text':'password'" v-model="oldPwd" placeholder="请填写原密码"></div>
              <van-icon :name="isSeeOld?'password-view':'password-not-view'" class="icon" @click="isSeeOld=!isSeeOld"/>
          </div>
          <div class="wrap flex item">
              <span class="title">新密码</span>
              <div class="rest input-wrap"><input :type="isSeeNew?'text':'password'" v-model="newPwd" placeholder="请填写新密码"></div>
              <van-icon :name="isSeeNew?'password-view':'password-not-view'" class="icon"  @click="isSeeNew=!isSeeNew"/>
          </div>
          <div class="wrap flex item">
              <span class="title">确认新密码</span>
              <div class="rest input-wrap"><input :type="isAgain?'text':'password'" v-model="resNewPwd" placeholder="请再次填写新密码"></div>
              <van-icon :name="isAgain?'password-view':'password-not-view'" class="icon"  @click="isAgain=!isAgain"/>
          </div>
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
      var that=this;
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
        if(res.code==200){
          this.$toast(res.msg);
          setTimeout(function(){
            that.$router.push({ path: "/index/personcenter"});
          },2000)
          
        }
        
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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

