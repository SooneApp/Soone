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
            required: true
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
        var parameters = {id: inputs.id};
        delete inputs.id;

        var matchDecision = await MatchDecision.findOne(parameters);

        //Test if the match exist
        if (!matchDecision) {
            return exits.notExists();
        }

        matchDecision = await MatchDecision.update(parameters).set(inputs).fetch();

        if (inputs.decision === 0 || inputs.decision === false) {
            let values = {
                id: parameters.id,
                active: 0
            };
            await sails.helpers.match.updateMatch.with(values);

        } else if (inputs.decision === 1 || inputs.decision === true) {
            let match = sails.helpers.match.getMatch.with(values);
            if(true){
                let values = {
                    id: parameters.id,
                    active: 1
                };
                await sails.helpers.match.updateMatch.with(values);
            }
        }

        return exits.success(matchDecision[0]);
    }
};