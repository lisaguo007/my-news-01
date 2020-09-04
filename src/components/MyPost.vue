<template>
  <div class="my-post" @click="$router.push(`/post-detail/${post.id}`)">
    <div v-if="post.type === 2" class="video-post">
      <div class="title">{{post.title}}</div>
      <div class="video">
        <div class="btn">
          <span class="iconfont iconshipin"></span>
        </div>
        <img :src="$url(post.cover[0].url)" alt="">
      </div>
      <div class="user">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <div class="single-img-post" v-else-if="post.cover.length < 3 && post.cover.length>0">
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
    <div class="multiple-img-post" v-else-if='post.cover.length >= 3'>
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
  .video-post {
    padding: 16px;
    border-bottom: 1px solid #e4e4e4;
    font-size: 16px;
    color: #333333;
    .video {
      position: relative;
      margin: 10px 0;
      .btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70px;
        height: 70px;
        background-color: rgba(0,0,0,.2);
        border-radius: 50%;
        text-align: center;
        line-height: 70px;
        span {
          font-size: 42px;
          color: rgba(255,255,255,.8);
        }
      }
      img {
        width: 100%;
        height: 170px;
        object-fit: cover;
      }
    }
  }
}
</style>
