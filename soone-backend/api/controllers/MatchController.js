function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

async function getMatch(parameters, res) {
    return await sails.helpers.match.getMatch.with(parameters)
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
        var matchVal = parseParameters(req);

        var match = await sails.helpers.match.addMatch.with(matchVal)
            .tolerate('alreadyExists', (err) => {
                res.status(409);
                return err;
            });
        
        res.json(match);
    },
    get: async function (req, res) { 
        var match = await getMatch(parseParameters(req), res);

        res.json(match);
    },
    update: async function (req, res) {
        var matchVal = parseParameters(req);
        var match = await sails.helpers.match.updateMatch.with(matchVal);
        res.json(match);
    }
};

