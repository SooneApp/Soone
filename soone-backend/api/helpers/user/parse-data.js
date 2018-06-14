module.exports = { 
    friendlyName : "Parse data",

    description : "Check and store instant search's specific datas",

    inputs : {
        user : {
            description : 'The user',
            type : 'ref'
        }
    },

    exits : {
        success : {
            responseType : 'json',
        }
    },

    fn: async function (inputs, exits) {
        if(typeof inputs.user.sexInterests == "String")
        {
            inputs.user.sexInterests = JSON.parse(inputs.user.sexInterests);
        }

        return exits.success(inputs.user);
    }
};