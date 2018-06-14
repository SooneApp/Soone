module.exports = {
    friendlyName: "Add chat",

    description: "Add a chat",

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
            description: 'The chat already exists'
        }
    },

    fn: async function (inputs, exits) {
        var uuid = require('uuid/v4');
        var moment = require('moment');

        // Test if the match already exists
        let parameters = {};
        parameters.user1 = inputs.idUser1;
        parameters.user2 = inputs.idUser2;

        if (await Chat.findOne(parameters)) {
            return exits.alreadyExists();
        } else {
            parameters.user1 = inputs.idUser2;
            parameters.user2 = inputs.idUser1;
            if (await Chat.findOne(parameters)) {
                return exits.alreadyExists();
            }
        }

        //Fill parameters with calculated values
        parameters.id = uuid();
        parameters.startDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        // parameters.endDate = moment(parameters.startDate
        //     .add(6, 'minutes')
        //     .format('YYYY-MM-DD HH:mm:ss'));
        parameters.endDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        parameters.active = 0;

        //Create chat
        let chat = await Chat.create(parameters).fetch();

        sails.log("Created new chat with id : " + parameters.id);

        return exits.success(chat);
    }
};