/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {
  
  var admin = require('firebase-admin');

  var serviceAccount = require('../assets/firebase/serviceAccountKey.json');
  
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://soone-3343a.firebaseio.com/'
  });

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  //  return done();
  return done();
};
/*
module.exports.bootstrap = function (cb) {
    var express = require("express"),
         app = express();

    app.get('*', function(req,res) {  
        res.redirect('https://' + req.headers.host + req.url)
    }).listen(80);

    cb();
};
*/
