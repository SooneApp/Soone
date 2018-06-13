function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

async function getUser(parameters, res) {
    return await sails.helpers.user.getUser.with(parameters);
}

module.exports = {
    add: async function (req, res) { 
        var userVal = await sails.helpers.parseParameters.with({req});

        var user = await sails.helpers.user.addUser.with(userVal);

        res.json(await sails.helpers.user.sortUser.with({user}));
    },
    get: async function (req, res) { 
        var user = await getUser(await sails.helpers.parseParameters.with({req}), res);

        res.json(await sails.helpers.user.sortUser.with({user}));
    },
    update: async function (req, res) {
        var userVal = await sails.helpers.parseParameters.with({req});
        var user = await sails.helpers.user.updateUser.with(userVal);
        res.json(await sails.helpers.user.sortUser.with({user}));
    },
    disconnect: async function (req, res) {
        req.session.destroy(function(err) {
            return res.ok();
        });
    },
    connect: async function (req, res) {
        var parameters = await sails.helpers.parseParameters.with({req});

        var user = await getUser({ phoneNumber: parameters.phoneNumber },res);

        await sails.helpers.user.connectUser.with({ id: user.id, appToken: parameters.appToken });

        req.session.userId = user.id;
        res.json(await sails.helpers.user.sortUser.with({user}));
    }
};

