import request from './request'
// 获取歌单列表
export function httpgetmusiclist (id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

// export function httpgetmusiclistS (id) {
//   return request.all({
//     url: '/playlist/detail',
//     params: {
//       id
//     }
//   })
// }
// 获取歌曲详情
export function httpgetmusicdetails (item) {
  item = item.join(',')
  const url = '/song/detail?' + Date.now()
  return request({
    url,
    method: 'post',
    data: {
      ids: item
    }
  })
}
// 获取歌曲url
export function httpgetmusicurl (id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}
// 判断歌曲是否可用
export function httpcheckmusic (id) {
  return request({
    url: '/check/music',
    params: {
      id
    }
  })
}
// 歌单分类
export function httpPlayListCatList () {
  return request({
    url: '/playlist/catlist'
  })
}
// 获取热门歌单分类
export function httpPlayListHot () {
  return request({
    url: '/playlist/hot'
  })
}
// 获取歌单网友精选
export function httpTopPlayList (cat, offset, limit) {
  let params = {}
  if (limit) {
    params = {
      cat,
      offset,
      limit
    }
  } else if (offset) {
    params = {
      cat,
      offset
    }
  } else if (cat) {
    params = {
      cat
    }
  } else {
    params = {
      cat: '全部'
    }
  }
  return request({
    url: '/top/playlist',
    params
  })
}
//  获取歌单标签列表
export function httpPlayListHighqualityTags () {
  return request({
    url: '/playlist/highquality/tags'
  })
}
// 获取精品歌单
export function httpTopPlayListHighquality (cat, limit, before) {
  let params = {}
  if (before) {
    params = {
      cat,
      limit,
      before
    }
  } else if (limit) {
    params = {
      cat,
      limit
    }
  } else if (cat) {
    params = {
      cat,
      limit: 20
    }
  } else {
    params = {
      cat: '全部',
      limit: 20
    }
  }
  return request({
    url: '/top/playlist/highquality',
    params
  })
}
//  获取歌单标签列表
export function httpgetMusicLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}
export function httpGetSearch (keywords, limit = 30) {
  return request({
    url: '/cloudsearch',
    params: {
      keywords,
      limit
    }
  })
}
