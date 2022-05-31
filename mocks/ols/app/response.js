const xml2js = require('xml2js');
const builder = new xml2js.Builder();

module.exports = {
    sendTranIdResponse: function (responseRootTag, code, message, tranId, other = {}) {
        if (tranId !== '') {
            other['tran-id'] = tranId;
        }
        return this.sendStandardResponse(responseRootTag, code, message, other);
    },

    sendStandardResponse: function (responseRootTag, code, message, other = {}) {
        let response = {};
        response[responseRootTag] = {
            'response-code': code,
            'display-message': message,
        }
        for (const key in other) {
            if (typeof other[key] === 'object') {
                //only up to 2 levels of nesting
                let childKey = Object.keys(other[key])[0];
                response[responseRootTag][key] = response[responseRootTag][key] || {};
                if (Array.isArray(other[key][childKey])) {
                    response[responseRootTag][key][childKey] = other[key][childKey].slice();
                } else {
                    response[responseRootTag][key][childKey] = other[key][childKey];
                }
            }
            if (other[key].length) {
                response[responseRootTag][key] = other[key];
            }
        };
        return(response);
    },

    formatResponse: function (olsResponse) {
        return xml = builder.buildObject(olsResponse);
    }
}