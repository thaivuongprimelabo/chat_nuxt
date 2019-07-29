export const state = () => ({
    data: {}
})

export const mutations = {
    add (state, userInfo) {
        state.data = userInfo;
    }
}