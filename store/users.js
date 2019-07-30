export const state = () => ({
    data: []
})

export const mutations = {
    add (state, users) {
        state.data = users;
    }
}