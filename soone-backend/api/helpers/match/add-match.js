module.exports = {
    friendlyName: "Add decision",

    description: "Add a match decision",

    inputs: {
        idUser1: {
            description: 'The user1 ID',
            type: 'string',
            required: true
        },
        idUser2: {
            description: 'The user2 ID',
            type: 'string',
            required: true
        }
    },

    exits: {
        success: {
            responseType: 'json',
        },
        alreadyExists: {
            description: 'The match already exists'
        }
    },

    fn: async function (inputs, exits) {
        var uuid = require('uuid/v4');
        var moment = require('moment');

        var parameters = {
            idUser1: inputs.idUser1,
            idUser2: inputs.idUser2
        };

        //Test if the match already exists
        if (await Match.findOne(parameters)) {
            parameters.idUser1 = inputs.idUser2;
            parameters.idUser2 = inputs.idUser1;

            if (await Match.findOne(parameters)) {
                return exits.alreadyExists();
            }
        }

        //Fill parameters with calculated values
        parameters.id = uuid();
        parameters.date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        parameters.active = 0;

        //Create matchDecision
        var match = await Match.create(parameters).fetch();

        sails.log("Created new match with id : " + parameters.id);

        return exits.success(match);
    }
};