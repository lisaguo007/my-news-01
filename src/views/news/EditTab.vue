<template>
  <div class="edit-tab">
    <my-header>栏目管理</my-header>
    <div class="content">
      <div class="active">
        <h5>点击删除以下频道</h5>
        <div class="list clearfix">
          <div class="item" v-for='item in activeList' :key="item.id" @click='delTab(item.id)'>{{item.name}}</div>
        </div>
      </div>
      <div class="deactive">
        <h5>点击添加以下频道</h5>
        <div class="list clearfix">
          <div class="item" v-for="item in deactiveList" :key="item.id" @click='addTab(item.id)'>{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
      if (activeList) {
        this.activeList = activeList
        this.deactiveList = deactiveList
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeList = data
        // console.log(this.activeList)
      }
    },
    delTab(id) {
      const index = this.activeList.findIndex(v => v.id === id)
      this.deactiveList.push(this.activeList[index])
      this.activeList.splice(index, 1)
    },
    addTab(id) {
      const index = this.deactiveList.findIndex(v => v.id === id)
      this.activeList.push(this.deactiveList[index])
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler(value) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.edit-tab {
  .content {
    padding: 16px;
    h5 {
      font-size: 14px;
      color: #7f8283;
      margin-bottom: 6px;
    }
    .list {
      font-size: 16px;
      text-align: center;
      line-height: 38px;
      margin-bottom: 10px;
      .item {
        float: left;
        width: 70px;
        margin: 6px 0;
        height: 38px;
        margin-right: 21px;
        border: 1px solid #d4d4d4;
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
      &:after {
        content: '';
        // flex: auto;
        width: 170px;
      }
    }
  }
}
</style>
