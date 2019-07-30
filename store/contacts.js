export const state = () => ({
    inbox: [],
    sent: [],
    new_contact: [],
    showSendForm: false,
    data: {}
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
    },
    showSendForm(state, showSendForm) {
        state.showSendForm = showSendForm;
    },
    setContactData(state, data) {
        state.data = data;
    },
}