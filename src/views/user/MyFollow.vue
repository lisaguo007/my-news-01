<template>
  <div class="my-follow">
    <my-header>我的关注</my-header>
    <div class="list">
      <div class="item" v-for='item in list' :key='item.id'>
        <div class="avator">
          <img :src="$base+item.head_img" alt="">
        </div>
        <div class="content">
          <p>{{item.nickname}}</p>
          <p>{{item.create_date | time('YYYY-MM-DD HH:mm')}}</p>
        </div>
        <div class="btn">
          <button @click='unfollow(item.id)'>取消关注</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getFollowList()
  },
  methods: {
    async getFollowList() {
      const res = await this.$axios.get('/user_follows')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    },
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要取关该用户吗?'
        })
      } catch {
        return this.$toast('取消操作')
      }
      // 发送请求 取消关注
      const res = await this.$axios.get(`user_unfollow/${id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getFollowList()
      }
    }
  },
  data() {
    return {
      list: []
    }
  }
}
</script>

<style lang='less' scoped>
.my-follow {
  .list {
    .item {
      display: flex;
      height: 80px;
      border-bottom: 1px solid #d7d7d7;
      padding: 20px;
      align-items: center;
      .avator {
        width: 43px;
        height: 43px;
        margin-top: 4px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          vertical-align: center;
        }
      }
      .content {
        flex: 1;
        margin-left: 12px;
        color: #a8a8a8;
        font-size: 17px;
        p {
          text-align: left;
          &:first-child {
            margin-top: 4px;
            margin-bottom: 2px;
            color: #202020;
            // font-size: 16px;
          }
        }
      }
      .btn {
        button {
          width: 76px;
          height: 28px;
          color: #363636;
          background-color: #e1e1e1;
          font-size: 12px;
          border-radius: 16px;
          border: 0;
        }
      }
    }
  }
}
</style>
