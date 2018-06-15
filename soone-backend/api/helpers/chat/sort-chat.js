module.exports = {
    sync: true,

    friendlyName: "Sort chat",

    description: "Remove entries from chat object in order to return it",

    inputs: {
        chat: {
            description: 'The chat to sort',
            type: 'ref',
            required: true
        }
    },

    exits: {
        success: {
            responseType: 'ref',
        }
    },

    fn: function (inputs, exits) {
        delete inputs.chat.createdAt;
        delete inputs.chat.updatedAt;

        return exits.success(inputs.chat);
    }
};