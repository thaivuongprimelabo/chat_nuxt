export const state = () => ({
    error: '',
    success: ''
})

export const mutations = {
    error (state, error) {
        state.error = error;
    },
    success (state, success) {
        state.success = success;
    }
}