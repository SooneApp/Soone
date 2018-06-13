module.exports = {
    friendlyName: "Update match",

    description: "Update a match to the system based on his id",

    inputs: {
        id: {
            description: 'The id of the match to update',
            type: 'string',
            required: true
        },
        active: {
            description: 'The fact that the match is active or not',
            type: 'boolean',
        },
    },

    exits: {
        success: {
            responseType: 'json',
        },
        notExists: {
            description: 'The match doesn t exists'
        }
    },

    fn: async function (inputs, exits) {
        var parameters = {id: inputs.id};
        delete inputs.id;

        var match = await Match.findOne(parameters);

        //Test if the match exist
        if (!match) {
            return exits.notExists();
        }

        match = await Match.update(parameters).set(inputs).fetch();

        return exits.success(match[0]);
    }
};