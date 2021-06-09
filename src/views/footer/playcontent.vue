<template>
  <div class="playcontent">
    <audio
      :src="playmusicurl"
      @error="playAudioError()"
      @pause="playPaused()"
      @ended="playAudioEnd()"
      @play="playPlay()"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      ref="audioVo"
    ></audio>
    <div class="textwarp" @click="lyricShowView()">
      <img :src="`${playmusicPicUrl}?param=50y50`" />

      <div class="textwarp">
        <div class="textwarp">
          {{ playmusicName }}
        </div>
        <div class="textwarp">
          {{ playmusicSinger }}
        </div>
      </div>
    </div>
    <div>
      <div>
        <svg
          class="icon "
          @click="playmodel < 3 ? (playmodel += 1) : (playmodel = 0)"
        >
          <use :xlink:href="playModel"></use>
        </svg>

        <svg class="icon " @click="playNext(false)">
          <use xlink:href="#icon-ai10"></use>
        </svg>
        <svg class="icon playicon" @click="playState ? pauseB() : playB()">
          <use :xlink:href="playState ? '#icon-zanting' : '#icon-bofang'"></use>
        </svg>
        <svg class="icon " @click="playNext(true)">
          <use xlink:href="#icon-ai09"></use>
        </svg>
        <svg
          class="icon "
          :class="lyricShow ? 'actionColor' : ''"
          @click="lyricShowView()"
        >
          <use xlink:href="#icon-geciweidianji"></use>
        </svg>
      </div>
      <div>
        <i>{{ isMusicTimes }}</i>
        <div class="progressbar">
          <el-slider
            :max="musicTime"
            v-model="isMusicTime"
            :format-tooltip="formatSecondsView"
            @mousedown.native="mouseState = false"
            @change="handchange"
          ></el-slider>
        </div>

        <i>{{ musicTimes }}</i>
      </div>
    </div>
    <div>
      <svg
        class="icon "
        :style="{ color: soundStopVolume ? 'red' : '' }"
        @click="soundStop"
      >
        <use xlink:href="#icon-laba"></use>
      </svg>
      <div class="soundPlan">
        <el-slider
          :max="100"
          v-model="musicVolume"
          @change="handSound"
        ></el-slider>
      </div>
      <div></div>
      <svg class="icon " @click="handplaylistshow">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { httpgetmusicurl, httpgetmusicdetails } from '@/network/musiclist'
export default {
  data () {
    return {
      playmusicurl: '', // 音乐url
      // playmusicPicUrl: '', // 音乐图片url
      playmusicName: '', // 音乐名称
      playmusicSinger: '', // 歌手
      musicTime: 10, // 歌曲总时长
      isMusicTime: 0, // 当前歌曲播放进度
      musicTimes: '01:00', // 歌曲总时长 ui显示
      isMusicTimes: '00:00', // 当前歌曲播放进度 ui显示
      playState: false, // 播放器状态 判断播放还是暂停
      musicVolume: 60, // 音量
      soundStopVolume: true, // 是否静音
      mouseState: true, // 鼠标状态
      playmodel: 2, // 0 播放就结束 1 单曲循环 2 顺序播放 3随机播放
      clearTimeOutPlay: null,
      clearTimeOutPause: null
    }
  },
  computed: {
    ...mapState({
      // 当前播放的音乐id
      playmusicid: state => state.playmusicid,
      playlist: state => state.playlist,
      playlistshow: state => state.playlistshow,
      playmusicstate: state => state.playmusicstate,
      playmusicPicUrl: state => state.playmusicPicUrl,
      lyricShow: state => state.lyricShow,
      playmusicStateL: state => state.playmusicStateL,
      playContentState: state => state.playContentState
    }),
    playModel () {
      let _str = '#icon-liebiao1'
      if (this.playmodel === 0) {
        _str = '#icon-liebiao1'
      } else if (this.playmodel === 1) {
        _str = '#icon-danquxunhuan'
      } else if (this.playmodel === 2) {
        _str = '#icon-shunxubofang'
      } else if (this.playmodel === 3) {
        _str = '#icon-suijibofang'
      }
      return _str
    }
  },
  created () {
    // console.log('获取初始值0', this.playmusicid)

    const _id = Number(localStorage.getItem('playmusicid')) // 输出
    if (_id !== 0) {
      this.setplaymusicidn(_id)
    }
    if (this.playmusicid) {
      this.resetplaymusicid() // 更新播放列表
      httpgetmusicdetails([this.playmusicid]).then(res => {
        this.setplaymusicPicUrl(res.data.songs[0].al.picUrl)
        this.playmusicName = res.data.songs[0].name
        this.playmusicSinger = res.data.songs[0].ar[0].name
      })
      httpgetmusicurl(this.playmusicid).then(res => {
        this.playmusicurl = res.data.data[0].url
        // setTimeout(()=>{},300)
        setTimeout(() => {
          this.setplayContentState(true)
        }, 30)
      })
    }
  },
  methods: {
    ...mapMutations([
      'resetplaymusicid',
      'setplaylistshow',
      'setplaymusicidn',
      'setplaymusicPicUrl',
      'setlyricShow',
      'setplaymusicStateL',
      'setplayContentState',
      'setplaymusicTimes'
    ]),
    lyricShowView () {
      this.setlyricShow(!this.lyricShow)
    },
    handplaylistshow () {
      this.setplaylistshow(!this.playlistshow)
    },
    handchange () {
      this.$refs.audioVo.currentTime = this.isMusicTime / 10
      this.mouseState = true
    },
    soundStop () {
      this.$refs.audioVo.muted = !this.$refs.audioVo.muted
      this.soundStopVolume = this.$refs.audioVo.muted
    },
    handSound () {
      this.$refs.audioVo.volume = this.musicVolume / 100
    },
    play () {
      if (this.playState) {
        const _this = this
        if (_this.clearTimeOutPause) {
          clearInterval(_this.clearTimeOutPause)
          _this.clearTimeOutPause = setTimeout(() => {
            _this.$refs.audioVo.pause()
            _this.clearTimeOutPause = null
          }, 100)
        } else {
          _this.clearTimeOutPause = setTimeout(() => {
            _this.$refs.audioVo.pause()
          }, 100)
        }
      }
      // this.audioPaused = false
      httpgetmusicdetails([this.playmusicid]).then(res => {
        this.setplaymusicPicUrl(res.data.songs[0].al.picUrl)
        this.playmusicName = res.data.songs[0].name
        this.playmusicSinger = res.data.songs[0].ar[0].name
      })
      httpgetmusicurl(this.playmusicid).then(res => {
        this.playmusicurl = res.data.data[0].url
        const _this = this
        if (_this.clearTimeOutPlay) {
          clearInterval(_this.clearTimeOutPlay)
          _this.clearTimeOutPlay = setTimeout(() => {
            _this.$refs.audioVo.play()
            _this.clearTimeOutPlay = null
          }, 100)
        } else {
          _this.clearTimeOutPlay = setTimeout(() => {
            _this.$refs.audioVo.play()
            _this.clearTimeOutPlay = null
          }, 100)
        }
      })
    },
    playB () {
      const _this = this
      setTimeout(() => {
        _this.$refs.audioVo.play()
      }, 200)
    },

    pauseB () {
      const _this = this
      setTimeout(() => {
        _this.$refs.audioVo.pause()
      }, 200)
    },
    // playS () {

    // },
    // 回调事件播放结束
    playNext (bool) {
      if (this.playmodel === 0) {
        this.playState = false
      } else if (this.playmodel === 1) {
        this.$refs.audioVo.play()
      } else if (this.playmodel === 2) {
        let _int = this.playlist.findIndex(item => item.id === this.playmusicid)

        const _intlength = this.playlist.length - 1
        if (bool) {
          if (_int < _intlength) {
            _int += 1
            this.setplaymusicidn(this.playlist[_int].id)
          } else {
            this.$message({
              message: '已经是第最后一首了',
              type: 'warning'
            })
          }
        } else {
          if (_int > 0) {
            _int -= 1
            this.setplaymusicidn(this.playlist[_int].id)
          } else {
            this.$message({
              message: '已经是第一首了',
              type: 'warning'
            })
          }
        }
      } else if (this.playmodel === 3) {
        const index = Math.floor(Math.random() * this.playlist.length)
        this.setplaymusicidn(this.playlist[index].id)
      }
    },

    playAudioEnd () {
      this.playNext(true)
    },
    // 回调事件播放错误
    playAudioError () {
      this.playState = false
      this.setplaymusicStateL(this.playState)
      console.log('播放错误')
      this.play()
    },
    // 回调事件播放暂停
    playPaused () {
      this.playState = false
      this.setplaymusicStateL(this.playState)
    },
    // 回调事件开始播放
    playPlay () {
      this.playState = true
      this.setplaymusicStateL(this.playState)
    },
    onTimeupdate (res) {
      if (this.mouseState) {
        this.isMusicTime = parseInt(res.target.currentTime * 10)
        this.setplaymusicTimes(res.target.currentTime)
        this.isMusicTimes = this.formatSeconds(res.target.currentTime)
      }
    },
    // 加载完毕
    onLoadedmetadata (res) {
      if (res.target.volume !== this.musicVolume / 100) {
        res.target.volume = this.musicVolume / 100
      }
      if (res.target.muted !== this.soundStopVolume) {
        this.soundStopVolume = res.target.muted
      }
      // console.log(res.target.muted)
      this.musicTimes = this.formatSeconds(res.target.duration)
      this.musicTime = parseInt(res.target.duration * 10)
    },
    formatSeconds (value) {
      const result = parseInt(value)
      const h =
        Math.floor(result / 3600) < 10
          ? '0' + Math.floor(result / 3600)
          : Math.floor(result / 3600)
      const m =
        Math.floor((result / 60) % 60) < 10
          ? '0' + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60)
      const s =
        Math.floor(result % 60) < 10
          ? '0' + Math.floor(result % 60)
          : Math.floor(result % 60)
      let res = ''
      if (h !== '00') res += `${h}:`
      res += `${m}:${s}`
      return res
    },
    formatSecondsView (value) {
      let result = value / 10
      result = parseInt(result)
      const h =
        Math.floor(result / 3600) < 10
          ? '0' + Math.floor(result / 3600)
          : Math.floor(result / 3600)
      const m =
        Math.floor((result / 60) % 60) < 10
          ? '0' + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60)
      const s =
        Math.floor(result % 60) < 10
          ? '0' + Math.floor(result % 60)
          : Math.floor(result % 60)
      let res = ''
      if (h !== '00') res += `${h}:`
      res += `${m}:${s}`
      return res
    }
  },
  watch: {
    playmusicid (newVal, oldVal) {
      localStorage.setItem('playmusicid', newVal)
      if (newVal && this.playContentState) {
        this.resetplaymusicid()
        this.play()
      } else {
        this.$refs.audioVo.pause()
      } // 更新播放状态
    },
    playmusicstate (newVal, oldVal) {
      this.$refs.audioVo.pause()
    }
  }
}
</script>

<style lang="less" scoped>
.playcontent {
  display: flex;
  height: 100%;
  user-select: none;
  //图标部分
  > div:nth-child(2) {
    flex: 0 0 250px;
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 15px;
    > div {
      margin-left: 15px;
      font-size: 14px;
    }
    > img {
      border-radius: 5px;
    }
  }
  //播放控件部分
  > div:nth-child(3) {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;
    > div:nth-child(1) {
      flex: 7 0 0;
      display: flex;
      align-items: center;
      width: 45%;
      justify-content: space-around;
      > .playicon {
        width: 35px;
        height: 35px;
      }
      > svg {
        cursor: pointer;
      }
    }
    //播放进度条部分
    > div:nth-child(2) {
      overflow: hidden;
      flex: 4 0 0;
      width: 450px;
      display: flex;
      align-items: center;
      > i {
        width: 40px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #4b4b4e;
      }
      > .progressbar {
        flex-grow: 1;
      }
    }
  }
  > div:nth-child(4) {
    flex: 0 0 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    .soundPlan {
      width: 100px;
      flex-grow: 0;
    }
    > div {
      flex-grow: 1;
    }
    > svg:nth-child(1) {
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
    > svg {
      color: #fff;
      flex-grow: 0;
    }
    > svg:nth-child(4) {
      margin-right: 25px;
    }

    /deep/ .el-slider {
      height: 3px;
      overflow: hidden;
      .el-slider__runway {
        height: 3px;
        margin-top: 0;
        background-color: #4b4b4e;

        .el-slider__bar {
          height: 3px;
          background: #ec4141;
        }
        .el-slider__button-wrapper {
          top: 0;
          height: 3px;
          cursor: pointer;
          .el-slider__button {
            width: 2px;
            height: 3px;
            border-radius: 0;
            background: #ffffff;
          }
        }
        .el-slider__stop {
          width: 1px;
          height: 3px;
          border-radius: 0;
          background-color: #dcdfe6;
        }
      }
    }
  }
}

/deep/ .el-slider {
  height: 4px;
  overflow: hidden;
  .el-slider__runway {
    height: 4px;
    margin-top: 0;
    background-color: #4b4b4e;

    .el-slider__bar {
      height: 4px;
      background: #ec4141;
    }
    .el-slider__button-wrapper {
      top: 0;
      height: 4px;
      cursor: pointer;
      .el-slider__button {
        width: 4px;
        height: 4px;
        border-radius: 0;
        background: #ffffff;
      }
    }
    .el-slider__stop {
      width: 1px;
      height: 4px;
      border-radius: 0;
      background-color: #dcdfe6;
    }
  }
}
.icon {
  width: 20px;
  height: 20px;
}
.textwarp {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.actionColor {
  color: #ec4141;
}
</style>
