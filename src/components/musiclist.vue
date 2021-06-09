<template>
  <div class="musiclist flexcloumn" v-if="songlistobj">
    <!-- 顶部布局 -->
    <div class="musiclisttop itemnone flexrow">
      <img :src="songlistobj.playlist.coverImgUrl + '?param=150y150'" />
      <!-- 右侧内容 -->
      <div class="musiccontent flexcloumn">
        <h1>{{ songlistobj.playlist.name }}</h1>
        <button @click="handallplaylist">
          <i class="el-icon-video-play"></i> 播放全部
        </button>
        <div></div>
        <h3>
          标签：<span v-for="item in songlistobj.playlist.tags" :key="item">{{
            item
          }}</span>
        </h3>
        <h3>
          歌曲：<span>{{ songlistobj.playlist.trackIds.length }}</span>
        </h3>
        <h3>
          简介：<span>{{ songlistobj.playlist.description }}</span>
        </h3>
      </div>
    </div>
    <!-- 下部分布局 -->
    <div class=" flexcloumn item overflow">
      <!-- bar -->
      <div class="flexrow itemnone musicbottomtittle">
        <h1>歌曲列表</h1>
        <h1>评论</h1>
        <h1>收藏者</h1>
      </div>

      <div class="flexcloumn musictittle  item overflow" v-if="songobj">
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
            v-for="(item, index) in songobjlist"
            :key="item.id"
            @click="handtoplaymusic(item)"
          >
            <i> {{ index + 1 }} </i>
            <h3>{{ item.name }}</h3>
            <h4>{{ item.ar }}</h4>
            <h5>{{ item.al }}</h5>
            <h6>{{ item.time }}</h6>
          </div>
          <div class="item"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { httpgetmusiclist, httpgetmusicdetails } from '@/network/musiclist'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      songlistid: null, // 当前歌单id
      songlistobj: null, // 歌单列表
      songobj: null, // 歌单对象
      songobjlist: null, // 歌单数据解析后
      songitemlist: [] // 歌曲id列表用来拉取歌曲列表
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['rstplaymusicids', 'setplaymusicid']),

    handallplaylist () {
      this.rstplaymusicids(this.songobjlist)
    },
    handtoplaymusic (item) {
      this.setplaymusicid(item)
    }
  },
  created () {
    // 获取歌单
    this.songlistid = this.$store.getters.getsonglistid
    if (this.songlistid) {
      httpgetmusiclist(this.songlistid).then(res => {
        this.songlistobj = res.data

        res.data.playlist.trackIds.forEach(element => {
          this.songitemlist.push(element.id)
        })
        // 获取歌曲列表
        httpgetmusicdetails(this.songitemlist).then(res => {
          // console.log(res.data.songs)
          const _item = []
          res.data.songs.forEach(element => {
            const _obj = {}
            let istime = new Date(element.dt)
            let m = istime.getMinutes()
            let s = istime.getSeconds()
            m = m < 10 ? '0' + m : m
            s = s < 10 ? '0' + s : s
            istime = `${m}:${s}`
            element.time = istime
            _obj.id = element.id
            _obj.name = element.name
            _obj.ar = element.ar[0].name
            _obj.al = element.al.name
            _obj.dt = element.dt
            _obj.time = istime
            _item.push(_obj)
          })
          this.songobjlist = _item
          // console.log(_item)
          // console.log(this.songobjlist)
          this.songobj = res.data.songs
        })
      })
    } else {
      // 歌单id空跳转首页
      this.$router.push({ name: 'RecomMend' })
    }
  }
}
</script>
<style lang="less" scoped>
.musiclist {
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
// .musiclists {
//   flex-grow: 0;
// }
.musictittle {
  justify-content: flex-start;
}
</style>
