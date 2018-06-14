module.exports = { 
    friendlyName : "Get user",

    description : "Get a user based on his id or phone number",

    inputs : {
        id : {
            description : 'The id of the user to get',
            type : 'string'
        },
        phoneNumber : {
            description : 'The phone number of the user to add',
            type : 'string'
        }
    },

    exits : {
        success : {
            responseType : 'json',
        },
        notExists : {
            description: 'The user doesn t exists'
        },
        invalidInputs : {
            description: 'The inputs are invalid'
        }
    },

    fn: async function (inputs, exits) {
        var parameters = {};

        if(inputs.id) {
            parameters.id = inputs.id;
        } else if(inputs.phoneNumber) {
            parameters.phoneNumber = inputs.phoneNumber
        } else {
            return exits.invalidInputs();
        }

        var user = await User.findOne(parameters);

        //Test if the phone number already exists
        if(!user) { 
            return exits.notExists(); 
        }

        return exits.success(user);
    }
};