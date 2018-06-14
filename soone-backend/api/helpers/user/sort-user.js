module.exports = {
    friendlyName: "Update user",

    description: "Update a user to the system based on his id",

    inputs: {
        user: {
            description: 'The user to sort',
            type: 'ref',
            required: true
        }
    },

    exits: {
        success: {
            responseType: 'ref',
        }
    },

    fn: async function (inputs, exits) {
        delete inputs.user.appToken;
        delete inputs.user.createdAt;
        delete inputs.user.updatedAt;
        delete inputs.user.deletedAt;
        delete inputs.user.phoneNumber;
        
        await sails.helpers.user.parseData.with({ user: inputs.user });

        return exits.success(inputs.user);
    }
};