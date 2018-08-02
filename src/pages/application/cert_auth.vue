<template>
    <div class="cert_auth">
        <v-header title="身份认证"></v-header>
        <div class="container">
            <div class="card">
                <van-row type="flex" justify="space-between" class="idcard">
                    <van-col span="10" class="textcenter">
                        <van-uploader :after-read="onReadImgID1" accept="image/*" capture="camera" :disabled="disabled">
                            <img src="../../assets/images/camera.png" class="uploadMedia" ref="imgID1"/>
                        </van-uploader>
                        <span class="inblock">身份证照（人像面）</span>
                    </van-col>
                    <van-col span="10" class="textcenter">
                            <img src="../../assets/images/home.png" />
                        <span class="inblock">照片示范</span>
                    </van-col>
                </van-row>
                <van-cell-group>
                    <van-field label="您的姓名" placeholder="拍摄身份证照片后自动识别"  v-model="name" disabled="disabled" />
                </van-cell-group>
                <van-cell-group>
                    <van-field label="身份证号码" placeholder="拍摄身份证照片后自动识别"  v-model="idCardnum" disabled="disabled" />
                </van-cell-group>
                <van-row type="flex" justify="space-between" class="idcard backimg">
                    <van-col span="10" class="textcenter">
                        <van-uploader :after-read="onReadImgID2" :disabled="disabled">
                            <img src="../../assets/images/camera.png" class="uploadMedia"  ref="imgID2" />
                        </van-uploader>
                        <span class="inblock">身份证照（国徽面）</span>
                    </van-col>
                    <van-col span="10" class="textcenter">
                        <img src="../../assets/images/back.png" />
                        <span class="inblock">照片示范</span>
                    </van-col>
                </van-row>
                <van-cell-group class="idcardtime">
                    <van-field label="身份证有效期" placeholder="拍摄身份证照片后自动识别"  v-model="effectTime" disabled="disabled" />
                </van-cell-group>
                <div class="certLiving" v-if="certLiving">
                    <van-row class="random">
                        <van-col span="24">
                            请朗读数字：<span class="random-number">{{randomNumber}}</span>
                        </van-col>
                    </van-row>
                    <van-row type="flex" justify="space-between" class="idcard backimg">
                        
                        <van-col span="10" class="textcenter">
                            <van-uploader :after-read="onReadVideo" accept="video/*" capture="camcorder" :disabled="livingDisable">
                                <img src="../../assets/images/ht.png"  class="uploadMedia"  v-show="isShowVideoBg" ref="videoImg" />
                                <video src="" v-show="!isShowVideoBg"  class="uploadMedia"  ref="video"></video>
                            </van-uploader>
                            <span class="inblock">活体校验</span>
                        </van-col>
                        <van-col span="10" class="textcenter">
                            <img src="../../assets/images/exm.png" class="uploadMedia"/>
                            <span class="inblock">视频截取</span>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="tips">
                <p>
                    温馨提示<br/>
                    1.拍摄身份证照务必区分人相面、国徽面<br/>
                    2.身份证照片需本人，清晰且完整
                </p>
            </div>
            <van-button type="primary" bottom-action @click="back()">{{livingAuth == false ?"返回":"提交"}}</van-button>
        </div>
    </div>
</template>
<script>
import {
  certAuth,
  certAuthVideo,
  certAuthRandom,
  certConfirm
} from "@/util/axios.js";
import { formateTime } from "@/util/util";
export default {
  data() {
    return {
      name: "",
      idCard: "",
      idCardnum: "",
      effectTime: "",
      imgFile: "",
      msg: "",
      imgID1: "",
      imgID2: "",
      video: "",
      isShowVideoBg: true,
      bizNo: "",
      tokenRandomNumber: "",
      randomNumber: "",
      disabled: false,
      livingDisable: false,
      livingAuth: true,
      certLiving: this.$route.query.certLiving
    };
  },
  mounted() {
    this.getRandomNumber();
  },
  methods: {
    async onReadImgID1(file) {
      console.log(file);
      this.$refs.imgID1.src = file.content;
      let res = await certAuth({ file: file.content, type: 0 });
      if (res.code === 200) {
        this.name = res.data.cusName;
        this.idCardnum = res.data.cusIdcard;
      } else {
        this.$toast(res.msg);
      }
    },
    async onReadImgID2(file) {
      this.$refs.imgID2.src = file.content;
      let res = await certAuth({ file: file.content, type: 1 });
      if (res.code === 200) {
        this.effectTime = formateTime(
          new Date(res.data.effectTime * 1000),
          "yyyy-MM-dd"
        );
      } else {
        this.$toast(res.msg);
      }
    },
    async onReadVideo(file) {
      this.isShowVideoBg = false;
      this.$refs.video.src = file.content;
      let data = {
        file: file.content,
        bizNo: this.bizNo,
        tokenRandomNumber: this.tokenRandomNumber
      };
      console.log(data);
      let res = await certAuthVideo(data);
      console.log(res);
      if (res.code === 200) {
        // this.$refs.videoImg.src = res.data;
      } else {
        this.$toast(res.msg);
      }
    },
    async getRandomNumber() {
      let res = await certAuthRandom();
      if (res.code === 200) {
        console.log(res.data);
        this.bizNo = res.data.bizNo;
        this.tokenRandomNumber = res.data.randomInfo.tokenRandomNumber;
        this.randomNumber = res.data.randomInfo.randomNumber;
        if (res.data.authInfo) {
          this.disabled = true;
          this.$refs.imgID1.src = res.data.authInfo.imageUrl.split(",")[0];
          this.$refs.imgID2.src = res.data.authInfo.imageUrl.split(",")[1];
          this.name = res.data.authInfo.cusName;
          if (res.data.authInfo.effectTime) {
            this.effectTime = formateTime(
              new Date(res.data.authInfo.effectTime * 1000),
              "yyyy-MM-dd"
            );
          }
          this.idCardnum = res.data.authInfo.cusIdcard;
          if (res.data.authInfo.livingUrl) {
            this.livingDisable = true;
            this.$refs.videoImg.src = res.data.authInfo.livingUrl;
          }
          if (
            res.data.authInfo.cusName &&
            res.data.authInfo.livingUrl &&
            res.data.authInfo.effectTime
          ) {
            this.livingAuth = false;
          }
        }
      } else {
        this.$toast(res.msg);
      }
    },
    onRead(file) {
      console.log(file);
      //   this.uploadImg(file.content);
    },
    async uploadImg(img) {
      let data = {
        file: img
      };
      console.log(data);
      let res = await certAuth(data);
      if (res.code == 200) {
        this.name = res.data.cusName;
        this.idCardnum = res.data.cusIdcard;
        this.effectTime = res.data.effectTime;
      }
    },
    async back() {
      let res = await certConfirm();
      console.log(res);
      if (res.code == 200) {
        this.$router.go(-1);
      } else {
        this.$toast(res.msg);
      }
      //   this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.cert_auth {
  .idcard {
    padding-top: rem(45px);
    padding-bottom: rem(50px);
    font-size: rem(24px);
    img {
      width: 100%;
    }
    span {
      padding-top: rem(20px);
      padding-bottom: rem(40px);
    }
  }
  .backimg {
    padding-top: rem(60px);
  }
  .van-button--primary {
    border: none;
  }
  .tips {
    line-height: rem(38px);
    color: #a1a1a1;
    text-align: center;
    font-size: rem(24px);
    padding: rem(40px) 0 rem(60px);
  }
  .uploadMedia {
    width: rem(263px);
  }
  .van-uploader {
    display: flex;
    align-items: center;
    height: rem(174px);
    overflow: hidden;
  }
  .idcardtime .van-cell__title {
    max-width: 120px;
  }
  .random {
    padding: rem(30px) 0 0;
  }
  .random-number {
    color: #00cf7a;
    font-size: rem(40px);
  }
}
</style>
<style lang="scss" scoped>
// .container {
//   padding-bottom: 50px;
// }
</style>


