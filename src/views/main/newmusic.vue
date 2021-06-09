<template>
  <div>
    <div v-if="cardSongData">
      <card-song
        :item="item"
        v-for="(item, index) in cardSongData"
        :key="index"
      ></card-song>
    </div>
  </div>
</template>
<script>
import cardSong from '@/components/cardsong'
import { httpnewmusic } from '@/network/thatmusic'
export default {
  data () {
    return { cardSongData: null }
  },
  components: {
    cardSong
  },
  created () {
    httpnewmusic(100)
      .then(res => {
        this.cardSongData = res.data.result
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
