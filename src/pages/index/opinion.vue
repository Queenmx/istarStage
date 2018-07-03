<template>
    <div class="opinion">
        <v-header :title="title"></v-header>
        <div class="container">
           
          <div class="askCon content">
              
              <textarea type="text" cols="50" rows="10" placeholder="您的意见是我们最大的进步！" v-model='content'></textarea>
          </div>
          <div class="apply">
              <van-button size="large" type="primary" @click="submitAsk">提交</van-button>
          </div>
        </div>
        
    </div>
</template>
<script>
import {  setItem } from "@/util/util.js";
export default {
  data() {
    return {
      title:'意见反馈',
      content: '',
      
      flag: false
    };
  },
  mounted() {
    
  },
  methods: {

    submitAsk: function () {
        var content = this.content;
        
        var that=this;
        
        if (content.length>200) {
          this.$toast("请将字数控制在200字以内");
        }else if(content.length==0){
          this.$toast("请输入内容");
        }else{
          that.flag=true               
          // if (this.state.fromWho == "help") {//反馈建议
          //     api.feedBackAdd(content, function (res) {
          //         //console.log('feedBackAdd',res);
          //         if (res.code == "0000") {
          //           that.flag=false
          //             this.$toast("提交成功", 2);
          //             // window.history.back();
          //             history.go(-1);
          //         } else {
          //           that.flag=false
          //             this.$toast(res.msg, 2);
          //         }
          //     }, function () {
          //       that.flag=false;
          //         this.$toast("连接错误", 2);
          //     })
          // } else {//提问问题
          //     var objId = this.props.location.query.objId;
          //     var objType = this.props.location.query.objType;
          //     api.questionAdd(content, objId, objType, function (res) {
          //         // console.log('questionAdd',res);
          //         if (res.code == "0000") {
          //         that.flag=false
          //             this.$toast("提交成功", 2);
          //             //window.history.back();
          //             history.go(-1);
          //         } else {
          //         that.flag=false
          //             this.$toast(res.msg, 2);
          //         }
          //     }, function () {
          //     that.flag=false
          //         this.$toast("连接错误", 2);
          //     })
          // }
        }
        	



         

    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.opinion {
  textarea{
      width: 100%;
      height: rem(400px);
      
      color: #333;
      border: none;
      
      padding: .1rem;
      line-height: .5rem;
      resize: none;
  }
  .askCon{
    background: #fff;
    padding:rem(64px) rem(45px);
  }
      
}
</style>

