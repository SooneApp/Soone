function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

async function getUser(parameters, res) {
    return await sails.helpers.user.getUser.with(parameters)
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
        var userVal = await sails.helpers.parseParameters.with({req});

        var user = await sails.helpers.user.addUser.with(userVal)
            .tolerate('alreadyExists', (err) => {
                res.status(409);
                return err;
            });
        
        res.json(user);
    },
    get: async function (req, res) { 
        var user = await getUser(await sails.helpers.parseParameters.with({req}), res);

        res.json(user);
    },
    update: async function (req, res) {
        var userVal = await sails.helpers.parseParameters.with({req});
        var user = await sails.helpers.user.updateUser.with(userVal);
        res.json(user);
    },
    disconnect: async function (req, res) {
        req.session.destroy(function(err) {
            return res.success();
        });
    },
    connect: async function (req, res) {
        var user = await getUser(await sails.helpers.parseParameters.with({req}), res);
        req.session.userId = user.id;
        res.json(user);
    }
};

