<template>
    <div class="cert_auth">
        <v-header title="身份认证"></v-header>
        <div class="container">
            <div class="card">
                <van-row type="flex" justify="space-between" class="idcard">
                    <van-col span="10" class="textcenter">
                        <img src="../../assets/images/camera.png" />
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
                    <van-field label="身份证号码" placeholder="拍摄身份证照片后自动识别"  v-model="idCard" />
                </van-cell-group>
                <van-row type="flex" justify="space-between" class="idcard backimg">
                    <van-col span="10" class="textcenter">
                        <img src="../../assets/images/camera.png" />
                        <span class="inblock">身份证照（国徽面）</span>
                    </van-col>
                    <van-col span="10" class="textcenter">
                        <img src="../../assets/images/back.png" />
                        <span class="inblock">照片示范</span>
                    </van-col>
                </van-row>
                <van-cell-group>
                    <van-field label="身份证有效期" placeholder="拍摄身份证照片后自动识别"  v-model="idCardnum" />
                </van-cell-group>
                <van-row type="flex" justify="space-between" class="idcard backimg">
                    <van-col span="10" class="textcenter">
                        <img src="../../assets/images/ht.png" />
                        <span class="inblock">活体校验</span>
                    </van-col>
                    <van-col span="10" class="textcenter">
                        <img src="../../assets/images/exm.png" />
                        <span class="inblock">视频截取</span>
                    </van-col>
                </van-row>
            </div>
            <tips></tips>
            <van-button type="primary" bottom-action>提交</van-button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      idCard: "",
      idCardnum: "",
      imgFile: ""
    };
  },
  methods: {
    onRead(file) {
      console.log(file);
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
}
</style>

