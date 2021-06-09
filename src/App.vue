<template>
  <div id="app">
    <!-- <router-view /> -->
    <top-nav />
    <div class="cont">
      <aside-ui />
      <main-ui />
      <play-list />
      <lyric-main />
    </div>
    <footer-ui />
  </div>
</template>
<script>
// import request from './network/request'
// import tabbar from '@/components/tabbar'
import topNav from '@/views/Topnav'
import mainUi from '@/views/Main'
import asideUi from '@/views/Aside'
import footerUi from '@/views/Footer'
import playList from '@/views/Playlist'
import lyricMain from '@/views/lyricMain'
export default {
  data () {
    return {}
  },
  components: {
    topNav,
    mainUi,
    asideUi,
    footerUi,
    playList,
    lyricMain
  }
}
</script>
<style lang="less">
#app {
  height: 100%;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  background-color: #2b2b2b;
  color: #d5d5d5;
  min-width: 1000px;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 300px;
  overflow-y: auto;
}
.cont {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1;
  flex-grow: 1; //充满屏幕
  overflow: hidden;
  z-index: 1;
}
::-webkit-scrollbar {
  width: 6px; //滚动条宽度
}
::-webkit-scrollbar-track {
  background-color: transparent; //滚动条背景
}
::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background: #3f3f3f; //滚动滑块背景
}
html,
body {
  height: 100%;
}
.icon {
  width: 40px;
  height: 40px;
  // vertical-align: 20px;
  fill: currentColor;
  overflow: hidden;
}
</style>
