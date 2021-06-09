<template>
  <div class="flex cardranking" v-if="item">
    <div class="ranimg">
      <img
        @click="handGotoList(item.id)"
        :src="`${item.coverImgUrl}?param=150y150`"
      />
    </div>
    <div class="grow">
      <div v-if="ranMusicList">
        <div
          v-for="(item, index) in ranMusicList.slice(0, 5)"
          :key="item.id"
          class="flex  rankingmusiclist"
          @click="setplaymusicidn(item.id)"
        >
          <div class="flex">
            <div class="margin">{{ index + 1 }}</div>
            <div>{{ item.name }}</div>
          </div>
          <div>
            {{ item.ar[0].name }}
          </div>
        </div>
        <div class="flex  rankingmusiclist" @click="handGotoList(item.id)">
          <div class="margin" style="cursor: pointer;color: #686868">
            查看全部 >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { httpgetmusiclist } from '@/network/musiclist'
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['item'],
  data () {
    return {
      ranMusicList: null
    }
  },
  computed: {
    ...mapState({
      // 当前播放的音乐id
      playmusicid: state => state.playmusicid,
      playlist: state => state.playlist,
      playlistshow: state => state.playlistshow
    })
  },
  created () {
    httpgetmusiclist(this.item.id).then(res => {
      this.ranMusicList = res.data.playlist.tracks
    })
  },
  methods: {
    ...mapMutations(['setplaymusicidn', 'setsonglistid']),
    handGotoList (id) {
      this.setsonglistid(id)
      this.$router.push({ name: 'musiclist' })
    }
  }
}
</script>
<style lang="less" scoped>
.cardranking {
  margin: 25px 25px;
  user-select: none;
  .ranimg {
    margin-right: 25px;
    cursor: pointer;
    img {
      border-radius: 5px;
    }
  }

  .rankingmusiclist {
    justify-content: space-between;
    padding: 5px 0px;
    font-size: 12px;
    border-radius: 5px;
    > div {
      &:nth-child(2) {
        color: #686868;
      }
    }

    &:nth-child(-n + 3) {
      > div:nth-child(1) {
        > div:nth-child(1) {
          color: red;
        }
      }
    }
    &:nth-child(n + 4) {
      > div:nth-child(1) {
        > div:nth-child(1) {
          color: #686868;
        }
      }
    }
    &:hover {
      background-color: #333333;
    }
    &:nth-child(2n-1) {
      background-color: #2e2e2e;
      &:hover {
        background-color: #333333;
      }
    }
  }
}
.margin {
  margin: auto 25px;
}
.flex {
  display: flex;
}
.flexcom {
  display: flex;
  flex-direction: column;
}

.grow {
  flex-grow: 1;
}
</style>
