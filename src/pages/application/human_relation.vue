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
        <van-button type="primary" bottom-action>提交</van-button>
    </div>
</template>
<script>
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
      columns: ["父母", "配偶", "子女", "朋友", "同事", "同学"]
    };
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
}
</style>