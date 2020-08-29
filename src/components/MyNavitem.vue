<template>
  <div class="my-navitem" @click="clickFn">
    <div class="title"><slot></slot></div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  },
  props: {
    to: String
  }
}
</script>

<style lang='less'>
.my-navitem {
  display: flex;
  height: 50px;
  border-bottom: 1px solid #e4e4e4;
  margin-left: 20px;
  align-items: center;
  font-size: 14px;
  .content {
    flex: 1;
    text-align: right;
    margin-right: 6px;
    color: #afafaf;
  }
  .arrow {
    padding-right: 20px;
    .iconfont {
      color: #dbdbdb;
    }
  }
}
</style>
