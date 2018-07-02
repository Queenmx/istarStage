<template>
    <div class="assetsPage">
        <v-header title="资产认证"></v-header>
        <div class="container">
            <div class="reminder">资产保护中，未经你授权不对外提供</div>
            <ul class="wrap card">
                <li class="credit" v-for="(item,index) in imgData" :key="index">
                    <img :src="item" />
                </li>
                <li class="upload">
                    <van-uploader :after-read="onRead">
                        <van-icon name="photograph" />
                    </van-uploader>
                </li>
            </ul>
            <div class="reminderbtm">拍照上传房产证、车辆行驶证可以提高审核通过率</div>
            <div class="btnBox">
                <van-button size="large" type="primary" @click="uploadImg">上传</van-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      imgData: []
    };
  },
  methods: {
    onRead(file) {
      if (this.imgData.length < 5) {
        this.imgData.push(file.content);
      } else {
        this.$toast("最多可上传5张");
        return false;
      }
      console.log(this.imgData);
    },
    uploadImg() {
      console.log(this.imgData);
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.assetsPage {
  $size: rem(210px);
  .reminder {
    text-align: center;
    line-height: rem(135px);
    color: $blue;
  }
  .reminderbtm {
    color: $lightGrey;
    text-align: center;
    padding-top: rem(40px);
    font-size: rem(24px);
  }
  .upload {
    color: $blue;
    background: rgba(0, 116, 228, 0.12);
    text-align: center;
    font-size: rem(90px);
    width: $size;
    height: $size;
    line-height: rem(220px);
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-top: rem(60px);
    padding-bottom: rem(60px);
    .credit {
      flex-wrap: wrap;
      width: rem(220px);
      height: rem(220px);
      text-align: center;
      img {
        display: block;
        width: $size;
        height: $size;
      }
    }
  }
}
</style>


