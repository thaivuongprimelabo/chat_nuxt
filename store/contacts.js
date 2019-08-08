export const state = () => ({
    inbox: [],
    sent: [],
    not_seen: 0,
    showSendForm: false,
    data: {}
})



export const mutations = {
    addInbox (state, inbox) {
        var idx = -1;
        var not_seen = 0;
        for(var i in state.inbox) {
            if(state.inbox[i].id === inbox.id) {
                idx = i;
            }

            if(state.inbox[i].status <= 1) {
                not_seen++;
            }
        }

        if(idx >= 0) {
            state.inbox[idx] = inbox;
        } else {
            if(!inbox.status) {
                state.inbox.unshift(inbox);
            } else {
                state.inbox.push(inbox);
            }
        }

        state.not_seen = not_seen;
    },
    addSent (state, sent) {
        var idx = -1;
        for(var i in state.sent) {
            if(state.sent[i].id === sent.id) {
                idx = i;
            }
        }

        if(idx >= 0) {
            state.sent[idx] = sent;
        } else {
            state.sent.unshift(sent);
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