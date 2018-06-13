function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

async function getDecision(parameters, res) {
    return await sails.helpers.decision.getDecision.with(parameters)
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
        var matchDecisionVal = parseParameters(req);

        var matchDecision = await sails.helpers.decision.addDecision.with(matchDecisionVal)
            .tolerate('alreadyExists', (err) => {
                res.status(409);
                return err;
            });
        
        res.json(matchDecision);
    },
    get: async function (req, res) { 
        var matchDecision = await getDecision(parseParameters(req), res);

        res.json(matchDecision);
    },
    update: async function (req, res) {
        var matchDecisionVal = parseParameters(req);
        var matchDecision = await sails.helpers.decision.updateDecision.with(matchDecisionVal);
        res.json(matchDecision);
    }
};

