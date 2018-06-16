module.exports = {
    friendlyName: "Get chat",

    description: "Get a chat via chat id",

    inputs: {
        id: {
            description: 'The chat id',
            type: 'string',
            required: true
        },
    },

    exits: {
        success: {
            responseType: 'json',
        },
        notExists: {
            description: 'The chat doesn\'t exists'
        },
        invalidInputs: {
            description: 'The inputs are invalid'
        }
    },

    fn: async function (inputs, exits) {
        let parameters = {};

        if (inputs.id) {
            parameters.id = inputs.id;
        } else {
            return exits.invalidInputs();
        }

        let chat = await Chat.findOne(parameters);

        //Test if the match exists
        if (!chat) {
            return exits.notExists();
        }

        sails.log("Returned chat with id : " + parameters.id);

        return exits.success(chat);
    }
}; 