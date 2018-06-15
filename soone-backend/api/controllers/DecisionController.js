function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

async function getDecision(parameters, res) {
    return await sails.helpers.decision.getDecision.with(parameters)
        .tolerate('notExists', function(err) {
            res.status(409);
            res.send(err);
        })
        .tolerate('invalidInputs', function(err) {
            res.status(409);
            res.send(err);
        });
}

module.exports = {
    add: async function (req, res) {
        let decisionVal = parseParameters(req);

        let decision = await sails.helpers.decision.addDecision.with(decisionVal)
            .tolerate('alreadyExists', function (err) {
                res.status(409);
                res.send(err);
            });
        if (decision) {
            res.json(decision);
        }
    },
    get: async function (req, res) {
        let decision = await getDecision(parseParameters(req), res);

        res.json(decision);
    },
    update: async function (req, res) {
        let decisionVal = parseParameters(req);
        let decision = await sails.helpers.decision.updateDecision.with(decisionVal);
        res.json(decision);
    }
};

