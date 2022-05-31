const validation = require('../../validation');
const response = require('../../response');

module.exports = async (ctx) => {
    let req = 'r8TRequest';
    let xmlRequest = ctx.request.body;
    console.log(`Request Body: ${JSON.stringify(xmlRequest, undefined, 4)}`);
    let olsResponse = '';
    if (validation(xmlRequest, req)) {
        if (!xmlRequest[req].hasOwnProperty('points') || parseInt(xmlRequest[req]['points']) <= 0) {
            olsResponse = response.sendTranIdResponse('r8Tresponse', 'ND', 'DECLINE', '', {
                'messages': {},
            });
        } else {
            olsResponse = response.sendTranIdResponse('r8Tresponse', 'AA', 'APPROVAL', xmlRequest[req]['tran-id'], {
                'messages': '',
                'apprvamt': xmlRequest[req]['points'],
                'lc-bcb_redeemed': xmlRequest[req]['points']
            });
        }
    } else {
        olsResponse = response.sendTranIdResponse('r8Tresponse', 'ND', 'MEMBER ID INVALID', '', {
            'messages': {
                'message': 'Membership/Account problem, contact Customer Support for assistance',
            },
        });
    }
    let responseXml = response.formatResponse(olsResponse);
    console.log(responseXml);
    ctx.body = responseXml;
}