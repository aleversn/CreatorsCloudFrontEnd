import request from '@/utils/request'
var FILE_API='http://localhost:8017' ;


export function getFileList(params) {
  return request({
    url: FILE_API + '/file/getList',
    method: 'post',
    params
  })
}




export function deleteFile(params) {
  return request({
    url: FILE_API + '/file/delete',
    method: 'post',
    data: params
  })
}



