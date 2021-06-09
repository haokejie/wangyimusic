<template>
  <div class="thatnav">
    <div v-for="(item, index) in thatNavList" :key="index">
      <router-link :to="item.link" :key="index" active-class="myactive">
        {{ item.name }}</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      thatNavList: [
        {
          link: '/thatmusic/recommend',
          name: '个性推荐'
        },
        {
          link: '/thatmusic/songlist',
          name: '歌单'
        },
        {
          link: '/thatmusic/rankinglist',
          name: '排行榜'
        },
        {
          link: '/thatmusic/newmusic',
          name: '最新音乐'
        },
        {
          link: '/thatmusic/mv',
          name: 'MV'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.thatnav {
  display: flex;
  width: 100%;
  max-width: 600px;
  align-items: center;
  margin-left: 20px;
  height: 50px;
  user-select: none;

  justify-content: space-around;
  > div {
    display: flex;
    width: 100%;
    justify-content: center;
    > .myactive {
      color: #d3cece;
      font-size: 21px;
      font-weight: bold;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: auto;
        bottom: 0;
        height: 2px;
        width: 85%;
        background-color: #ec4141;
      }
    }
    > a {
      color: #afafaf;
      height: 70%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      &:hover {
        color: #ffffff;
      }
    }
  }
}
</style>
