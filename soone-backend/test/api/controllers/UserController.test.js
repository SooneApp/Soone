var supertest = require('supertest');

describe('UserController.addUser', function() {
    describe('addUser() first call', function() {
        it('should return the newly created user', function (done) {
            supertest(sails.hooks.http.app)
            .post("/api/user")
            .send({ phoneNumber: "0606060606" })
            .expect(200,done);
        });
    });
    describe('addUser() second call with same phone number', function() {
        it('should return an error 409 because the number already exists', function (done) {
            supertest(sails.hooks.http.app)
            .post("/api/user")
            .send({ phoneNumber: "0606060606" })
            .expect(409,done);
        });
    });
});