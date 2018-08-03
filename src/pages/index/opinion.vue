<template>
    <div class="opinion">
        <v-header :title="title"></v-header>
        <div class="container wrap"> 
          <div class="askCon content">
              <textarea type="text" cols="50" rows="10" placeholder="您的意见是我们最大的进步！" v-model='content'></textarea>
              <p class="hint">*请将字数控制在200字以内</p>
          </div>
          <div class="btnBox">
              <van-button size="large" type="primary" @click="submitAsk">提交</van-button>
          </div>
        </div>
        
    </div>
</template>
<script>
import { setItem } from "@/util/util.js";
import { addOpinion } from "@/util/axios";

export default {
  data() {
    return {
      title: "意见反馈",
      content: "",
      flag: false
    };
  },
  mounted() {},
  methods: {
    async submitAsk() {
      let content = this.content;

      let that = this;

      if (content.length > 200) {
        this.$toast("请将字数控制在200字以内");
      } else if (content.length == 0) {
        this.$toast("请输入内容");
      } else {
        that.flag = true;
        let data = {
          feedbackComtent: this.content
        };
        let res = await addOpinion(data);

        if (res.code == 200) {
          that.flag = false;
          this.$toast(res.msg, 2000);
          setTimeout(function() {
            history.go(-1);
          }, 1000);
        } else {
          that.flag = false;
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
.opinion {
  textarea {
    width: 100%;
    height: rem(400px);
    color: #333;
    border: none;
    line-height: rem(45px);
    resize: none;
    padding: rem(20px);
    box-sizing: border-box;
    border-radius: rem(10px);
  }
  .askCon {
    margin: rem(20px) 0;
  }
  .hint {
    padding: rem(10px) 0;
    font-size: rem(24px);
    // text-align: right;
    color: $lightGrey;
  }
}
</style>

