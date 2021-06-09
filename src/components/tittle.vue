<template>
  <div class="tittle">
    <span @click="handtorouter">
      <slot></slot>
      <i class="el-icon-arrow-right"></i
    ></span>
  </div>
</template>
<script>
export default {
  props: ['torouter'],
  methods: {
    handtorouter () {
      this.$router.push({ name: this.torouter })
    }
  }
}
</script>
<style lang="less" scoped>
.tittle {
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  > span {
    font-size: 20px;
    font-weight: bold;
    user-select: none;
    color: #d0d0d0;
    &:hover {
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
