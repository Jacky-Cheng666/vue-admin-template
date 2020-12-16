import request from '@/utils/request'

// 鉴权登录
export function login(data) {
  return request({
      url: "users/check_sts_token",
      method: "post",
      data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout(data) {
  return request({
      url: "users/logout",
      method: "post",
      data
  })
}
