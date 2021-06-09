<template>
  <div class="rankinglist">
    <div v-if="items" class="width">
      <cad-ran-king
        :item="item"
        v-for="item in items"
        :key="item.id"
      ></cad-ran-king>
    </div>
  </div>
</template>
<script>
import cadRanKing from '@/components/cardRanKing'
import { httpTopList } from '@/network/ranKing'
export default {
  data () {
    return {
      items: null
    }
  },
  components: {
    cadRanKing
  },

  methods: {},
  created () {
    httpTopList().then(res => {
      this.items = res.data.list
    })
  }
}
</script>
<style lang="less" scoped>
.rankinglist {
  display: flex;
}
.width {
  width: 100%;
}
</style>
