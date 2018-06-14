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
                .send({senderId: "d344d15f-0721-48cc-a113-a7243307e82", chatId: "505a5395-e993-4bd8-9345-a601284fc655", content: "You are the most beautiful flower"})
                .expect(409,done);
        });
        it('should fail because the user doesn\'t belong to this conversation', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.post("/api/message")
                .send({senderId: "d344d15f-0721-48cc-a113-a7243307e82", chatId: "505a5395-e993-4bd8-9345-a601284fc654", content: "You are the most beautiful flower"})
                .expect(409,done);
        });
        it('should fail because the conversation doesn\'t exists', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.post("/api/message")
                .send({senderId: "d344d15f-0721-48cc-a113-a7243307e82", chatId: "505a5395-e993-4bd8-9345-a601284fc6XX", content: "You are the most beautiful flower"})
                .expect(409,done);
        });
    });
});