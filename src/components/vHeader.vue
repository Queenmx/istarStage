<template>
    <div class="wrap flex header">
        <div class="left">
            <slot name="left">
                <van-icon name="arrow-left" @click="back"/>
            </slot>
        </div>
        <div class="rest ellipsis title"><slot name="title">{{title}}</slot></div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
import { checkSys } from "@/util/util";
export default {
  props: {
    title: {
      default: "星分期",
      type: String
    }
  },
  mounted() {
    this.setHeight();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    rightEvent() {
      this.$emit("rightEvent");
    },
    setHeight() {
      let sys = checkSys();
      //   if (sys == "ios") {
      //     document.getElementsByClassName("header")[0].style.height = "64px";
      //   }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: rem(95px);
  text-align: center;
  font-size: rem(36px);
  color: #fff;
  background: $blue;
  z-index: 100;
  .left,
  .right {
    width: rem(110px);
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  //   .left {
  //     padding-left: rem(10px);
  //     padding-right: rem(15px);
  //   }
  //   .right {
  //     padding-left: rem(15px);
  //     padding-right: rem(10px);
  //   }
  .arrow-left {
    font-size: rem(30px);
    color: #fff;
  }
}
</style>

