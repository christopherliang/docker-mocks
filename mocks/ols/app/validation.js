module.exports = function(xmlRequest, requestType) {
    const WELLNESS_CARD_DIGITS = 11;
    let requestBody = xmlRequest[requestType];
    let keys = Object.keys(xmlRequest);
    if (keys[0] !== requestType) {
        console.log(requestType + ' not detected. Check endpoint.');
        return false;
    } else {
        console.log(requestType + ' detected.');
    }
    switch (requestType) {
        case 'r81Request':
            return (
                requestBody.hasOwnProperty('card-id') &&
                Object.keys(requestBody['card-id']).length > 0 &&
                requestBody.hasOwnProperty('card-type') &&
                Object.keys(requestBody['card-type']).length > 0
            );
        case 'r83Request':
            return (
                requestBody.hasOwnProperty('card-id') &&
                requestBody['card-id'].length === WELLNESS_CARD_DIGITS &&
                requestBody.hasOwnProperty('items') &&
                Object.keys(requestBody['items']).length > 0
            );
        case 'r8TRequest':
            return (
                requestBody.hasOwnProperty('lc') &&
                requestBody['lc'].length === WELLNESS_CARD_DIGITS
            );
        case 'r8CRequest':
            return (
                requestBody.hasOwnProperty('original-tran-id') &&
                Object.keys(requestBody['original-tran-id']).length > 0
            );
    }
}