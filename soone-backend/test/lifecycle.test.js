var Sails = require('sails');
var async = require("async");

// Before running any tests...
before(function (done) {
    // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
    this.timeout(10000);

    Sails.lift({
        log: {level: "warn"},
        models: {migrate: "drop"}
    }, function (err) {
        if (err) {
            return done(err);
        }

        async.parallel({
            createUsers: function(cb){
                Sex.create({
                    "id": 1,
                    "label": "label"
                })
                .exec(function createCB(err, user) {
                    sails.log('bootstrap.test.js Create default Service Admin user');
                    cb();
                });
                }
            },
            function(err, results) {
                User.create({
                    "id": "d344d15f-0721-48cc-a113-a7243307e80",
                    "name": "johndoe",
                    "email": "johndoe@gmail.com",
                    "birthDate": new Date('1995-12-17T03:24:00'),
                    "phoneNumber": "0101010101",
                    "sex": 1,
                    "sexInterest": 100,
                    "description": "Je chill dans mon canap trkl",
                    "lastSeen": new Date('2017-12-17T03:24:00'),
                    "accountType": 1,
                    "deletedAt": ""
                },done);
            });
        });
});

after(function (done) {
    Sails.lower(done);
});