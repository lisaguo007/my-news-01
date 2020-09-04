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
        <div class="follow" v-if="false">关注</div>
        <div class="followed" v-else>已关注</div>
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
      <div class="star">
        <span class="iconfont icondianzan"></span>
        <span>123</span>
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        user: {}
      }
    }
  },
  created() {
    this.getPostDetail()
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
    }
  }
}
</script>

<style lang='less' scoped>
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
  .star,
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
  .share {
    span {
      &:first-child {
        color: #00c800;
      }
    }
  }
}
</style>
