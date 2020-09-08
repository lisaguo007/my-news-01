<template>
  <div class="my-star">
    <my-header>我的收藏</my-header>
    <my-post v-for="item in list" :key="item.id" :post='item'></my-post>
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
        this.list.forEach(item => {
          item.comment_length = item.comments.length
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
