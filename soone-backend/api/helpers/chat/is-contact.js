var moment = require('moment');

module.exports = {
    sync: true,

    friendlyName: "Is contact",

    description: "Return true if the chat is a contact",

    inputs: {
        chat: {
            description: 'The chat',
            type: 'ref',
            required: true
        },
    },

    exits: {
        success: {
            responseType: 'boolean',
        }
    },

    fn: function (inputs, exits) {
        if(moment(inputs.chat.endDate).format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss') && !inputs.chat.active) {
            return exits.success(false);
        }

        return exits.success(true);
    }
};