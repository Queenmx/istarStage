<template>
    <div class="applyinfo">
        <v-header title="其他信息"></v-header>
        <div class="container">
             <split></split>
             <ul class="baseinfo">
                <li>
                    <van-cell-group>
                        <van-field label="贷款目的" placeholder="请选择贷款目的"  v-model="purpose" @click="isShowPurpose=!isShowPurpose" icon="arrow" @click-icon="isShowPurpose=!isShowPurpose" :disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowPurpose" @change="onChange" position="bottom">
                        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
                    </van-popup> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="月收入" placeholder="请填写月收入"  v-model="monthly" :disabled="disabled" />
                    </van-cell-group> 
                </li>
             </ul>
               
            <tips></tips>
        </div>
        <van-button type="primary" bottom-action @click="confirmbtn" :class="isShowbtn?'':'hide'">提交</van-button>
    </div>
</template>
<script>
import { AreaList } from "@/util/jsonData.js";
import {
  returnOption,
  proDetail,
  getByCusId,
  ApplicationInfo
} from "@/util/axios";

export default {
  data() {
    return {
      productId: this.$route.query.productId,
      purpose: "",
      edu: "",
      married: "",
      monthly: "",
      liveadress: "",
      assetstatu: "",
      adress: "",
      detailAddress: "",
      peradress: "",
      unitname: "",
      unitphone: "",
      unitadress: "",
      unitdetail: "",
      isShowPurpose: false,
      isShowedu: false,
      isShowMarry: false,
      isShowAsset: false,
      isShowAdress: false,
      isShowPeradress: false,
      isShowUnit: false,
      columns: [],
      educations: [],
      marriedvalue: [],
      assetvalue: [],
      areaList: AreaList,
      isShowbtn: true,
      disabled: false,
      dataOption: []
    };
  },
  mounted() {
    this.init();
    this.option();
  },
  methods: {
    onConfirm(value, index) {
      this.purpose = value;
      this.isShowPurpose = false;
    },
    onCancel() {
      this.isShowPurpose = false;
      this.isShowedu = false;
      this.isShowMarry = false;
      this.isShowAsset = false;
      this.isShowAdress = false;
      this.isShowPeradress = false;
      this.isShowUnit = false;
    },
    onChange(index) {
      console.log(index);
    },
    education(value, index) {
      this.edu = value;
      this.isShowedu = false;
    },
    marry(value, index) {
      this.married = value;
      this.isShowMarry = false;
    },
    assetStatu(value, index) {
      this.assetstatu = value;
      this.isShowAsset = false;
    },
    choseAdress(value, index) {
      let adressData = [];
      for (let i = 0; i < value.length; i++) {
        adressData.push(value[i].name);
      }
      this.adress = adressData.join(",");
      this.isShowAdress = false;
    },
    perAdress(value, index) {
      let adressData = [];
      for (let i = 0; i < value.length; i++) {
        adressData.push(value[i].name);
      }
      this.peradress = adressData.join(",");
      this.isShowPeradress = false;
    },
    unitAdress(value, index) {
      let adressData = [];
      for (let i = 0; i < value.length; i++) {
        adressData.push(value[i].name);
      }
      this.unitadress = adressData.join(",");
      this.isShowUnit = false;
    },
    confirmbtn() {
      if (
        this.purpose &&
        this.edu &&
        this.married &&
        this.monthly &&
        this.liveadress &&
        this.detailAddress &&
        this.peradress &&
        this.unitname &&
        this.unitphone &&
        this.unitadress &&
        this.unitdetail &&
        this.assetstatu &&
        this.adress
      ) {
        if (/[^0-9]/g.test(this.monthly)) {
          this.$toast("月收入请填数字");
        } else {
          this.ApplicationInfo();
        }
      } else {
        this.$toast("请填写完信息");
      }
    },
    async option() {
      let res = await returnOption();
      let result = await getByCusId();
      console.log(result);
      if (res.code == 200) {
        this.columns = res.data[3].itemList.map(function(item) {
          return item.itemValue;
        });
        this.educations = res.data[1].itemList.map(function(item) {
          return item.itemValue;
        });
        this.marriedvalue = res.data[0].itemList.map(function(item) {
          return item.itemValue;
        });
        this.assetvalue = res.data[2].itemList.map(function(item) {
          return item.itemValue;
        });
      } else {
        this.$toast(res.msg);
      }
      if (result.code == 200) {
        // this.isShowbtn = false;
        // this.disabled = true;
        // this.assetstatu = result.data.cusAsset;
        // this.married = result.data.cusMarrage;
        // this.edu = result.data.cusEdu;
        // this.purpose = result.data.loanUse;
        // this.adress = result.data.cusArea;
        // this.liveadress = result.data.cusAddress;
        // this.peradress = result.data.censusArea;
        // this.detailAddress = result.data.censusAddress;
        // this.monthly = result.data.workIncome;
        // this.unitname = result.data.companyName;
        // this.unitphone = result.data.companyPhone;
        // this.unitadress = result.data.companyArea;
        // this.unitdetail = result.data.companyAddress;
      } else {
        // this.$toast(result.msg);
      }
    },
    async init() {
      let data = {
        productId: this.productId,
        type: "field"
      };
      let res = await proDetail(data);
      console.log(res);
      if (res.code == 200) {
        // this.dataOption = res.data.field - option;
      }
    },
    async ApplicationInfo() {
      let data = {
        cusAsset: this.assetstatu,
        cusMarrage: this.married,
        cusEdu: this.edu,
        loanUse: this.purpose,
        cusArea: this.adress,
        cusAddress: this.liveadress,
        censusArea: this.peradress,
        censusAddress: this.detailAddress,
        workIncome: this.monthly * 1,
        companyName: this.unitname,
        companyPhone: this.unitphone,
        companyArea: this.unitadress,
        companyAddress: this.unitdetail
      };
      console.log(data);
      let res = await ApplicationInfo(data);
      if (res.code == 200) {
        this.$toast(res.msg);
        this.$router.push({ path: "/index/product" });
      } else {
        this.$toast(res.msg);
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
@import "../../assets/style/style.scss";
.applyinfo {
  .van-icon-arrow {
    transform: rotate(90deg);
  }
  .van-cell-group {
    border-top: none;
  }
  .van-button--primary {
    border: none;
  }
  .hide {
    display: none;
  }
}
</style>
