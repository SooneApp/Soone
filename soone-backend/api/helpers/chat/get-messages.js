var moment = require('moment');

module.exports = { 
    friendlyName : "Get messages",

    description : "Get all the messages of a conversation",

    inputs : {
        userId : {
            description : 'The id of the user who sent the message',
            type : 'string',
            required : true
        },
        chatId : {
            description : 'The id of the chat where to send the message',
            type : 'string',
            required : true
        }
    },

    exits : {
        success : {
            responseType : 'json',
        },
        notExists : {
            description: 'The conversation doesn\'t exists'
        },
        unauthorized : {
            description: 'The user doesn\'t belongs to this conversation'
        },
        inactiveConversation : {
            description: 'The conversation is inactive'
        }
    },

    fn: async function (inputs, exits) {
        var notExists = false;

        var chat = await Chat.findOne({id: inputs.chatId}).populate("messages");

        if(notExists) {
            return exits.notExists();
        }
        
        if(!sails.helpers.chat.isContact.with({chat})) {
            return exits.inactiveConversation();
        }

        if(chat.user1 != inputs.userId && chat.user2 != inputs.userId) {
            return exits.unauthorized();
        }

        sails.log("Returned messages of chat with id : " + inputs.chatId + " to user with id : " + inputs.userId);

        return exits.success(chat.messages);
    }
};