<template>
  <div class="flex">
    <card-song-list
      :item="item"
      v-for="item in mvListItem"
      :key="item.id"
      :width="25"
      :height="'120px'"
      :param="'?param=200y100'"
      :torouter="'playmv'"
    ></card-song-list>
  </div>
</template>
<script>
// httpGetAllMv,
import { httpGetMvPer } from '@/network/mvlist'
import cardSongList from '@/components/cardsonglist'
export default {
  data () {
    return {
      mvListItem: null
    }
  },
  components: {
    cardSongList
  },
  created () {
    // httpGetAllMv('全部').then(res => {
    //   console.log(res.data.data)
    //   res.data.data.forEach(element => {
    //     element.picUrl = element.cover
    //   })
    //   this.mvListItem = res.data.data
    // })

    httpGetMvPer().then(res => {
      res.data.data.forEach(element => {
        element.picUrl = element.cover
      })
      this.mvListItem = res.data.data
    })
  }
}
</script>
<style lang="less" scoped>
.flex {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>
