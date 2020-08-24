import axios from 'axios'
import store from '@/store'

let ax = axios.create();

// config here

ax.defaults.baseURL = "http://frp.leavessoft.cn:50003/"

ax.interceptors.request.use(config =>
{
    let token = localStorage.getItem("ApiToken")
    if (token)
    {
        config.headers["Authorization"] = token
    }
    return config
})

ax.interceptors.response.use(response =>
{
    if (response.status == 200) {
        store.commit('setNetwork', true);
        return Promise.resolve(response);
    }
    return Promise.reject(response);
}, error =>
{
    store.commit('setNetwork', false);
    return Promise.reject(error);
})

export default ax;