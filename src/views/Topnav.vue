<template>
  <div class="topnav">
    <div class="icons" @click="handgohome()">
      <i class="el-icon-platform-eleme "></i>
      <div>饿了么音乐</div>
    </div>
    <div class="backGo">
      <i class="el-icon-arrow-left" @click="handback()"></i>
      <i class="el-icon-arrow-right" @click="handgo()"> </i>
    </div>
    <div class="search">
      <el-input
        class="searchinput"
        size="small"
        v-model="SearchWord"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        @keyup.enter.native="handSearch"
      >
      </el-input>
    </div>
    <div>
      <el-avatar :size="30" icon="el-icon-user-solid"></el-avatar>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      SearchWord: ''
    }
  },
  methods: {
    handback () {
      this.$router.go(-1)
    },
    handgo () {
      this.$router.go(+1)
    },
    handgohome () {
      if (this.$route.path !== '/thatmusic/recommend') {
        this.$router.push({ name: 'RecomMend' })
      }
    },
    handSearch () {
      if (this.SearchWord.length !== 0) {
        this.$router.push(
          {
            name: 'search',
            params: {
              word: this.SearchWord
            }
          },
          onComplete => {},
          onAbort => {
            this.$message({
              showClose: true,
              message: '重复搜索',
              type: 'warning'
            })
          }
        )
      }
    }
  }
}
</script>
<style lang="less" scoped>
.topnav {
  height: 60px;
  flex: 0 0 60px;
  flex-shrink: 0;
  background-color: #222225;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  border-bottom: 2px solid #ab2020;
  > .icons {
    display: flex;
    font-size: 28px;
    height: 100%;
    align-items: center;
    user-select: none;
    margin-left: 20px;
    letter-spacing: 3px;
    margin-right: 80px;
    > div {
      font-size: 17px;
    }
  }
  > .backGo {
    display: flex;
    color: #c7c7c7;
    font-size: 15px;
    align-items: center;
    width: 50px;
    justify-content: space-between;
    > i {
      cursor: pointer;
    }
  }
  > .search {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;

    /deep/ input {
      background-color: #29292c;
      border: 1px solid transparent;
      border-radius: 60px;
      color: #fff;
      &::-webkit-input-placeholder {
        color: #4f4f52;
      }
    }
  }
  & > div:last-child {
    display: flex;
    align-items: center;
    margin: auto 25px auto auto;
  }
}
</style>
