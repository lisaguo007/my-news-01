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
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏效果 -->
    <van-sticky class="more-sticky">
      <div class="change-tab" @click="$router.push('/edit-tab')">
        <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" swipeable sticky animated>
      <van-tab :title="item.name" v-for='item in tabList' :key='item.id'>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            offset='10'
            :immediate-check='false'
            @load="onLoad"
          >
            <my-post :post='news' v-for='news in newList' :key="news.id"></my-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      active: 0,
      tabList: [],
      newList: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageIndex: 1,
      pageSize: 10,
      timerId: ''
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        // 发送请求获取第一个tab栏的数据
        this.getNewList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // 发送请求获取第一个tab栏的数据
        this.getNewList(this.tabList[0].id)
      }
    },
    async getNewList(id) {
      if (this.pageIndex === 1) {
        this.newList = []
      }
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
        this.newList = [...this.newList, ...data]
        // console.log(this.newList)
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.pageIndex++
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh() {
      setTimeout(() => {
        this.newList = []
        this.pageIndex = 1
        this.loading = true
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active(value) {
      this.newList = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        this.getNewList(this.tabList[value].id)
      }, 1000)
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
  /deep/ .more-sticky {
    z-index: 100;
    .van-sticky--fixed {
      z-index: 100;
    }
    .change-tab {
      position: absolute;
      right: 0;
      right: 0;
      width: 15%;
      height: 44px;
      background-color: #fff;
      text-align: center;
      line-height: 44px;
      z-index: 9999;
    }
  }
  /deep/ .van-tabs__wrap {
    width: 85%;
  }
}
</style>
