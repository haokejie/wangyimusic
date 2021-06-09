<template>
  <div class="songlist">
    <div class="title">
      <div>
        {{ tag }}
      </div>
      <div class="fill"></div>
      <div v-if="hotTags">
        <div
          v-for="(item, index) in hotTags"
          :key="index"
          :style="{ color: item.name === tag ? 'red' : '' }"
          @click="handtag(item.name)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="list" v-if="playListS">
      <card-song-list
        :item="item"
        v-for="(item, index) in playListS"
        :key="index"
      />
    </div>
    <div class="foot">
      <div>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="10"
          :page-size="1"
          @current-change="handpag"
          :current-page="currentPage"
        >
        </el-pagination>
      </div>
    </div>
    <div class="fill"></div>
  </div>
</template>
<script>
import { httpPlayListHot, httpTopPlayList } from '@/network/musiclist'
import cardSongList from '@/components/cardsonglist'
export default {
  data () {
    return {
      hotTags: null,
      tag: '华语',
      playListS: null,
      playListPages: {},
      playListPage: 1,
      upDateTime: null,
      offSet: 0,
      currentPage: 1
    }
  },
  components: {
    cardSongList
  },
  methods: {
    handpag (val) {
      this.currentPage = val
      this.offSet = val * 50
      const _str = this.offSet.toString()
      if (this.playListPages[_str]) {
        this.playListS = this.playListPages[_str]
      } else {
        this.getPlayList(this.tag)
      }
    },

    handtag (tag) {
      if (tag !== this.tag) {
        this.getPlayList(tag)
      }
    },
    getPlayList (tag) {
      if (tag === this.tag) {
        httpTopPlayList(tag, this.offSet).then(res => {
          res.data.playlists.forEach(element => {
            element.picUrl = element.coverImgUrl
          })
          this.tag = tag
          this.playListS = res.data.playlists
          const _str = this.offSet.toString()
          this.playListPages[_str] = res.data.playlists
        })
      } else {
        this.offSet = 50
        this.currentPage = 1
        httpTopPlayList(tag, this.offSet).then(res => {
          res.data.playlists.forEach(element => {
            element.picUrl = element.coverImgUrl
          })
          this.tag = tag
          this.playListS = res.data.playlists
          this.playListPages = {}
          const _str = this.offSet.toString()
          this.playListPages[_str] = res.data.playlists
        })
      }
    }
  },
  created () {
    httpPlayListHot().then(res => {
      this.hotTags = res.data.tags
    })
    this.getPlayList(this.tag)
  },

  mounted () {}
}
</script>
<style lang="less" scoped>
.songlist {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  user-select: none;
  > .title {
    display: flex;
    width: 100%;
    height: 40px;
    flex-shrink: 0;
    > div:nth-child(1) {
      padding-left: 10px;
    }
    > div:last-child {
      padding-right: 10px;
      display: flex;
      color: #878787;
      > div {
        margin: auto 8px;
        font-size: 13px;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  > .foot {
    height: 140px;
    flex-shrink: 0;
    /deep/ .el-pagination {
      > .btn-prev {
        background: #383838;
        border-radius: 5px;
        border: 1px solid #494949;
      }
      > .el-pager {
        > .number {
          background: transparent;
          border: 1px solid #494949;
          border-radius: 5px;
          &:hover {
            color: rgba(255, 255, 255, 0.616);
          }
        }
        > .active {
          background-color: #ec4141;
          color: #fff;
          &:hover {
            color: #fff;
          }
        }
        > .more {
          background: transparent;
          border: 1px solid #494949;
          border-radius: 5px;
          &:hover {
            color: rgba(255, 255, 255, 0.616);
          }
        }
      }
      > .btn-next {
        background: #383838;
        border-radius: 5px;
        border: 1px solid #494949;
      }
    }
  }
}

.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.fill {
  flex-grow: 1;
}
</style>
