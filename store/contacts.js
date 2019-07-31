export const state = () => ({
    inbox: [],
    sent: [],
    not_seen: 0,
    showSendForm: false,
    data: {}
})



export const mutations = {
    addInbox (state, inbox) {
        if(!inbox.status) {
            state.inbox.unshift(inbox);
        } else {
            state.inbox.push(inbox);
        }

        if(inbox.status <= 1) {
            state.not_seen++;
        }
    },
    addSent (state, sent) {
        if(!sent.status) {
            state.sent.unshift(sent);
        } else {
            state.sent.push(sent);
        }
    },
    setNotSeen(state, not_seen) {
        if(state.not_seen > 0) {
            state.not_seen = state.not_seen - 1;
        }
        
    },
    showSendForm(state, showSendForm) {
        state.showSendForm = showSendForm;
    },
    setContactData(state, data) {
        state.data = data;
    },
    setInbox(state, inbox) {
        state.inbox = inbox;
    },
    setSent(state, sent) {
        state.sent = sent;
    }
}