const fetch = require('node-fetch')
const trelloKeys = require('../trello_keys')
const https = require('https')
const cardStatus = require('../models/card_status')

const baseUrl = 'https://api.trello.com'
const apiAccess = `key=${trelloKeys.apiKey}&token=${trelloKeys.serverToken}`

module.exports = {
    getBoards: (onSuccess, onError) => {
        https.get(baseUrl + `/1/members/me/boards?${apiAccess}`, (res) => {
            let data = ''

            res.on('data', (chunk) => {
                data += chunk
            })

            res.on('end', () => {
                console.log('result data: ' + data)

                const json = JSON.parse(data)

                onSuccess(json)
            })

            res.on('error', (err) => {
                onError(err)
            })
        })
    },
    pushCard: async function(userFullName, userEmail, title, description, statusCode) {
        const statusObj = cardStatus.parseByCode(statusCode)
        const listId = statusObj.trelloListId
        const desc = 'Автор заявки:\n' +
            `ФИО: ${userFullName}\n` +
            `Электронная почта: ${userEmail}\n` +
            '\n' +
            `Описание:\n${description}`
        const url = `${baseUrl}/1/cards?${apiAccess}&idList=${listId}&name=${title}&desc=${desc}`
        const encodedUrl = encodeURI(url)

        try {
            const resp = await fetch(encodedUrl, {
                method: 'POST'
            })

            const body = await resp.json()

            console.log('push card body:')
            console.log(body)

            return body.id
        } catch (ex) {
            console.log(ex)

            return null
        }
    }
}