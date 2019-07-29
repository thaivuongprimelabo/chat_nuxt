export const state = () => ({
    data: {}
})

export const mutations = {
    add (state, user) {
        state.data = user;
    }
}