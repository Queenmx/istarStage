<template>
    <div class="setpsd wrap container">
        <v-header title="设置密码"></v-header>
        <split></split>
        <van-cell-group>
            <van-field  type="password" placeholder="请输入密码（密码为6-16位，字母+数字组合）"  v-model="psd" />
        </van-cell-group>
        <van-cell-group>
            <van-field  type="password" placeholder="请再次输入密码"  v-model="repsd" />
        </van-cell-group>
        <div class="btnBox">
            <van-button size="large" type="primary" @click="confirm">确定</van-button>
        </div>
    </div>
</template>
<script>
import { setPassword } from "@/util/axios";
import {  setItem,getItem } from "@/util/util.js";

export default {
  data() {
    return {
        userInfo:getItem("userInfo"),
        psd: "",
        repsd: ""
    };
  },
  methods: {
    confirm(){
        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.psd)){//6-12位数字和字母
            this.$toast("密码格式不正确");
            return false;
        }
        if(this.psd!=this.repsd){
            this.$toast("两次密码输入不一致");
        }else{
            this.setPassword();
        }
        
    },
    //设置密码接口
    async setPassword(){
        let data={
            cusPhone:this.userInfo.cusPhone,
            cusPassword:this.psd,
        }
        let res = await setPassword(data);
        if(res.code==200){
            this.$toast(res.msg); 
            this.$router.push({ path: "/certification" });
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
.setpsd .van-cell {
  padding: rem(30px) rem(15px);
}
</style>
