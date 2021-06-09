<template>
  <div class="comment" v-if="comments">
    <div class="tittle">
      评论区
    </div>
    <div v-for="(item, index) in commentItem" :key="index" class="conent">
      <div>{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
import { httpGetMvComment } from '@/network/mvlist'
export default {
  data () {
    return {
      comments: {},
      commentItem: []
    }
  },
  props: ['mvId'],
  created () {
    httpGetMvComment(this.mvId).then(res => {
      this.comments = res.data
      this.commentItem = [...res.data.hotComments, ...res.data.comments]
    })
  }
}
</script>
<style lang="less" scoped>
.tittle {
  font-size: 20px;
}

.comment {
  display: flex;
  flex-direction: column;
  padding: 5px 25px;
  > .conent {
    margin: 5px 0px;
    font-size: 14px;
    color: #8d8d8d;
  }
}
</style>
