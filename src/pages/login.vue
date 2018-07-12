<template>
<div class="login wrap">
    <div class="logo">LOGO</div>
    <van-row type="flex" justify="center">
        <van-col span="24">
            <van-tabs class="loginTabs" v-model="active" type="card" swipeable>
                <van-tab title="账号登录">
                    <van-cell-group>
                        <van-field placeholder="请输入手机号码" left-icon="contact" v-model="phone" />
                    </van-cell-group>
                    <van-cell-group>
                        <van-field  :type="isSee?'text':'password'" placeholder="请输入密码" :left-icon="isSee?'password-view':'password-not-view'" v-model="psd" @click="isSee=!isSee"/>
                    </van-cell-group>
                </van-tab>
                <van-tab title="验证码登录">
                    <van-cell-group>
                        <van-field placeholder="请输入手机号码" left-icon="contact" v-model="phone" />
                    </van-cell-group>
                    <van-cell-group>
                        <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
                            <van-button slot="button" size="small" type="primary" @click="settime()" class="settime" :disabled="isDisable">{{msg}}</van-button>
                        </van-field>
                    </van-cell-group>
                </van-tab>
            </van-tabs> 
        </van-col>
    </van-row>
    <router-link class="forget inblock" to="/forget">忘记密码</router-link>
    <div class="btnBox">
        <van-button size="large" type="primary" @click="login">登录</van-button>
        <van-button size="large" type="primary" @click="sign">注册</van-button>
    </div>
    
</div>
</template>


<script>
import { getUser,sendValidateCode,loginByCode } from "@/util/axios";
import {  setItem } from "@/util/util.js";
export default {
  data() {
    return {
      active: 2,
      tabTag: ["账号登录", "验证码登录"],
      sms: "",//验证码
      psd: "",
      phone: "",
      show: true,
      count: "",
      timer: null,
      msg: "发送验证码",
      isDisable: false,
      isSee:false
    };
  },
  methods: {
    sign() {
      this.$router.push({ path: "/sign" });
    },
    //发送验证码
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
        this.sendValidateCode();
      }
    },
    login(){      
      if(this.phone){
        if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phone)) {
          this.$toast("请输入正确的手机号码");
          return false;
        }        
        if(this.active==0){//密码登录
          if(this.psd){
            this.loginpsd();
          }else{
            this.$toast("密码不能为空")
          }                   
        }else{//验证码登录
          if(this.sms){
            this.loginByCode();
          }else{
            this.$toast("验证码不能为空")
          }          
        }       
      }else{
        this.$toast("请输入手机号码");
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
    //密码登录
    async loginpsd(){
      let data={
        cusPhone:this.phone,
        cusPassword:this.psd
      }
      let res = await getUser(data);
      if(res.code==200){        
        setItem("api_token",res.data.token);
        setItem('userInfo',data)
        this.$router.push({ path: "/"});
      }else{
        this.$toast(res.msg)
      }
    },
    //验证码登录
    async loginByCode(){
      let data={
        cusPhone:this.phone,
        cusCode:this.sms
      }
      let res = await loginByCode(data);
      if(res.code==200){        
        setItem("api_token",res.data.token);
        setItem('userInfo',data);
        this.$router.push({ path: "/"});
      }else{
        this.$toast(res.msg);
      }
    }
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
.forget {
  width: rem(640px);
  text-align: right;
  color: $blue;
  font-size: rem(30px);
}
.login {
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
  .loginTabs {
    width: rem(640px);
    margin: 0 auto;
    background: #fff;
    // border:1px solid $blue;
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
    padding: rem(30px) rem(15px);
  }
  //   .van-hairline--top-bottom::after {
  //     border-width: 0;
  //   }
}
</style>

