var rewire = require('rewire');
var app = rewire('../../../api/controllers/DecisionController.js');
var supertest = require('supertest');
var agent = supertest.agent;

describe('DecisionController.update', function () {
    describe('update a decision', function () {
        it('should return the decision with true value instead of false', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.put("/api/decision")
                .send({id: "505a5395-e993-4bd8-9345-a601284fc661", decision: true})
                .expect(200)
                .end(function (err, res) {
                    done();
                });
        });
    });
});

describe('ChatController.get', function () {
    describe('get() active chat', function () {
        it('should return the chat now active', function (done) {
            supertest(sails.hooks.http.app)
                .get("/api/chat")
                .query({
                    id: "505a5395-e993-4bd8-9345-a601284fc654",
                })
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body.active, true);

                    done();
                });
        });
    });
});

describe('DecisionController.update', function () {
    describe('update a decision', function () {
        it('should return the decision with true value instead of false', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.put("/api/decision")
                .send({id: "505a5395-e993-4bd8-9345-a601284fc660", decision: false})
                .expect(200)
                .end(function (err, res) {
                    done();
                });
        });
    });
});

describe('ChatController.get', function () {
    describe('get() non active chat', function () {
        it('should return the chat not active', function (done) {
            supertest(sails.hooks.http.app)
                .get("/api/chat")
                .query({
                    id: "505a5395-e993-4bd8-9345-a601284fc654",
                })
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body.active, false);

                    done();
                });
        });
    });
});