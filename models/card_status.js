const model = function(code, string) {
    return {
        code: code,
        info: string
    }
}

const _sentCode = 1
const _acceptedCode = 2
const _inProgressCode = 3
const _readyCode = 4

const _sentId = '61eeaa2e4d9c8f7cb355daea'
const _acceptedId = '61f6a9cac8294c51056c94ba'
const _inProgressId = '61f6a97d7c02804eb97dd9d5'
const _readyId = '61f6a98712cd7a4633acaa3b'

module.exports = {

    sent: model(_sentCode, 'sent'),
    accepted: model(_acceptedCode, 'accepted'),
    inProgress: model(_inProgressCode, 'inProgress'),
    ready: model(_readyCode, 'ready'),

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