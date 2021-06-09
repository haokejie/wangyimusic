<template>
  <div class="listMenu">
    <div v-for="(item, index) in list" :key="index">
      <router-link
        :to="item.link"
        :key="index"
        active-class="myactive"
        @click.native="handtothatmusic(index)"
      >
        {{ item.title }}
      </router-link>
    </div>
    <div @click="handplaylistshow" :class="playlistshow ? 'actionshow' : ''">
      播放列表
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      list: [
        {
          link: '/thatmusic',
          title: '发现音乐',
          transform: false
        },

        {
          link: '/playmv',
          title: '播放MV',
          transform: false
        },
        {
          link: '/musiclist',
          title: 'List',
          transform: false
        }
      ]
    }
  },
  computed: {
    ...mapState({
      playlist: state => state.playlist,
      playmusicid: state => state.playmusicid,
      playlistshow: state => state.playlistshow
    })
  },

  methods: {
    ...mapMutations(['setplaylistshow']),
    handplaylistshow () {
      this.setplaylistshow(!this.playlistshow)
    },
    handtothatmusic (index) {
      if (
        (this.list[index].link === this.list[0].link) &
        (this.list[index].link === this.$route.path)
      ) {
        // console.log('按钮跳转', this.$route.path)
        this.$router.push({ name: 'RecomMend' })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.listMenu {
  height: 180px; //正常200
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  margin-right: 10px;
  user-select: none;

  cursor: pointer;
  font-size: 14px;
  text-indent: 5px;

  > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    margin-top: 2px;
    border-radius: 5px;

    > .myactive {
      color: #d2d2d2;
      background: #333333;
      border-radius: 5px;
      font-size: 18px;
      font-weight: bold;
    }
    > a {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      flex-direction: column;
      color: #d5d5d5c2;
    }
    > a:hover {
      background-color: #333333;
      color: #d2d2d2;
      border-radius: 5px;
    }
  }
}
.actionshow {
  color: red;
}
</style>
