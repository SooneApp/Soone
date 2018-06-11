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
        it('should return an error 409 because the number already exists', function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/user")
                .send({phoneNumber: "0606060606"})
                .expect(409, done);
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
                    assert.equal(res.body.phoneNumber, "0101010101");

                    done();
                });
        });
    });
    describe('get() wrong user', function () {
        it('should return an error 409 because the user doesn t exists', function (done) {
            supertest(sails.hooks.http.app)
                .get("/api/user")
                .query({id: "d344d15f-0721-48cc-a113-a7243307e81"})
                .expect(409, done);
        });
    });
});

describe('UserController.connect', function () {
    describe('connect() valid user', function () {
        it('should return the user johndoe', function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/connect")
                .send({phoneNumber: "0101010101"})
                .expect(200)
                .end(function (err, res) {

                    assert.equal(res.body.id, "d344d15f-0721-48cc-a113-a7243307e80");
                    assert.equal(res.body.name, "johndoe");
                    assert.equal(res.body.phoneNumber, "0101010101");

                    done();
                });
        });
    });
    describe('connect() wrong user', function () {
        it('should return an error 409 because the phoneNumber doesn t exists', function (done) {
            supertest(sails.hooks.http.app)
                .post("/api/connect")
                .send({phoneNumber: "0101010102"})
                .expect(409, done);
        });
    });
});
describe('UserController.update', function () {
    describe('update valid user', function () {
        it('should return the user johndoe with sex, email and description', function (done) {
            auth = agent(sails.hooks.http.app);
            auth.post("/api/connect")
                .send({phoneNumber: "0101010101"})
                .expect(200)
                .end(function (err, res) {
                    done();
                });
        });

        it('should return the user johndoe with sex, email and description', function (done) {
            auth.put("/api/user")
                .send({
                    id: "d344d15f-0721-48cc-a113-a7243307e80",
                    email: "johndoe@gmail.com",
                    sex: 1,
                    description: "Me? Simply the best"
                })
                .expect(200)
                .end(function (err, res) {

                    assert.equal(res.body.id, "d344d15f-0721-48cc-a113-a7243307e80");
                    assert.equal(res.body.name, "johndoe");
                    assert.equal(res.body.phoneNumber, "0101010101");
                    assert.equal(res.body.email, "johndoe@gmail.com");
                    assert.equal(res.body.sex, 1);
                    assert.equal(res.body.description, "Me? Simply the best");

                    done();
                });
        });
    });
});