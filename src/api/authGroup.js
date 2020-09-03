import request from '@/utils/request'
var ADMIN_API='http://localhost:8010' ;

export function getList(param) {
  return request({
    url: ADMIN_API + '/MenuAuthGroup/getList',
    method: 'post',
    data: param
  })
}
export function add(param) {
  return request({
    url: ADMIN_API + '/MenuAuthGroup/add',
    method: 'post',
    data: param
  })
}

export function edit(param) {
  return request({
    url: ADMIN_API + '/MenuAuthGroup/edit',
    method: 'post',
    data: param
  })
}

export function deleteGroup(param) {
  return request({
    url: ADMIN_API + '/MenuAuthGroup/delete',
    method: 'post',
    data: param
  })
}
