module.exports = { 
    friendlyName : "Update user",

    description : "Update a user to the system based on his id",

    inputs : {
        id : {
            description : 'The id of the user to get',
            type : 'string',
            required : true
        },
        email : {
            description : 'The mail address',
            type : 'string'
        },
        sex : {
            description : 'The sex',
            type : 'number'
        },
        description : {
            description : 'The description',
            type : 'string'
        }

    },

    exits : {
        success : {
            responseType : 'json',
        },
        notExists : {
            description: 'The user doesn t exists'
        }
    },

    fn: async function (inputs, exits) {
        var parameters = { id : inputs.id };
        delete inputs.id;

        var user = await User.findOne(parameters);

        //Test if the phone number already exists
        if(!user) { 
            return exits.notExists(); 
        }

        user = await User.update(parameters).set(inputs).fetch();

        return exits.success(user[0]);
    }
};