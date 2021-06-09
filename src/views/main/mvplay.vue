<template>
  <div>
    <div class="container" v-if="toPlayer">
      <video-player
        class="video-player-box"
        ref="videoPlayer"
        :options="video"
        :playsinline="true"
        customEventName="customstatechangedeventname"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @statechanged="playerStateChanged($event)"
        @ready="playerReadied"
      >
      </video-player>
    </div>
  </div>
</template>
<script>
// require styles
import 'video.js/dist/video-js.css'
import { mapState, mapMutations } from 'vuex'
import { videoPlayer } from 'vue-video-player'

import { httpGetMvUrl } from '@/network/mvlist'

export default {
  data () {
    return {
      video: {
        sources: [
          {
            src: null,
            type: 'video/mp4'
          }
        ],
        options: {
          autoplay: true,
          volume: 0.6,
          poster: ''
        }
      },
      toPlayer: false
    }
  },
  props: ['mvId'],
  computed: {
    ...mapState({
      playmusicstate: state => state.playmusicstate
    })
  },
  components: {
    videoPlayer
  },
  methods: {
    ...mapMutations(['setplaymvstate']),
    onPlayerPlay (player) {
      // console.log('player play!', player)
      if (this.playmusicstate) {
        this.setplaymvstate()
      }
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      // console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  },
  created () {
    httpGetMvUrl(this.mvId).then(res => {
      this.video.sources[0].src = res.data.data.url
      const _this = this
      setTimeout(() => {
        _this.toPlayer = true
      }, 30)
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;

  justify-content: center;
}

/deep/ .video-js {
  width: 600px;
  height: 350px;
}
</style>
