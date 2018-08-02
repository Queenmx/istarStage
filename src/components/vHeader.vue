<template>
<!-- <div class="head-con"> -->
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
    <!-- <div class="head-bg"></div>
</div> -->
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
  data() {
    return {
      ios: false,
      topBarHeight: 15
    };
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
      if (sys == "android") {
        this.topBarHeight = 0;
      }
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
.headerplus,
.headbgplus {
  padding-top: rem(30px);
}
.head-bg {
  height: rem(95px);
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  /*增加头部适配层*/
  //   @supports (bottom: constant(safe-area-inset-bottom)) {
  .head-bg {
    padding-top: constant(safe-area-inset-bottom);
  }
  .header {
    padding-top: constant(safe-area-inset-bottom);
  }
  //   }
}
</style>

