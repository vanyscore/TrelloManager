const trelloKeys = require('../trello_keys');
const https = require('https');
const baseUrl = 'https://api.trello.com'

module.exports = {
    getBoards: (onSuccess, onError) => {
        https.get(baseUrl + `/1/members/me/boards?key=${trelloKeys.apiKey}&token=${trelloKeys.serverToken}`, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log('result data: ' + data);

                const json = JSON.parse(data);

                onSuccess(json);
            })

            res.on('error', (err) => {
                onError(err);
            });
        });
    }
}