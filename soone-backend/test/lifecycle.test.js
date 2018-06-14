var Sails = require('sails');
var moment = require('moment');

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
                "deletedAt": null,
                "appToken": token,
                "accountType": 1,
            },
            {
                "id": "d344d15f-0721-48cc-a113-a7243307e81",
                "name": "jonna",
                "email": "jonna@gmail.com",
                "birthDate": new Date('1998-10-17T03:24:00'),
                "phoneNumber": "0202020202",
                "sex": 2,
                "sexInterests": [1, 2],
                "description": "",
                "lastSeen": new Date('2018-05-17T03:24:00'),
                "deletedAt": null,
                "appToken": token,
                "accountType": 1,
            },
            {
                "id": "d344d15f-0721-48cc-a113-a7243307e82",
                "name": "max",
                "email": "max@gmail.com",
                "birthDate": new Date('1980-05-17T03:24:00'),
                "phoneNumber": "0222022222",
                "sex": 1,
                "sexInterests": [1, 2],
                "description": "",
                "lastSeen": new Date('2018-02-13T03:24:00'),
                "accountType": 1,
                "deletedAt": null,
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
                "deletedAt": null,
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
                "deletedAt": null,
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
                "deletedAt": null,
                "appToken": token
            }])
            .exec(function createCB(err, user) {
                Chat.createEach([
                    {
                        "id": "505a5395-e993-4bd8-9345-a601284fc654",
                        "user1": "d344d15f-0721-48cc-a113-a7243307e80",
                        "user2": "d344d15f-0721-48cc-a113-a7243307e81",
                        "startDate": moment().format('YYYY-MM-DD HH:mm:ss'),
                        "endDate": moment().add(6, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                        "active": false
                    },
                    {
                        "id": "505a5395-e993-4bd8-9345-a601284fc655",
                        "user1": "d344d15f-0721-48cc-a113-a7243307e82",
                        "user2": "d344d15f-0721-48cc-a113-a7243307e81",
                        "startDate": moment().subtract(7, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                        "endDate": moment().subtract(1, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                        "active": false
                    },
                    {
                        "id": "505a5395-e993-4bd8-9345-a601284fc656",
                        "user1": "d344d15f-0721-48cc-a113-a7243307e83",
                        "user2": "d344d15f-0721-48cc-a113-a7243307e81",
                        "startDate": moment().subtract(7, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                        "endDate": moment().subtract(1, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                        "active": true
                    }])
                    .exec(function createCB(err, user) {
                        Decision.createEach([
                            {
                                "id": "505a5395-e993-4bd8-9345-a601284fc660",
                                "idChat": "505a5395-e993-4bd8-9345-a601284fc654",
                                "idUser": "d344d15f-0721-48cc-a113-a7243307e80",
                                "decision": true
                            },
                            {
                                "id": "505a5395-e993-4bd8-9345-a601284fc661",
                                "idChat": "505a5395-e993-4bd8-9345-a601284fc654",
                                "idUser": "d344d15f-0721-48cc-a113-a7243307e81",
                                "decision": false
                            }])
                            .exec(function createCB(err, user) {
                                done();
                            });
                    });
            });
    });
});

after(function (done) {
    Sails.lower(done);
});