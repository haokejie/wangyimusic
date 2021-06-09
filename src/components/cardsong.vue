<template>
  <div class="carsong">
    <div class="carsongvessel" @click="handtomusic">
      <div>
        <img :src="item.picUrl + '?param=50y50'" />
      </div>

      <div>
        <div>
          {{ item.name }}
          <span v-if="item.song.alias[0]">{{
            '(' + item.song.alias[0] + ')'
          }}</span>
        </div>
        <div>
          {{ item.song.artists[0].name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  props: ['item'],
  methods: {
    ...mapMutations(['setplaymusicid']),
    handtomusic () {
      this.setplaymusicid(this.item)
    }
  }
}
</script>

<style lang="less" scoped>
.carsong {
  height: 60px;
  user-select: none;
  > .carsongvessel {
    &:hover {
      background: #3b3b3b;
      border-radius: 5px;
    }
    display: flex;
    width: 95%;
    margin: auto;
    height: 50px;
    > div img {
      width: auto;
      height: 50px;
      border-radius: 5px;
      cursor: pointer;
    }
    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      padding-left: 5px;
      overflow: hidden;
      > div:nth-child(1) {
        height: auto;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        > span {
          color: #666666;
        }
      }
      > div:nth-child(2) {
        color: #666666;
        height: auto;
        font-size: 13px;
        cursor: pointer;
      }
    }
  }
}
</style>
