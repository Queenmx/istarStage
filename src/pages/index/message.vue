<template>
  <div class="message">
      <v-header title="系统消息"></v-header>
      <van-pull-refresh v-model="loading" @refresh="onRefresh" :loading-text="loadtext">
            <van-cell-group>
              <van-cell v-for="(item,index) in list" :key="index" 
                        class="messageli item-wrap" :class="item.isRead==0?'notread':''" 
                        :title='item.title' :clickable='clickable' 
                        @click="markedAsRead(item.noticeId);item.isRead=1"
              >
                <p class="time">{{item.createTimeStr}}</p>
                <p class="title">{{item.noticeContent}}</p>            
                <p class="content">客服电话：4000-665-665</p>
              </van-cell>
            </van-cell-group>
      </van-pull-refresh>
    
    <div v-if="!list.length" class="none">
        <img src="../../assets/images/empty.png" />暂无记录</div>
  </div>
</template>
<script>
import { getMessageList, updateIsRead } from "@/util/axios";
import { getItem } from "@/util/util";
export default {
  data() {
    return {
      userInfo: getItem("userInfo"),
      list: [],
      loadtext: "加载中",
      loading: false,
      counter: 1,
      listdata: [],
      pageEnd: 0,
      clickable: true
    };
  },
  mounted() {
    this.getMessageList(1);
  },
  methods: {
    async markedAsRead(temp) {
      let data = { noticeId: temp };
      let res = await updateIsRead(data);
      if (res.code == 200) {
      }
    },
    async getMessageList(num) {
      let data = {
        pageNum: num,
        pageSize: "10"
      };
      console.log(data);
      let res = await getMessageList(data);
      console.log(res);
      if (res.code == 200) {
        let that = this;
        this.listdata = res.data.list;
        this.pageEnd = res.data.pages;
        if (this.listdata) {
          this.listdata.map(function(item, index) {
            that.list.push(item);
          });
        }
      }
    },
    onRefresh() {
      this.counter++;
      if (this.counter > this.pageEnd) {
        this.loadtext = "暂无更多数据";
        setTimeout(() => {
          this.loading = false;
        }, 500);
        return;
      }
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.getMessageList(1);
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.message {
  padding-top: rem(95px);
  .item-wrap {
    padding: rem(24px) rem(40px);
    .title {
      color: $black;
      font-size: rem(28px);
    }
    .content {
      line-height: rem(38px);
      font-size: rem(28px);
    }
    .time {
      color: $grey;
      font-size: rem(20px);
      margin-bottom: rem(15px);
    }
  }
  .notread {
    font-weight: bold;
  }
  .messageli {
    border-bottom: rem(1px) solid #ececec;
  }
  .none {
    text-align: center;
    img {
      width: rem(437px);
      height: rem(456px);
      display: block;
      padding: rem(110px) 0 rem(100px);
      margin: 0 auto;
    }
  }
  .van-pull-refresh {
    overflow: visible;
  }
}
</style>


