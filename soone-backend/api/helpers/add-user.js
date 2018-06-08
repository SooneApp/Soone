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
            description : 'User with the specified phone number already exists',
            responseType : 'badRequest'
        }
    },

    fn: async function (inputs, exits) {
        var uuid = require('uuid/v4');
        var parameters = { phoneNumber : inputs.phoneNumber };

        if(await User.findOne(parameters)) { 
            return exits.alreadyExists(); 
        }

        parameters.id = uuid();
        var user = await User.create(parameters).fetch();

        sails.log("Created new user with id : " + parameters.id);

        return exits.success(user);
    }
};