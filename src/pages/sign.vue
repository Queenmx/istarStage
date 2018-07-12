<template>
    <div class="sign wrap">
        <div class="logo">LOGO</div>
        <div class="sign-input">
            <van-cell-group>
                <van-field placeholder="请输入手机号码" left-icon="contact" v-model="phone" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
                <van-button slot="button" size="small" type="primary" @click="settime()" class="settime" :disabled="isDisable">{{msg}}</van-button>
            </van-field>
            </van-cell-group>
        </div>
        <div class="btnBox">
            <van-button size="large" type="primary" @click="register">注册</van-button>
            <van-button size="large" type="primary" @click="toLogin">已有账号，去登录</van-button>
        </div>
    </div>
</template>
<script>
import { sendValidateCode,registerByCusPhone } from "@/util/axios";
import {  setItem } from "@/util/util.js";

export default {
  data() {
    return {
      phone: "",
      sms: "",
      count: "",
      timer: null,
      msg: "发送验证码",
      isDisable: false
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    settime() {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phone)) {
        this.$toast("请输入正确的手机号码");
        return false;
      }
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
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
        this.sendValidateCode();
      }
    },
    register(){
      if(this.phone){
        if(this.sms){
          this.registerByCusPhone();
        }else{
          this.$toast("请输入验证码");
        }
      }else{
        this.$toast("请输入手机号");
      }
    },
    //发送验证码接口
    async sendValidateCode(){
      let data={
        cusPhone:this.phone
      }
      let res = await sendValidateCode(data);
      this.$toast(res.msg);      
    },
    //注册接口
    async registerByCusPhone(){
      let data={
        cusPhone:this.phone,
        cusCode:this.sms
      }
      let res = await registerByCusPhone(data);
      if(res.code==200){
        this.$toast(res.msg); 
        // const temp=Object.assign(data,{cusId:res.data});
        
        setItem("userInfo",data);
        this.$router.push({ path: "/setpsd"});
      }else{
        this.$toast(res.msg); 
      }
           
    },
  }
};
</script>
<style lang="scss">
@import "../assets/style/common.scss";
@import "../assets/style/style.scss";
.logo {
  width: rem(300px);
  height: rem(300px);
  line-height: rem(300px);
  margin: 0 auto;
  text-align: center;
  font-size: rem(36px);
}
.sign-input {
  width: rem(550px);
}
.sign {
  .van-tabs__nav--card .van-tab.van-tab--active {
    background: $blue;
    color: #fff;
  }
  .van-tabs__nav--card .van-tab {
    border-right: 1px solid $blue;
    color: $blue;
    line-height: rem(70px);
  }
  .van-tabs__nav--card {
    border: 1px solid $blue;
  }
  .van-tabs--card .van-tabs__wrap,
  .van-tabs__nav--card {
    height: rem(70px);
  }
  .sign-input {
    width: rem(640px);
    margin: 0 auto;
    background: #fff;
    @include box-shadow(0 12px 15px rgba(0, 0, 0, 0.1));
    border-radius: rem(10px);
  }
  .van-tabs__nav--card {
    margin: 0;
  }
  .van-tabs__content {
    width: rem(550px);
    margin: rem(20px) auto;
  }
  .van-cell {
    padding: 20px 15px;
  }
}
</style>