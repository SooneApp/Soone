var supertest = require('supertest');
var moment = require('moment');
var agent = supertest.agent;
var assert = require("assert");
var auth;

describe('UserController.send', function () {
    describe('send', function () {
        it('should fail because the conversation is closed', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.post("/api/message")
                .send({
                    senderId: "d344d15f-0721-48cc-a113-a7243307e82",
                    chatId: "505a5395-e993-4bd8-9345-a601284fc655",
                    content: "You are the most beautiful flower"
                })
                .expect(409, done);
        });
        it('should fail because the user doesn\'t belong to this conversation', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.post("/api/message")
                .send({
                    senderId: "d344d15f-0721-48cc-a113-a7243307e82",
                    chatId: "505a5395-e993-4bd8-9345-a601284fc654",
                    content: "You are the most beautiful flower"
                })
                .expect(409, done);
        });
        it('should fail because the conversation doesn\'t exists', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.post("/api/message")
                .send({
                    senderId: "d344d15f-0721-48cc-a113-a7243307e82",
                    chatId: "505a5395-e993-4bd8-9345-a601284fc6XX",
                    content: "You are the most beautiful flower"
                })
                .expect(409, done);
        });
    });
});

describe('ChatController.add', function () {
    describe('add() first call', function () {
        it('should return the newly created chat', function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/chat")
                .send({
                    idUser1: "d344d15f-0721-48cc-a113-a7243307e80",
                    idUser2: "d344d15f-0721-48cc-a113-a7243307e84",
                })
                .expect(200, done);
        });
    });
    describe('add() second call with ids', function () {
        it('should return an error 409 because the number already exists', function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/chat")
                .send({
                    idUser1: "d344d15f-0721-48cc-a113-a7243307e80",
                    idUser2: "d344d15f-0721-48cc-a113-a7243307e84",
                })
                .expect(409, done);
        });
    });
});

describe('ChatController.get', function () {
    describe('get() a chat', function () {
        it('should return the chat', function (done) {
            supertest(sails.hooks.http.app)
                .get("/api/chat")
                .query({
                    id: "505a5395-e993-4bd8-9345-a601284fc654",
                })
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body.id, "505a5395-e993-4bd8-9345-a601284fc654");
                    assert.equal(res.body.active, false);
                    assert.ok(res.body.startDate < res.body.endDate);

                    done();
                });
        });
    });
    describe('get() unexisting chat', function () {
        it('should return an error 409 because the chat doesn t exist', function (done) {
            supertest(sails.hooks.http.app)
                .get("/api/chat")
                .query({
                    id: "505a5395-e993-4bd8-9345-a601284fc6XX",
                })
                .expect(409, done);
        });
    });
});