export const state = () => ({
    data: []
})

export const mutations = {
    add (state, group) {
        state.data.push(group);
    },
    set (state, groups) {
        state.data = groups;
    }
}