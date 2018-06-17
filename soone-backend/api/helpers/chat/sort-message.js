module.exports = {
    sync: true,

    friendlyName: "Sort message",

    description: "Remove entries from message object in order to return it",

    inputs: {
        message: {
            description: 'The message to sort',
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
        delete inputs.message.createdAt;
        delete inputs.message.updatedAt;

        return exits.success(inputs.message);
    }
};