import Vue from 'vue'
import Vuex from 'vuex'
import { httpgetmusicdetails } from '@/network/musiclist'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songlistid: null, // 歌单id
    playlist: [], // 播放列表
    playmusicstate: 1, // 播放器状态 用来控制的
    playmusicStateL: false, // 播放器状态 用来监控的
    playmusicid: 1840861415, // 正在播放的音乐id
    playmusicPicUrl: '', // 图片url
    playlistshow: false, // 播放列表显示状态
    lyricShow: false, // 歌词显示状态
    playmvid: null, // mvid
    playContentState: false, // 播放器状态
    playmusicTimes: 0 // 播放进度
  },
  mutations: {
    setplaymusicPicUrl (state, url) {
      state.playmusicPicUrl = url
    },
    setplaymusicTimes (state, time) {
      state.playmusicTimes = time
    },
    setplayContentState (state, bool) {
      state.playContentState = bool
    },
    setplaymusicStateL (state, bool) {
      state.playmusicStateL = bool
    },
    setlyricShow (state, isShow) {
      state.lyricShow = isShow
    },
    setplaymvstate (state) {
      state.playmusicstate += 1
    },
    setplaymvid (state, id) {
      state.playmvid = id
    },
    // 播放列表显示状态
    setplaylistshow (state, bool) {
      state.playlistshow = bool
    },
    // 设置歌单列表id
    setsonglistid (state, id) {
      state.songlistid = id
    },

    // 设置正在播放的音乐id
    setplaymusicid (state, obj) {
      state.playmusicid = obj.id
    },

    setplaymusicidn (state, id) {
      state.playmusicid = id
    },
    // 更新播放状态
    resetplaymusicid (state) {
      const _id = state.playmusicid
      if (_id) {
        if (state.playlist.filter(item => item.id === _id).length === 0) {
          // console.log('不存在 开始获取数据', _id)
          httpgetmusicdetails([_id]).then(res => {
            let istime = new Date(res.data.songs[0].dt)
            let m = istime.getMinutes()
            let s = istime.getSeconds()
            const obj = {}
            m = m < 10 ? '0' + m : m
            s = s < 10 ? '0' + s : s
            istime = `${m}:${s}`
            obj.id = res.data.songs[0].id // 音乐id
            obj.name = res.data.songs[0].name // 歌曲名字
            obj.ar = res.data.songs[0].ar[0].name // 歌手
            obj.al = res.data.songs[0].al.name // 专辑
            obj.dt = res.data.songs[0].dt // 时间毫秒
            obj.time = istime // 时间分钟
            obj.picUrl = res.data.songs[0].al.picUrl // 歌曲url

            state.playlist.push(obj)
          })
        }
      }
    },
    // 播放全部列表清空之前的
    rstplaymusicids (state, item) {
      state.playlist = item
      state.playmusicid = item[0].id
    },
    // 清空播放列表
    rstplaymusicclean (state) {
      state.playlist = []
    }
  },

  actions: {},
  modules: {},
  getters: {
    getsonglistid (state) {
      // console.log(state.songlistid)
      return state.songlistid
    }
  }
})
