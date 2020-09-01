<template>
  <div class="my-comment">
    <my-header>我的跟帖</my-header>
    <div class="list">
      <div class="item" v-for='item in commentList' :key='item.id'>
        <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
        <div class="comment" v-if='item.parent'>
          <div class="name">回复：{{item.parent.user.nickname}}</div>
          <div class="comment_content">{{item.parent.content}}</div>
        </div>
        <div class="content">{{item.content}}
        </div>
        <div class="origin">
          <span>原文：{{item.post.title}}</span>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('/user_comments')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
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
