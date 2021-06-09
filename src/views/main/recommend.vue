<template>
  <div class="redcommend">
    <ban-ner></ban-ner>
    <div>
      <tittle-s torouter="songlist">
        <template> 推荐歌单</template>
      </tittle-s>
      <div class="cardsonglistvessel" v-if="cardSongListData">
        <card-song-list
          v-for="item in cardSongListData.result"
          :key="item.id"
          :item="item"
        ></card-song-list>
      </div>
    </div>
    <div>
      <tittle-s torouter="newmusic"> <template>最新音乐</template></tittle-s>
      <div v-if="cardSongData" class="cardsongvessel">
        <card-song
          v-for="(item, index) in cardSongData"
          :key="index"
          :item="item"
          class="width"
        ></card-song>
      </div>
    </div>
  </div>
</template>
<script>
import tittleS from '@/components/tittle'
import banNer from '@/components/banner'
import cardSongList from '@/components/cardsonglist'
import { httppersonalized, httpnewmusic } from '@/network/thatmusic'
import cardSong from '@/components/cardsong'
export default {
  components: {
    banNer,
    tittleS,
    cardSongList,
    cardSong
  },
  data () {
    return {
      cardSongListData: null,
      cardSongData: null
    }
  },
  created () {
    // 获取推荐歌单
    httppersonalized(15)
      .then(res => {
        // console.log(res)
        this.cardSongListData = res.data
      })
      .catch(error => {
        console.log(error)
      })
    // 获取最新音乐
    httpnewmusic()
      .then(res => {
        // console.log(res.data.albums)
        this.cardSongData = res.data.result
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
<style lang="less" scoped>
.cardsonglistvessel {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
}
.cardsongvessel {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
}
.width {
  width: 33%;
}
</style>
