var supertest = require('supertest');
var agent = supertest.agent;

describe('UserController.send', function () {
    describe('send', function () {
        it('send a message to user2', function () {
            return new Promise(async function (resolve) {
                auth = agent(sails.hooks.http.app);
                auth.post("/api/message")
                    .send({senderId: "d344d15f-0721-48cc-a113-a7243307e82", chatId: "505a5395-e993-4bd8-9345-a601284fc655", content: "You are the most beautiful flower"})
                    .expect(200)
                    .end(function (err, res) {
                        resolve();
                    });
            });
        });
    });
});