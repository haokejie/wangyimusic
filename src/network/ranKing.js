import request from './request'
// 获取歌单列表
export function httpTopList () {
  return request({
    url: '/toplist'
  })
}
