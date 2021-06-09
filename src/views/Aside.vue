<template>
  <div class="aside">
    <list-menu />
  </div>
</template>

<script>
import listMenu from './aside/ListMenu'

export default {
  components: {
    listMenu
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.aside {
  flex: 0 0 200px;
  // height: 100%;
  flex-grow: 1;
  overflow: auto;
  background-color: #2b2b2b;
  width: 100%;
  border-right: 1px solid #444444;
}
</style>
