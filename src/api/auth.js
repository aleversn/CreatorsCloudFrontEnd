import request from '@/utils/request'
//待改成process.env.ADMIN_API
var ADMIN_API='http://124.70.200.174:8010' ;

/**
 * 获取当前用户的访问菜单权限,会根据header中的token解析uid,无需发送uid
 */
export function getMenu() {
    return request({
      url:ADMIN_API + '/authority/getMenu',
      method: 'get'
    })
  }
  