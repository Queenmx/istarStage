<template>
    <div class="applyinfo">
        <v-header title="申请信息"></v-header>
        <div class="container">
             <split></split>
             <ul class="baseinfo">
                <li>
                    <van-cell-group>
                        <van-field label="贷款目的" placeholder="请选择贷款目的"  v-model="purpose" @click="isShowPurpose=!isShowPurpose" icon="arrow" @click-icon="isShowPurpose=!isShowPurpose" disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowPurpose" @change="onChange" position="bottom">
                        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
                    </van-popup> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="教育程度" placeholder="请选择教育程度"  v-model="edu" @click="isShowedu=!isShowedu" icon="arrow" @click-icon="isShowedu=!isShowedu" disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowedu" @change="onChange" position="bottom">
                        <van-picker show-toolbar :columns="educations" @cancel="onCancel" @confirm="education" />
                    </van-popup> 
                </li> 
                <li>
                    <van-cell-group>
                        <van-field label="婚姻状况" placeholder="请选择婚姻状况"  v-model="married" @click="isShowMarry=!isShowMarry" icon="arrow" @click-icon="isShowMarry=!isShowMarry" disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowMarry" @change="onChange" position="bottom">
                        <van-picker show-toolbar :columns="marriedvalue" @cancel="onCancel" @confirm="marry" />
                    </van-popup> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="月收入" placeholder="请填写月收入"  v-model.trim="monthly" type="number" @keyup="maxLength" :disabled="disabled" />
                    </van-cell-group> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="资产状况" placeholder="请选择资产状况"  v-model="assetstatu" @click="isShowAsset=!isShowAsset" icon="arrow" @click-icon="isShowAsset=!isShowAsset" disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowAsset" @change="onChange" position="bottom">
                        <van-picker show-toolbar :columns="assetvalue" @cancel="onCancel" @confirm="assetStatu" />
                    </van-popup> 
                </li> 
             </ul>
             <split></split>
             <h3 class="cardtitle van-hairline--bottom wrap"><span>申请材料</span></h3> 
             <ul class="detailmsg">
                 <li>
                    <van-cell-group>
                        <van-field label="居住地址" placeholder="请选择居住地址"  v-model="adress" @click="isShowAdress=!isShowAdress" icon="arrow" @click-icon="isShowAdress=!isShowAdress" disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowAdress" @change="onChange" position="bottom">
                        <van-area :area-list="areaList" @cancel="onCancel"  @confirm="choseAdress"/>
                    </van-popup>
                 </li>
                 <li>
                    <van-cell-group>
                        <van-field label="详细地址" placeholder="请填写详细地址"  v-model.trim="liveadress" :disabled="disabled" />
                    </van-cell-group> 
                 </li>
            </ul>
            <split></split>
            <h3 class="cardtitle van-hairline--bottom wrap"><span>户籍地址</span></h3> 
            <ul class="detailmsg">
                <li>
                    <van-cell-group>
                        <van-field label="户籍地址" placeholder="请选择户籍地址"  v-model="peradress" @click="isShowPeradress=!isShowPeradress" icon="arrow" @click-icon="isShowPeradress=!isShowPeradress" disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowPeradress" @change="onChange" position="bottom">
                        <van-area :area-list="areaList" @cancel="onCancel"  @confirm="perAdress"/>
                    </van-popup>
                 </li>
                 <li>
                    <van-cell-group>
                        <van-field label="详细地址" placeholder="请填写详细地址"  v-model.trim="detailAddress" :disabled="disabled" />
                    </van-cell-group> 
                </li>
            </ul>
            <split></split>
            <h3 class="cardtitle van-hairline--bottom wrap"><span>单位信息</span></h3> 
            <ul class="detailmsg">
                <li>
                    <van-cell-group>
                        <van-field label="单位名称" placeholder="请填写单位名称"  v-model.trim="unitname" :disabled="disabled" />
                    </van-cell-group> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="单位电话" placeholder="请填写单位电话"  v-model.trim="unitphone" :disabled="disabled" />
                    </van-cell-group> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="单位地址" placeholder="请选择单位地址"  v-model="unitadress" @click="isShowUnit=!isShowUnit" icon="arrow" @click-icon="isShowUnit=!isShowUnit" disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowUnit" @change="onChange" position="bottom">
                        <van-area :area-list="areaList" @cancel="onCancel"  @confirm="unitAdress"/>
                    </van-popup>
                 </li>
                 <li>
                    <van-cell-group>
                        <van-field label="详细地址" placeholder="请填写详细地址"  v-model.trim="unitdetail" :disabled="disabled" />
                    </van-cell-group> 
                </li>
            </ul>  
            <tips></tips>
        </div>
        <!-- <van-button type="primary" bottom-action @click="confirmbtn" :class="isShowbtn?'':'hide'">提交</van-button> -->
        <van-button type="primary" bottom-action @click="confirmbtn" v-show="isShowbtn">提交</van-button>
    </div>
</template>
<script>
import { AreaList } from "@/util/jsonData.js";
import { returnOption, getByCusId, ApplicationInfo } from "@/util/axios";

export default {
  data() {
    return {
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
      //   columns: ["教育支出", "数码科技", "购置房产"],
      //   educations: ["大学", "高中", "初中", "小学"],
      //   marriedvalue: ["未婚", "已婚", "离异"],
      //   assetvalue: ["有房", "有车", "有房无车", "有车无房", "无房无车"],
      columns: [],
      educations: [],
      marriedvalue: [],
      assetvalue: [],
      areaList: AreaList,
      isShowbtn: true,
      disabled: false
    };
  },
  mounted() {
    this.option();
    this.fixedFooter();
  },
  methods: {
    maxLength() {
      if (this.monthly.length > 8) this.monthly = this.monthly.slice(0, 8);
    },
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
      for (var i = 0; i < value.length; i++) {
        adressData.push(value[i].name);
      }
      this.adress = adressData.join(",");
      this.isShowAdress = false;
    },
    perAdress(value, index) {
      let adressData = [];
      for (var i = 0; i < value.length; i++) {
        adressData.push(value[i].name);
      }
      this.peradress = adressData.join(",");
      this.isShowPeradress = false;
    },
    unitAdress(value, index) {
      let adressData = [];
      for (var i = 0; i < value.length; i++) {
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
        if (
          this.detailAddress.length < 4 ||
          this.unitdetail.length < 4 ||
          this.liveadress.length < 4
        ) {
          this.$toast("详细地址不能少于4个字符");
          return false;
        } else if (
          !/^((0\d{2,3}))?(\d{7,8})((\d{3,}))?$/.test(this.unitphone)
        ) {
          this.$toast("请填写正确的单位电话");
          return false;
        }
        this.ApplicationInfo();
      } else {
        this.$toast("请填写完信息");
      }
    },
    async option() {
      let res = await returnOption();
      let result = await getByCusId();
      console.log(res);
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
        this.isShowbtn = false;
        this.disabled = true;
        this.assetstatu = result.data.cusAsset;
        this.married = result.data.cusMarrage;
        this.edu = result.data.cusEdu;
        this.purpose = result.data.loanUse;
        this.adress = result.data.cusArea;
        this.liveadress = result.data.cusAddress;
        this.peradress = result.data.censusArea;
        this.detailAddress = result.data.censusAddress;
        this.monthly = result.data.workIncome;
        this.unitname = result.data.companyName;
        this.unitphone = result.data.companyPhone;
        this.unitadress = result.data.companyArea;
        this.unitdetail = result.data.companyAddress;
      } else {
        // this.$toast(result.msg);
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
    },
    fixedFooter() {
      var windheight = document.body.clientHeight; /*未唤起键盘时当前窗口高度*/
      var self = this;
      window.onresize = function() {
        var docheight = document.body.clientHeight; /*唤起键盘时当前窗口高度*/
        if (docheight < windheight) {
          /*当唤起键盘高度小于未唤起键盘高度时执行*/
          self.isShowbtn = false;
        } else {
          self.isShowbtn = true;
        }
      };
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
