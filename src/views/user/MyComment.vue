<template>
  <div class="my-comment">
    <my-header>我的跟帖</my-header>
    <div class="list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check='false'
          offset="10"
          @load="onLoad"
        >
          <div class="item" v-for='item in commentList' :key='item.id'>
            <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
            <div class="comment" v-if='item.parent'>
              <div class="name">回复：{{item.parent.user.nickname}}</div>
              <div class="comment_content">{{item.parent.content}}</div>
            </div>
            <div class="content">{{item.content}}
            </div>
            <div class="origin" @click="$router.push(`/post-detail/${item.post.id}`)">
              <span>原文：{{item.post.title}}</span>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 6,
      refreshing: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        // get请求的参数必须放到params中或者拼接到url地址中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        // 加载状态结束
        this.loading = false
        this.refreshing = false

        // 数据全部加载完成
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
        this.getCommentList()
      }, 1000)
    },
    onRefresh() {
      setTimeout(() => {
        console.log('下拉刷新中')
        // 清空列表数据
        this.commentList = []
        // 防止之前已经没有数据了
        this.finished = false
        this.loading = true
        // 重新渲染第一页数据
        this.pageIndex = 1
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.my-comment {
  .list {
    .item {
      padding: 20px;
      border-bottom: 1px solid #d7d7d7;
      font-size: 14px;
      color: #929292;
      .comment {
        height: 70px;
        background-color: #e4e4e4;
        margin-top: 15px;
        padding: 14px 12px;
        .name {
          margin-bottom: 6px;
        }
      }
      .content {
        margin: 12px 0;
        color: #202020;
      }
      .origin {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
