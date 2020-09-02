<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏效果 -->
    <van-tabs v-model="active" swipeable sticky animated>
      <van-tab :title="item.name" v-for='item in tabList' :key='item.id'>
        <my-post :post='news' v-for='news in newList' :key="news.id"></my-post>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [],
      newList: [],
      pageIndex: 1,
      pageSize: 25
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // 发送请求获取第一个tab栏的数据
        this.getNewList(this.tabList[0].id)
      }
    },
    async getNewList(id) {
      // 发送请求获取新闻数据
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      // console.log(res.data.data)
      if (statusCode === 200) {
        this.newList = data
        console.log(this.newList)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .header {
    display: flex;
    height: 50px;
    background-color: #ff0000;
    color: #fff;
    align-items: center;
    .logo,
    .user {
      width: 70px;
      text-align: center;
    }
    .logo {
      span {
        font-size: 50px;
      }
    }
    .user {
      span {
        font-size: 24px;
        color: #ffa5a5;
      }
    }
    .search {
      flex: 1;
      .search-box {
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        border-radius: 18px;
        background-color: rgba(255,255,255,.5);
        text-align: center;
        span {
          &:first-child {
            margin-right: 4px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
