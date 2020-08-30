<template>
  <div class="user-edit">
    <my-header>编辑资料</my-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
    </div>
    <my-navitem @click='showNickname'>
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </my-navitem>
    <my-navitem @click='showPassword'>
      <template>密码</template>
      <template #content>******</template>
    </my-navitem>
    <my-navitem @click='showGender'>
      <template>性别</template>
      <template #content>{{ user.gender === 1 ? '男':'女' }}</template>
    </my-navitem>
    <van-dialog v-model="isShowNickname" title="编辑昵称" show-cancel-button @confirm='updateNickname'>
      <van-field v-model="nickname"  placeholder="请输入用户名"  />
    </van-dialog>
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm='updatePassword'>
      <van-field v-model="password"  placeholder="请输入密码"  />
    </van-dialog>
    <van-dialog v-model="isShowGender" title="修改密码" show-cancel-button @confirm='updateGender'>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      // 发送请求之前, 获取个人信息
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async updateUser(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    showNickname() {
      this.isShowNickname = true
      this.nickname = this.user.nickname
    },
    showPassword() {
      this.isShowPassword = true
      this.password = this.user.password
    },
    showGender() {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    async updateNickname() {
      this.updateUser({
        nickname: this.nickname
      })
    },
    async updatePassword() {
      this.updateUser({
        password: this.password
      })
    },
    async updateGender() {
      this.updateUser({
        gender: this.gender
      })
    }
  },
  data() {
    return {
      user: '',
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 1
    }
  }
}
</script>

<style lang='less' scoped>
.user-edit {
  .avatar {
    width: 90px;
    height: 90px;
    margin: 30px auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
