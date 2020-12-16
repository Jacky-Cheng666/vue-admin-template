// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }
// 1，获取localStorage方法
export function getToken(key) {
  return window.localStorage.getItem(key)
}
// 2，设置localStorage方法
export function setToken(key, token) {
  window.localStorage.setItem(key, token)
}
// 3，清除localStorage方法
export function removeToken(key) {
  window.localStorage.removeItem(key)
}