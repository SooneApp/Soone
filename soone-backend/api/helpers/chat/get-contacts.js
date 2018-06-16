module.exports = {
    friendlyName: "Get contacts",

    description: "Get all the contacts of a user",

    inputs: {
        userId: {
            description: 'The user id',
            type: 'string',
            required: true
        },
    },

    exits: {
        success: {
            responseType: 'json',
        }
    },

    fn: async function (inputs, exits) {
        var contacts = await Chat.find().where({
            or: [{
                user1: inputs.userId
            },
            {
                user2: inputs.userId
            }]
        });

        contacts = contacts
        .filter(function(chat) {
            return chat.active == true;
        })
        .map(function(chat) {
            return sails.helpers.chat.sortChat.with({chat});
        });

        sails.log("Returned contacts of user with id : " + inputs.userId);
            
        return exits.success(contacts);
    }
};