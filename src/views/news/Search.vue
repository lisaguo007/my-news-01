<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="goBack">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="search">
        <input
        type='search'
        placeholder="小猪猪为什么要吃棒棒糖"
        v-model="key"
        @keyup.enter='search'
        @input="recommend"
      >
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <div class="recommend-list" v-if="recommendList.length">
      <div class="item"
      v-for="item in recommendList"
      :key="item.id"
      @click="goSearch(item.title)"
      >
        <p class="one-txt-cut"
        >{{item.title}}</p>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 搜索列表 -->
    <div class="list" v-else-if="list.length">
      <my-post v-for="item in list" :key="item.id" :post='item'></my-post>
    </div>
    <!-- 搜索页展示内容 -->
    <div class="content" v-else>
      <!-- 历史记录 -->
      <div class="history">
        <h3>历史记录</h3>
        <div class="list clearfix">
          <div
          v-for="item in history"
          :key="item" @click="goSearch(item)"
          >{{item}}</div>
        </div>
      </div>
      <div class="hot">
        <h3>热门搜索</h3>
        <div class="list clearfix">
          <div v-for="item in hot" :key="item">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '../../utils/tool'
export default {
  data() {
    return {
      key: '',
      list: [],
      history: [],
      hot: [],
      recommendList: []
    }
  },
  created() {
    this.history = JSON.parse(localStorage.getItem('history')) || []
    this.hot = ['关晓彤', '华为', '情火', '姑娘']
  },
  methods: {
    async search() {
      console.log(1111111)
      if (!this.key) return this.$toast('请输入搜索关键字')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
      this.history = this.history.filter(item => item !== this.key)
      // 把key添加到缓存中
      // 1. 如果原来有这个历史纪录，删除即可
      // 2. 添加到数组的前面
      this.history.unshift(this.key)
      localStorage.setItem('history', JSON.stringify(this.history))

      // 清空推荐
      this.recommendList = []
    },
    goSearch(item) {
      console.log(123)
      this.key = item
      this.search()
    },
    goBack() {
      if (this.key) {
        this.key = ''
        this.recommendList = ''
      } else {
        this.$router.back()
      }
    },
    recommend: debounce(async function() {
      if (this.key === '') return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        console.log(11111111)
        this.recommendList = data
        console.log(this.recommendList)
      }
    }, 1000)
  },
  watch: {
    key(value) {
      if (value === '') {
        this.list = ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
.search {
  .header {
    display: flex;
    height: 50px;
    // padding: 0 16px;
    background-color: #fff;
    border-bottom: 1px solid rgb(200, 200, 200);
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    .left,
    .right {
      width: 50px;
    }
    .left {
      span {
        color: #595959;
      }
    }
    .right {
      padding-right: 16px;
    }
    .search {
      flex: 1;
      position: relative;
      padding-right: 14px;
      input {
        width: 100%;
        height: 32px;
        border-radius: 16px;
        border: 1px solid #d7d7d7;
        padding-left: 30px;
      }
      span {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        margin-top: 1px;
      }
    }
  }
  .history,
  .hot {
    margin: 0 16px;
    padding: 20px 0;
    border-bottom: 1px solid rgb(200, 200, 200);
    h3 {
      font-size: 18px;
      font-weight: 700;
      color: #333333;
    }
    .list {
      margin-top: 10px;
      font-size: 16px;
      div {
        line-height: 30px;
        float: left;
        margin-right: 24px;
      }
    }
  }
  .recommend-list {
    height: 46px;
    line-height: 46px;
    margin: 0 16px;
    font-size: 16px;
    color: #333333;
    .item {
      display: flex;
      border-bottom: 1px solid #d7d7d7;
      justify-content: space-between;
      p {
        flex: 1;
      }
      span {
        margin-top: 4px;
        color: #dddddd;
        text-align: right;
      }
    }
  }
}
</style>
