module.exports = {
    friendlyName: "Get decision",

    description: "Get a decision via match id",

    inputs: {
        idMatch: {
            description: 'The id of the match',
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

        if (inputs.idMatch && inputs.idUser) {
            parameters.idMatch = inputs.idMatch;
            parameters.idUser = inputs.idUser
        } else {
            return exits.invalidInputs();
        }

        let matchDecision = await MatchDecision.findOne(parameters);

        //Test if the matchDecision exists
        if (!matchDecision) {
            return exits.notExists();
        }

        return exits.success(matchDecision);
    }
};