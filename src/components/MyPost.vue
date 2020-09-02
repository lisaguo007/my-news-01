<template>
  <div class="my-post">
    <div class="single-img-post" v-if="post.cover.length < 3">
      <div class="info">
        <div class="title">{{post.title}}</div>
        <div class="user">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$url(post.cover[0].url)" alt="">
      </div>
    </div>
    <div class="multiple-img-post" v-else>
      <div class="title">{{post.title}}</div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt="">
        <img :src="$url(post.cover[1].url)" alt="">
        <img :src="$url(post.cover[2].url)" alt="">
      </div>
      <div class="user">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang='less' scoped>
.my-post {
  .user {
        font-size: 14px;
        color: #868686;
        span {
          margin-right: 10px;
        }
      }
  .single-img-post {
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
  .multiple-img-post {
    padding: 16px;
    border-bottom: 1px solid #e4e4e4;
    font-size: 16px;
    color: #333333;
    .imgs {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      img {
        height: 75px;
        width: 112px;
        object-fit: cover;
      }
    }
  }
}
</style>
