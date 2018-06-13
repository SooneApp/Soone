module.exports = {
    friendlyName: "Add decision",

    description: "Add a match decision",

    inputs: {
        idMatch: {
            description: 'The match ID',
            type: 'string',
            required: true
        },
        idUser: {
            description: 'The user ID',
            type: 'string',
            required: true
        },
        decision: {
            description: 'The decision',
            type: 'boolean',
            required: true
        },
    },

    exits: {
        success: {
            responseType: 'json',
        },
        alreadyExists: {
            description: 'The phone number already exists'
        }
    },

    fn: async function (inputs, exits) {
        var uuid = require('uuid/v4');
        var parameters = {
            idMatch: inputs.idMatch,
            idUser: inputs.idUser
        };

        //Test if the phone number already exists
        if (await MatchDecision.findOne(parameters)) {
            return exits.alreadyExists();
        }

        //Fill parameters with calculated values
        parameters.id = uuid();
        parameters.decision = inputs.decision;

        //Create matchDecision
        var matchDecision = await MatchDecision.create(parameters).fetch();

        sails.log("Created new matchDecision with id : " + parameters.id);

        return exits.success(matchDecision);
    }
};