<template>
    <div class="sign">
        <div class="logo">
          <span class="headicon">LOGO</span>
        </div>
        <div class="main">
          <div class="sign-input">
            <van-cell-group>
                <i class="psdicon peo"></i>
                <van-field placeholder="请输入手机号码" v-model="phone" />
            </van-cell-group>
            <van-cell-group>
                <i class="psdicon safe"></i>
                <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
                <van-button slot="button" size="small" type="primary" @click="settime()" class="settime" :disabled="isDisable">{{msg}}</van-button>
            </van-field>
            </van-cell-group>
        </div>
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
  
  height: rem(533px);
  overflow: hidden;
  margin: 0 auto;
  text-align: center;
  font-size: rem(36px);
  background-image: url("../assets/images/login-bg.png");
  background-size:100%;
  .headicon{
    display:block;
    width:rem(160px);
    height:rem(160px);
    line-height:rem(160px);
    border-radius:50%;
    background: #fff;
    margin:rem(104px) auto;
  }
}

.sign {
  position: relative;
  .btnBox{margin-top:rem(500px);}  
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
    .psdicon{
      @include icon(41px,49px);     
      position: absolute;
      top:30%;
      left:rem(30px);
      z-index: 1;
    }
    .peo{
      background-image: url("../assets/images/peo.png");
    }
    .safe{ 
      top:33%;    
      background-image: url("../assets/images/safe.png");      
    }
  }
  .main{
    position: absolute;
    top:rem(405px);
    width:100%;
  }
  .van-tabs__nav--card {
    margin: 0;
  }
  .van-tabs__content {
    width: rem(550px);
    margin: rem(20px) auto;
  }
  .van-cell {
    padding: 20px 20px 20px 45px;
  }
  .settime{background:#fff;
    color:#4c9dec;
    border-radius:rem(45px);
    padding:0 rem(30px);
  }
}
</style>