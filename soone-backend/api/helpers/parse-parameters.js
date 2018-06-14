module.exports = { 
    friendlyName : "Parse data",

    description : "Check and store instant search's specific datas",

    inputs : {
        req : {
            description : 'The body of the request',
            type : 'ref'
        }
    },

    exits : {
        success : {
            responseType : 'json',
        }
    },

    fn: async function (inputs, exits) {
        var response = _.extend(inputs.req.query || {}, inputs.req.params || {}, inputs.req.body || {});

        return exits.success(response);
    }
};