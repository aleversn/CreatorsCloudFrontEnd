import request from '@/utils/request'
var ADMIN_API='http://124.70.200.174:8010' ;

export function getUserList(params) {
  return request({
    url: ADMIN_API + '/user/getList',
    method: 'post',
    params
  })
}





export function addUser(params) {
  return request({
    url: ADMIN_API + '/user/add',
    method: 'post',
    data: params
  })
}

export function editUser(params) {
  return request({
    url: ADMIN_API + '/user/edit',
    method: 'post',
    data: params
  })
}

export function deleteMenu(params) {
  return request({
    url: ADMIN_API + '/user/delete',
    method: 'post',
    data: params
  })
}

export function stickUser(params) {
  return request({
    url: ADMIN_API + '/user/stick',
    method: 'post',
    data: params
  })
}

