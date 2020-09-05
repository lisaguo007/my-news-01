<template>
  <div>
    <my-floor :comment='comment.parent' v-if="comment.parent"></my-floor>
    <div class="my-floor" :class="{bt: !comment.parent}">
      <div class="title">
        <div class="left">1. {{comment.user.nickname}}</div>
        <div class="center">{{comment.create_date | now}}</div>
        <div class="right">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-floor',
  props: {
    comment: Object
  }
}
</script>

<style lang='less' scoped>
.my-floor.bt {
  border-top: 1px solid red;
}
.first > .my-floor {
  border-bottom: 1px solid red;
}
.my-floor {
  border: 1px solid red;
  border-top: none;
  padding: 10px;
  margin: 0 16px;
  .title {
    display: flex;
    font-size: 14px;
    .center {
      flex: 1;
      font-size: 12px;
      color: #666;
      padding-left: 10px;
    }
    .right {
      color: #666;
    }
  }
  .content {
    font-size: 14px;
    margin-right: 10px;
  }
}
</style>
