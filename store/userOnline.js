export const state = () => ({
    data: []
})

export const mutations = {
    add (state, userOnline) {
        state.data = userOnline;
    }
}