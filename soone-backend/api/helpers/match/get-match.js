module.exports = {
    friendlyName: "Get match",

    description: "Get a match via match id",

    inputs: {
        idUser1: {
            description: 'The id of the user 1',
            type: 'string',
            required: true
        },
        idUser2: {
            description: 'The id of the user 2',
            type: 'string',
            required: true
        },
    },

    exits: {
        success: {
            responseType: 'json',
        },
        notExists: {
            description: 'The match doesn t exists'
        },
        invalidInputs: {
            description: 'The inputs are invalid'
        }
    },

    fn: async function (inputs, exits) {
        let parameters = {};

        if (inputs.idUser1 && inputs.idUser2) {
            parameters.idUser1 = inputs.idUser1;
            parameters.idUser2 = inputs.idUser2;
        } else {
            return exits.invalidInputs();
        }

        let match = await Match.findOne(parameters);

        //Test if the match exists
        if (!match) {
            //If not, we try to swap parameters
            parameters.idUser1 = inputs.idUser2;
            parameters.idUser2 = inputs.idUser1;

            match = await Match.findOne(parameters);
            if (!match) {
                return exits.notExists();
            }
        }

        return exits.success(match);
    }
};