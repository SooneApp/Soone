module.exports = { 
    friendlyName : "Parse data",

    description : "Check and store instant search's specific datas",

    inputs : {
        id : {
            description : 'The id of the user',
            type : 'string'
        },
        ageRange : {
            description : 'The age range of the user search',
            type : 'ref'
        },
        city : {
            description : 'The city of the user search',
            type : 'string'
        }
    },

    exits : {
        success : {
            responseType : 'json',
        }
    },

    fn: async function (inputs, exits) {
        var response = { ageRange: inputs.ageRange, city: inputs.cty};
        delete inputs.ageRange;
        delete inputs.city;

        return exits.success(response);
    }
};