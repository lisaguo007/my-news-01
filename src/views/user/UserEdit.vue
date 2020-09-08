<template>
  <div class="user-edit">
    <my-header>编辑资料</my-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      <van-uploader :after-read="afterRead" />
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
      <van-field ref='nickname' v-model="nickname"  placeholder="请输入用户名"  />
    </van-dialog>
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm='updatePassword'>
      <van-field ref='password' v-model="password"  placeholder="请输入密码"  />
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

    <!-- 裁剪模态框 -->
    <div class="mask" v-show='isShowMask'>
      <van-button type="primary" class="crop" @click="crop">确定</van-button>
      <van-button type="default" class="cancel" @click='isShowMask = false'>取消</van-button>
      <vueCropper
        ref="cropper"
        :img="img"
        autoCrop
        autoCropWidth='100'
        autoCropHeight='100'
        fixed
      ></vueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
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
    async showNickname() {
      this.isShowNickname = true
      this.nickname = this.user.nickname
      // 等待DOM的更新
      await this.$nextTick()
      // 需要自动获取焦点
      this.$refs.nickname.focus()
    },
    async showPassword() {
      this.isShowPassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
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
    },
    isImg(name) {
      if (name.endsWith('.gif') || name.endsWith('jpg') || name.endsWith('.png') || name.endsWith('jpeg') || name.endsWith('webp')) {
        return true
      } else {
        return false
      }
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请上传图片')
      }
      if (file.file.size >= 200 * 1024) {
        return this.$toast.fail('上传的图片太大')
      }

      // 显示裁剪框
      this.isShowMask = true
      // 设置裁剪的图片
      this.img = file.content
    },
    crop() {
      this.$refs.cropper.getCropBlob(async blob => {
        // console.log(data)
        // 此时可以自行将文件上传至服务器  file.file
        // console.log('文件读取完毕', file)
        // 发送请求，上传文件
        // 如果是通过ajax上传文件，请求体不能直接是一个普通对象，必须是一个formData对象
        // 创建一个空的formData对象
        const fd = new FormData()
        // 给formData对象添加上传的文件
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          console.log(data.url)
          // 修改用户头像
          this.updateUser({
            head_img: data.url
          })
        }
        // 隐藏裁剪框
        this.isShowMask = false
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
      gender: 1,
      img: '',
      isShowMask: false
    }
  }
}
</script>

<style lang='less' scoped>
.user-edit {
  .avatar {
    position: relative;
    width: 90px;
    height: 90px;
    margin: 30px auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
    .crop,
    .cancel {
      position: fixed;
      top: 0;
      z-index: 999999;
    }
    .cancel {
      right: 0;
    }
  }
}
</style>
