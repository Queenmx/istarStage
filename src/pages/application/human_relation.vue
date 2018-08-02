<template>
    <div class="human-relation">
        <v-header title="人际关系"></v-header>
        <div class="container">
            <split></split>
            <ul class="baseinfo">
                <li>
                    <van-cell-group>
                        <van-field label="与本人关系" placeholder="请选择关系"  v-model="direct" icon="arrow" @click-icon="isShowDirect=!isShowDirect" disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowDirect" @change="onChange" position="bottom">
                        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
                    </van-popup> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="姓名" placeholder="请填写关系人姓名"  v-model="name" :disabled="disabled" />
                    </van-cell-group> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="联系方式" placeholder="请填写关系人联系方式"  v-model="phone" :disabled="disabled" />
                    </van-cell-group>
                </li> 
            </ul>
            <split></split>
            <ul class="baseinfo">
                <li>
                    <van-cell-group>
                        <van-field label="与本人关系" placeholder="请选择关系"  v-model="relation" icon="arrow" @click-icon="isShowRelation=!isShowRelation" disabled="disabled" />
                    </van-cell-group>
                    <van-popup v-model="isShowRelation" @change="onChange" position="bottom">
                        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="Relation" />
                    </van-popup> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="姓名" placeholder="请填写关系人姓名"  v-model="relationname" :disabled="disabled" />
                    </van-cell-group> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="联系方式" placeholder="请填写关系人联系方式"  v-model="relationphone" :disabled="disabled" />
                    </van-cell-group>
                </li> 
            </ul>
            <tips></tips>
        </div>
        <van-button type="primary" bottom-action @click="confirmbtn" v-show="isShowbtn">提交</van-button>
    </div>
</template>
<script>
import { relationship, getrelation } from "@/util/axios";
import { getItem } from "@/util/util.js";
export default {
  data() {
    return {
      direct: "",
      name: "",
      phone: "",
      relation: "",
      relationname: "",
      relationphone: "",
      isShowDirect: false,
      isShowRelation: false,
      columns: ["父母", "配偶", "子女", "朋友", "同事", "同学"],
      isShowbtn: true,
      loginphone: getItem("userInfo").cusPhone,
      disabled: false
    };
  },
  mounted() {
    this.init();
    this.fixedFooter();
  },
  methods: {
    onConfirm(value, index) {
      this.direct = value;
      this.isShowDirect = false;
    },
    onCancel() {
      this.isShowDirect = false;
      this.isShowRelation = false;
    },
    onChange(index) {
      console.log(index);
    },
    Relation(value, index) {
      this.relation = value;
      this.isShowRelation = false;
    },
    confirmbtn() {
      if (
        this.direct &&
        this.name &&
        this.phone &&
        this.relation &&
        this.relationname &&
        this.relationphone
      ) {
        if (
          !/^1(3|4|5|7|8)\d{9}$/.test(this.phone) ||
          !/^1(3|4|5|7|8)\d{9}$/.test(this.relationphone)
        ) {
          this.$toast("请输入正确的手机号码");
          return false;
        } else if (
          this.loginphone === this.phone ||
          this.loginphone === this.relationphone
        ) {
          this.$toast("手机号码不能与登录手机号一致");
          return false;
        } else if (this.phone === this.relationphone) {
          this.$toast("联系人手机号码不能一致");
          return false;
        } else if (
          !/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(this.name) ||
          !/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(this.relationname)
        ) {
          this.$toast("请输入正确的姓名");
          return false;
        } else if (this.name === this.relationname) {
          this.$toast("联系人姓名不能一致");
          return false;
        } else {
          this.relationship();
        }
      } else {
        this.$toast("请填写完信息");
      }
    },
    async init() {
      let res = await getrelation();
      console.log(res);
      if (res.code == 200) {
        this.isShowbtn = false;
        this.disabled = true;
        this.name = res.data[0].contactName;
        this.phone = res.data[0].contactPhone;
        this.direct = res.data[0].contactRelation;
        this.relationname = res.data[1].contactName;
        this.relationphone = res.data[1].contactPhone;
        this.relation = res.data[1].contactRelation;
      }
    },
    async relationship() {
      let data = [];
      let tep = {};
      var temp = {};
      var that = this;
      tep.contactName = that.name;
      tep.contactPhone = that.phone;
      tep.contactRelation = that.direct;
      temp.contactName = that.relationname;
      temp.contactPhone = that.relationphone;
      temp.contactRelation = that.relation;
      data[0] = tep;
      data[1] = temp;
      let res = await relationship(data);
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
.human-relation {
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