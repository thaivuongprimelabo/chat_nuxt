export const state = () => ({
    inbox: [],
    sent: [],
    new_contact: []
})

export const mutations = {
    addInbox (state, inbox) {
        state.inbox = inbox;
    },
    addSent (state, sent) {
        state.sent = sent;
    },
    addNewContact (state, new_contact) {
        state.new_contact = new_contact;
    }
}