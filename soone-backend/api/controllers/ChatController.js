function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

async function getChat(parameters, res) {
    return await sails.helpers.chat.getChat.with(parameters)
        .tolerate('notExists', (err) => {
            res.status(409);
            return err;
        })
        .tolerate('invalidInputs', (err) => {
            res.status(409);
            return err;
        });
}

module.exports = {
    add: async function (req, res) {
        var chatVal = parseParameters(req);

        var chat = await sails.helpers.chat.addChat.with(chatVal)
            .tolerate('alreadyExists', function (err) {
                res.status(409);
                res.send(err);
            });
        if (chat) {
            res.json(chat);
        }
    },
    get: async function (req, res) {
        var chat = await getChat(parseParameters(req), res);

        res.json(chat);
    },
    update: async function (req, res) {
        var chatVal = parseParameters(req);
        var chat = await sails.helpers.chat.updateChat.with(chatVal);
        res.json(chat);
    },
    send: async function (req, res) {
        var parameters = await sails.helpers.parseParameters.with({req});
        var shouldReturn = true;

        await sails.helpers.chat.sendMessage.with(parameters)
            .tolerate(['notExists', 'unauthorized', 'inactiveConversation'], function (err) {
                res.status("409");
                res.send(err);
                shouldReturn = false;
            });

        if (shouldReturn) {
            res.ok();
        }
    }
};

