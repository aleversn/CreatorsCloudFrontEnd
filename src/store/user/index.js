import {getMenu} from '../../api/auth'
//user相关store,包括user信息和user的权限表
const User = {
    state: {
        info: {
            userId: null
        },
        name: '',
        avatar: '',
        groups: [],
        menu: {},
        buttonMap: {}
    },
    mutations: {
        setInfo(state, info)
        {
            state.info = info;
        },
        clearInfo(state)
        {
            state.info = {
                userId: null
            };
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_GROUPS: (state, groups) => {
            state.roles = groups
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
        },
        SET_BUTTON_MAP: (state, buttonMap) => {
            state.buttonMap = buttonMap
        }        
    },
    actions: {
        // 获取菜单列表
        GetMenu({ commit }) {
            return new Promise((resolve, reject) => {
            getMenu().then(response => {
                const data = response.data
                console.log("获取的菜单", data)
                // 这里对按钮进行一些处理
                let buttonList = data.buttonList
                let map = new Map();
                for(let a=0; a<buttonList.length; a++) {
                map.set(buttonList[a].url, buttonList[a])
                }
                commit('SET_BUTTON_MAP', map)
                commit('SET_MENU', data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
            })
        },        
    },
    getters: {}
};

export default User;  