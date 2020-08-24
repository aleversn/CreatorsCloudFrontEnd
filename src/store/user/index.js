const User = {
    state: {
        info: {
            userId: null
        }
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
        }
    },
    actions: {},
    getters: {}
};

export default User;  