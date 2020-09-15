import axios from 'axios'
import store from '@/store'

let ax = axios.create();

// config here

ax.defaults.baseURL = "https://frp.leavessoft.cn:50003/"

ax.interceptors.request.use(config =>
{
    // let token = localStorage.getItem("ApiToken")
    let token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjbG91ZC5jcmVhdG9yc24uY29tIiwic3ViIjoiQWNjZXNzVG9rZW4iLCJqdGkiOiIyNGE4YmJkYy1mNWJjLTQwOTMtODdkMi1iMWQxODkwMmE2OTMiLCJ1aWQiOiIyYTg5NzdkYS0xNGY2LTQ2OWYtYTVmYS0wZTQwZjA2NzdlODQiLCJyZWZyZXNoX2V4cGlyZSI6IjA5LzI5LzIwMjAgMTI6MzE6NTkiLCJleHAiOjE2MDAxNzMxMTl9.hmp-uYui3YKYipR-Cm5clK67BfvMh3Txixn_1FjlmtM"
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