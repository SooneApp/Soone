module.exports = {
    friendlyName: "Update match decision",

    description: "Update a match decision to the system based on his id",

    inputs: {
        id: {
            description: 'The id of the match decision to update',
            type: 'string',
            required: true
        },
        decision: {
            description: 'The decision',
            type: 'boolean',
        },
    },

    exits: {
        success: {
            responseType: 'json',
        },
        notExists: {
            description: 'The match decision doesn t exists'
        }
    },

    fn: async function (inputs, exits) {
        //TODO : faire la vérif de la réponse de l'autre personne, et update le booléen de match en conséquence
        var parameters = {id: inputs.id};
        delete inputs.id;

        var matchDecision = await MatchDecision.findOne(parameters);

        //Test if the match exist
        if (!matchDecision) {
            return exits.notExists();
        }

        matchDecision = await MatchDecision.update(parameters).set(inputs).fetch();

        return exits.success(matchDecision[0]);
    }
};