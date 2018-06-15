var supertest = require('supertest');
var moment = require('moment');
var agent = supertest.agent;
var assert = require("assert");
var auth;

describe('DecisionController.get', function () {
    describe('get() valid decision', function () {
        it('should return the decision', function (done) {
            supertest(sails.hooks.http.app)
                .get("/api/decision")
                .query({
                    idChat: "505a5395-e993-4bd8-9345-a601284fc654",
                    idUser: 'd344d15f-0721-48cc-a113-a7243307e80'
                })
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body.id, "505a5395-e993-4bd8-9345-a601284fc660");
                    assert.equal(res.body.decision, true);

                    done();
                });
        });
    });
    describe('get() wrong decision', function () {
        it('should return an error 500 because the decision doesn t exist', function (done) {
            supertest(sails.hooks.http.app)
                .get("/api/decision")
                .query({
                    idChat: "505a5395-e993-4bd8-9345-a601284fc6XX",
                    idUser: 'd344d15f-0721-48cc-a113-a7243307eXX'
                })
                .expect(409, done);
        });
    });
});


describe('ChatController.get', function () {
    describe('get() not active chat', function () {
        it('should return the chat not active yet', function (done) {
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