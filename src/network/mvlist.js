import request from './request'
export function httpGetAllMv (area, offset, limit) {
  let params = {}
  if (limit) {
    params = {
      area,
      offset,
      limit
    }
  } else if (offset) {
    params = {
      area,
      offset
    }
  } else if (area) {
    params = {
      area
    }
  }
  return request({
    url: '/mv/all',
    params
  })
}
// 获取mvurl
export function httpGetMvUrl (id) {
  return request({
    url: '/mv/url',
    params: {
      id
    }
  })
}

// 获取mv评论
export function httpGetMvComment (id) {
  return request({
    url: '/comment/mv',
    params: {
      id
    }
  })
}
// 推荐mv
export function httpGetMvPer (offset) {
  return request({
    url: '/mv/exclusive/rcmd',
    params: {
      offset,
      limit: 48
    }
  })
}
// 获取mv详情
export function httpGetMvDetail (mvid) {
  return request({
    url: '/mv/detail',
    params: {
      mvid
    }
  })
}
