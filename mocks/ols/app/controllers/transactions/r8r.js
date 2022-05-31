const response = require('../../response');

module.exports = async (ctx) => {
    let req = 'r8RRequest';
    let xmlRequest = ctx.request.body;
    console.log(`Request Body: ${JSON.stringify(xmlRequest, undefined, 4)}`);
    let olsResponse = '';
    let keys = Object.keys(xmlRequest);
    if (keys[0] !== req) {
        console.log(req + 'not detected.');
        olsResponse = response.sendTranIdResponse('r8Rresponse', 'ND', 'WRONG ENDPOINT', '', {});
    } else {
        olsResponse = response.sendTranIdResponse('r8Rresponse', 'AA', 'FORCE APPROVAL', '', {});
    }
    let responseXml = response.formatResponse(olsResponse);
    console.log(responseXml);
    ctx.body = responseXml;
}