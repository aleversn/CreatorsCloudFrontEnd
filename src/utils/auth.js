import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserUid="User-uid"
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserUid() {
  return Cookies.get(UserUid)
}

export function setUserUid(token) {
  return Cookies.set(UserUid, token)
}

export function removeUserUid() {
  return Cookies.remove(UserUid)
}


