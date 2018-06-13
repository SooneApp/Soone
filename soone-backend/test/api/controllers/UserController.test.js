var supertest = require('supertest');
var agent = supertest.agent;
var assert = require("assert");
var auth;

describe('UserController.add', function () {
    describe('add() first call', function () {
        it('should return the newly created user', function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/user")
                .send({phoneNumber: "0606060606"})
                .expect(200, done);
        });
    });
    describe('add() second call with same phone number', function () {
        it('should return an error 500 because the number already exists', function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/user")
                .send({phoneNumber: "0606060606"})
                .expect(500, done);
        });
    });
});

describe('UserController.get', function () {
    describe('get() valid user', function () {
        it('should return the user johndoe', function (done) {
            supertest(sails.hooks.http.app)
                .get("/api/user")
                .query({id: "d344d15f-0721-48cc-a113-a7243307e80"})
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body.id, "d344d15f-0721-48cc-a113-a7243307e80");
                    assert.equal(res.body.name, "johndoe");

                    done();
                });
        });
    });
    describe('get() wrong user', function () {
        it('should return an error 500 because the user doesn t exists', function (done) {
            supertest(sails.hooks.http.app)
                .get("/api/user")
                .query({id: "d344d15f-0721-48cc-a113-a7243307eXX"})
                .expect(500, done);
        });
    });
});

describe('UserController.connect', function () {
    describe('connect() valid user', function () {
        it('should return the user johndoe', function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/connect")
                .send({phoneNumber: "0101010101", appToken: "DUMMY"})
                .expect(200)
                .end(function (err, res) {

                    assert.equal(res.body.id, "d344d15f-0721-48cc-a113-a7243307e80");
                    assert.equal(res.body.name, "johndoe");

                    done();
                });
        });
    });
    describe('connect() wrong user', function () {
        it('should return an error 500 because the phoneNumber doesn t exists', function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/connect")
                .send({phoneNumber: "0101010102", appToken: "DUMMY"})
                .expect(500, done);
        });
    });
});
describe('UserController.update', function () {
    describe('update valid user', function () {
        it('should return the user johndoe with sex, email and description', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.post("/api/connect")
                .send({phoneNumber: "0101010101", appToken: "DUMMY"})
                .expect(200)
                .end(function (err, res) {
                    done();
                });
        });

        it('should return the user johndoe with sex, email and description', function (done) {
            auth.put("/api/user")
                .send({
                    id: "d344d15f-0721-48cc-a113-a7243307e80",
                    name: "johndoeuf",
                    email: "johndaube@gmail.com",
                    phoneNumber: "0603030303",
                    birthDate: new Date('1885-12-17T12:24:00'),
                    sex: 2,
                    sexInterests: [2,3],
                    description: "Me? Simply the best",
                    lastSeen: new Date('1996-12-17T03:24:00'),
                    accountType: 3,
                    deletedAt: new Date('2017-12-17T03:24:00')
                })
                .expect(200)
                .end(function (err, res) {

                    assert.equal(res.body.id, "d344d15f-0721-48cc-a113-a7243307e80");
                    assert.equal(res.body.name, "johndoeuf");
                    assert.equal(res.body.email, "johndaube@gmail.com");
                    assert.equal(res.body.birthDate, new Date('1885-12-17T12:24:00').toISOString());
                    assert.equal(res.body.sex, 2);
                    assert.deepEqual(res.body.sexInterests, [2,3]);
                    assert.equal(res.body.description, "Me? Simply the best");
                    assert.equal(res.body.lastSeen, new Date('1996-12-17T03:24:00').toISOString());
                    assert.equal(res.body.accountType, 3);

                    done();
                });
        });
    });
});