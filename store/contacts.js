export const state = () => ({
    inbox: [],
    sent: [],
    not_seen: 0,
    showSendForm: false,
    data: {}
})



export const mutations = {
    addInbox (state, inbox) {
        var indx = -1;
        for(var i in state.inbox) {
            var ib = state.inbox[i];
            if(ib.id === inbox.id) {
                indx = i;
                break;
            }
        }

        if(indx >= 0) {
            state.inbox[indx] = inbox;
        } else {
            if(!inbox.status) {
                state.inbox.unshift(inbox);
            } else {
                state.inbox.push(inbox);
            }
        }
    },
    addSent (state, sent) {
        var indx = -1;
        for(var i in state.sent) {
            var st = state.sent[i];
            if(st.id === sent.id) {
                indx = i;
                break;
            }
        }

        if(indx >= 0) {
            state.sent[indx] = sent;
        } else {
            if(!sent.status) {
                state.sent.unshift(sent);
            } else {
                state.sent.push(sent);
            }
        }
    },
    notSeenContact(state, not_seen) {
        state.not_seen = not_seen;
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