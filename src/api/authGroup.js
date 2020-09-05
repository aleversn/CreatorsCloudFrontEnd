import request from '@/utils/request'
var ADMIN_API='http://localhost:8010' ;

export function getList(param) {
  return request({
    url: ADMIN_API + '/authGroup/getList',
    method: 'post',
    data: param
  })
}

export function getPmIds(param) {
  return request({
    url: ADMIN_API + '/authGroup/getPmIds',
    method: 'post',
    data: param
  })
}

export function add(param) {
  return request({
    url: ADMIN_API + '/authGroup/add',
    method: 'post',
    data: param
  })
}

export function edit(param) {
  return request({
    url: ADMIN_API + '/authGroup/edit',
    method: 'post',
    data: param
  })
}

export function deleteGroup(param) {
  return request({
    url: ADMIN_API + '/authGroup/delete',
    method: 'post',
    data: param
  })
}
