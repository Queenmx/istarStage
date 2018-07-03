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
import { addOpinion } from "@/util/axios";

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

    async  submitAsk () {
        var content = this.content;
        
        var that=this;
        
        if (content.length>200) {
          this.$toast("请将字数控制在200字以内");
        }else if(content.length==0){
          this.$toast("请输入内容");
        }else{
          that.flag=true;
          let data = {
            feedbackComtent:this.content
          };
          let res = await addOpinion(data);
          this.$toast(res.msg);
          if(res.code==200){
            that.flag=false
            this.$toast("提交成功");
            history.go(-1);
          }else{
            that.flag=false
            this.$toast(res.msg);
          }

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

