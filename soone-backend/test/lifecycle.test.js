var Sails = require('sails');

// Before running any tests...
before(function (done) {
    // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
    this.timeout(10000);

    Sails.lift({
        //log: {level: "warn"},
        models: {migrate: "drop"}
    }, function (err) {
        if (err) {
            return done(err);
        }

        var token = "APP_TOKEN_HERE";

        User.createEach([
            {
                "id": "d344d15f-0721-48cc-a113-a7243307e80",
                "name": "johndoe",
                "email": "johndoe@gmail.com",
                "birthDate": new Date('1995-12-17T03:24:00'),
                "phoneNumber": "0101010101",
                "sex": 1,
                "sexInterests": [2],
                "description": "Je chill dans mon canap trkl",
                "lastSeen": new Date('2017-12-17T03:24:00'),
                "accountType": 1,
                "deletedAt": "",
                "appToken": token
            },
            {
                "id": "d344d15f-0721-48cc-a113-a7243307e81",
                "name": "jonna",
                "email": "jonna@gmail.com",
                "birthDate": new Date('1998-10-17T03:24:00'),
                "phoneNumber": "0202020202",
                "sex": 2,
                "sexInterests": [1,2],
                "description": "",
                "lastSeen": new Date('2018-05-17T03:24:00'),
                "accountType": 1,
                "deletedAt": "",
                "appToken": token
            },
            {
                "id": "d344d15f-0721-48cc-a113-a7243307e82",
                "name": "max",
                "email": "max@gmail.com",
                "birthDate": new Date('1980-05-17T03:24:00'),
                "phoneNumber": "0222022222",
                "sex": 1,
                "sexInterests": [1,2],
                "description": "",
                "lastSeen": new Date('2018-02-13T03:24:00'),
                "accountType": 1,
                "deletedAt": "",
                "appToken": token
            },
            {
                "id": "d344d15f-0721-48cc-a113-a7243307e79",
                "name": "hugetta",
                "email": "hugetta@gmail.com",
                "birthDate": new Date('1989-02-15T03:24:00'),
                "phoneNumber": "1212012122",
                "sex": 2,
                "sexInterests": [2],
                "description": "",
                "lastSeen": new Date('2015-07-20T03:24:00'),
                "accountType": 1,
                "deletedAt": "",
                "appToken": token
            },
            {
                "id": "d344d15f-0721-48cc-a113-a7243307e83",
                "name": "matthou",
                "email": "matthou@gmail.com",
                "birthDate": new Date('1992-08-01T03:24:00'),
                "phoneNumber": "3212313122",
                "sex": 1,
                "sexInterests": [1],
                "description": "",
                "lastSeen": new Date('2018-01-20T03:24:00'),
                "accountType": 1,
                "deletedAt": "",
                "appToken": token
            },
            {
                "id": "d344d15f-0721-48cc-a113-a7243307e84",
                "name": "scotthie",
                "email": "scotthie@gmail.com",
                "birthDate": new Date('2000-01-01T03:24:00'),
                "phoneNumber": "4212314122",
                "sex": 2,
                "sexInterests": [1],
                "description": "",
                "lastSeen": new Date('2018-01-21T03:24:00'),
                "accountType": 1,
                "deletedAt": "",
                "appToken": token
            }])
            .exec(function createCB(err, user) {
                done();
            });
        });
});

after(function (done) {
    Sails.lower(done);
});