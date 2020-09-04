<template>
  <div>
    <div class="placeholder"></div>
    <div class='my-header'>
      <div class="arrow" @click='back'>
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title"><slot></slot></div>
      <div class="menu"></div>
    </div>
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

<style lang='less' scoped>
.placeholder {
  height: 50px;
}
.my-header {
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #d4d4d4;
  background-color: #fff;
  text-align: center;
  line-height: 50px;
  z-index: 9999;
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
