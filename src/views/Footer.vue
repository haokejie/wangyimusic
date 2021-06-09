<template>
  <div class="footerui">
    <play-content></play-content>
  </div>
</template>

<script>
import playContent from './footer/playcontent'
export default {
  components: {
    playContent
  }
}
</script>

<style lang="less" scoped>
.footerui {
  background-color: #222225;
  height: 74px;
  border-top: 1px solid #444444;
  flex-shrink: 0;
}
</style>
