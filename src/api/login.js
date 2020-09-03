import request from '@/utils/request'
//待改成process.env.ADMIN_API
var ADMIN_API='http://localhost:8010' ;
let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
export function userLogin(param) {
  return request({
    url:ADMIN_API+'/authority/login',
    method: 'post',
    data: param
  })
}

export function getInfo(token) {
  return request({
    url: ADMIN_API + '/auth/info',
    method: 'get',
    params: { token }
  })
}

export function getMenu() {
  return request({
    url:ADMIN_API + '/authority/getMenu',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: ADMIN_API + '/auth/logout',
    method: 'post'
  })
}
