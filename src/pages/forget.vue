<template>
    <div class="setpsd wrap container">
        <v-header title="忘记密码"></v-header>
        <split></split>
        <van-cell-group>
            <van-field placeholder="请输入手机号码"  v-model="psd" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
                <van-button slot="button" size="small" type="primary" @click="settime()" class="settime" :disabled="isDisable">{{msg}}</van-button>
            </van-field>
        </van-cell-group>
        <div class="btnBox">
            <van-button size="large" type="primary" @click="register">下一步</van-button>
        </div>
    </div>
</template>
<script>
import { sendValidateCode,VaCodeAndPhone } from "@/util/axios";
import {  setItem } from "@/util/util.js";

export default {
  data() {
    return {
      psd: "",
      sms: "",
      count: "",
      timer: null,
      msg: "发送验证码",
      isDisable: false
    };
  },
  methods: {
    settime() {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.psd)) {
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
    //发送验证码接口
    async sendValidateCode(){
      let data={
        cusPhone:this.psd
      }
      let res = await sendValidateCode(data);
      this.$toast(res.msg);      
    },
    //忘记密码
    async VaCodeAndPhone(){
      let data={
        cusPhone:this.psd,
        cusCode:this.sms
      }
      let res = await VaCodeAndPhone(data);
      if(res.code==200){
        
        // const temp=Object.assign(data,{cusId:res.data});
        
        setItem("userInfo",data);
        this.$router.push({ path: "/setpsd"});
      }else{
        this.$toast(res.msg); 
      }
           
    },
    register(){
      if(this.psd){
        if(this.sms){
          this.VaCodeAndPhone();
        }else{
          this.$toast("请输入验证码");
        }
      }else{
        this.$toast("请输入手机号");
      }
    },
  }
};
</script>
<style lang="scss">
@import "../assets/style/common.scss";
@import "../assets/style/style.scss";
.setpsd .van-cell {
  padding: rem(30px) rem(15px);
}
</style>