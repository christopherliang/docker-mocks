const validation = require('../../validation');
const response = require('../../response');

module.exports = async (ctx) => {
    let req = 'r83Request';
    let xmlRequest = ctx.request.body;
    console.log(`Request Body: ${JSON.stringify(xmlRequest, undefined, 4)}`);
    let olsResponse = '';
    if (validation(xmlRequest, req)) {
        olsResponse = response.sendTranIdResponse('r83response', 'AA', 'FORCE APPROVAL', xmlRequest[req]['tran-id'], {
            'lc-ptsawarded': '200',
            'lc-bcb_awarded': '1000',
        });
    } else {
        olsResponse = response.sendTranIdResponse('r83response', 'ND', 'TRY AGAIN LATER', '', {});
    }
    let responseXml = response.formatResponse(olsResponse);
    console.log(responseXml);
    ctx.body = responseXml;
}