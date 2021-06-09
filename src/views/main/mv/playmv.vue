<template>
  <div v-if="playmvid" class="flex column playmv overflow">
    <div class="flex overflow shrink " style="height: 350px">
      <div>
        <mv-play :mvId="playmvid"></mv-play>
      </div>
      <div class="flex column widthmax ">
        <div class="flex headpic">
          <img :src="headUrl" />
          <span> {{ `发布时间：${headTime}` }} </span>
        </div>
        <div class="flex column headconten ">
          <p>{{ headTittel }}</p>
          <span> {{ headcoten }} </span>
        </div>
      </div>
    </div>
    <div class="footer">
      <comment :mvId="playmvid"> </comment>
    </div>
  </div>
</template>
<script>
// import { httpGetAllMv } from '@/network/mvlist'
import comment from '@/components/comment'
import mvPlay from '../mvplay'
import { mapState, mapMutations } from 'vuex'
import { httpGetMvDetail } from '@/network/mvlist'
export default {
  data () {
    return {
      mvListItem: null,
      headUrl: '',
      headTittel: '',
      headcoten: '',
      headTime: ''
    }
  },
  computed: {
    ...mapState({
      // 当前播放的Mv id
      playmvid: state => state.playmvid
    })
  },
  components: {
    mvPlay,
    comment
  },
  methods: {
    ...mapMutations(['setplaymvid'])
  },
  created () {
    httpGetMvDetail(this.playmvid).then(res => {
      this.headUrl = res.data.data.cover + '?param=150y150'
      this.headTittel = res.data.data.name
      this.headcoten = res.data.data.desc
      this.headTime = res.data.data.publishTime
    })

    if (!this.playmvid) {
      this.$router.push({ name: 'mv' })
    }
  }
}
</script>
<style lang="less" scoped>
.playmv {
  height: 100%;
}
.flex {
  display: flex;
}
.column {
  flex-direction: column;
}
.widthmax {
  width: 100%;
}
.headpic {
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  > img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    // object-fit: cover;
  }
  > span {
    color: #777575;
    position: absolute;
    bottom: 0px;
    font-size: 14px;
  }
}
.headconten {
  margin: 0px 20px;
  font-size: 18px;
  font-weight: bold;

  > span {
    margin-top: 10px;
    font-size: 14px;
  }
}
.overflow {
  overflow: hidden;
}
.footer {
  overflow: auto;
  flex-grow: 1;
}
.shrink {
  flex-shrink: 0;
}
</style>
