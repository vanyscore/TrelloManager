const jwt = require('jwt-simple');
const secretKey = 'WtM780eGVcje7WdBKjNK';
const regex = '.+\\..+\\..+';

module.exports = {
    generateKey: function(payload) {
        return jwt.encode(payload, secretKey);
    },
    parsePayload: function(token) {
        if (!token.match(regex)) return null;

        return jwt.decode(token, secretKey)
    }
}