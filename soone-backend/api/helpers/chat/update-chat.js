module.exports = {
    friendlyName: "Update chat",

    description: "Update a chat to the system based on his id",

    inputs: {
        id: {
            description: 'The id of the chat to update',
            type: 'string',
            required: true
        },
        active: {
            description: 'The fact that the chat is active or not',
            type: 'boolean',
            required: true
        },
    },

    exits: {
        success: {
            responseType: 'json',
        },
        notExists: {
            description: 'The chat doesn t exists'
        }
    },

    fn: async function (inputs, exits) {
        let parameters = {id: inputs.id};
        delete inputs.id;

        let chat = await Chat.findOne(parameters);

        //Test if the chat exist
        if (!chat) {
            return exits.notExists();
        }

        chat = await Chat.update(parameters).set(inputs).fetch();

        sails.log("The chat with id : " + parameters.id + " is now active : " + inputs.active);

        return exits.success(chat[0]);
    }
};