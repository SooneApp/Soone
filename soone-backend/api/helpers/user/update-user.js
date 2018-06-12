module.exports = {
    friendlyName: "Update user",

    description: "Update a user to the system based on his id",

    inputs: {
        id: {
            description: 'The id of the user to update',
            type: 'string',
            required: true
        },
        name: {
            description: 'The name',
            type: 'string'
        },
        email: {
            description: 'The mail address',
            type: 'string'
        },
        phoneNumber: {
            description: 'The phone number',
            type: 'string'
        },
        birthDate: {
            description: 'The birthdate',
            type: 'string'
        },
        sex: {
            description: 'The sex',
            type: 'number'
        },
        sexInterest: {
            description: 'The sex interest',
            type: 'number'
        },
        description: {
            description: 'The description',
            type: 'string'
        },
        lastSeen: {
            description: 'The last same we have seen the user',
            type: 'string'
        },
        accountType: {
            description: 'The type of the account',
            type: 'number'
        },
        deletedAt: {
            description: 'The date of the account delete (soft delete)',
            type: 'string'
        },

    },

    exits: {
        success: {
            responseType: 'json',
        },
        notExists: {
            description: 'The user doesn t exists'
        }
    },

    fn: async function (inputs, exits) {
        var parameters = {id: inputs.id};
        delete inputs.id;

        var user = await User.findOne(parameters);

        //Test if the phone number already exists
        if (!user) {
            return exits.notExists();
        }

        user = await User.update(parameters).set(inputs).fetch();

        return exits.success(user[0]);
    }
};