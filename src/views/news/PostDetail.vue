<template>
  <div class="post-detail">
    <div class='header'>
      <div class="arrow" @click='back'>
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="menu">
        <div class="followed" v-if="post.has_follow" @click="followed">已关注</div>
        <div class="follow" v-else @click="follow">关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title">{{post.title}}</div>
      <div class="user">
        <span class="name">{{post.user.nickname}}</span>
        <span class="time">{{post.user.create_date | time}}</span>
      </div>
    </div>
    <div class="artical" v-if="post.type === 1" v-html="post.content"></div>
    <video v-else :src="getUrl(post.content)" controls autoplay muted></video>
    <div class="btns">
      <div class="good" :class="{like: post.has_like}" @click="good">
        <span class="iconfont icondianzan"></span>
        <span>{{post.like_length}}</span>
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>

    <!-- 评论 -->
    <div class="comment-list">
      <h3>精彩跟帖</h3>
      <my-comment :comment='comment' v-for="comment in commentList" :key="comment.id"></my-comment>
    </div>

    <!-- 底部区域 -->
    <div class="footer">
      <div class="search">
        <input type="text" placeholder="回复">
      </div>
      <span class="iconfont iconpinglun- comment"><i>102</i></span>
      <span class="iconfont iconshoucang" :class="{star: post.has_star}" @click="star"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        user: {}
      },
      commentList: []
    }
  },
  created() {
    this.getPostDetail()
    // 获取文章的评论列表
    this.getCommentList()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async getPostDetail() {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    getUrl(url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    noLogin() {
      // 判断是否登录
      const token = localStorage.getItem('token')
      if (!token) {
        // 没有登录
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      } else {
        // 代表登录
        return false
      }
    },
    async follow() {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async followed() {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async good() {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async star() {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async getCommentList() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.post-detail {
  padding-bottom: 50px;
}
.header {
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #d4d4d4;
  background-color: #fff;
  text-align: center;
  line-height: 50px;
  align-items: center;
  z-index: 9999;
  .arrow,
  .menu {
    width: 50px;
  }
  .arrow {
    margin-top: -3px;
  }
  .menu {
    width: 80px;
    .followed,
    .follow {
      width: 64px;
      height: 28px;
      background-color: #ff0000;
      font-size: 14px;
      color: #fff;
      line-height: 28px;
      border-radius: 14px;
    }
    .followed {
      color: #333333;
      background-color: #fff;
      border: 1px solid #d7d7d7;
    }
  }
  .title {
    flex: 1;
    height: 50px;
    font-weight: 700;
    text-align: left;
    span {
      height: 50px;
      color: #ff0000;
      font-size: 60px;
    }
  }
}
.content {
  padding: 16px;
  .title {
    color: #333333;
    font-size: 20px;
    font-weight: 700;
  }
  .user {
    display: flex;
    margin: 10px 0;
    color: #868686;
    font-size: 14px;
    .name {
      margin-right: 10px;
    }
    .time {
      margin-top: 2px;
    }
  }
}
/deep/ .artical {
  padding: 0 16px;
    font-size: 16px;
    img {
      width: 100%;
    }
  }
video {
  width: 100%;
  padding: 0 16px;
}
/deep/ .btns {
  padding: 20px 20px;
  display: flex;
  justify-content: space-around;
  .good,
  .share {
    width: 80px;
    height: 32px;
    border: 1px solid #797979;
    font-size: 16px;
    text-align: center;
    line-height: 32px;
    border-radius: 16px;
    span {
      &:first-child {
        margin-right: 2px;
      }
    }
  }
  .like {
    border: 1px solid #00c800;
    span {
      &:first-child {
        color: #00c800;
      }
    }
  }
  .share {
    span {
      &:first-child {
        color: #00c800;
      }
    }
  }
}
.comment-list {
  h3 {
    border-top: 4px solid #e4e4e4;
    padding-top: 24px;
    margin-bottom: 6px;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
  }
}
.footer {
  display: flex;
  position: fixed;
  height: 50px;
  bottom: 0;
  padding: 0 16px;
  background-color: #fff;
  justify-content: space-around;
  align-items: center;
  .search {
    width: 218px;
    margin-right: 6px;
    input {
      width: 218px;
      height: 32px;
      padding-left: 20px;
      line-height: 32px;
      background-color: #d7d7d7;
      border: 0;
      font-size: 16px;
      border-radius: 18px;

    }
  }
  span {
    padding: 0 6px;
    font-size: 26px;
    color: #565656;
  }
  .star {
    color: #00c800;
  }
  .comment {
    position: relative;
    i {
      position: absolute;
      top: -6px;
      right: -8px;
      height: 18px;
      padding: 0 6px;
      font-size: 8px;
      line-height: 18px;
      text-align: center;
      color: #fff;
      background-color: #ff0000;
      border-radius: 9px;
    }
  }
}
</style>
