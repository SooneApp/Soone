module.exports = {
    friendlyName: "Add decision",

    description: "Add a decision",

    inputs: {
        idChat: {
            description: 'The chat ID',
            type: 'string',
            required: true
        },
        idUser: {
            description: 'The user ID',
            type: 'string',
            required: true
        }
    },

    exits: {
        success: {
            responseType: 'json',
        },
        alreadyExists: {
            description: 'The decision already exists'
        }
    },

    fn: async function (inputs, exits) {
        let uuid = require('uuid/v4');
        let parameters = {
            idChat: inputs.idChat,
            idUser: inputs.idUser
        };

        //Test if the chat already exists
        if (await Decision.findOne(parameters)) {
            return exits.alreadyExists();
        }

        //Fill parameters with calculated values
        parameters.id = uuid();
        parameters.decision = null;

        //Create decision
        let decision = await Decision.create(parameters).fetch();

        sails.log("Created new decision with id : " + parameters.id);

        return exits.success(decision);
    }
};