<template>
  <div class="user">
    <div class="header" @click='$router.push("/user-edit")'>
      <div class="avatar">
        <img :src="base + user.head_img" alt="">
      </div>
      <div class="content">
        <div class="name">
          <span v-if='user.gender === 1' class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">
          {{user.create_date | time}}
        </div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <my-navitem to='/my-follow'>
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </my-navitem>
    <my-navitem to='/my-comment'>
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </my-navitem>
    <my-navitem>
      <template to='/follow'>我的收藏</template>
      <template #content>文章/视频</template>
    </my-navitem>
    <my-navitem>
      <template to='/follow'>设置</template>
      <template #content></template>
    </my-navitem>
    <div class="btn">
      <van-button type="danger" block @click='logout'>退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  async created() {
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗'
        })
      } catch {
        return this.$toast('取消退出')
      }

      // 说明点了确认
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast.success('退出成功')
    }
  }
}
</script>

<style lang='less' scoped>
.user {
  .header {
    display: flex;
    border-bottom: 5px solid #e4e4e4;
    padding: 32px 10px 32px 20px ;
    margin-bottom: 8px;
    align-items: center;
    .avatar {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .content {
      flex: 1;
      margin-left: 16px;
      font-size: 14px;
      color: #333333;
      .name {
        .iconxingbienan {
          margin-right: 6px;
          color: #81bfec;
        }
        .iconxingbienv {
          margin-right: 6px;
          color: pink;
        }
      }
      .time {
        margin-top: 7px;
        color: #afafaf;
      }
    }
    .arrow {
      width: 24px;
    }
  }
  .btn {
    padding: 16px;
  }
}
</style>
