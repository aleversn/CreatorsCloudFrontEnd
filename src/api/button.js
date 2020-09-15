import request from '@/utils/request'
var ADMIN_API='http://124.70.200.174:8010' ;


export function getButtonAll(params) {
  return request({
    url: ADMIN_API + '/button/getList',
    method: 'post',
    params
  })
}

export function addButton(params) {
  return request({
    url: ADMIN_API + '/button/add',
    method: 'post',
    data: params
  })
}

export function editButton(params) {
  return request({
    url: ADMIN_API + '/button/edit',
    method: 'post',
    data: params
  })
}

export function deleteButton(params) {
  return request({
    url: ADMIN_API + '/button/delete',
    method: 'post',
    data: params
  })
}


