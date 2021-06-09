<template>
  <div class="swiper-container">
    <div class="swiper-wrapper" v-if="banners">
      <div
        v-for="(item, index) in banners.banners"
        :key="index"
        class="swiper-slide"
        :style="'  background-image: url(' + item.imageUrl + ')'"
      ></div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
  </div>
</template>

<script>
import { httpbanner } from '@/network/thatmusic'
import Swiper from 'swiper/bundle' // 引入swiper.js
import 'swiper/swiper-bundle.min.css' // 引入swiper.css
export default {
  data () {
    return {
      banners: null
    }
  },

  created () {
    httpbanner().then(res => {
      this.banners = res.data
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          effect: 'coverflow',
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 0,
            stretch: 250,
            depth: 250,
            modifier: 1,
            slideShadows: true
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletActiveClass: 'my-bullet-active'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },

          observer: true,
          loop: true
        })
      })
    })
  }
}
</script>
<style lang="less" scoped>
.swiper-container {
  width: 95%;
  height: 220px;
  margin: 20px auto;
  > .swiper-wrapper {
    > .swiper-slide {
      height: 200px;
      width: 60%;
      background-size: cover;
      border-radius: 10px;
    }
  }
  /deep/ .my-bullet-active {
    background: #ec4141;
    opacity: 1;
  }
  > .swiper-pagination {
    bottom: -2px;
  }
  > .swiper-button-prev {
    margin-top: -20px;
    height: 30px;
    width: 30px;
    color: #fff;
    background: #000;
    opacity: 0.3;
    border-radius: 25px;
    --swiper-navigation-size: 15px;
  }
  > .swiper-button-next {
    margin-top: -20px;
    height: 30px;
    width: 30px;
    color: #fff;
    background: #000;
    opacity: 0.3;
    border-radius: 25px;
    --swiper-navigation-size: 15px;
  }
}
</style>
