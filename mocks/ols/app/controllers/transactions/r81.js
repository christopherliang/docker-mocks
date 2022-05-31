const validation = require('../../validation');
const response = require('../../response');
const r81Fixture = require('../../fixtures/r81.json');

module.exports = async (ctx) => {
    let req = 'r81Request';
    let xmlRequest = ctx.request.body;
    console.log(`Request Body: ${JSON.stringify(xmlRequest, undefined, 4)}`);
    let olsResponse = '';
    if (validation(xmlRequest, req)) {
        let cardId = xmlRequest[req]['card-id'],
            lastTwoDigits = cardId.slice(-2),
            data = '';
        if (r81Fixture[lastTwoDigits]) {
            data = r81Fixture[lastTwoDigits];
        } else {
            let lastDigit = lastTwoDigits.slice(-1);
            r81Fixture[lastDigit] ? data = r81Fixture[lastDigit] : data = r81Fixture['0'];
        }
        olsResponse = response.sendTranIdResponse('r81response', 'AA', 'APPROVAL', xmlRequest[req]['tran-id'], data);
    } else {
        olsResponse = response.sendTranIdResponse('r81response', 'ND', 'DECLINE', '', {});
    }
    let responseXml = response.formatResponse(olsResponse);
    console.log(responseXml);
    ctx.body = responseXml;
}