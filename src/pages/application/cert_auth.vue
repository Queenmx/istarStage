<template>
    <div class="cert_auth">
        <v-header title="身份认证"></v-header>
        <div class="container">
            <div class="card">
                <van-row type="flex" justify="space-between" class="idcard">
                    <van-col span="10" class="textcenter">
                        <van-uploader :after-read="onReadImgID1" accept="image/*" capture="camera">
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
                    <van-field label="您的姓名" placeholder="拍摄身份证照片后自动识别"  v-model="name" />
                </van-cell-group>
                <van-cell-group>
                    <van-field label="身份证号码" placeholder="拍摄身份证照片后自动识别"  v-model="idCardnum" />
                </van-cell-group>
                <van-row type="flex" justify="space-between" class="idcard backimg">
                    <van-col span="10" class="textcenter">
                        <van-uploader :after-read="onReadImgID2">
                            <img src="../../assets/images/camera.png" class="uploadMedia"  ref="imgID2" />
                        </van-uploader>
                        <span class="inblock">身份证照（国徽面）</span>
                    </van-col>
                    <van-col span="10" class="textcenter">
                        <img src="../../assets/images/back.png" />
                        <span class="inblock">照片示范</span>
                    </van-col>
                </van-row>
                <van-cell-group>
                    <van-field label="身份证有效期" placeholder="拍摄身份证照片后自动识别"  v-model="effectTime" />
                </van-cell-group>
                <van-row>
                    <van-col span="24">
                        请朗读数字：{{randomNumber}}
                    </van-col>
                </van-row>
                <van-row type="flex" justify="space-between" class="idcard backimg">
                    
                    <van-col span="10" class="textcenter">
                        <van-uploader :after-read="onReadVideo" accept="video/*" capture="camcorder">
                            <img src="../../assets/images/ht.png"  class="uploadMedia"  v-show="isShowVideoBg"/>
                            <video src="" v-show="!isShowVideoBg"  class="uploadMedia"  ref="video"></video>
                        </van-uploader>
                        <span class="inblock">活体校验</span>
                    </van-col>
                    <van-col span="10" class="textcenter">
                        <img src="../../assets/images/exm.png" />
                        <span class="inblock">视频截取</span>
                    </van-col>
                </van-row>
            </div>
            <div class="tips">
                <p>
                    温馨提示<br/>
                    1.拍摄身份证照务必区分人相面、国徽面<br/>
                    2.身份证照片需本人，清晰且完整
                </p>
            </div>
            <van-button type="primary" bottom-action>提交</van-button>
        </div>
    </div>
</template>
<script>
import { certAuth, certAuthVideo, certAuthRandom } from "@/util/axios.js";
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
      randomNumber: ""
    };
  },
  mounted() {
    this.getRandomNumber();
  },
  methods: {
    async onReadImgID1(file) {
      console.log(file);
      this.$refs.imgID1.src = file.content;
      let res = await certAuth({ file: file.content });
      if (res.code === 200) {
        this.name = res.data.cusName;
        this.idCardnum = res.data.cusIdcard;
      } else {
        this.$toast(res.msg);
      }
    },
    async onReadImgID2(file) {
      this.$refs.imgID2.src = file.content;
      let res = await certAuth({ file: file.content });
      if (res.code === 200) {
        this.effectTime = res.data.effectTime;
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
      let res = await certAuthVideo();
    },
    async getRandomNumber() {
      let res = await certAuthRandom();
      if (res.code === 200) {
        this.bizNo = res.data.bizNo;
        this.tokenRandomNumber = res.data.tokenRandomNumber;
        this.randomNumber = res.data.randomNumber;
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
    height: rem(174px);
  }
}
</style>

