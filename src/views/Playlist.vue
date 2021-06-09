<template>
  <transition name="bounce">
    <div class="playlist" v-show="playlistshow">
      <div class="top"><div>播放列表</div></div>
      <div class="tittle">
        <div class="as">共{{ playlist.length }}首</div>
        <div class="zj">
          收藏全部
        </div>
        <div class="ft" @click="handlistclean">
          清空
        </div>
      </div>
      <div class="bottom">
        <div
          v-for="obj in playlist"
          :key="obj.id"
          class="playlistconten "
          :class="obj.id === playmusicid ? 'actioncolor' : ''"
          @click="handplay(obj)"
        >
          <div class="as">{{ obj.name }}</div>
          <div class="zj">{{ obj.ar }}</div>
          <div class="ft">{{ obj.time }}</div>
        </div>

        <div class="autobottom"></div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      playlist: state => state.playlist,
      playmusicid: state => state.playmusicid,
      playlistshow: state => state.playlistshow
    })
  },
  methods: {
    ...mapMutations(['setplaymusicid', 'rstplaymusicclean']),
    handplay (obj) {
      this.setplaymusicid(obj)
    },
    handlistclean () {
      this.rstplaymusicclean()
    }
  }
}
</script>
<style lang="less" scoped>
.playlist {
  user-select: none;
  display: flex;
  flex-direction: column;
  background-color: #363636;
  position: absolute;
  right: 0px;
  width: 400px;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}
.flex {
  display: flex;
}
.tittle {
  flex: 0 0 40px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  font-size: 12px;
  & > div {
    color: #5e5e5e;
    width: 0px;
    &:nth-child(3) {
      color: #fff;
    }
  }
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 60px;
  > div {
    border-radius: 25px;
    background: #666666;
    padding: 4px 25px;
    font-size: 14px;
  }
}
.bottom {
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.as {
  flex-grow: 8;
}
.zj {
  flex-grow: 4;
}
.ft {
  flex-grow: 2;
}
.autobottom {
  flex-grow: 1;
}
.playlistconten {
  display: flex;
  padding: 5px 15px;
  font-size: 14px;
  > div {
    cursor: pointer;
    width: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:nth-child(3) {
      font-size: 12px;
      color: #5e5e5e;
    }
    &:nth-child(2) {
      color: #7e7e7e;
    }
  }
  &:nth-child(2n) {
    background: #393939;
  }
  &:hover {
    background: #494949;
  }
}
.actioncolor {
  color: red;
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
.keyframes(500px, 0, 0, 0, animation1_2); //初始化
.keyframes(0, 0, 500px, 0, animation1_3);
//执行

.bounce-enter-active {
  .animation(animation1_2, 0.2s, ease-in-out, 0s, 1, normal);
}
.bounce-leave-active {
  .animation(animation1_3, 0.2s, ease-in-out, 0s, 1, normal);
}
</style>
