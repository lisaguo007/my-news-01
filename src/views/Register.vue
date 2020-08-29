<template>
  <div class="register">
    <my-header>注册</my-header>
    <my-logo></my-logo>
    <van-form @submit="onSubmit">
    <van-field
      v-model="user.username"
      name="用户名"
      label="账号"
      placeholder="请输入用户名"
      :rules="rules.username"
    />
    <van-field
      v-model="user.nickname"
      name="用户名"
      label="账号"
      placeholder="请输入用户名"
      :rules="rules.nickname"
    />
    <van-field
      v-model="user.password"
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
    <p class="tips">已有账号?去<router-link to='/login'>登录</router-link></p>
  </van-form>
  </div>
</template>

<script>
export default {
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/register', {
        username: this.user.username,
        nickname: this.user.nickname,
        password: this.user.password
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        console.log(111)
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: this.user
        })
      } else {
        this.$toast.fail(message)
      }
    }
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度5-11位数字', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称必须是2-6位的中文', trigger: 'onChange' }
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

<style lang='less'>
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
