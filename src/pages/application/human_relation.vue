<template>
    <div class="human-relation">
        <v-header title="人际关系"></v-header>
        <div class="container">
            <split></split>
            <ul class="baseinfo">
                <li>
                    <van-cell-group>
                        <van-field label="与本人关系" placeholder="请选择关系"  v-model="direct" @click="isShowDirect=!isShowDirect" icon="arrow" @click-icon="isShowDirect=!isShowDirect" />
                    </van-cell-group>
                    <van-popup v-model="isShowDirect" @change="onChange" position="bottom">
                        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
                    </van-popup> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="姓名" placeholder="请填写关系人姓名"  v-model="name" />
                    </van-cell-group> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="联系方式" placeholder="请填写关系人联系方式"  v-model="phone" />
                    </van-cell-group>
                </li> 
            </ul>
            <split></split>
            <ul class="baseinfo">
                <li>
                    <van-cell-group>
                        <van-field label="与本人关系" placeholder="请选择关系"  v-model="relation" @click="isShowRelation=!isShowRelation" icon="arrow" @click-icon="isShowRelation=!isShowRelation" />
                    </van-cell-group>
                    <van-popup v-model="isShowRelation" @change="onChange" position="bottom">
                        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="Relation" />
                    </van-popup> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="姓名" placeholder="请填写关系人姓名"  v-model="relationname" />
                    </van-cell-group> 
                </li>
                <li>
                    <van-cell-group>
                        <van-field label="联系方式" placeholder="请填写关系人联系方式"  v-model="relationphone" />
                    </van-cell-group>
                </li> 
            </ul>
            <tips></tips>
        </div>
        <van-button type="primary" bottom-action @click="confirmbtn" :class="isShowbtn?'':'hide'">提交</van-button>
    </div>
</template>
<script>
import {relationship,getrelation  } from "@/util/axios";

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
      isShowbtn:true
    };
  },
  mounted(){
      this.init();
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
    confirmbtn(){
        if(this.direct&&this.name&&this.phone&&this.relation&&this.relationname&&this.relationphone){
            if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phone)||!/^1(3|4|5|7|8)\d{9}$/.test(this.relationphone)) {
                this.$toast("请输入正确的手机号码");                
            }else{
                 this.relationship();
            }           
        }else{
            this.$toast("请填写完信息");
        }
    },
    async init(){
        let res=await getrelation();
        if(res.code==200){
            // this.isShowbtn=false;
            // this.name;
            // this.phone;
            // this.direct;
            // this.relationname;
            // this.relationphone;
            // this.relation;
        }
    },
    async relationship(){
        let data=[];
        let tep={};
        var temp=[];
        var that=this;
        
        tep.contactName=that.name;
        tep.contactPhone=that.phone;
        tep.contactRelation=that.direct;
        temp.contactName=that.relationname;
        temp.contactPhone=that.relationphone;
        temp.contactRelation=that.relation;
        data[0]=tep;
        data[1]=temp;
        
        console.log(data);
        let res=await relationship(data);
        if(res.code==200){
            this.$toast(res.msg);
            this.$router.push({ path: "/index/product"});
        }else{
            this.$toast(res.msg);
        }
       
            
        
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
  .van-button--primary{
    border:none;
  }
  .hide{display:none;}
}
</style>