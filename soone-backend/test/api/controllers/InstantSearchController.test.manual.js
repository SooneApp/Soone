
var rewire = require('rewire');
var app = rewire('../../../api/controllers/InstantSearchController.js');
var supertest = require('supertest');
var agent = supertest.agent;

sendMessage = app.__get__('sendMessage');

describe('UserController.sendMessage', function () {
    describe('send message', function () {
        it('it should send the message', function () {
            return new Promise(async function (resolve) {
                var message = {
                    data: {
                        message: "empty message"
                    }
                }

                var user1 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e80"});

                sendMessage(message,user1.appToken)        
                .then((response) => {
                    resolve();
                });
            });
        });
    });
});

describe('UserController.register', function () {
    describe('register', function () {
        it('register user', function () {
            return new Promise(async function (resolve) {
                auth = agent(sails.hooks.http.app);

                auth.post("/api/instantSearch")
                    .send({id: "d344d15f-0721-48cc-a113-a7243307e80", ageRange: [18,25], city: "Montpellier"})
                    .expect(200)
                    .end(function (err, res) {
                        auth.post("/api/instantSearch")
                        .send({id: "d344d15f-0721-48cc-a113-a7243307e81", ageRange: [18,25], city: "Montpellier"})
                        .expect(200)
                        .end(function (err, res) {
                            resolve();
                        });
                    });
            });
        });
    });
});