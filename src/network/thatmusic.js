import request from './request'
// 获取推荐歌单
export function httppersonalized (limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}
// 获取轮播图
export function httpbanner () {
  return request({
    url: '/banner'
  })
}
// 获取最新音乐10首
export function httpnewmusic (limit) {
  if (!limit) {
    limit = 12
  }
  return request({
    url: '/personalized/newsong',
    params: {
      limit
    }
  })
}
