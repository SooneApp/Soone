var supertest = require('supertest');
var agent = supertest.agent;
var assert = require("assert");
var auth;
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var io = sailsIOClient(socketIOClient);
io.sails.url = 'http://localhost:1337';

describe('InstantSearchController.register', function () {
    describe('register one user()', function () {
        it('should register the user', function (done) {
            io.socket.post('/api/instantSearch', { id: 'd344d15f-0721-48cc-a113-a7243307e80', ageRange: [18,25], city: "Montpellier" }, function (data, jwres) {
                assert.equal(jwres.statusCode, 200);
            });
            io.socket.on('associated', function(msg) {
                done();
            });
        });
    });
});