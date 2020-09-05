<template>
  <div class="login">
    <my-header>登录</my-header>
    <my-logo></my-logo>
    <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="用户名"
      label="账号"
      placeholder="请输入用户名"
      :rules="rules.username"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="请输入密码"
      :rules="rules.password"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
    <p class="tips">还没有账号?去<router-link to='/register'>注册</router-link></p>
  </van-form>
  </div>
</template>

<script>
export default {
  created() {
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        if (this.$route.query.back) {
          this.$router.back()
        }
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度是3-9位数字', trigger: 'onChange' }
        ]
      }
    }
  }
}
</script>

<style lang='less' scoped>
p {
  font-size: 14px;
  padding-top: 6px;
  padding-right: 20px;
  color: rgb(109, 109, 109);
  text-align: right;
  a {
    color: rgb(255, 161, 37);
  }
}
</style>
