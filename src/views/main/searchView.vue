<template>
  <div class="searchView overflow">
    <div class="flexcloumn musictittle  item overflow" v-if="searchList">
      <!-- 列表 -->
      <div class=" itemnone flexrow  musiclistlayyout">
        <i></i>
        <h3>音乐标题</h3>
        <h4>歌手</h4>
        <h5>专辑</h5>
        <h6>时长</h6>
      </div>
      <div class="musiclists item flexcloumn overflow  ">
        <div
          class="flexrow itemnone musiclistlayyout"
          v-for="(item, index) in searchList"
          :key="item.id"
          @click="handtoplaymusic(item)"
        >
          <i> {{ index + 1 }} </i>
          <h3>{{ item.name }}</h3>
          <h4>{{ item.ar[0].name }}</h4>
          <h5>{{ item.al.name }}</h5>
          <h6>{{ itemTimes(item.dt) }}</h6>
        </div>
        <div class="item"></div>
      </div>
      <div class="foot" v-show="limts !== 0">
        <div @click="handpag">点击加载更多</div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { httpGetSearch } from '@/network/musiclist'
import { mapMutations } from 'vuex'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      searchWord: null,
      searchList: null,
      currentPage: 1,
      limts: 0
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to.params.word, from.params.word)

    if (this.filterText(to.params.word)) {
      this.getMusicList(this.searchWord)
      next()
    } else {
      this.$message.error('请检查输入内容')
    }
  },
  // 监听属性 类似于data概念
  computed: {
    itemTimes () {
      return time => {
        const istime = new Date(time)
        let m = istime.getMinutes()
        let s = istime.getSeconds()
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        return `${m}:${s}`
      }
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapMutations(['setplaymusicid']),
    handpag () {
      let int = this.limts
      int += 30
      this.getMusicList(this.searchWord, int)
    },

    filterText (str) {
      if (str.length !== 0) {
        str = str.replace(/[^\w^\s^\u4e00-\u9fa5]/gi, '')
        if (str.length === 0) {
          return false
        } else {
          this.searchWord = str
          return true
        }
      } else {
        return false
      }
    },
    getMusicList (str, limt = 30) {
      httpGetSearch(str, limt)
        .then(res => {
          this.limts = limt
          this.searchList = res.data.result.songs
        })
        .catch(e => {
          this.limts = 0
        })
    },
    handtoplaymusic (item) {
      this.setplaymusicid(item)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (!this.filterText(this.$route.params.word)) {
      this.$message.error('请检查输入内容')
    } else {
      this.getMusicList(this.searchWord)
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.searchView {
  height: 100%;
  user-select: none;
}
.flexcloumn {
  display: flex;
  flex-direction: column;
}
.flexrow {
  display: flex;
  flex-direction: row;
}
.overflow {
  overflow: auto;
}
.item {
  flex: auto;
}
.itemnone {
  flex: 0 0 auto;
}
.musiclisttop {
  margin: 20px auto 20px 20px;
  > img {
    width: 180px;
    height: 180px;
    user-select: none;
    border-radius: 5px;
    margin-right: 20px;
    cursor: pointer;
  }
  > .musiccontent {
    border-radius: 5px;
    justify-content: center;
    // margin: 20px auto 20px 15px;
    > h1 {
      height: 40px;
      font-size: 25px;
      margin-bottom: 10px;
      white-space: nowrap;
    }
    > div {
      flex-grow: 1;
    }
    > button {
      width: 120px;
      user-select: none;
      font-size: 15px;
      background: #ec4141;
      border: 0px;
      border-radius: 25px;
      color: #fff;
      padding: 5px 25px 5px 15px;
      cursor: pointer;
    }
    > h3 {
      overflow: hidden;
      font-size: 14px;
      width: 95%;
      text-overflow: ellipsis;
      white-space: nowrap;
      > span {
        margin: auto 4px;
        color: #878787;
      }
    }
  }
}

.musiclistlayyout {
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  margin: auto 0px auto 0px;
  padding-left: 20px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  // overflow-x: hidden;
  &:nth-child(2n) {
    background: #2e2e2e;
  }
  &:hover {
    background-color: #373737;
  }
  > i {
    flex-grow: 0;
    width: 50px;
  }
  > h3 {
    width: 0px;
    flex-grow: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > h4 {
    width: 0px;
    color: #878787;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > h5 {
    width: 0px;
    color: #878787;
    flex-grow: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > h6 {
    width: 0px;
    width: 70px;
    color: #878787;
    flex-grow: 0;
  }
}
.musicbottomtittle {
  font-size: 14px;
  margin-left: 20px;
  > h1 {
    width: 60px;
    text-align: center;
  }
}
.foot {
  height: 50px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.musictittle {
  justify-content: flex-start;
}
</style>
