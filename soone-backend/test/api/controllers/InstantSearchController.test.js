var supertest = require('supertest');
var agent = supertest.agent;
var assert = require("assert");
var auth;
var rewire = require('rewire');
var app = rewire('../../../api/controllers/InstantSearchController.js');

queue = app.__get__('queue'); 
sendMessage = app.__get__('sendMessage');
match_ = app.__get__('match');
associate = app.__get__('associate');

describe('UserController.queue', function () {
    describe('simple queue', function () {
        it('it should queue the user', function (done) {
            supertest(sails.hooks.http.app)
            .get("/api/user")
            .query({id: "d344d15f-0721-48cc-a113-a7243307e80"})
            .expect(200)
            .end(function (err, res) {
                var user = res.body;

                queue(user);
                assert.deepEqual(app.__get__("waitingList"), [user]);

                queue(user);
                assert.deepEqual(app.__get__("waitingList"), [user,user]);

                done();
            });
        });
    });
});

describe('UserController.sendMessage', function () {
    describe('send message', function () {
        it('it should send the message', function (done) {
            var message = {
                data: {
                    message: "empty message"
                }
            }
            var token = "epPhPUc4kbc:APA91bHmZEHVe9FyXrJP_H110dI6EQW4rFjKftArp-7VprsEadGayeo411BwYEuPwH1OuHpjLatIOAaN77QClv-cQTd0FsDHos8EYSueXzBFKX14K3loiqpxscOLthm-LPtzw4H1KrFM";
            sendMessage(message,token)        
            .then((response) => {
                done();
            });
        });
    });
});

describe('UserController.match', function () {
    describe('match', function () {
        it('user1 should match with user2 and vice versa', function () {
            return new Promise(async function (resolve) {
                var user1 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e80"});
                user1.city = "Montpellier";
                user1.ageRange = [18,25];
                var user2 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e81"});
                user2.city = "Montpellier";
                user2.ageRange = [18,25];

                assert.ok(match_(user1,user2));
                assert.ok(match_(user2,user1));
                resolve();
            });
        });
        it('different cities', function () {
            return new Promise(async function (resolve) {
                var user1 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e80"});
                user1.city = "Montpellier";
                user1.ageRange = [18,25];
                var user2 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e81"});
                user2.city = "Nîmes";
                user2.ageRange = [18,25];

                assert.ok(!match_(user1,user2));
                assert.ok(!match_(user2,user1));
                resolve();
            });
        });
        it('user1 match, user2 doesn\'t match age range', function () {
            return new Promise(async function (resolve) {
                var user1 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e80"});
                user1.city = "Montpellier";
                user1.ageRange = [18,25];
                var user2 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e81"});
                user2.city = "Montpellier";
                user2.ageRange = [30,35];

                assert.ok(match_(user1,user2));
                assert.ok(!match_(user2,user1));
                resolve();
            });
        });
        it('user1 should match, user2 doesn\'t match sex interest', function () {
            return new Promise(async function (resolve) {
                var user1 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e80"});
                user1.city = "Montpellier";
                user1.ageRange = [18,30];
                var user2 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e79"});
                user2.city = "Montpellier";
                user2.ageRange = [18,25];

                assert.ok(match_(user1,user2));
                assert.ok(!match_(user2,user1));
                resolve();
            });
        });
    });
});

describe('UserController.associate', function () {
    describe('associate', function () {
        it('multiple association testing with same city', function () {
            return new Promise(async function (resolve) {
                var user1 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e80"});
                user1.city = "Montpellier";
                user1.ageRange = [18,25];
                var user2 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e81"});
                user2.city = "Montpellier";
                user2.ageRange = [18,25];
                var user3 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e82"});
                user3.city = "Montpellier";
                user3.ageRange = [18,25];
                var user4 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e79"});
                user4.city = "Montpellier";
                user4.ageRange = [18,25];
                var user5 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e83"});
                user5.city = "Montpellier";
                user5.ageRange = [18,25];
                var user6 = await sails.helpers.user.getUser.with({id: "d344d15f-0721-48cc-a113-a7243307e84"});
                user6.city = "Montpellier";
                user6.ageRange = [18,25];

                app.__set__('waitingList', [user2,user3,user4,user5,user6]);
                assert.deepEqual(associate(user1),user2);
                assert.deepEqual(app.__get__('waitingList'), [user3,user4,user5,user6]);
                assert.deepEqual(associate(user1),user6);
                assert.ok(!associate(user1));

                resolve();
            });
        });
    });
});

