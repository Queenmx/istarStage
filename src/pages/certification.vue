<template>
    <div class="setpsd wrap container">
        <v-header title="实名认证"><i slot="left"></i></v-header>
        <split></split>
        <van-cell-group>
            <van-field label="姓名" placeholder="请填写真实姓名"  v-model="name"  />
        </van-cell-group>
        <van-cell-group>
            <van-field label="身份证号" placeholder="请填写身份证号"  v-model="idCard"  />
        </van-cell-group>
        <div class="btnBox">
            <van-button size="large" type="primary" @click="realbtn">提交</van-button>
        </div>
    </div>
</template>
<script>
import { realNameAuth } from "@/util/axios";
import {  getItem } from "@/util/util.js";

export default {
  data() {
    return {
        name: "",
        idCard: "",
        userInfo:getItem("userInfo")
    };
  },
  methods:{
    realbtn(){
        if(!this.name||!this.idCard){
            this.$toast("请输入真实姓名和身份证号");
            return false;
        }
        if(!/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(this.idCard)){
            this.$toast("身份证号格式不对");
            return false;
        }
        this.realNameAuth();        
    },
    //实名认证
    async realNameAuth(){
        var that=this;
        let data={
            cusName:this.name,
            cusIdcard:this.idCard,
            cusPhone:this.userInfo.cusPhone
        }
        let res = await realNameAuth(data);
        if(res.code==200){
            this.$toast(res.msg); 
            console.log(this.$route.query.login)
            if(this.$route.query.login){
                that.$router.push({path:"/"});
            }else{
                that.$router.push({path:"/login"});
            }
                        
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
