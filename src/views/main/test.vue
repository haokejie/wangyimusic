<template>
  <div class="flex outer">
    <div style="background-color: silver; padding: 10px;">
      外容器 自适应内容的区域 ... ...
    </div>
    <div class="flex item overflow" style="padding: 15px;">
      <!-- 嵌套的item加flex样式 及 overflow: auto属性 -->
      <div class="flex  overflow">
        <!-- overflow: auto 高度自适应必须 -->
        <div style="background-color: yellow;">
          <h3>内容器 - 头部信息</h3>
        </div>
        <div class="item overflow">
          <h3 v-for="index in 100" :key="index">内容器 - 溢出</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { httpgetmusicdetails } from '@/network/musiclist'
// import request from '@/network/request'
// import musicList from '@/components/musiclist'

export default {
  // components: {
  //   musicList
  // },
  data () {
    return {
      datas: ''
    }
  },
  created () {
    // request
    //   .post('/album/newest')
    //   .then(res => {
    //     console.log(res)
    //     this.datas = '获取成功'
    //   })
    //   .catch(error => {
    //     this.datas = '获取失败'
    //     console.log(error)
    //   })
    httpgetmusicdetails(['347230', '347231'])
      .then(res => {
        console.log(res)
        this.datas = '获取成功'
      })
      .catch(error => {
        this.datas = '获取失败'
        console.log(error)
      })
  }
}
// 歌单id > playlist > tracks >[0] > id
// "6586623370"
//
</script>
<style lang="less" scoped>
.flex {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}
.item {
  flex: auto;
}
.overflow {
  overflow: auto;
}
.outer {
  height: 100%;
  border: 1px solid silver;
}
.contener {
  background: pink;
  border: 1px solid silver;
}
.contener > div {
  padding: 5px;
}
</style>
