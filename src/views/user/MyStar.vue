<template>
  <div class="my-star">
    <my-header>我的收藏</my-header>
    <div class="list">
      <div class="item" v-for='item in list' :key='item.id'>
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="user">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comments.length}}跟帖</span>
          </div>
        </div>
        <div class="img">
          <img :src="$url(item.cover[0].url)" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getStarList()
  },
  methods: {
    async getStarList() {
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    }
  }
}
</script>

<style lang='less' scoped>
.my-star {
  .item {
    display: flex;
    padding: 16px;
    border-bottom: 1px solid #e4e4e4;
    font-size: 16px;
    color: #333333;
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .user {
        font-size: 14px;
        color: #868686;
        span {
          margin-right: 10px;
        }
      }
    }
    .img {
      width: 120px;
      height: 75px;
      img {
        width: 100%;
        height: 100%;
        // 作用和background-size类似，，设置图片的大小
        // cover的缺点：保证图片覆盖完整的大小， 缺点：会有一部分被截取掉
        // contain: 保证图片被完整的显示，会有留白
        object-fit: cover;
      }
    }
  }
}
</style>
