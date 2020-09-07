const getters={
    avatar: state => state.User.avatar,
    name: state => state.User.name,
    groups: state => state.User.groups,
    menu: state => state.User.menu,
    buttonMap: state => state.User.buttonMap,
}
export default getters;