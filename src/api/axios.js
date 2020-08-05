import axios from 'axios'

let ax = axios.create();

// config here

ax.defaults.baseURL="http://frp.leavessoft.cn:50003/"

ax.interceptors.request.use(config=>{
    let token = localStorage.getItem("ApiToken")
    if (token){
        config.headers["Authorization"]=`Bearer ${token}`
    }
    return config
})

export default ax;