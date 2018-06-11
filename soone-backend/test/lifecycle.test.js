var Sails = require('sails');

// Before running any tests...
before(function(done) {
  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  Sails.lift({
    log: { level: "warn" },
    models: { migrate: "drop" }
  }, function(err) {
    if (err) { return done(err); }

    User.create({ "id": "d344d15f-0721-48cc-a113-a7243307e80", "name": "johndoe", "phoneNumber": "0101010101"}, done);
  });
});

after(function(done) {
  
  Sails.lower(done);
});