const jwt = require('jwt-simple');
const secretKey = 'WtM780eGVcje7WdBKjNK'

module.exports = {
    generateKey: function(userId, role) {
        return jwt.encode({
            userId: userId,
            role: role
        }, secretKey);
    },
    verifyKey: function(token) {
        return jwt.decode(token, secretKey)
    }
}