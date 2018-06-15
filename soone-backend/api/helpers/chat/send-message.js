var admin = require("firebase-admin");
var moment = require('moment');

module.exports = { 
    friendlyName : "Send message",

    description : "Send a message to a user and store it in database",

    inputs : {
        senderId : {
            description : 'The id of the user who sent the message',
            type : 'string',
            required : true
        },
        chatId : {
            description : 'The id of the chat where to send the message',
            type : 'string',
            required : true
        },
        content : {
            description : 'The content to send',
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
        var uuid = require('uuid/v4');
        var notExists = false;

        var chat = await sails.helpers.chat.getChat.with({ id: inputs.chatId})
            .tolerate('notExists',function() {
                notExists = true;
            });

        if(notExists) {
            return exits.notExists();
        }

        var receiver;
        var sender;
        var now = moment().format('YYYY-MM-DD HH:mm:ss');
        
        if(moment(chat.endDate).format('YYYY-MM-DD HH:mm:ss') < now && !chat.active) {
            return exits.inactiveConversation();
        }

        if(chat.user1 == inputs.senderId) {
            receiver = chat.user2;
        } else if (chat.user2 == inputs.senderId) {
            receiver = chat.user1;
        } else {
            return exits.unauthorized();
        }

        receiver = await sails.helpers.user.getUser.with({ id: receiver});
        sender = await sails.helpers.user.getUser.with({ id: inputs.senderId});
        
        var parameters = { 
            chatId: inputs.chatId, 
            senderId: inputs.senderId, 
            content: inputs.content, 
            date: now
        };
        parameters.id = uuid();

        await Message.create(parameters);

        admin.messaging().send({
            data: {
                chatId: inputs.chatId,
                content: inputs.content
            },
            notification: {
                "title":"Soone message",
                "body":"You received a message from " + sender.name + "!"
            },
            token: receiver.appToken
        });

        return exits.success();
    }
};