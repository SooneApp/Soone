module.exports = {
    friendlyName: "Get decision",

    description: "Get a decision via chat id and user id",

    inputs: {
        idChat: {
            description: 'The id of the chat',
            type: 'string',
            required: true
        },
        idUser: {
            description: 'The id of the user',
            type: 'string',
            required: true
        },

    },

    exits: {
        success: {
            responseType: 'json',
        },
        notExists: {
            description: 'The match decision doesn t exists'
        },
        invalidInputs: {
            description: 'The inputs are invalid'
        }
    },

    fn: async function (inputs, exits) {
        let parameters = {};

        if (inputs.idChat && inputs.idUser) {
            parameters.idChat = inputs.idChat;
            parameters.idUser = inputs.idUser
        } else {
            return exits.invalidInputs();
        }

        let decision = await Decision.findOne(parameters);

        //Test if the decision exists
        if (!decision) {
            return exits.notExists();
        }

        return exits.success(decision);
    }
};