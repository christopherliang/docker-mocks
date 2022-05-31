const validation = require('../../validation');
const response = require('../../response');

module.exports = async (ctx) => {
    let req = 'r8CRequest';
    let xmlRequest = ctx.request.body;
    console.log(`Request Body: ${JSON.stringify(xmlRequest, undefined, 4)}`);
    let olsResponse = '';
    if (validation(xmlRequest, req)) {
        olsResponse = response.sendTranIdResponse('r8Cresponse', 'AA', 'APPROVAL', '', {});
    } else {
        olsResponse = response.sendTranIdResponse('r8Cresponse', 'ND', 'TRY AGAIN LATER', '', {});
    }
    let responseXml = response.formatResponse(olsResponse);
    console.log(responseXml);
    ctx.body = responseXml;
}