<template>
  <div class="carsonglist" :style="{ width: `${width}%` }">
    <div class="carsonglistvessel" @click="handtomusiclist">
      <div>
        <img :src="item.picUrl + param" :style="{ height: height }" />
      </div>

      <div>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: String,
      default: 'auto'
    },
    torouter: {
      type: String,
      default: 'musiclist'
    },
    param: {
      type: String,
      default: '?param=150y150'
    }
  },
  methods: {
    handtomusiclist () {
      if (this.torouter === 'musiclist') {
        this.$store.commit('setsonglistid', this.item.id)
        // console.log(this.$store.getters.getsonglistid)
        this.$router.push({ name: 'musiclist' })
      } else if (this.torouter === 'playmv') {
        this.$store.commit('setplaymvid', this.item.id)
        // console.log(this.$store.getters.getsonglistid)
        this.$router.push({ name: 'playmv' })
      }
    }
  },
  mounted () {
    // console.log(this.item)
  }
}
</script>

<style lang="less" scoped>
.carsonglist {
  // width: 20%;
  // height: 200px;
  user-select: none;
  > .carsonglistvessel {
    width: 90%;
    padding: 0;
    padding-bottom: 10px;
    margin: auto;
    > div img {
      width: 100%;
      object-fit: cover;
      border-radius: 5px;
      cursor: pointer;
    }
    > div:nth-child(2) {
      > div {
        height: 45px;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        cursor: pointer;
      }
    }
  }
}
</style>
