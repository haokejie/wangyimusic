<template>
  <div class="thatmusic">
    <div>
      <that-nav />
    </div>

    <div class="redcommend">
      <router-view name="Routerthatmusic" />
    </div>
  </div>
</template>
<script>
import ThatNav from './nav/ThatNav'

export default {
  components: {
    ThatNav
  }
}
</script>
<style lang="less" scoped>
.thatmusic {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > .redcommend {
    position: relative;
    flex: auto;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
