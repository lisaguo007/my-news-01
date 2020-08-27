<template>
  <div class='my-header'>
    <div class="arrow" @click='back'>
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title"><slot></slot></div>
    <div class="menu"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less'>
.my-header {
  display: flex;
  height: 50px;
  border-bottom: 1px solid #d4d4d4;
  text-align: center;
  line-height: 50px;
  .arrow,
  .menu {
    width: 50px;
  }
  .title {
    flex: 1;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
