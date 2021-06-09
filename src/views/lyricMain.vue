<template>
  <transition name="bounce">
    <div class="lyricmain " v-if="playmusicPicUrl" v-show="lyricShow">
      <div class="logn  center  flex  ">
        <div class="center picKeys" :class="picstate">
          <img :src="`${playmusicPicUrl}?param=230y230`" />
        </div>
      </div>
      <div class="lyricbox flex overflow ">
        <div class="haed  flex shrink">
          <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="grow"></div>
        <div class="lyric flexc  overflow ">
          <ul class="flexc centerw  widthmax overflowa" ref="lyricbox">
            <li
              v-for="(obj, index) in Lyrics"
              :key="index"
              :class="{ action: showLyicsClass(obj.time, index + 1) }"
            >
              {{ obj.words }}
            </li>
          </ul>
        </div>
        <div class="grow"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { httpgetMusicLyric } from '@/network/musiclist'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      lyricvalue: '',
      Lyrics: [],
      lyricBoxHeight: 0,
      lyricIndex: 0,
      inter: null,
      lyricAllmusic: ' [00:00.000] 纯音乐尽请欣赏',
      lyricInsert:
        '[00:00.000] \n [00:00.000]  \n [00:00.000]  \n  [00:00.000] \n [00:00.000] \n '
    }
  },
  watch: {
    lyricShow (newValu) {
      if (newValu) {
        this.$nextTick(() => {
          this.lyricBoxHeight = this.$refs.lyricbox.scrollHeight
        })
      }
    },

    lyricIndex (newValu) {
      if (this.inter) {
        clearInterval(this.inter)
      }
      if (this.lyricShow && this.lyricBoxHeight !== 0) {
        let _allHeight = 0
        _allHeight = this.lyricBoxHeight / 30 - 5
        if (this.lyricIndex <= _allHeight) {
          let _getheight = this.$refs.lyricbox.scrollTop
          _getheight = (this.lyricIndex - 6) * 30 - _getheight // 差值
          if (_getheight > 0 && _getheight < 400) {
            this.inter = setInterval(() => {
              if (_getheight <= 0) {
                clearInterval(this.inter)
              } else {
                this.$refs.lyricbox.scrollTop++
                _getheight--
              }
            }, 16)
          } else if (_getheight < 0 && _getheight > -400) {
            this.inter = setInterval(() => {
              if (_getheight >= 0) {
                clearInterval(this.inter)
              } else {
                this.$refs.lyricbox.scrollTop--
                _getheight++
              }
            }, 16)
          } else if (_getheight >= 400) {
            this.inter = setInterval(() => {
              if (_getheight <= 0) {
                clearInterval(this.inter)
              } else {
                this.$refs.lyricbox.scrollTop =
                  this.$refs.lyricbox.scrollTop + 10
                _getheight = _getheight - 10
              }
            }, 16)
          } else if (_getheight < -400) {
            this.inter = setInterval(() => {
              if (_getheight >= 0) {
                clearInterval(this.inter)
              } else {
                this.$refs.lyricbox.scrollTop =
                  this.$refs.lyricbox.scrollTop - 10
                _getheight = _getheight + 10
              }
            }, 16)
          }
        }
      }
    },
    playmusicid (newvalu) {
      if (newvalu && this.playContentState) {
        httpgetMusicLyric(newvalu).then(res => {
          if (res.data.lrc) {
            this.dealwith(res.data.lrc.lyric)
          } else {
            this.dealwith(this.lyricAllmusic)
          }

          if (this.lyricShow) {
            this.$nextTick(() => {
              this.lyricBoxHeight = this.$refs.lyricbox.scrollHeight
            })
          }
        })
      }
    }
  },
  computed: {
    ...mapState({
      playlist: state => state.playlist,
      playmusicPicUrl: state => state.playmusicPicUrl,
      lyricShow: state => state.lyricShow,
      playmusicStateL: state => state.playmusicStateL,
      playmusicid: state => state.playmusicid,
      playContentState: state => state.playContentState,
      playmusicTimes: state => state.playmusicTimes
    }),
    picstate () {
      return this.playmusicStateL ? 'run' : 'paused'
    },
    showLyicsClass () {
      return (times, index) => {
        const length = this.Lyrics.length
        if (index >= length) {
          return true
        } else {
          if (
            this.playmusicTimes >= times &&
            this.playmusicTimes <= this.Lyrics[index].time
          ) {
            this.lyricIndex = index
            return true
          } else {
            return false
          }
        }
      }
    }
  },
  created () {
    setTimeout(() => {
      httpgetMusicLyric(this.playmusicid).then(res => {
        // console.log(res)

        if (res.data.lrc) {
          this.dealwith(res.data.lrc.lyric)
        } else {
          this.dealwith(this.lyricAllmusic)
        }
        if (this.lyricShow) {
          this.$nextTick(() => {
            this.lyricBoxHeight = this.$refs.lyricbox.scrollHeight
          })
        }
      })
    }, 300)
  },
  methods: {
    ...mapMutations(['setlyricShow', 'setplaymusicStateL']),
    close () {
      this.setlyricShow(false)
    },
    getlyricbox () {
      this.$nextTick(() => {
        console.log(this.$refs.lyricbox.scrollTop, this.lyricIndex)
        this.$refs.lyricbox.scrollTop = 500
      })
    },
    dealwith (par) {
      par = `${this.lyricInsert} ${par}`
      var arr = [] // 创建一个存放歌词的新数组
      arr = par.split('\n') // 对字符串进行分割,par 处理文件
      // console.log(arr)
      this.Lyrics = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {} // 声明一个对象
        var words = arr[i].split(']') // 将歌词里的】进行删除
        obj.words = words ? words[1] : '' // 进行容错处理，判断歌词是否存在，如果存在元素添加，如果没有就是空字符
        var time = words[0].slice(1, 10) // 截取不需要的字符
        obj.time = time ? this.formatLyricsTime(time) : '' // 把时间赋给时间的time
        this.Lyrics.push(obj)
      }
      // console.log(this.Lyrics)
    },
    formatLyricsTime (time) {
      // 格式化歌词时间 转换成sss：ms
      const regSec = /:.*\./
      const min = parseInt(time.split(':')[0])
      let sec = parseInt(time.match(regSec)[0].slice(1, 3))
      const ms = parseInt(time.split('.')[1])
      if (min !== 0) {
        sec += min * 60
      }
      return Number(sec + '.' + ms)
    }
  }
}
</script>

<style lang="less" scoped>
.lyricmain {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  background: #222225;
  z-index: 9;
  user-select: none;
}
.flex {
  display: flex;
}
.flexc {
  display: flex;
  flex-direction: column;
}
.logn {
  flex-grow: 2;
  width: 0px;
  > div {
    width: 330px;
    height: 330px;
    background: rgb(17, 20, 14);
    display: flex;
    border-radius: 100%;
    animation: pickey 25s linear infinite;

    > img {
      border-radius: 100%;
    }
  }
  > .run {
    animation-play-state: running;
  }
  > .paused {
    animation-play-state: paused;
  }
}
.lyricbox {
  flex-grow: 2;
  width: 0px;
  flex-direction: column;
  > .haed {
    height: 60px;
    margin: 0 30px 0 0;
    align-items: center;
    justify-content: flex-end;
    > i {
      font-size: 35px;
    }
  }
  > .lyric {
    height: 330px;
    flex-shrink: 0;
    color: #6e6e6f;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 15px;
    > ul {
      // transform: translateY(-100px);
      height: 100%;
      > li {
        height: 30px;
        flex-shrink: 0;
      }
    }
  }
}

.grow {
  flex-grow: 1;
}
.shrink {
  flex-shrink: 0;
}
.overflow {
  overflow: hidden;
}
.overflowa {
  overflow: auto;
}
.heightmax {
  height: 100%;
}
.widthmax {
  width: 100%;
}
.centerw {
  align-items: center;
}
.center {
  justify-content: center;
  align-items: center;
}
.action {
  color: white;
}
.keyframes(@fx,@fy,@tx,@ty,@name) {
  @keyframes @name {
    from {
      transform: translate(@fx, @fy);
      // opacity: 0.5;
      // filter: alpha(opacity=50);
    }
    to {
      transform: translate(@tx, @ty);
      // opacity: 1;
      // filter: alpha(opacity=100);
    }
  }
}
//固定模式
.animation(@animation-name, @animation-duration, @animation-timing-function, @animation-delay,
  @animation-iteration-count,
  @animation-direction) {
  animation: @arguments;
}
.keyframes(0, 2000px, 0, 0, animation1_2); //初始化
.keyframes(0, 0, 0, 2000px, animation1_3);
//执行

.bounce-enter-active {
  .animation(animation1_2, 1s, ease-in-out, 0s, 1, normal);
}
.bounce-leave-active {
  .animation(animation1_3, 1s, ease-in-out, 0s, 1, normal);
}
.pic(@name) {
  @keyframes @name {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.pic(pickey);
</style>
