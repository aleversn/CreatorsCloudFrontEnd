/* eslint-disable */
// Auto Scripts G Don't Edit
import axios from './axios'

// axios.interceptors.request.use(
//   config => {
//     if (
//       config.headers["Content-Type"].includes("x-www-form-urlencoded") ||
//       config.headers["Content-Type"].includes("multipart/form-data")
//     ) {
//       let formData = new FormData();
//       for (let item in config.data) {
//         if (config.data[item])
//         if (
//           typeof config.data[item] == "object" &&
//           Array.isArray(config.data[item])
//         ){  
//           for (let index in config.data[item]){
//               let i = config.data[item][index];
//               formData.append(item+'['+index+']',i);
//           }
//         }
//         else formData.append(item, config.data[item]);
//       }
//       config.data = formData;
//     }
//     return config;
//   },
//   error=>{
//     return Promise.reject(error)
//   }
// )
export class Auth {
  
  /**
  * @summary 获取登陆token
  * @param {string} [email] 邮箱号码
  * @param {string} [phone] 手机号码
  * @param {string} [password] 密码
  */
  static async Login(email,phone,password){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/user/session',
        data:{email,phone,password},
        params:{},
        headers:{
          "Content-Type":"application/json"
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 刷新session,即从开始有效期增加一天，最多15天
  */
  static async RefreshToken(){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/user/session',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 注册用户
  * @param {string} [email] 邮箱号码
  * @param {string} [phone] 手机号码
  * @param {string} [password] 密码
  */
  static async Register(email,phone,password){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/user',
        data:{email,phone,password},
        params:{},
        headers:{
          "Content-Type":"application/json"
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取用户的信息
  */
  static async GetCurrentUserInfo(){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/user/info',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取用户的uid
  */
  static async GetCurrentUserUid(){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/user/uid',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 创建用户组
  * @param {string} [name] 
  */
  static async AddUserGroup(name){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/usergroup',
        data:{name},
        params:{},
        headers:{
          "Content-Type":"application/json"
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 删除用户组
  * @param {string} [pathgid] 
  */
  static async RemoveUserGroup(pathgid){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/usergroup/'+pathgid+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 用户组加入用户
  * @param {string} [pathgid] 
  * @param {string} [pathuid] 
  */
  static async UserGroupAddUser(pathgid,pathuid){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/usergroup/'+pathgid+'/user/'+pathuid+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 用户组移除用户
  * @param {string} [pathgid] 
  * @param {string} [pathuid] 
  */
  static async UserGroupRemoveUser(pathgid,pathuid){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'delete',
        url:'/api/usergroup/'+pathgid+'/user/'+pathuid+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取用户组列表
  * @param {string} [name] 组名
  * @param {boolean} [fuzzy] 是否开启模糊查找（性能影响比较大）
  * @param {boolean} [with_user] 是否返回组内所有用户
  * @param {integer} [length] 长度
  * @param {integer} [last] 起始
  */
  static async GetUserGroupList(name,fuzzy,with_user,length,last){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/usergroups',
        data:{},
        params:{name,fuzzy,with_user,length,last},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取用户列表
  * @param {string} [email] 用户邮箱
  * @param {string} [phone] 用户手机号码
  * @param {integer} [length] 长度
  * @param {integer} [last] 起始
  */
  static async GetUserList(email,phone,length,last){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/users',
        data:{},
        params:{email,phone,length,last},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取权限列表
  * @param {string} [name] 权限名
  * @param {string} [url] 权限唯一定位标识
  * @param {string} [method] 权限方法
  * @param {boolean} [fuzzy] 是否开启模糊搜索
  * @param {integer} [length] 长度
  * @param {integer} [last] 起始
  */
  static async GetPermissionList(name,url,method,fuzzy,length,last){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/permissions',
        data:{},
        params:{name,url,method,fuzzy,length,last},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 添加权限组
  * @param {string} [name] 权限组名称
  * @param {string} [description] 权限组描述
  */
  static async AddPermissionGroup(name,description){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/permissiongroup',
        data:{name,description},
        params:{},
        headers:{
          "Content-Type":"application/json"
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 删除权限组
  * @param {string} [pathpgid] 
  */
  static async RemovePermissonGroup(pathpgid){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'delete',
        url:'/api/permissiongroup/'+pathpgid+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 修改权限组信息
  * @param {string} [pathpgid] 
  * @param {string} [name] 权限组名称
  * @param {string} [description] 权限组描述
  */
  static async UpdatePermissionGroup(pathpgid,name,description){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'put',
        url:'/api/permissiongroup/'+pathpgid+'',
        data:{name,description},
        params:{},
        headers:{
          "Content-Type":"application/json"
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 查询权限组
  * @param {string} [name] 权限组名称
  * @param {boolean} [fuzzy] 是否开启模糊查找
  * @param {boolean} [withpermission] 是否包含权限
  * @param {integer} [length] 长度
  * @param {integer} [last] 起始
  */
  static async GetPermissionGroupList(name,fuzzy,withpermission,length,last){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/permissiongroups',
        data:{},
        params:{name,fuzzy,withpermission,length,last},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 权限组添加权限
  * @param {string} [pathpgid] 
  * @param {string} [pathpid] 
  */
  static async PermissionGroupAddPermission(pathpgid,pathpid){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/permissiongroup/'+pathpgid+'/permission/'+pathpid+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 权限组删除权限
  * @param {string} [pathpgid] 
  * @param {string} [pathpid] 
  */
  static async PermissionGroupRemovePermission(pathpgid,pathpid){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'delete',
        url:'/api/permissiongroup/'+pathpgid+'/permission/'+pathpid+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 赋予用户组权限
  * @param {string} [pathgid] 
  * @param {string} [pathpgid] 
  */
  static async UserGroupAddPermissionGroup(pathgid,pathpgid){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/permissiongroup/'+pathpgid+'/usergroup/'+pathgid+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 删除用户组权限
  * @param {string} [pathgid] 
  * @param {string} [pathpgid] 
  */
  static async UserGroupRemovePermissionGroup(pathgid,pathpgid){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'delete',
        url:'/api/permissiongroup/'+pathpgid+'/usergroup/'+pathgid+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取用户组拥有的权限组
  * @param {string} [pathgid] 
  */
  static async GetUserGroupPermissionGroup(pathgid){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/usergroup/'+pathgid+'/permissiongroups',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取当前用户所属的用户组
  */
  static async GetCurrentUserGroupList(){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/user/groups',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 修改密码
  * @param {string} [password] 新密码
  * @param {string} [oldpassword] 旧密码
  */
  static async CurrentUserChangePassword(password,oldpassword){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/user/password',
        data:{password,oldpassword},
        params:{},
        headers:{
          "Content-Type":"application/json"
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary Grpc Web 访问
  * @param {string} [pathproxy_id] 
  * @param {string} [pathurl] 
  */
  static async GetGrpcWebAuth(pathproxy_id,pathurl){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/grpc_web/'+pathproxy_id+'/'+pathurl+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary Grpc Web 访问
  * @param {string} [pathproxy_id] 
  * @param {string} [pathurl] 
  */
  static async PostGrpcWebAuth(pathproxy_id,pathurl){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/grpc_web/'+pathproxy_id+'/'+pathurl+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary Grpc Web 访问
  * @param {string} [pathproxy_id] 
  * @param {string} [pathurl] 
  */
  static async DeleteGrpcWebAuth(pathproxy_id,pathurl){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'delete',
        url:'/grpc_web/'+pathproxy_id+'/'+pathurl+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary Grpc Web 访问
  * @param {string} [pathproxy_id] 
  * @param {string} [pathurl] 
  */
  static async PutGrpcWebAuth(pathproxy_id,pathurl){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'put',
        url:'/grpc_web/'+pathproxy_id+'/'+pathurl+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary undefined
  * @param {string} [pathurl] 
  */
  static async Auth(pathurl){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/'+pathurl+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary undefined
  * @param {string} [pathurl] 
  */
  static async Auth1(pathurl){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/'+pathurl+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
}
export class MicroService {
  
  /**
  * @summary 创建微服务部署
  * @param {string} [name] 部署名称
  * @param {string} [description] 部署描述
  * @param {string} [image_name] 镜像名称
  * @param {integer} [replicas] 副本数
  * @param {array} [portlist] 开放端口
  * @param {array} [envlist] 环境变量
  * @param {string} [command] 启动时运行命令，类似于Docker compose command参数
  * @param {object} [type] 
  * @param {integer} [session_affinity] 多副本下有效，负载均匀策略，0代表默认，1代表根据客户端IP进行负载均匀
  */
  static async CreateDeployment(name,description,image_name,replicas,portlist,envlist,command,type,session_affinity){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/microservice',
        data:{name,description,image_name,replicas,portlist,envlist,command,type,session_affinity},
        params:{},
        headers:{
          "Content-Type":"application/json"
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 删除指定Guid的微服务部署
  * @param {string} [pathdeployment_id] 
  */
  static async RemoveDeployment(pathdeployment_id){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'delete',
        url:'/api/microservice/deployment/'+pathdeployment_id+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取自己部署的服务
  * @param {integer} [length] 长度
  * @param {integer} [last] 起始
  */
  static async GetMyDeployments(length,last){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/user/microservice/deployment',
        data:{},
        params:{length,last},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取微服务部署
  * @param {string} [name] 部署的名称
  * @param {boolean} [fuzzy] 是否模糊查找
  * @param {integer} [length] 长度
  * @param {integer} [last] 起始
  */
  static async GetDeployments(name,fuzzy,length,last){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/microservice/deployment',
        data:{},
        params:{name,fuzzy,length,last},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 建立Grpc服务
  * @param {string} [pathdeployment_id] 部署的id
  * @param {integer} [port] 
  */
  static async SetProxy(pathdeployment_id,port){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/microservice/deployment/'+pathdeployment_id+'/proxy',
        data:{port},
        params:{},
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 获取已部署的代理
  * @param {string} [pathdeployment_id] 
  */
  static async GetProxys(pathdeployment_id){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'get',
        url:'/api/microservice/deployment/'+pathdeployment_id+'/proxies',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 删除代理
  * @param {string} [pathproxy_id] 
  */
  static async RemoveProxy(pathproxy_id){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'delete',
        url:'/api/microservice/deployment/proxy/'+pathproxy_id+'',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 重置代理
  */
  static async ResetAllProxy(){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/api/microservice/deployment/proxies/reset',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
}
export class XDS {
  
  /**
  * @summary 对接Envoy路由发现服务
  */
  static async RDSDiscoveryServer(){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/v2/discovery:routes',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
  
  /**
  * @summary 对接Envoy簇发现服务
  */
  static async CDSDiscoveryServer(){
    return await new Promise((resolve,reject)=>{
      let responseType = "json";
      let options = {
        method:'post',
        url:'/v2/discovery:clusters',
        data:{},
        params:{},
        headers:{
          "Content-Type":""
        }
      }
      if (responseType != "json"){
        options.responseType = responseType;
      }
      axios(options)
      .then(res=>{
        if (res.config.responseType=="blob"){
          resolve(new Blob([res.data],{
            type: res.headers["content-type"].split(";")[0]
          }))
        }else{
          resolve(res.data);
          return res.data
        }
      }).catch(err=>{
        if (err.response.data)
          reject(err.response.data)
        else
          reject(err.response);
      })
    })
  }
}