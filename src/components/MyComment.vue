<template>
  <div class="my-comment">
    <div class="title">
      <div class="left">
        <img :src="$base + comment.user.head_img" alt="">
      </div>
      <div class="center">
        <p>{{comment.user.nickname}}</p>
        <p>{{comment.create_date | now}}</p>
      </div>
      <div class="right">回复</div>
    </div>
    <my-floor :comment='comment.parent' v-if="comment.parent"></my-floor>
    <div class="content">{{comment.content}}</div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>

<style lang='less' scoped>
.my-comment {
  .title {
    display: flex;
    padding: 10px 16px;
    font-size: 14px;
    color: #202020;
    .left {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      p {
        &:nth-child(2) {
          color: #707070;
        }
      }
    }
    .right {
      color: #707070;
      font-size: 14px;
    }
  }
  .content {
    margin: 6px 16px;
    font-size: 16px;
  }
}
</style>
