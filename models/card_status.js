const trelloKeys = require('../trello_keys')

const model = function(code, string, trelloListId) {
    return {
        code: code,
        info: string,
        trelloListId: trelloListId
    }
}

const _sentCode = 1
const _acceptedCode = 2
const _inProgressCode = 3
const _readyCode = 4

module.exports = {

    sent: model(_sentCode, 'sent', trelloKeys.listSentKey),
    accepted: model(_acceptedCode, 'accepted', trelloKeys.listAcceptedKey),
    inProgress: model(_inProgressCode, 'inProgress', trelloKeys.listInProgressKey),
    ready: model(_readyCode, 'ready', trelloKeys.listReadyKey),

    parseByCode: function(code) {
        switch(code) {
            case _sentCode: return this.sent
            case _acceptedCode: return this.accepted
            case _inProgressCode: return this.inProgress
            case _readyCode: return this.ready
        }
    },
    parseByTrelloListId: function(trelloId) {
        switch(trelloId) {
            case _sentId: return this.sent
            case _acceptedId: return this.accepted
            case _inProgressId: return this.inProgress
            case _readyId: return this.ready
        }
    }
}