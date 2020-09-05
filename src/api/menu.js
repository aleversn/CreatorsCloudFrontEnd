import request from '@/utils/request'
var ADMIN_API='http://localhost:8010' ;

export function getMenuList(params) {
  return request({
    url: ADMIN_API + '/menu/getList',
    method: 'post',
    params
  })
}

export function getAllMenu() {
  return request({
    url: ADMIN_API + '/menu/getAll',
    method: 'get',
  })
}

export function getButtonAll(params) {
  return request({
    url: ADMIN_API + '/menu/getButtonAll',
    method: 'get',
    params
  })
}

export function addMenu(params) {
  return request({
    url: ADMIN_API + '/menu/add',
    method: 'post',
    data: params
  })
}

export function editMenu(params) {
  return request({
    url: ADMIN_API + '/menu/edit',
    method: 'post',
    data: params
  })
}

export function deleteMenu(params) {
  return request({
    url: ADMIN_API + '/menu/delete',
    method: 'post',
    data: params
  })
}

export function stickMenu(params) {
  return request({
    url: ADMIN_API + '/menu/stick',
    method: 'post',
    data: params
  })
}

