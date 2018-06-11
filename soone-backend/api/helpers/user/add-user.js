module.exports = { 
    friendlyName : "Add user",

    description : "Add a user to the system based on his phone number only",

    inputs : {
        phoneNumber : {
            description : 'The phone number of the user to add',
            type : 'string',
            required : true
        }
    },

    exits : {
        success : {
            responseType : 'json',
        },
        alreadyExists : {
            description: 'The phone number already exists'
        }
    },

    fn: async function (inputs, exits) {
        var uuid = require('uuid/v4');
        var parameters = { phoneNumber : inputs.phoneNumber };

        //Test if the phone number already exists
        if(await User.findOne(parameters)) { 
            return exits.alreadyExists(); 
        }

        //Fill parameters with calculated values
        parameters.id = uuid();

        //Create user
        var user = await User.create(parameters).fetch();

        sails.log("Created new user with id : " + parameters.id);

        return exits.success(user);
    }
};