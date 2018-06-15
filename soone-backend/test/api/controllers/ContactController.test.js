var supertest = require('supertest');
var moment = require('moment');
var agent = supertest.agent;
var assert = require("assert");
var auth;

describe('ContactController.getAll', function () {
    describe('getAll', function () {
        it('should return all conversations', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.get("/api/chats")
                .query({userId: "d344d15f-0721-48cc-a113-a7243307e83"})
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body[0].id, "505a5395-e993-4bd8-9345-a601284fc656");
                    done();
                });
        });
        it('should return no conversation because the user only has a timed one', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.get("/api/chats")
                .query({userId: "d344d15f-0721-48cc-a113-a7243307e80"})
                .expect(200)
                .end(function (err, res) {
                    assert.deepEqual(res.body, []);
                    done();
                });
        });
    });
});

describe('ContactController.getMessages', function () {
    describe('getAll', function () {
        it('should return the 3 messages of the conversation', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.get("/api/messages")
                .query({userId: "d344d15f-0721-48cc-a113-a7243307e83", chatId: "505a5395-e993-4bd8-9345-a601284fc656"})
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body[0].id, "505a5395-e993-5d25-9345-a601284fc680");
                    assert.equal(res.body[1].id, "505a5395-e993-5d25-9345-a601284fc681");
                    assert.equal(res.body[2].id, "505a5395-e993-5d25-9345-a601284fc682")
                    done();
                });
        });
        it('should return error', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.get("/api/messages")
                .query({userId: "d344d15f-0721-48cc-a113-a7243307e80", chatId: "505a5395-e993-4bd8-9345-a601284fc656"})
                .expect(409,done);
        });
    });
});