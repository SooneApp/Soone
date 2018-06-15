module.exports = {
    getAll: async function (req, res) { 
        var parameters = await sails.helpers.parseParameters.with({req});

        var chats = await sails.helpers.chat.getContacts.with(parameters)
            .tolerate('alreadyExists', function(err)
            {   
                res.status("409");
                res.send(err);
            });

        if(chats) {
            res.json(chats);
        }
    },
    getMessages: async function(req, res) {
        var parameters = await sails.helpers.parseParameters.with({req});

        var messages = await sails.helpers.chat.getMessages.with(parameters)
            .tolerate(['notExists','unauthorized','inactiveConversation'], function(err)
            {   
                res.status("409");
                res.send(err);
            });

        if(messages) {
            res.json(messages);
        }
    }
}