function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

async function getUser(parameters, res) {
    return await sails.helpers.user.getUser.with(parameters)
        .tolerate('notExists', function(err)
        {   
            res.status("409");
            res.send(err);
        })
        .tolerate('invalidInputs', function(err)
        {   
            res.status("409");
            res.send(err);
        });
}

module.exports = {
    add: async function (req, res) { 
        var userVal = await sails.helpers.parseParameters.with({req});

        var user = await sails.helpers.user.addUser.with(userVal)
            .tolerate('alreadyExists', function(err)
            {   
                res.status("409");
                res.send(err);
            });

        if(user) {
            res.json(await sails.helpers.user.sortUser.with({user}));
        }
    },
    get: async function (req, res) { 
        var user = await getUser(await sails.helpers.parseParameters.with({req}), res);

        if(user) {
            res.json(await sails.helpers.user.sortUser.with({user}));
        }
    },
    update: async function (req, res) {
        var userVal = await sails.helpers.parseParameters.with({req});
        var user = await sails.helpers.user.updateUser.with(userVal)
            .tolerate('notExists', function(err)
            {   
                res.status("409");
                res.send(err);
            });

        if(user) {
            res.json(await sails.helpers.user.sortUser.with({user}));
        }
    },
    disconnect: async function (req, res) {
        req.session.destroy(function(err) {
            return res.ok();
        });
    },
    connect: async function (req, res) {
        var parameters = await sails.helpers.parseParameters.with({req});

        var user = await getUser({ phoneNumber: parameters.phoneNumber },res);

        if(user) {
            await sails.helpers.user.connectUser.with({ id: user.id, appToken: parameters.appToken });

            req.session.userId = user.id;
            res.json(await sails.helpers.user.sortUser.with({user}));
        }
    }
};

