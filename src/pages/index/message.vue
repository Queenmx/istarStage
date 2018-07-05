<template>
  <div class="message">
      <v-header title="系统消息"></v-header>
      <van-pull-refresh v-model="loading" @refresh="onRefresh" :loading-text="loadtext">
            <!-- <div v-for="item in list" :key="item.noticeId" class="messageli">
          
                <div class="item-wrap" :class="item.isRead==0?'notread':''">
                    <p class="time">{{item.createTimeStr}}</p>
                    <p class="title">{{item.noticeContent}}</p>            
                    <p class="content">客服电话：4000-665-665</p>            
                </div>
            </div> -->
            <van-cell-group>
              <van-cell v-for="item in list" :key="item.noticeId" 
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
    
    <div v-if="!list.length" class="none">暂无记录</div>
    <!-- <div class="messageli">        
        <div class="item-wrap">
            <p class="time">2018723</p>
            <p class="title">水电费大是大非发达地方的防晒霜代发范德萨对方水电费水电费是电风扇打法撒旦法师点发送</p>            
            <p class="content">客服电话：4000-665-665</p>            
        </div>
    </div> -->
  </div>
</template>
<script>
import { getMessageList,updateIsRead } from "@/util/axios";
import { getItem } from "@/util/util";
export default {
  data() {
    return {
      userInfo: getItem("userInfo"),
      list: [],
      loadtext:'加载中',
      loading: false,
      counter: 1, //当前页
      listdata: [], // 下拉更新数据存放数组
      pageEnd: 0, // 结束页数
      clickable:true
    };
  },
  mounted() {
    this.getMessageList(1);
    
  },
  methods: {
    async markedAsRead(temp) {
      let data={noticeId:temp};
      let res = await updateIsRead(data);
      if(res.code==200){
        
      }
    },
    async getMessageList(num) {
      let data = {
        pageNum:num,
        pageSize:'10'
      };
      let res = await getMessageList(data);
      if (res.code == 200) {        
        var that=this; 
        this.listdata = res.data.list;
        this.pageEnd=res.data.pages;
        this.listdata.map(function(item,index){
          that.list.unshift(item)
        })
        console.log(this.list)
      }
    },
    onRefresh() {
      console.log("fresh")
      this.counter++;      
      if(this.counter>this.pageEnd){  
        this.loadtext="暂无更多数据";
        setTimeout(() => {
          this.loading = false;          
        }, 500);                        
        return;
      }        
      setTimeout(() => {
        this.loading = false;          
      }, 500);
      this.getMessageList(this.counter);
    },

  }
};
</script>
<style lang="scss" scoped>
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
      font-size:rem(28px);
    }
    .time {
      color: $grey;
      font-size: rem(20px);
      margin-bottom:rem(15px);
    }
  }
  .notread {
    font-weight: bold;
  }
  .messageli{border-bottom:rem(1px) solid #ececec;}
  .van-pull-refresh{overflow:visible;}
}
</style>


